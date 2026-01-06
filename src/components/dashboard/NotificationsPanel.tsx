import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  AlertTriangle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "ticket" | "document";
  read: boolean;
  createdAt: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Ticket Response",
    message: "Your ticket TKT-001 has been responded to by Priya Sharma",
    type: "ticket",
    read: false,
    createdAt: "2024-03-05T10:30:00"
  },
  {
    id: "2",
    title: "Document Uploaded",
    message: "New invoice document has been uploaded to your account",
    type: "document",
    read: false,
    createdAt: "2024-03-05T09:15:00"
  },
  {
    id: "3",
    title: "GST Filing Reminder",
    message: "Your GST filing is due in 5 days. Please prepare the documents.",
    type: "warning",
    read: false,
    createdAt: "2024-03-04T14:00:00"
  },
  {
    id: "4",
    title: "Service Activated",
    message: "CFO Services has been activated for your account",
    type: "success",
    read: true,
    createdAt: "2024-03-03T11:20:00"
  },
  {
    id: "5",
    title: "New Article Published",
    message: "Check out our latest article on Tax Planning for FY 2024-25",
    type: "info",
    read: true,
    createdAt: "2024-03-02T16:45:00"
  }
];

export const NotificationsPanel = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "ticket":
        return <MessageSquare className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "ticket":
        return "bg-info/10 text-info";
      case "document":
        return "bg-primary/10 text-primary";
      case "warning":
        return "bg-warning/10 text-warning";
      case "success":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <Card 
        className="fixed right-4 top-20 w-96 max-h-[80vh] shadow-lg border"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[60vh]">
            <div className="space-y-1 p-4 pt-0">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 rounded-lg border transition-colors cursor-pointer hover:bg-accent/5",
                    !notification.read && "bg-accent/10 border-primary/20"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full shrink-0",
                      getNotificationColor(notification.type)
                    )}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={cn(
                          "font-medium text-sm truncate",
                          !notification.read && "text-foreground",
                          notification.read && "text-muted-foreground"
                        )}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatDate(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
