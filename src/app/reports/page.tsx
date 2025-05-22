import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartBig } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <BarChartBig className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Visualização de Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">A funcionalidade de relatórios detalhados será implementada aqui.</p>
          <div className="h-64 bg-muted rounded-md flex items-center justify-center mt-4">
            <BarChartBig className="h-16 w-16 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
