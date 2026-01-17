export type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface DealerApplication {
    id: string;
    userId?: string;
    businessName: string;
    businessRegNo: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    showroomAddress: string;
    websiteUrl?: string;

    inventorySize?: number;
    brandsFocused?: string[];
    showroomPhotos?: string[];

    status: ApplicationStatus;
    adminNotes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SubmitDealerApplicationData {
    businessName: string;
    businessRegNo: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    showroomAddress: string;
    websiteUrl?: string;
    inventorySize?: number;
    brandsFocused?: string[];
}
