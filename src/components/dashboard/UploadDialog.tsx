import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cloud, HardDrive } from "lucide-react";
import { toast } from "sonner";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const handleDriveUpload = () => {
    toast.info("Drive upload coming soon!");
    onOpenChange(false);
  };

  const handleDeviceUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        toast.success(`${files.length} file(s) selected for upload`);
        onOpenChange(false);
      }
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 hover:bg-primary/5"
            onClick={handleDriveUpload}
          >
            <Cloud className="h-6 w-6" />
            <span>Upload from Drive</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col gap-2 hover:bg-primary/5"
            onClick={handleDeviceUpload}
          >
            <HardDrive className="h-6 w-6" />
            <span>Upload from Device</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
