import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { UploadDialog } from "./UploadDialog";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "overdue" | "completed";
  service: string;
}

const mockTasks: Task[] = [
  { id: "1", title: "Annual Report 2024", dueDate: "2024-01-15", status: "pending", service: "Accounting" },
  { id: "2", title: "Tax Filing Q4", dueDate: "2024-01-10", status: "overdue", service: "Tax Services" },
  { id: "3", title: "Invoice Processing", dueDate: "2024-01-20", status: "pending", service: "Billing" },
  { id: "4", title: "Budget Review", dueDate: "2024-01-05", status: "completed", service: "Finance" },
];

const getStatusConfig = (status: Task["status"]) => {
  switch (status) {
    case "pending":
      return { icon: Clock, color: "bg-yellow-500/10 text-yellow-600", text: "Pending" };
    case "overdue":
      return { icon: AlertCircle, color: "bg-red-500/10 text-red-600", text: "Overdue" };
    case "completed":
      return { icon: CheckCircle, color: "bg-green-500/10 text-green-600", text: "Completed" };
  }
};

export const UploadSection = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Section
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockTasks.map((task) => {
            const statusConfig = getStatusConfig(task.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={statusConfig.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig.text}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setUploadDialogOpen(true)}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <UploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
    </>
  );
};
