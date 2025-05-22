import type { Drone as DroneType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, BatteryCharging, MapPin, PenToolIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const placeholderDrones: DroneType[] = [
  { id: "drone-001", model: "DJI Agras T40", status: "Active", lastMaintenanceDate: "2024-05-15", batteryLevel: 85, currentLocation: { lat: 34.0522, lng: -118.2437 } },
  { id: "drone-002", model: "XAG P100 Pro", status: "Maintenance", lastMaintenanceDate: "2024-06-01", batteryLevel: 0, currentLocation: { lat: 36.7783, lng: -119.4179 } },
  { id: "drone-003", model: "DJI Agras T20P", status: "Inactive", lastMaintenanceDate: "2024-03-20", batteryLevel: 60, currentLocation: { lat: 40.7128, lng: -74.0060 } },
  { id: "drone-004", model: "Autel Dragonfish", status: "Active", lastMaintenanceDate: "2024-06-10", batteryLevel: 95, currentLocation: { lat: 30.2672, lng: -97.7431 } },
];

export default function DronesPage() {
  const getStatusBadgeVariant = (status: DroneType["status"]) => {
    switch (status) {
      case "Active": return "default";
      case "Inactive": return "secondary";
      case "Maintenance": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Drone Management</h1>
        <Button className="shadow-md hover:shadow-lg transition-shadow">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Drone
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Drone Fleet</CardTitle>
          <CardDescription>Overview of all drones in your fleet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placeholderDrones.map((drone) => (
                <TableRow key={drone.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{drone.model}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(drone.status)} className="capitalize">
                      {drone.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <BatteryCharging className={`h-5 w-5 ${drone.batteryLevel && drone.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'}`} /> 
                       {drone.batteryLevel !== undefined ? `${drone.batteryLevel}%` : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(drone.lastMaintenanceDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {drone.currentLocation ? (
                      <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline">
                        <MapPin className="mr-1 h-4 w-4" /> View Map
                      </Button>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Details</DropdownMenuItem>
                        <DropdownMenuItem><PenToolIcon className="mr-2 h-4 w-4" /> Schedule Maintenance</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Drone
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
