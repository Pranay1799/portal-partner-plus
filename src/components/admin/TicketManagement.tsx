import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Ticket, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  Send
} from "lucide-react";

interface TicketType {
  id: string;
  ticketNumber: string;
  subject: string;
  clientName: string;
  clientId: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdAt: string;
  lastUpdated: string;
  messages: {
    id: string;
    sender: string;
    senderType: "client" | "admin";
    message: string;
    timestamp: string;
  }[];
}

const initialTickets: TicketType[] = [
  {
    id: "1",
    ticketNumber: "TKT-001",
    subject: "GST Filing Query",
    clientName: "ABC Corporation",
    clientId: "client-1",
    status: "open",
    priority: "high",
    category: "GST",
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-15",
    messages: [
      {
        id: "m1",
        sender: "ABC Corporation",
        senderType: "client",
        message: "I have a question about my GST filing for Q4. The portal is showing an error.",
        timestamp: "2024-01-15 10:30 AM"
      }
    ]
  },
  {
    id: "2",
    ticketNumber: "TKT-002",
    subject: "Income Tax Return Status",
    clientName: "XYZ Industries",
    clientId: "client-2",
    status: "in-progress",
    priority: "medium",
    category: "Income Tax",
    createdAt: "2024-01-14",
    lastUpdated: "2024-01-15",
    messages: [
      {
        id: "m1",
        sender: "XYZ Industries",
        senderType: "client",
        message: "Can you provide an update on my ITR filing?",
        timestamp: "2024-01-14 02:00 PM"
      },
      {
        id: "m2",
        sender: "Admin",
        senderType: "admin",
        message: "Your ITR is being processed. We need some additional documents.",
        timestamp: "2024-01-15 09:00 AM"
      }
    ]
  },
  {
    id: "3",
    ticketNumber: "TKT-003",
    subject: "Document Request",
    clientName: "PQR Services",
    clientId: "client-3",
    status: "resolved",
    priority: "low",
    category: "Documents",
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-12",
    messages: [
      {
        id: "m1",
        sender: "PQR Services",
        senderType: "client",
        message: "Please send me a copy of last year's audit report.",
        timestamp: "2024-01-10 11:00 AM"
      },
      {
        id: "m2",
        sender: "Admin",
        senderType: "admin",
        message: "The audit report has been uploaded to your documents section.",
        timestamp: "2024-01-12 03:00 PM"
      }
    ]
  }
];

export function TicketManagement() {
  const [tickets, setTickets] = useState<TicketType[]>(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

  const getStatusConfig = (status: TicketType["status"]) => {
    switch (status) {
      case "open":
        return { icon: AlertCircle, color: "bg-blue-500/10 text-blue-500 border-blue-500/20", label: "Open" };
      case "in-progress":
        return { icon: Clock, color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", label: "In Progress" };
      case "resolved":
        return { icon: CheckCircle2, color: "bg-green-500/10 text-green-500 border-green-500/20", label: "Resolved" };
      case "closed":
        return { icon: CheckCircle2, color: "bg-muted text-muted-foreground border-muted", label: "Closed" };
    }
  };

  const getPriorityColor = (priority: TicketType["priority"]) => {
    switch (priority) {
      case "urgent": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "high": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "low": return "bg-green-500/10 text-green-500 border-green-500/20";
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendReply = () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    const newMessage = {
      id: `m${Date.now()}`,
      sender: "Admin",
      senderType: "admin" as const,
      message: replyMessage,
      timestamp: new Date().toLocaleString()
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === selectedTicket.id
        ? { 
            ...ticket, 
            messages: [...ticket.messages, newMessage],
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : ticket
    ));

    setSelectedTicket(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage]
    } : null);

    setReplyMessage("");
  };

  const handleStatusChange = (ticketId: string, newStatus: TicketType["status"]) => {
    setTickets(prev => prev.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : ticket
    ));

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Ticket Management</h2>
          <p className="text-muted-foreground">Manage and respond to client support tickets</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Support Tickets ({filteredTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket #</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => {
                const statusConfig = getStatusConfig(ticket.status);
                return (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-sm">{ticket.ticketNumber}</TableCell>
                    <TableCell className="font-medium">{ticket.subject}</TableCell>
                    <TableCell>{ticket.clientName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusConfig.color}>
                        <statusConfig.icon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{ticket.lastUpdated}</TableCell>
                    <TableCell>
                      <Dialog open={isTicketDialogOpen && selectedTicket?.id === ticket.id} onOpenChange={(open) => {
                        setIsTicketDialogOpen(open);
                        if (open) setSelectedTicket(ticket);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <span className="font-mono text-sm text-muted-foreground">{ticket.ticketNumber}</span>
                              <span>{ticket.subject}</span>
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="flex items-center gap-4 py-2 border-b">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Client:</span>{" "}
                              <span className="font-medium">{ticket.clientName}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Category:</span>{" "}
                              <span className="font-medium">{ticket.category}</span>
                            </div>
                            <Select 
                              value={selectedTicket?.status || ticket.status} 
                              onValueChange={(value) => handleStatusChange(ticket.id, value as TicketType["status"])}
                            >
                              <SelectTrigger className="w-[140px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Messages */}
                          <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[200px] max-h-[300px]">
                            {(selectedTicket?.messages || ticket.messages).map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex ${msg.senderType === "admin" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[80%] rounded-lg p-3 ${
                                    msg.senderType === "admin"
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted"
                                  }`}
                                >
                                  <div className="text-xs opacity-70 mb-1">{msg.sender} • {msg.timestamp}</div>
                                  <p className="text-sm">{msg.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Reply Input */}
                          <div className="flex gap-2 pt-4 border-t">
                            <Textarea
                              placeholder="Type your reply..."
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              className="flex-1 min-h-[80px]"
                            />
                            <Button onClick={handleSendReply} className="self-end">
                              <Send className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
