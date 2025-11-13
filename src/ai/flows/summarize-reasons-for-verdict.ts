'use server';

/**
 * @fileOverview Summarizes the reasons behind a phishing verdict using GenAI to rephrase technical explanations into plain language.
 *
 * - summarizeReasonsForVerdict - A function that handles the summarization process.
 * - SummarizeReasonsInput - The input type for the summarizeReasonsForVerdict function.
 * - SummarizeReasonsOutput - The return type for the summarizeReasonsForVerdict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeReasonsInputSchema = z.object({
  topReasons: z
    .array(
      z.object({
        feature: z.string(),
        value: z.any(),
        explanation: z.string(),
      })
    )
    .describe('The top reasons for the phishing verdict.'),
});
export type SummarizeReasonsInput = z.infer<typeof SummarizeReasonsInputSchema>;

const SummarizeReasonsOutputSchema = z.object({
  summary: z.string().describe('A concise, human-readable summary of the reasons.'),
});
export type SummarizeReasonsOutput = z.infer<typeof SummarizeReasonsOutputSchema>;

export async function summarizeReasonsForVerdict(input: SummarizeReasonsInput): Promise<SummarizeReasonsOutput> {
  return summarizeReasonsForVerdictFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReasonsPrompt',
  input: {schema: SummarizeReasonsInputSchema},
  output: {schema: SummarizeReasonsOutputSchema},
  prompt: `Summarize the following reasons for a phishing verdict in a concise, human-readable way:\n\n{% each topReasons %}- Feature: {{feature}}, Value: {{value}}, Explanation: {{explanation}}\n{% endeach %}\n\nSummary:`,
});

const summarizeReasonsForVerdictFlow = ai.defineFlow(
  {
    name: 'summarizeReasonsForVerdictFlow',
    inputSchema: SummarizeReasonsInputSchema,
    outputSchema: SummarizeReasonsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
