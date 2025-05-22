import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Opções de Configuração</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">As configurações da aplicação serão gerenciadas aqui.</p>
          <div className="h-64 bg-muted rounded-md flex items-center justify-center mt-4">
            <SettingsIcon className="h-16 w-16 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
