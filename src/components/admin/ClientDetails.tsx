import { 
  User, 
  Mail, 
  Building2, 
  Phone, 
  Calendar, 
  FileText, 
  Ticket,
  TrendingUp,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface ClientDetailsProps {
  clientId: string | null;
}

const mockClientDetails = {
  id: "1",
  name: "Rajesh Kumar",
  email: "rajesh@techcorp.com",
  phone: "+91 98765 43210",
  company: "TechCorp Solutions",
  joinedDate: "Jan 15, 2024",
  status: "active",
  plan: "Business",
  tasks: {
    total: 12,
    completed: 8,
    pending: 3,
    overdue: 1,
  },
  documents: 24,
  tickets: {
    open: 2,
    resolved: 15,
  },
  recentActivity: [
    { action: "Uploaded document", time: "2 hours ago", type: "document" },
    { action: "Created new ticket", time: "5 hours ago", type: "ticket" },
    { action: "Completed task", time: "1 day ago", type: "task" },
    { action: "Updated profile", time: "2 days ago", type: "profile" },
  ],
  momTasks: [
    { title: "Review Q4 Financial Report", status: "pending", dueDate: "Dec 30, 2024" },
    { title: "Submit GST Returns", status: "completed", dueDate: "Dec 28, 2024" },
    { title: "Annual Compliance Filing", status: "overdue", dueDate: "Dec 25, 2024" },
  ],
};

export function ClientDetails({ clientId }: ClientDetailsProps) {
  if (!clientId) {
    return (
      <Card className="bg-card h-full flex items-center justify-center">
        <CardContent className="text-center py-12">
          <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">No Client Selected</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Select a client from the list to view their details
          </p>
        </CardContent>
      </Card>
    );
  }

  const client = mockClientDetails;
  const taskProgress = (client.tasks.completed / client.tasks.total) * 100;

  return (
    <Card className="bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {client.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{client.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{client.company}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                <Badge variant="outline">{client.plan} Plan</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm">Message</Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Contact Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined {client.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-lg font-semibold">{client.documents}</p>
                      <p className="text-xs text-muted-foreground">Documents</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <Ticket className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-lg font-semibold">{client.tickets.open}</p>
                      <p className="text-xs text-muted-foreground">Open Tickets</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Progress */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Task Progress</h4>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {client.tasks.completed} of {client.tasks.total} tasks completed
                  </span>
                  <span className="text-sm font-medium">{Math.round(taskProgress)}%</span>
                </div>
                <Progress value={taskProgress} className="h-2" />
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="text-green-500">✓ {client.tasks.completed} Completed</span>
                  <span className="text-yellow-500">○ {client.tasks.pending} Pending</span>
                  <span className="text-red-500">! {client.tasks.overdue} Overdue</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Mom Tasks</h4>
            <div className="space-y-2">
              {client.momTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={task.status === "completed" ? "default" : task.status === "overdue" ? "destructive" : "secondary"}
                    className={task.status === "completed" ? "bg-green-500/10 text-green-500" : ""}
                  >
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Recent Activity</h4>
            <div className="space-y-3">
              {client.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
