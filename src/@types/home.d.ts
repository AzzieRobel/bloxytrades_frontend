type Category = 'general' | 'payment' | 'returns';
type ClaimStatus = 'pending' | 'approved' | 'rejected' | 'resolved';


interface Claim {
    id: string;
    title: string;
    description: string;
    status: ClaimStatus;
    date: string;
    orderId?: string;
}