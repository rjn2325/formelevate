export interface FormState {
    username: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    state: string;
    city: string;
    country: string;
    pincode: string;
    uploadedFile: string | null;
    uploadedFiles: string[]; // For multiple files
    location: { latitude: number | null; longitude: number | null };
  }
  