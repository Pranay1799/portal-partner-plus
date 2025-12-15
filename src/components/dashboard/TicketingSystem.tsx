import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "high" | "medium" | "low";
  createdAt: string;
  lastUpdate: string;
  assignedTo: string;
}

const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Need clarification on Invoice #INV-2024-034",
    category: "Accounting",
    status: "open",
    priority: "high",
    createdAt: "2024-03-05",
    lastUpdate: "2024-03-05",
    assignedTo: "Priya Sharma"
  },
  {
    id: "TKT-002",
    subject: "Request for updated MIS report format",
    category: "CFO Services",
    status: "in-progress",
    priority: "medium",
    createdAt: "2024-03-03",
    lastUpdate: "2024-03-04",
    assignedTo: "Amit Kumar"
  },
  {
    id: "TKT-003",
    subject: "GST compliance query for new project",
    category: "Tax Compliance",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-03-01",
    lastUpdate: "2024-03-03",
    assignedTo: "Neha Verma"
  }
];

export const TicketingSystem = () => {
  const getStatusConfig = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return { icon: AlertCircle, color: "bg-warning/10 text-warning border-warning/20", label: "Open" };
      case "in-progress":
        return { icon: Clock, color: "bg-info/10 text-info border-info/20", label: "In Progress" };
      case "resolved":
        return { icon: CheckCircle2, color: "bg-success/10 text-success border-success/20", label: "Resolved" };
      case "closed":
        return { icon: CheckCircle2, color: "bg-muted text-muted-foreground border-border", label: "Closed" };
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Query Ticketing System
          </CardTitle>
          <Button size="sm">New Ticket</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTickets.map((ticket) => {
          const statusConfig = getStatusConfig(ticket.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={ticket.id} className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                    <Badge variant="outline" className={statusConfig.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </div>
                  <p className="font-medium text-foreground">{ticket.subject}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Assigned to: {ticket.assignedTo}</span>
                    <span>•</span>
                    <span>Last updated: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 text-center">
          <Button variant="ghost" size="sm">View All Tickets</Button>
        </div>
      </CardContent>
    </Card>
  );
};
