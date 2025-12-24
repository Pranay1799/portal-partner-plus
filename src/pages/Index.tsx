import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UploadSection } from "@/components/dashboard/UploadSection";
import { DocumentList } from "@/components/dashboard/DocumentList";
import { ServiceOverview } from "@/components/dashboard/ServiceOverview";
import { RemindersPanel } from "@/components/dashboard/RemindersPanel";
import { TicketingSystem } from "@/components/dashboard/TicketingSystem";
import { CommunicationsPanel } from "@/components/dashboard/CommunicationsPanel";
import { FinancialDashboard } from "@/components/dashboard/FinancialDashboard";
import { MomTaskStats } from "@/components/dashboard/MomTaskStats";
import { Clock, FileText, TrendingUp, Ticket } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container px-4 md:px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Welcome back, Rajesh</h2>
          <p className="text-muted-foreground">Here's what's happening with your business today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatsCard
            title="Active Tasks"
            value={4}
            icon={Clock}
            trend="2 due this week"
            variant="info"
          />
          <StatsCard
            title="Open Tickets"
            value={5}
            icon={Ticket}
            trend="2 awaiting response"
            variant="warning"
          />
          <StatsCard
            title="New Documents"
            value={3}
            icon={FileText}
            trend="Added this week"
            variant="success"
          />
          <StatsCard
            title="Active Services"
            value={3}
            icon={TrendingUp}
            trend="Out of 6 available"
            variant="default"
          />
          <MomTaskStats />
        </div>

        {/* Financial Dashboard */}
        <FinancialDashboard />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <UploadSection />
            <ServiceOverview />
          </div>
          <div className="space-y-6">
            <DocumentList />
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-6">
          <RemindersPanel />
          <div className="grid gap-6 lg:grid-cols-2">
            <TicketingSystem />
            <CommunicationsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
