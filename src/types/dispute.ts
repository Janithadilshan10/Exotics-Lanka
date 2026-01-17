export type DisputeReason =
    | 'misrepresentation'
    | 'seller_refused_sale'
    | 'buyer_no_show'
    | 'fraudulent_listing'
    | 'harassment'
    | 'other';

export type DisputeStatus =
    | 'open'
    | 'under_review'
    | 'waiting_for_response'
    | 'resolved_refunded'
    | 'resolved_dismissed'
    | 'escalated';

export interface Dispute {
    id: string;
    reservationId?: string;
    listingId: string;
    reporterId: string;
    respondentId: string;
    reason: DisputeReason;
    description: string;
    status: DisputeStatus;
    evidenceUrls: string[];
    resolutionNotes?: string;
    resolvedBy?: string;
    resolvedAt?: string;
    refundAmount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface DisputeMessage {
    id: string;
    disputeId: string;
    senderId: string;
    message: string;
    attachmentUrls: string[];
    isInternal: boolean;
    createdAt: string;
}

export interface CreateDisputeData {
    reservationId?: string;
    listingId: string;
    respondentId: string;
    reason: DisputeReason;
    description: string;
    evidenceUrls: string[];
}
