import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedDate: string;
  size: string;
}

const mockDocuments: Document[] = [
  { id: "1", name: "November MIS Report", type: "PDF", uploadedDate: "Dec 10, 2025", size: "2.4 MB" },
  { id: "2", name: "Q3 Financial Statements", type: "PDF", uploadedDate: "Dec 08, 2025", size: "3.1 MB" },
  { id: "3", name: "Tax Compliance Certificate", type: "PDF", uploadedDate: "Dec 05, 2025", size: "1.2 MB" },
  { id: "4", name: "Board Meeting Minutes - Nov", type: "DOCX", uploadedDate: "Nov 30, 2025", size: "0.8 MB" },
];

export const DocumentList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recent Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1 flex-1">
                <p className="font-medium text-foreground">{doc.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>{doc.uploadedDate}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <Button size="sm" variant="ghost">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
