import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ClientsOverview } from "@/components/admin/ClientsOverview";
import { ClientDetails } from "@/components/admin/ClientDetails";
import { SystemStats } from "@/components/admin/SystemStats";
import { ActivityLog } from "@/components/admin/ActivityLog";
import { ServiceManagement } from "@/components/admin/ServiceManagement";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          
          <main className="flex-1 p-6 space-y-6 overflow-auto">
            {activeSection === "overview" && (
              <>
                <SystemStats />
                <div className="grid gap-6 lg:grid-cols-2">
                  <ClientsOverview 
                    onSelectClient={setSelectedClient}
                    selectedClient={selectedClient}
                  />
                  <ActivityLog />
                </div>
              </>
            )}
            
            {activeSection === "clients" && (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <ClientsOverview 
                    onSelectClient={setSelectedClient}
                    selectedClient={selectedClient}
                  />
                </div>
                <div className="lg:col-span-2">
                  {selectedClient ? (
                    <Tabs defaultValue="details" className="space-y-4">
                      <TabsList>
                        <TabsTrigger value="details">Client Details</TabsTrigger>
                        <TabsTrigger value="services">Services & Staff</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details">
                        <ClientDetails clientId={selectedClient} />
                      </TabsContent>
                      <TabsContent value="services">
                        <ServiceManagement clientId={selectedClient} />
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <ClientDetails clientId={selectedClient} />
                  )}
                </div>
              </div>
            )}
            
            {activeSection === "activity" && (
              <ActivityLog fullView />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
