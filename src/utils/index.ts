import { toast } from "sonner";

export const validateFile = (file: File): boolean => {
  if (file.type !== "application/pdf") {
    toast.error("Please select a PDF file.");
    return false;
  }
  const maxSize = 3 * 1024 * 1024; //  5MB
  if (file.size > maxSize) {
    toast.error("File size must be less than 3 MB.");
    return false;
  }
  return true;
};
