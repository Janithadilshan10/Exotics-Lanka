export type VerificationType = 'national_id' | 'business_registration' | 'passport';

export type VerificationStatus = 'pending' | 'under_review' | 'approved' | 'rejected';

export interface VerificationRequest {
  id: string;
  userId: string;
  verificationType: VerificationType;
  documentFrontUrl: string;
  documentBackUrl?: string;
  fullName: string;
  idNumber?: string;
  businessName?: string;
  businessRegNumber?: string;
  status: VerificationStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VerificationStatusResponse {
  isVerified: boolean;
  hasActiveRequest: boolean;
  request?: {
    id: string;
    status: VerificationStatus;
    verificationType: VerificationType;
    submittedAt: string;
    rejectionReason?: string;
  };
}

export interface SubmitVerificationData {
  verificationType: VerificationType;
  documentFrontUrl: string;
  documentBackUrl?: string;
  fullName: string;
  idNumber?: string;
  businessName?: string;
  businessRegNumber?: string;
}

export interface RejectVerificationData {
  rejectionReason: string;
  adminNotes?: string;
}
