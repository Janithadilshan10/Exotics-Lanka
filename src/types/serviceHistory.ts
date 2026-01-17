export type ServiceType =
    | 'regular_service'
    | 'oil_change'
    | 'brake_service'
    | 'tire_replacement'
    | 'engine_repair'
    | 'transmission_repair'
    | 'body_work'
    | 'electrical'
    | 'inspection'
    | 'other';

export type ProviderType = 'authorized_dealer' | 'independent_garage' | 'self';

export type OwnerType = 'individual' | 'company' | 'lease';

export type UsageType = 'personal' | 'commercial' | 'taxi' | 'rental';

export interface ServiceRecord {
    id: string;
    listingId: string;
    userId: string;
    serviceType: ServiceType;
    serviceDate: string;
    odometerReading?: number;
    serviceProvider?: string;
    providerType?: ProviderType;
    invoiceNumber?: string;
    description: string;
    partsReplaced?: string[];
    cost?: number;
    invoiceUrl?: string;
    receiptUrls?: string[];
    verified: boolean;
    verifiedBy?: string;
    verifiedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OwnershipRecord {
    id: string;
    listingId: string;
    ownerNumber: number;
    ownershipStart?: string;
    ownershipEnd?: string;
    durationMonths?: number;
    ownerType?: OwnerType;
    usageType?: UsageType;
    startMileage?: number;
    endMileage?: number;
    transferDocUrl?: string;
    verified: boolean;
    createdAt: string;
}

export interface ServiceHistoryResponse {
    totalRecords: number;
    totalCost: number;
    lastServiceDate?: string;
    lastServiceOdometer?: number;
    records: ServiceRecord[];
}

export interface OwnershipHistoryResponse {
    totalOwners: number;
    currentOwner: number;
    history: OwnershipRecord[];
}

export interface AddServiceRecordData {
    listingId: string;
    serviceType: ServiceType;
    serviceDate: string;
    odometerReading?: number;
    serviceProvider?: string;
    providerType?: ProviderType;
    invoiceNumber?: string;
    description: string;
    partsReplaced?: string[];
    cost?: number;
    invoiceUrl?: string;
}
