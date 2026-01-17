export type InspectionType = 'basic' | 'standard' | 'premium';

export type InspectionStatus = 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'refunded';

export type OverallCondition = 'excellent' | 'good' | 'fair' | 'poor';

export interface InspectionIssue {
    category: string;
    item: string;
    severity: 'low' | 'moderate' | 'high' | 'critical';
    estimatedCost?: number;
}

export interface InspectionRequest {
    id: string;
    listingId: string;
    buyerId: string;
    sellerId: string;
    inspectionType: InspectionType;
    preferredDate?: string;
    preferredTime?: string;
    location?: string;
    status: InspectionStatus;
    price: number;
    paymentStatus: PaymentStatus;
    inspectorId?: string;
    scheduledDate?: string;
    buyerNotes?: string;
    sellerNotes?: string;
    cancellationReason?: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
}

export interface InspectionReport {
    id: string;
    inspectionRequestId: string;
    listingId: string;
    inspectorId: string;
    overallRating: number; // 1-10
    overallCondition: OverallCondition;
    recommendedPurchase: boolean;

    // Category scores (0-100)
    exteriorScore: number;
    interiorScore: number;
    engineScore: number;
    transmissionScore: number;
    suspensionScore: number;
    brakesScore: number;
    electricalScore: number;

    majorIssues: InspectionIssue[];
    minorIssues: InspectionIssue[];
    positivePoints: InspectionIssue[];

    estimatedRepairCost?: number;
    urgentRepairs?: string;

    odometerReading?: number;
    odometerVerified: boolean;
    odometerNotes?: string;

    testDrivePerformed: boolean;
    testDriveNotes?: string;

    inspectorSummary: string;
    buyerAdvice?: string;

    photoUrls: string[];
    videoUrl?: string;

    inspectionDate: string;
    createdAt: string;
}

export interface InspectionPricing {
    basic: {
        price: number;
        points: number;
        duration: string;
        features: string[];
    };
    standard: {
        price: number;
        points: number;
        duration: string;
        features: string[];
    };
    premium: {
        price: number;
        points: number;
        duration: string;
        features: string[];
    };
}

export interface RequestInspectionData {
    listingId: string;
    sellerId: string;
    inspectionType: InspectionType;
    preferredDate?: string;
    preferredTime?: string;
    buyerNotes?: string;
}

export interface ListingInspectionResponse {
    hasInspection: boolean;
    report?: {
        id: string;
        overallRating: number;
        overallCondition: OverallCondition;
        recommendedPurchase: boolean;
        scores: {
            exterior: number;
            interior: number;
            engine: number;
            transmission: number;
            suspension: number;
            brakes: number;
            electrical: number;
        };
        majorIssues: InspectionIssue[];
        minorIssues: InspectionIssue[];
        inspectionDate: string;
        inspectorSummary: string;
    };
}
