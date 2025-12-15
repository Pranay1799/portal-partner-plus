import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, FileText, Scale, Shield, CheckCircle2 } from "lucide-react";

interface Service {
  id: string;
  name: string;
  status: "active" | "inactive";
  icon: typeof Briefcase;
  description: string;
}

const activeServices: Service[] = [
  { id: "1", name: "CFO Services", status: "active", icon: TrendingUp, description: "Monthly MIS & strategic planning" },
  { id: "2", name: "Accounting", status: "active", icon: FileText, description: "Bookkeeping & financial reporting" },
  { id: "3", name: "Tax Advisory", status: "active", icon: Briefcase, description: "Tax planning & compliance" },
];

const availableServices: Service[] = [
  { id: "4", name: "Legal Services", status: "inactive", icon: Scale, description: "Contract drafting & legal advisory" },
  { id: "5", name: "Audit Services", status: "inactive", icon: CheckCircle2, description: "Internal & external audit support" },
  { id: "6", name: "Secretarial", status: "inactive", icon: Shield, description: "Company secretary & compliance" },
];

export const ServiceOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Services</h3>
          {activeServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-success/5 border-success/20"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Icon className="h-5 w-5 text-success" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{service.name}</p>
                      <Badge variant="outline" className="text-xs border-success/50 text-success">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="ml-4">
                  Manage
                </Button>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Services Not Subscribed</h3>
          {availableServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    Explore
                  </Button>
                  <Button size="sm">
                    Request
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
