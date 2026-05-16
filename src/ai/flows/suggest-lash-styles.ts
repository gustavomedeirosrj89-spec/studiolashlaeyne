'use server';
/**
 * @fileOverview An AI-powered tool that suggests personalized lash volume styles based on user eye shape and style preferences.
 *
 * - suggestLashStylesForClient - A function that handles the lash style suggestion process.
 * - SuggestLashStylesInput - The input type for the suggestLashStylesForClient function.
 * - SuggestLashStylesOutput - The return type for the suggestLashStylesForClient function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestLashStylesInputSchema = z.object({
  eyeShape: z
    .string()
    .describe(
      'A description of the user\'s eye shape (e.g., almond, round, monolid, hooded).' + 
      'The AI should use this to recommend styles that complement the eye shape.'
    ),
  stylePreferences: z
    .string()
    .describe(
      'A description of the user\'s desired style preferences (e.g., natural, dramatic, cat eye, wispy, open eye).' + 
      'The AI should use this to align the recommendations with the user\'s aesthetic goals.'
    ),
});
export type SuggestLashStylesInput = z.infer<typeof SuggestLashStylesInputSchema>;

const SuggestedLashStyleSchema = z.object({
  name: z.string().describe('The name of the suggested lash style (e.g., Classic Volume, Mega Volume, Fox Eye).'),
  description: z
    .string()
    .describe(
      'A brief description of the lash style and why it is suitable for the given eye shape and style preferences.'
    ),
  volumeLevel: z
    .enum(['natural', 'light', 'medium', 'dramatic', 'mega'])
    .describe('The volume level of the suggested lash style.'),
});

const SuggestLashStylesOutputSchema = z.array(SuggestedLashStyleSchema);
export type SuggestLashStylesOutput = z.infer<typeof SuggestLashStylesOutputSchema>;

export async function suggestLashStylesForClient(
  input: SuggestLashStylesInput
): Promise<SuggestLashStylesOutput> {
  return suggestLashStylesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLashStylesPrompt',
  input: { schema: SuggestLashStylesInputSchema },
  output: { schema: SuggestLashStylesOutputSchema },
  prompt: `You are an expert lash stylist for LAEYNE STUDIO LASH. Your goal is to suggest personalized lash volume styles to clients based on their eye shape and style preferences.

Considering the following client details:
- Eye Shape: {{{eyeShape}}}
- Style Preferences: {{{stylePreferences}}}

Suggest 3-5 lash volume styles that would be perfect for this client. For each suggestion, provide the style's name, a brief description explaining why it's a good match, and its volume level. Focus on complementing their eye shape and fulfilling their desired aesthetic. Your response should be a JSON array of objects, strictly adhering to the provided output schema.`,
});

const suggestLashStylesFlow = ai.defineFlow(
  {
    name: 'suggestLashStylesFlow',
    inputSchema: SuggestLashStylesInputSchema,
    outputSchema: SuggestLashStylesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
