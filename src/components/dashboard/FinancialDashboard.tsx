import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, PieChart, BarChart3, ExternalLink } from "lucide-react";

interface FinancialMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  period: string;
}

interface CashFlowItem {
  id: string;
  category: string;
  amount: string;
  type: "inflow" | "outflow";
}

const financialMetrics: FinancialMetric[] = [
  { id: "1", label: "Revenue (MTD)", value: "₹42.5L", change: 12.5, trend: "up", period: "vs last month" },
  { id: "2", label: "Expenses (MTD)", value: "₹28.3L", change: 5.2, trend: "up", period: "vs last month" },
  { id: "3", label: "Net Profit", value: "₹14.2L", change: 18.7, trend: "up", period: "vs last month" },
  { id: "4", label: "Cash Balance", value: "₹85.6L", change: 8.3, trend: "up", period: "vs last week" },
];

const cashFlowItems: CashFlowItem[] = [
  { id: "1", category: "Customer Payments", amount: "₹18.5L", type: "inflow" },
  { id: "2", category: "Service Revenue", amount: "₹12.2L", type: "inflow" },
  { id: "3", category: "Salaries & Wages", amount: "₹15.8L", type: "outflow" },
  { id: "4", category: "Operating Expenses", amount: "₹8.4L", type: "outflow" },
  { id: "5", category: "Tax Payments", amount: "₹4.1L", type: "outflow" },
];

export const FinancialDashboard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Financial Dashboard
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">CFO Services - Real-time financial overview</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Open LMS
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {financialMetrics.map((metric) => (
            <div key={metric.id} className="p-4 rounded-lg border bg-card">
              <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{metric.value}</span>
              </div>
              <div className={`flex items-center gap-1 mt-2 text-xs ${metric.trend === "up" ? "text-success" : "text-destructive"}`}>
                {metric.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{metric.change}% {metric.period}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cash Flow Summary */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Cash Flow Summary</h3>
            </div>
            <div className="space-y-2">
              {cashFlowItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <span className="text-sm text-foreground">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${item.type === "inflow" ? "text-success" : "text-destructive"}`}>
                      {item.type === "inflow" ? "+" : "-"}{item.amount}
                    </span>
                    {item.type === "inflow" ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Insights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Quick Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <p className="text-sm font-medium text-success">Strong Cash Position</p>
                <p className="text-xs text-muted-foreground mt-1">Cash reserves cover 3.2 months of operating expenses</p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm font-medium text-warning">Receivables Aging</p>
                <p className="text-xs text-muted-foreground mt-1">₹12.4L in receivables over 30 days - follow up recommended</p>
              </div>
              <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                <p className="text-sm font-medium text-info">Upcoming Payment</p>
                <p className="text-xs text-muted-foreground mt-1">GST payment of ₹3.8L due on 20th March</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
