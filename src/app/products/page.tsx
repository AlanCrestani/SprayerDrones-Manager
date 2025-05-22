import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Archive className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Produtos</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">A funcionalidade de gerenciamento de produtos será implementada aqui.</p>
          <div className="h-64 bg-muted rounded-md flex items-center justify-center mt-4">
            <Archive className="h-16 w-16 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
