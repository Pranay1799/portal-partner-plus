import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export const MomTaskStats = () => {
  const activeMomTasks = 3; // Mock data - replace with actual data

  return (
    <Card className="hover:shadow-md transition-shadow border-pink-200 bg-gradient-to-br from-pink-50 to-background dark:from-pink-950/20 dark:to-background">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Mom's Active Tasks</p>
            <p className="text-2xl font-bold text-foreground">{activeMomTasks}</p>
            <p className="text-xs text-muted-foreground">Tasks in progress</p>
          </div>
          <div className="p-3 rounded-full bg-pink-500/10 text-pink-600">
            <Users className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
