import { 
  FileText, 
  Ticket, 
  CheckCircle, 
  Upload, 
  UserPlus,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "document" | "ticket" | "task" | "user" | "message" | "alert";
  action: string;
  client: string;
  time: string;
  priority?: "high" | "medium" | "low";
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "document",
    action: "Uploaded GST Return Q3",
    client: "Rajesh Kumar",
    time: "2 mins ago",
  },
  {
    id: "2",
    type: "ticket",
    action: "Created support ticket #1234",
    client: "Priya Sharma",
    time: "15 mins ago",
    priority: "high",
  },
  {
    id: "3",
    type: "task",
    action: "Completed Annual Filing task",
    client: "Amit Patel",
    time: "30 mins ago",
  },
  {
    id: "4",
    type: "user",
    action: "New client registered",
    client: "Neha Gupta",
    time: "1 hour ago",
  },
  {
    id: "5",
    type: "message",
    action: "Sent message regarding invoice",
    client: "Vikram Singh",
    time: "2 hours ago",
  },
  {
    id: "6",
    type: "alert",
    action: "Payment overdue reminder sent",
    client: "Sunita Reddy",
    time: "3 hours ago",
    priority: "medium",
  },
  {
    id: "7",
    type: "document",
    action: "Downloaded Balance Sheet 2024",
    client: "Rajesh Kumar",
    time: "4 hours ago",
  },
  {
    id: "8",
    type: "ticket",
    action: "Resolved ticket #1230",
    client: "Priya Sharma",
    time: "5 hours ago",
  },
];

interface ActivityLogProps {
  fullView?: boolean;
}

export function ActivityLog({ fullView = false }: ActivityLogProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />;
      case "ticket":
        return <Ticket className="h-4 w-4" />;
      case "task":
        return <CheckCircle className="h-4 w-4" />;
      case "user":
        return <UserPlus className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "alert":
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "document":
        return "bg-blue-500/10 text-blue-500";
      case "ticket":
        return "bg-orange-500/10 text-orange-500";
      case "task":
        return "bg-green-500/10 text-green-500";
      case "user":
        return "bg-purple-500/10 text-purple-500";
      case "message":
        return "bg-cyan-500/10 text-cyan-500";
      case "alert":
        return "bg-red-500/10 text-red-500";
    }
  };

  const getPriorityBadge = (priority?: Activity["priority"]) => {
    if (!priority) return null;
    
    const colors = {
      high: "bg-red-500/10 text-red-500",
      medium: "bg-yellow-500/10 text-yellow-600",
      low: "bg-green-500/10 text-green-500",
    };

    return (
      <Badge variant="outline" className={cn("text-xs", colors[priority])}>
        {priority}
      </Badge>
    );
  };

  const displayActivities = fullView ? mockActivities : mockActivities.slice(0, 5);

  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          {!fullView && (
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={fullView ? "h-[600px]" : "h-[350px]"}>
          <div className="space-y-1 p-2">
            {displayActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                  getActivityColor(activity.type)
                )}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.client}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getPriorityBadge(activity.priority)}
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
