import { useState } from "react";
import { Plus, Users, MoreVertical, Briefcase, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  assignedStaff: StaffMember[];
  clientId: string;
  startDate: string;
}

const mockStaff: StaffMember[] = [
  { id: "s1", name: "Anita Desai", role: "Senior Accountant" },
  { id: "s2", name: "Ravi Mehta", role: "Tax Consultant" },
  { id: "s3", name: "Sneha Kapoor", role: "Compliance Officer" },
  { id: "s4", name: "Arjun Nair", role: "Financial Analyst" },
  { id: "s5", name: "Meera Joshi", role: "Auditor" },
];

const initialServices: Service[] = [
  {
    id: "srv1",
    name: "GST Filing",
    description: "Monthly GST return filing and compliance",
    status: "active",
    assignedStaff: [mockStaff[0], mockStaff[1]],
    clientId: "1",
    startDate: "Jan 15, 2024",
  },
  {
    id: "srv2",
    name: "Income Tax Returns",
    description: "Annual income tax preparation and filing",
    status: "active",
    assignedStaff: [mockStaff[2]],
    clientId: "1",
    startDate: "Mar 01, 2024",
  },
  {
    id: "srv3",
    name: "Audit Services",
    description: "Quarterly financial audit and reporting",
    status: "active",
    assignedStaff: [mockStaff[4], mockStaff[3]],
    clientId: "1",
    startDate: "Feb 10, 2024",
  },
];

interface ServiceManagementProps {
  clientId: string | null;
}

export function ServiceManagement({ clientId }: ServiceManagementProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [assignStaffOpen, setAssignStaffOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [newService, setNewService] = useState<{
    name: string;
    description: string;
    status: "active" | "inactive";
  }>({
    name: "",
    description: "",
    status: "active",
  });

  const clientServices = services.filter((s) => s.clientId === clientId || clientId === null);

  const handleAddService = () => {
    if (!newService.name) {
      toast({
        title: "Error",
        description: "Service name is required",
        variant: "destructive",
      });
      return;
    }

    const service: Service = {
      id: `srv${Date.now()}`,
      name: newService.name,
      description: newService.description,
      status: newService.status,
      assignedStaff: [],
      clientId: clientId || "1",
      startDate: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "2-digit", 
        year: "numeric" 
      }),
    };

    setServices([...services, service]);
    setNewService({ name: "", description: "", status: "active" });
    setAddServiceOpen(false);
    toast({
      title: "Service Added",
      description: `${service.name} has been added successfully`,
    });
  };

  const handleOpenAssignStaff = (service: Service) => {
    setSelectedService(service);
    setSelectedStaffIds(service.assignedStaff.map((s) => s.id));
    setAssignStaffOpen(true);
  };

  const handleAssignStaff = () => {
    if (!selectedService) return;

    const updatedStaff = mockStaff.filter((s) => selectedStaffIds.includes(s.id));
    const updatedServices = services.map((s) =>
      s.id === selectedService.id ? { ...s, assignedStaff: updatedStaff } : s
    );

    setServices(updatedServices);
    setAssignStaffOpen(false);
    setSelectedService(null);
    toast({
      title: "Staff Assigned",
      description: `${updatedStaff.length} staff member(s) assigned to ${selectedService.name}`,
    });
  };

  const toggleStaffSelection = (staffId: string) => {
    setSelectedStaffIds((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId]
    );
  };

  const removeStaffFromService = (serviceId: string, staffId: string) => {
    const updatedServices = services.map((s) =>
      s.id === serviceId
        ? { ...s, assignedStaff: s.assignedStaff.filter((staff) => staff.id !== staffId) }
        : s
    );
    setServices(updatedServices);
    toast({
      title: "Staff Removed",
      description: "Staff member has been removed from the service",
    });
  };

  if (!clientId) {
    return (
      <Card className="bg-card h-full flex items-center justify-center">
        <CardContent className="text-center py-12">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">No Client Selected</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Select a client to manage their services
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Services</CardTitle>
          <Dialog open={addServiceOpen} onOpenChange={setAddServiceOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Add a new service for this client
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="serviceName">Service Name *</Label>
                  <Input
                    id="serviceName"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="e.g., GST Filing"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="serviceDesc">Description</Label>
                  <Textarea
                    id="serviceDesc"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="Describe the service..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="serviceStatus">Status</Label>
                  <Select
                    value={newService.status}
                    onValueChange={(value: "active" | "inactive") =>
                      setNewService({ ...newService, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddServiceOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddService}>Add Service</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-4">
            {clientServices.map((service) => (
              <div
                key={service.id}
                className="p-4 rounded-lg border border-border bg-muted/30 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{service.name}</h4>
                      <Badge
                        variant={service.status === "active" ? "default" : "secondary"}
                        className={service.status === "active" ? "bg-green-500/10 text-green-500" : ""}
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Started: {service.startDate}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenAssignStaff(service)}>
                        Assign Staff
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Service</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove Service
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Assigned Staff */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Assigned Staff ({service.assignedStaff.length})
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenAssignStaff(service)}
                    >
                      Manage
                    </Button>
                  </div>
                  {service.assignedStaff.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {service.assignedStaff.map((staff) => (
                        <div
                          key={staff.id}
                          className="flex items-center gap-2 px-2 py-1 rounded-full bg-primary/10 text-sm"
                        >
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              {staff.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-foreground">{staff.name}</span>
                          <button
                            onClick={() => removeStaffFromService(service.id, staff.id)}
                            className="hover:bg-destructive/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No staff assigned</p>
                  )}
                </div>
              </div>
            ))}

            {clientServices.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No services added yet</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Assign Staff Dialog */}
      <Dialog open={assignStaffOpen} onOpenChange={setAssignStaffOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Staff</DialogTitle>
            <DialogDescription>
              Select staff members to assign to {selectedService?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {mockStaff.map((staff) => (
                  <div
                    key={staff.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => toggleStaffSelection(staff.id)}
                  >
                    <Checkbox
                      checked={selectedStaffIds.includes(staff.id)}
                      onCheckedChange={() => toggleStaffSelection(staff.id)}
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {staff.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignStaffOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignStaff}>
              Assign ({selectedStaffIds.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
