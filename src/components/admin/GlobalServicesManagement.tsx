import { useState } from "react";
import { Plus, Users, MoreVertical, Briefcase, X, Edit, Trash2 } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface GlobalService {
  id: string;
  name: string;
  description: string;
  assignedStaff: StaffMember[];
}

// Mock staff data - in production this would come from database
export const mockStaff: StaffMember[] = [
  { id: "s1", name: "Anita Desai", role: "Senior Accountant" },
  { id: "s2", name: "Ravi Mehta", role: "Tax Consultant" },
  { id: "s3", name: "Sneha Kapoor", role: "Compliance Officer" },
  { id: "s4", name: "Arjun Nair", role: "Financial Analyst" },
  { id: "s5", name: "Meera Joshi", role: "Auditor" },
];

// Global services with their assigned staff
export const initialGlobalServices: GlobalService[] = [
  {
    id: "srv1",
    name: "GST Filing",
    description: "Monthly GST return filing and compliance",
    assignedStaff: [mockStaff[0], mockStaff[1]],
  },
  {
    id: "srv2",
    name: "Income Tax Returns",
    description: "Annual income tax preparation and filing",
    assignedStaff: [mockStaff[2]],
  },
  {
    id: "srv3",
    name: "Audit Services",
    description: "Quarterly financial audit and reporting",
    assignedStaff: [mockStaff[4], mockStaff[3]],
  },
  {
    id: "srv4",
    name: "Bookkeeping",
    description: "Day-to-day financial transaction recording",
    assignedStaff: [mockStaff[0]],
  },
  {
    id: "srv5",
    name: "Payroll Management",
    description: "Employee salary processing and compliance",
    assignedStaff: [mockStaff[3], mockStaff[2]],
  },
];

export function GlobalServicesManagement() {
  const [services, setServices] = useState<GlobalService[]>(initialGlobalServices);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [assignStaffOpen, setAssignStaffOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<GlobalService | null>(null);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
  });

  const handleAddService = () => {
    if (!newService.name) {
      toast({
        title: "Error",
        description: "Service name is required",
        variant: "destructive",
      });
      return;
    }

    const service: GlobalService = {
      id: `srv${Date.now()}`,
      name: newService.name,
      description: newService.description,
      assignedStaff: [],
    };

    setServices([...services, service]);
    setNewService({ name: "", description: "" });
    setAddServiceOpen(false);
    toast({
      title: "Service Created",
      description: `${service.name} has been created. You can now assign staff to it.`,
    });
  };

  const handleOpenAssignStaff = (service: GlobalService) => {
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

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((s) => s.id !== serviceId));
    toast({
      title: "Service Deleted",
      description: "Service has been removed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Services Management</h2>
          <p className="text-muted-foreground">
            Define your services and assign staff members responsible for each
          </p>
        </div>
        <Dialog open={addServiceOpen} onOpenChange={setAddServiceOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Service</DialogTitle>
              <DialogDescription>
                Add a new service that clients can subscribe to
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddServiceOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>Create Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem onClick={() => handleOpenAssignStaff(service)}>
                      <Users className="h-4 w-4 mr-2" />
                      Assign Staff
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Service
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Service
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <Card className="bg-card">
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">No Services Created</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first service to get started
            </p>
          </CardContent>
        </Card>
      )}

      {/* Assign Staff Dialog */}
      <Dialog open={assignStaffOpen} onOpenChange={setAssignStaffOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Staff to {selectedService?.name}</DialogTitle>
            <DialogDescription>
              Select the staff members responsible for this service
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
    </div>
  );
}
