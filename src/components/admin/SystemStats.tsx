import { Users, FileText, Ticket, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Clients",
    value: "24",
    change: "+3 this month",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Active Tasks",
    value: "156",
    change: "12 pending review",
    icon: Activity,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Documents",
    value: "1,234",
    change: "+45 this week",
    icon: FileText,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Open Tickets",
    value: "18",
    change: "5 high priority",
    icon: Ticket,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Revenue",
    value: "₹4.2L",
    change: "+12% from last month",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

export function SystemStats() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">System Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
