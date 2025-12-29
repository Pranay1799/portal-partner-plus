import { useState } from "react";
import { Search, MoreVertical, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddClientDialog } from "./AddClientDialog";
interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "active" | "inactive" | "pending";
  activeTasks: number;
  lastActive: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@techcorp.com",
    company: "TechCorp Solutions",
    status: "active",
    activeTasks: 4,
    lastActive: "2 mins ago",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@innovate.io",
    company: "Innovate Labs",
    status: "active",
    activeTasks: 7,
    lastActive: "15 mins ago",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@startuphub.in",
    company: "StartupHub",
    status: "pending",
    activeTasks: 2,
    lastActive: "1 hour ago",
  },
  {
    id: "4",
    name: "Sunita Reddy",
    email: "sunita@globalventures.com",
    company: "Global Ventures",
    status: "inactive",
    activeTasks: 0,
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram@financeplus.in",
    company: "Finance Plus",
    status: "active",
    activeTasks: 5,
    lastActive: "30 mins ago",
  },
];

interface ClientsOverviewProps {
  onSelectClient: (clientId: string | null) => void;
  selectedClient: string | null;
}

export function ClientsOverview({ onSelectClient, selectedClient }: ClientsOverviewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-400";
      case "pending":
        return "bg-yellow-500";
    }
  };

  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return <Badge variant="default" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>;
    }
  };

  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Clients</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{mockClients.length} total</Badge>
            <AddClientDialog />
          </div>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-1 p-2">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => onSelectClient(client.id === selectedClient ? null : client.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                  selectedClient === client.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {client.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Circle
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                        getStatusColor(client.status)
                      )}
                      fill="currentColor"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-muted-foreground">{client.activeTasks} tasks</p>
                    <p className="text-xs text-muted-foreground">{client.lastActive}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Client</DropdownMenuItem>
                      <DropdownMenuItem>View Tasks</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
