import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Users, CheckCircle2, BarChart3 } from "lucide-react"; // Changed Drone to Rocket

const stats = [
  { title: "Active Drones", value: "12", icon: Rocket, change: "+2 this week" }, // Changed Drone to Rocket
  { title: "Total Clients", value: "45", icon: Users, change: "+5 new" },
  { title: "Services Completed", value: "128", icon: CheckCircle2, change: "+15 this month" },
  { title: "Upcoming Services", value: "8", icon: BarChart3, change: "View Schedule" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground pt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Activity feed or recent service chart will be displayed here.</p>
            <div className="h-64 bg-muted rounded-md flex items-center justify-center mt-4">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">Drone #A12 maintenance due.</li>
              <li className="text-sm text-muted-foreground">New client 'FarmFresh Ltd.' added.</li>
              <li className="text-sm text-muted-foreground">Service for 'Green Acres' completed.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
