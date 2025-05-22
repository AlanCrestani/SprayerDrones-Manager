'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { optimizeDroneRoute, type OptimizeDroneRouteInput, type OptimizeDroneRouteOutput } from '@/ai/flows/optimize-drone-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, MapPinned, Clock, Fuel } from 'lucide-react';

const OptimizeRouteSchema = z.object({
  weatherConditions: z.string().min(10, { message: "Weather conditions must be at least 10 characters." }).max(1000),
  fieldData: z.string().min(10, { message: "Field data must be at least 10 characters." }).max(2000),
});

type OptimizeRouteFormValues = z.infer<typeof OptimizeRouteSchema>;

export default function OptimizeRoutePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<OptimizeDroneRouteOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<OptimizeRouteFormValues>({
    resolver: zodResolver(OptimizeRouteSchema),
    defaultValues: {
      weatherConditions: "",
      fieldData: "",
    },
  });

  const onSubmit: SubmitHandler<OptimizeRouteFormValues> = async (data) => {
    setIsLoading(true);
    setOptimizationResult(null);
    try {
      const result = await optimizeDroneRoute(data);
      setOptimizationResult(result);
      toast({
        title: "Route Optimized Successfully",
        description: "The AI has generated an optimized route plan.",
      });
    } catch (error) {
      console.error("Error optimizing route:", error);
      toast({
        title: "Error Optimizing Route",
        description: "An error occurred while trying to optimize the route. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Wand2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">AI Route Optimization</h1>
      </div>
      <p className="text-muted-foreground">
        Leverage AI to generate optimal spraying routes based on current weather and field specifics.
        This tool helps maximize efficiency and minimize resource consumption.
      </p>

      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Input Data for Optimization</CardTitle>
              <CardDescription>Provide detailed weather and field information for the best results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="weatherConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Weather Conditions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Temp: 25°C, Wind: 5 km/h E, Precipitation: None, Humidity: 60%"
                        className="min-h-[100px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include temperature, wind speed & direction, precipitation, and humidity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fieldData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Data & Constraints</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Field: 'North Paddock', Size: 50 acres, Shape: Rectangular, Obstacles: Power lines on eastern edge, tall trees near south border. Crop: Corn, stage: V5. Target pest: Corn borer."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe field size, shape, terrain, obstacles, crop type, growth stage, and specific spraying requirements.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto shadow-md hover:shadow-lg transition-shadow">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Optimize Route
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {optimizationResult && (
        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
            <CardDescription>AI-generated recommendations for your spraying operation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center mb-2"><MapPinned className="mr-2 h-5 w-5 text-primary" /> Optimized Route Plan</h3>
              <Textarea
                readOnly
                value={optimizationResult.optimizedRoute}
                className="min-h-[150px] resize-y bg-muted/50 font-mono text-sm"
                aria-label="Optimized Route"
              />
               <FormDescription className="mt-1">JSON array of lat/lon coordinates representing waypoints.</FormDescription>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-1"><Clock className="mr-2 h-5 w-5 text-primary" /> Estimated Time</h3>
                <p className="text-muted-foreground">{optimizationResult.estimatedTime}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-1"><Fuel className="mr-2 h-5 w-5 text-primary" /> Product Consumption</h3>
                <p className="text-muted-foreground">{optimizationResult.productConsumption}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
