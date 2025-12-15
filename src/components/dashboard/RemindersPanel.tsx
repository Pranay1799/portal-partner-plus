import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, CheckCircle2, Clock } from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  dueDate: string;
  type: "deadline" | "meeting" | "document" | "payment";
  priority: "high" | "medium" | "low";
  status: "pending" | "acknowledged";
  service: string;
}

const mockReminders: Reminder[] = [
  {
    id: "1",
    title: "GST Return Filing - Q4 2024",
    dueDate: "2024-03-15",
    type: "deadline",
    priority: "high",
    status: "pending",
    service: "Tax Compliance"
  },
  {
    id: "2",
    title: "Monthly MIS Review Meeting",
    dueDate: "2024-03-10",
    type: "meeting",
    priority: "medium",
    status: "pending",
    service: "CFO Services"
  },
  {
    id: "3",
    title: "Upload Bank Statements - February",
    dueDate: "2024-03-08",
    type: "document",
    priority: "medium",
    status: "acknowledged",
    service: "Accounting"
  },
  {
    id: "4",
    title: "TDS Payment Due",
    dueDate: "2024-03-07",
    type: "payment",
    priority: "high",
    status: "pending",
    service: "Tax Compliance"
  }
];

export const RemindersPanel = () => {
  const getTypeIcon = (type: Reminder["type"]) => {
    switch (type) {
      case "deadline":
        return Clock;
      case "meeting":
        return Calendar;
      case "document":
        return Bell;
      case "payment":
        return CheckCircle2;
    }
  };

  const getPriorityColor = (priority: Reminder["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-info/10 text-info border-info/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Auto Reminders & Alerts
          </CardTitle>
          <Badge variant="outline">{mockReminders.filter(r => r.status === "pending").length} Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockReminders.map((reminder) => {
          const TypeIcon = getTypeIcon(reminder.type);
          return (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border ${reminder.status === "pending" ? "bg-card" : "bg-muted/30"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${getPriorityColor(reminder.priority)}`}>
                    <TypeIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm text-foreground">{reminder.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{reminder.service}</span>
                      <span>•</span>
                      <span>Due: {new Date(reminder.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {reminder.status === "pending" ? (
                    <>
                      <Button size="sm" variant="ghost">Snooze</Button>
                      <Button size="sm">Acknowledge</Button>
                    </>
                  ) : (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Acknowledged
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
