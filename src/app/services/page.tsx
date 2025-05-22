import type { ServiceReport as ServiceReportType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, FileText, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const placeholderServiceReports: ServiceReportType[] = [
  { id: "sr-001", date: "2024-07-15", clientId: "client-001", clientName: "Green Acres Farm", droneId: "drone-001", droneModel: "DJI Agras T40", areaCovered: 50, productConsumed: 100, notes: "Standard treatment for corn fields." },
  { id: "sr-002", date: "2024-07-18", clientId: "client-002", clientName: "Sunshine Orchards", droneId: "drone-004", droneModel: "Autel Dragonfish", areaCovered: 30, productConsumed: 60, notes: "Pest control for apple trees." },
  { id: "sr-003", date: "2024-07-20", clientId: "client-003", clientName: "Valley Vineyards", droneId: "drone-001", droneModel: "DJI Agras T40", areaCovered: 75, productConsumed: 150, notes: "Fungicide application for grapevines." },
  { id: "sr-004", date: "2024-07-22", clientId: "client-001", clientName: "Green Acres Farm", droneId: "drone-001", droneModel: "DJI Agras T40", areaCovered: 25, productConsumed: 50, notes: "Follow-up spot treatment." },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Service Reports</h1>
        <Button className="shadow-md hover:shadow-lg transition-shadow">
          <PlusCircle className="mr-2 h-5 w-5" /> Generate New Report
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Completed Services</CardTitle>
          <CardDescription>Detailed records of all drone spraying services.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Drone</TableHead>
                <TableHead>Area (acres)</TableHead>
                <TableHead>Product (L/kg)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placeholderServiceReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/50">
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{report.clientName || report.clientId}</TableCell>
                  <TableCell>{report.droneModel || report.droneId}</TableCell>
                  <TableCell>{report.areaCovered.toFixed(2)}</TableCell>
                  <TableCell>{report.productConsumed.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> View Report</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Report</DropdownMenuItem>
                        <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Download PDF</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
