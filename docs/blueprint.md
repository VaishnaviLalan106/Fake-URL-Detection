# **App Name**: PhishGuard

## Core Features:

- URL Input & Analysis: Accept user-provided URLs, analyze them locally using a JavaScript-based engine to detect phishing attempts, and display a confidence score and explainable reasons for the verdict.
- Phishing Detection Engine: Deterministic JavaScript engine extracts features from URLs (length, presence of IP, etc.), scores them based on weighted points, and provides confidence levels.
- Real-time Results Display: Presents the analysis verdict, confidence score, top contributing factors, and model version information in a clear, user-friendly result card.
- Feedback Reporting: Allows users to report incorrect phishing labels, which is stored in Firestore alongside the original prediction for model refinement. Uses correct_label, predicted_label and url.
- Admin Dashboard: Offers a protected admin interface with key metrics like total checks, phishing rate, and recent predictions, secured by Firebase Authentication.
- API Endpoint: The /api/predict endpoint analyzes URLs (no external calls), returns label, confidence, reasons, model version and timestamp.  The /api/report collects feedback and the /api/model_info exposes feature definitions and thresholds.
- Local Storage of URL history: Local storage for history of analyzed URLs.

## Style Guidelines:

- Primary color: A vibrant blue (#29ABE2) to convey trust and security, essential for a security-focused application.
- Background color: A light gray (#F5F5F5) to provide a clean and professional backdrop, ensuring readability and focus on the content.
- Accent color: A warning orange (#FF9800) will be used to highlight potential phishing risks or important alerts to the user, attracting immediate attention.
- Font pairing: 'Inter' (sans-serif) for both headings and body text; a clean, modern font to enhance readability and convey trustworthiness.
- Use clear and universally recognizable icons from a library like FontAwesome or Material Icons to represent different URL features, verdicts, and actions.
- Maintain a clean, well-spaced layout with a clear hierarchy to guide users through the analysis process. Utilize Tailwind's grid system for responsiveness.
- Incorporate subtle animations, like a loading spinner or a smooth transition on the result card, to enhance user experience without distracting from the core function.