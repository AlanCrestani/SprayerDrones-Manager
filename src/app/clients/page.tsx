import type { Client as ClientType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Edit, Trash2, Mail, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const placeholderClients: ClientType[] = [
  { id: "client-001", name: "Green Acres Farm", contactPerson: "John Farmer", email: "john@greenacres.com", phone: "555-1234", address: "123 Farm Rd, Countryside", serviceHistorySummary: "5 services completed" },
  { id: "client-002", name: "Sunshine Orchards", contactPerson: "Alice Orchard", email: "alice@sunshine.com", phone: "555-5678", address: "456 Orchard Ln, Fruit Valley", serviceHistorySummary: "3 services, 1 pending" },
  { id: "client-003", name: "Valley Vineyards", contactPerson: "Robert Vintner", email: "robert@valleyvin.com", phone: "555-8765", address: "789 Winery Ave, Wine Region", serviceHistorySummary: "10 services completed" },
  { id: "client-004", name: "Prairie Fields Co.", contactPerson: "Sarah Plains", email: "sarah@prairiefields.com", phone: "555-4321", address: "101 Prairie Dr, Grassland", serviceHistorySummary: "New client, 1 scheduled" },
];

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
        <Button className="shadow-md hover:shadow-lg transition-shadow">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Client
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Client List</CardTitle>
          <CardDescription>Manage your agricultural clients and their service history.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Service History</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placeholderClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://placehold.co/100x100.png?text=${client.name.charAt(0)}`} alt={client.name} data-ai-hint="logo company" />
                        <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{client.contactPerson}</TableCell>
                  <TableCell>
                    <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline" asChild>
                      <a href={`mailto:${client.email}`}><Mail className="mr-1 h-4 w-4" /> {client.email}</a>
                    </Button>
                  </TableCell>
                  <TableCell>
                     <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline" asChild>
                      <a href={`tel:${client.phone}`}><Phone className="mr-1 h-4 w-4" /> {client.phone}</a>
                    </Button>
                  </TableCell>
                  <TableCell>{client.serviceHistorySummary}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Client</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                           <Trash2 className="mr-2 h-4 w-4" /> Delete Client
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
