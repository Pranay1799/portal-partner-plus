import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Send, ExternalLink } from "lucide-react";

interface Communication {
  id: string;
  channel: "email" | "whatsapp";
  subject: string;
  sender: string;
  preview: string;
  timestamp: string;
  status: "unread" | "read" | "replied";
  category: string;
}

const mockCommunications: Communication[] = [
  {
    id: "1",
    channel: "email",
    subject: "Monthly Financial Report - February 2024",
    sender: "ATMS CFO Services",
    preview: "Please find attached your monthly financial report for February 2024...",
    timestamp: "2024-03-05T10:30:00",
    status: "unread",
    category: "CFO Services"
  },
  {
    id: "2",
    channel: "whatsapp",
    subject: "Reminder: GST Filing Due Tomorrow",
    sender: "ATMS Tax Team",
    preview: "This is a reminder that your GST filing is due tomorrow. Please ensure...",
    timestamp: "2024-03-04T15:45:00",
    status: "read",
    category: "Tax Compliance"
  },
  {
    id: "3",
    channel: "email",
    subject: "Document Upload Request",
    sender: "ATMS Accounting",
    preview: "We need the following documents for completing your accounts...",
    timestamp: "2024-03-03T09:20:00",
    status: "replied",
    category: "Accounting"
  },
  {
    id: "4",
    channel: "whatsapp",
    subject: "Meeting Confirmation - 10th March",
    sender: "ATMS Support",
    preview: "Your quarterly review meeting is confirmed for 10th March at 2 PM...",
    timestamp: "2024-03-02T14:00:00",
    status: "read",
    category: "General"
  }
];

export const CommunicationsPanel = () => {
  const getChannelIcon = (channel: Communication["channel"]) => {
    return channel === "email" ? Mail : MessageCircle;
  };

  const getStatusColor = (status: Communication["status"]) => {
    switch (status) {
      case "unread":
        return "bg-primary/10 text-primary border-primary/20";
      case "read":
        return "bg-muted text-muted-foreground border-border";
      case "replied":
        return "bg-success/10 text-success border-success/20";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Communications Hub
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{mockCommunications.filter(c => c.status === "unread").length} Unread</Badge>
            <Button size="sm" variant="outline">
              <ExternalLink className="h-3 w-3 mr-1" />
              View All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockCommunications.map((comm) => {
          const ChannelIcon = getChannelIcon(comm.channel);
          
          return (
            <div 
              key={comm.id} 
              className={`p-4 rounded-lg border transition-colors ${
                comm.status === "unread" ? "bg-primary/5 border-primary/20" : "bg-card"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${comm.channel === "email" ? "bg-info/10 text-info" : "bg-success/10 text-success"}`}>
                  <ChannelIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{comm.subject}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{comm.sender}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{formatTimestamp(comm.timestamp)}</span>
                      <Badge variant="outline" className={getStatusColor(comm.status)}>
                        {comm.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-2">{comm.preview}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{comm.category}</Badge>
                    {comm.status === "unread" && (
                      <Button size="sm" variant="ghost" className="h-6 text-xs">
                        Reply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
