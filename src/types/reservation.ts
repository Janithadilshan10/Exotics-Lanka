export type ReservationStatus =
    | 'pending_payment'
    | 'active'
    | 'completed'
    | 'cancelled'
    | 'expired';

export type PaymentStatus =
    | 'unpaid'
    | 'held_in_escrow'
    | 'released_to_seller'
    | 'refunded_to_buyer';

export interface Reservation {
    id: string;
    listingId: string;
    buyerId: string;
    amount: number;
    currency: string;
    paymentStatus: PaymentStatus;
    status: ReservationStatus;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateReservationResponse {
    id: string;
    paymentUrl: string;
    status: ReservationStatus;
    expiresAt: string;
}

export interface ListingReservationStatus {
    isReserved: boolean;
    reservedUntil?: string;
    isMyReservation: boolean;
    reservationId?: string;
}
