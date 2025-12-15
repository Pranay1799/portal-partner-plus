import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "overdue" | "completed";
  service: string;
}

const mockTasks: Task[] = [
  { id: "1", title: "Upload September Bank Statements", dueDate: "Today", status: "overdue", service: "CFO Services" },
  { id: "2", title: "Review Monthly MIS Report", dueDate: "Dec 18", status: "pending", service: "CFO Services" },
  { id: "3", title: "Approve Q2 Financial Statements", dueDate: "Dec 20", status: "pending", service: "Accounting" },
  { id: "4", title: "Sign Tax Return Documents", dueDate: "Dec 22", status: "pending", service: "Tax Advisory" },
];

export const TaskList = () => {
  const getStatusConfig = (status: Task["status"]) => {
    switch (status) {
      case "overdue":
        return { icon: AlertCircle, color: "destructive", text: "Overdue" };
      case "completed":
        return { icon: CheckCircle2, color: "success", text: "Completed" };
      default:
        return { icon: Clock, color: "info", text: "Pending" };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTasks.map((task) => {
          const status = getStatusConfig(task.status);
          const StatusIcon = status.icon;
          
          return (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <StatusIcon className={`h-5 w-5 mt-0.5 text-${status.color}`} />
                <div className="space-y-1 flex-1">
                  <p className="font-medium text-foreground">{task.title}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {task.service}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="ml-4">
                View
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
