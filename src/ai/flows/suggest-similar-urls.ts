'use server';

/**
 * @fileOverview Suggests similar URLs based on a potentially malicious URL.
 *
 * - suggestSimilarUrls - A function that generates variations of the input URL to identify potential phishing attempts.
 * - SuggestSimilarUrlsInput - The input type for the suggestSimilarUrls function.
 * - SuggestSimilarUrlsOutput - The return type for the suggestSimilarUrls function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSimilarUrlsInputSchema = z.object({
  url: z.string().describe('The URL to generate similar URLs from.'),
  label: z.string().describe('Phishing or legitimate.'),
  top_reasons: z.array(z.object({
    feature: z.string(),
    value: z.any(),
    explanation: z.string(),
  })).describe('The reasons why the URL was classified as such.')
});
export type SuggestSimilarUrlsInput = z.infer<typeof SuggestSimilarUrlsInputSchema>;

const SuggestSimilarUrlsOutputSchema = z.object({
  similarUrls: z.array(z.string()).describe('An array of similar URLs.'),
});
export type SuggestSimilarUrlsOutput = z.infer<typeof SuggestSimilarUrlsOutputSchema>;

export async function suggestSimilarUrls(input: SuggestSimilarUrlsInput): Promise<SuggestSimilarUrlsOutput> {
  return suggestSimilarUrlsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSimilarUrlsPrompt',
  input: {schema: SuggestSimilarUrlsInputSchema},
  output: {schema: SuggestSimilarUrlsOutputSchema},
  prompt: `You are a security expert specializing in identifying phishing attempts. Based on the input URL, its label, and the reasons for the label, generate 3 variations of the URL that might be used in phishing attacks. These URLs should target the same brand or employ similar techniques as the original URL.

Original URL: {{{url}}}
Label: {{{label}}}
Top Reasons: {{#each top_reasons}}- Feature: {{{feature}}}, Value: {{{value}}}, Explanation: {{{explanation}}}}{{/each}}

Similar URLs:
`,
});

const suggestSimilarUrlsFlow = ai.defineFlow(
  {
    name: 'suggestSimilarUrlsFlow',
    inputSchema: SuggestSimilarUrlsInputSchema,
    outputSchema: SuggestSimilarUrlsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    const similarUrls = output?.similarUrls || [];

    // If the prompt does not return valid JSON, return an empty array.
    return {
      similarUrls: similarUrls,
    };
  }
);
