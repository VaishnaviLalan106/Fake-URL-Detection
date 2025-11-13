import type { PredictionFeature, ModelInfo } from './types';

const MODEL_VERSION = '1.1.0';

// Define weights and thresholds for each feature.
const featureDefinitions = {
  url_length: { weight: 0.05, threshold: 75, description: "URL length > 75 characters is suspicious." },
  host_length: { weight: 0.1, threshold: 25, description: "Hostname length > 25 characters can be a red flag." },
  path_length: { weight: 0.05, threshold: 50, description: "URL path length > 50 characters may indicate obfuscation." },
  count_dots: { weight: 0.15, threshold: 4, description: "More than 4 dots in the hostname can be used for obfuscation." },
  count_hyphens_domain: { weight: 0.1, threshold: 1, description: "Hyphens in a domain name are sometimes used in phishing." },
  count_at: { weight: 0.6, threshold: 0, description: "The '@' symbol in a URL is highly suspicious and often used to trick users." },
  count_query_params: { weight: 0.05, threshold: 5, description: "A high number of query parameters (>5) might be used to hide malicious data." },
  has_https: { weight: -0.3, threshold: 1, description: "Lack of HTTPS is a significant security risk." },
  has_ip: { weight: 0.9, threshold: 0, description: "Using an IP address instead of a domain name is a classic phishing technique." },
  count_digits_domain: { weight: 0.15, threshold: 2, description: "More than 2 digits in the domain name can be a sign of a malicious site." },
  suspicious_tld: { weight: 0.5, threshold: 0, description: "The URL uses a Top-Level Domain (TLD) commonly associated with phishing (e.g., .xyz, .top, .info)." },
  suspicious_tokens: { weight: 0.4, threshold: 0, description: "Contains suspicious keywords like 'login', 'secure', 'bank', etc." },
  domain_entropy: { weight: 0.25, threshold: 3.5, description: "High domain entropy (randomness) can indicate a machine-generated, illegitimate domain." },
};

// List of suspicious TLDs
const SUSPICIOUS_TLDS = ['.xyz', '.top', '.info', '.site', '.club', '.online', '.buzz', '.biz', '.link', '.pw', '.gq', '.cf', '.tk', '.ml'];

// List of suspicious tokens
const SUSPICIOUS_TOKENS = ['login', 'secure', 'account', 'verify', 'update', 'bank', 'paypal', 'confirm', 'signin', 'webscr', 'auth', 'support', 'service', 'ebay', 'apple', 'amazon', 'microsoft', 'google'];

// Calculate Shannon entropy for a string
function getEntropy(str: string): number {
  if (str.length < 3) return 0;
  const freq: { [key: string]: number } = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  return Object.values(freq).reduce((sum, count) => {
    const p = count / str.length;
    return sum - p * Math.log2(p);
  }, 0);
}

// Main feature extraction function
function extractFeatures(url: string): { [key: string]: string | number | boolean } {
  let urlObj: URL;
  try {
    // Prepend http if no protocol is present
    urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
  } catch (e) {
    // Return empty features for invalid URLs
    return {};
  }
  
  const { hostname, pathname, search, protocol } = urlObj;

  const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  const ipv6Regex = /\[([a-fA-F0-9:]+)\]/;

  return {
    url_length: url.length,
    host_length: hostname.length,
    path_length: pathname.length,
    count_dots: (hostname.match(/\./g) || []).length,
    count_hyphens_domain: (hostname.match(/-/g) || []).length,
    count_at: (url.match(/@/g) || []).length > 0,
    count_query_params: new URLSearchParams(search).size,
    has_https: protocol === 'https:',
    has_ip: ipv4Regex.test(hostname) || ipv6Regex.test(hostname),
    count_digits_domain: (hostname.match(/\d/g) || []).length,
    suspicious_tld: SUSPICIOUS_TLDS.some(tld => hostname.endsWith(tld)),
    suspicious_tokens: SUSPICIOUS_TOKENS.some(token => url.toLowerCase().includes(token)),
    domain_entropy: getEntropy(hostname.split('.')[0]),
  };
}

// Scoring and analysis function
function score(features: { [key: string]: any }): { score: number, reasons: PredictionFeature[] } {
  let totalScore = 0;
  const reasons: PredictionFeature[] = [];

  for (const key in featureDefinitions) {
    const def = featureDefinitions[key as keyof typeof featureDefinitions];
    const value = features[key];
    let featureScore = 0;

    if (value === undefined) continue;

    if (key === 'has_https') {
      if (!value) featureScore = 1; // Punish lack of HTTPS
    } else if (typeof value === 'boolean') {
      if (value) featureScore = 1;
    } else if (typeof value === 'number') {
      if (value > def.threshold) {
        // Normalize score based on how much it exceeds the threshold
        featureScore = Math.min(1, (value - def.threshold) / (def.threshold + 1));
      }
    }
    
    const weightedScore = featureScore * def.weight;
    totalScore += weightedScore;

    if (featureScore > 0) {
      reasons.push({
        feature: key,
        value,
        explanation: def.description,
        weight: def.weight,
        score: weightedScore,
      });
    }
  }
  
  // Adjust score for HTTPS
  if (features['has_https']) {
      totalScore += featureDefinitions.has_https.weight;
  }


  return {
    score: Math.max(0, Math.min(1, totalScore)),
    reasons: reasons.sort((a, b) => b.score - a.score),
  };
}

export function analyzeUrl(url: string) {
  const features = extractFeatures(url);
  const { score: phishingConfidence, reasons } = score(features);

  const label = phishingConfidence >= 0.4 ? 'phishing' : 'legitimate';
  
  const confidence = label === 'phishing' ? phishingConfidence : 1 - phishingConfidence;

  return {
    label,
    confidence,
    top_reasons: reasons.slice(0, 3),
    model_version: MODEL_VERSION,
    timestamp: new Date().toISOString(),
  };
}


export const modelInfo: ModelInfo = {
    version: MODEL_VERSION,
    features: Object.entries(featureDefinitions).map(([name, def]) => ({
        name,
        description: def.description,
        weight: def.weight
    }))
};
