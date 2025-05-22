// src/ai/flows/optimize-drone-route.ts
'use server';

/**
 * @fileOverview Optimizes drone spraying routes based on weather conditions and field data.
 *
 * - optimizeDroneRoute - A function that optimizes drone spraying routes.
 * - OptimizeDroneRouteInput - The input type for the optimizeDroneRoute function.
 * - OptimizeDroneRouteOutput - The return type for the optimizeDroneRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeDroneRouteInputSchema = z.object({
  weatherConditions: z
    .string()
    .describe('The current weather conditions, including temperature, wind speed, and precipitation.'),
  fieldData: z.string().describe('The field data, including field size, shape, and obstacles.'),
});
export type OptimizeDroneRouteInput = z.infer<typeof OptimizeDroneRouteInputSchema>;

const OptimizeDroneRouteOutputSchema = z.object({
  optimizedRoute: z
    .string()
    .describe(
      'The optimized drone spraying route, including waypoints and spraying instructions.  Format should be a JSON array of lat/lon coordinates.'
    ),
  estimatedTime: z.string().describe('The estimated time to complete the spraying route.'),
  productConsumption: z.string().describe('The estimated product consumption for the route.'),
});
export type OptimizeDroneRouteOutput = z.infer<typeof OptimizeDroneRouteOutputSchema>;

export async function optimizeDroneRoute(
  input: OptimizeDroneRouteInput
): Promise<OptimizeDroneRouteOutput> {
  return optimizeDroneRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeDroneRoutePrompt',
  input: {schema: OptimizeDroneRouteInputSchema},
  output: {schema: OptimizeDroneRouteOutputSchema},
  prompt: `You are an expert in optimizing drone spraying routes for agricultural fields.

  Given the following weather conditions and field data, provide an optimized drone spraying route, estimated time, and product consumption.

  Weather Conditions: {{{weatherConditions}}}
  Field Data: {{{fieldData}}}

  Return the optimized route as a JSON array of lat/lon coordinates, and the estimated time and product consumption as strings.
  Ensure the output format matches the schema exactly.`,
});

const optimizeDroneRouteFlow = ai.defineFlow(
  {
    name: 'optimizeDroneRouteFlow',
    inputSchema: OptimizeDroneRouteInputSchema,
    outputSchema: OptimizeDroneRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
