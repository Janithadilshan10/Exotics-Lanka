import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Shield,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    FileText,
    Building2,
    CreditCard,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import type { VerificationRequest } from "@/types/verification";

const VerificationQueue = () => {
    const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [adminNotes, setAdminNotes] = useState("");

    // Mock data - replace with actual API call
    const [requests, setRequests] = useState<VerificationRequest[]>([
        {
            id: "1",
            userId: "user1",
            verificationType: "national_id",
            documentFrontUrl: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400",
            documentBackUrl: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400",
            fullName: "John Doe",
            idNumber: "123456789V",
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: "2",
            userId: "user2",
            verificationType: "business_registration",
            documentFrontUrl: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=400",
            fullName: "ABC Motors (Pvt) Ltd",
            businessName: "ABC Motors (Pvt) Ltd",
            businessRegNumber: "PV 12345",
            status: "under_review",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
    ]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-emerald-500"><CheckCircle2 className="h-3 w-3 mr-1" />Approved</Badge>;
            case 'pending':
                return <Badge variant="outline" className="border-amber-500 text-amber-500"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
            case 'under_review':
                return <Badge variant="outline" className="border-blue-500 text-blue-500"><Eye className="h-3 w-3 mr-1" />Under Review</Badge>;
            case 'rejected':
                return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
            default:
                return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'national_id':
                return <CreditCard className="h-5 w-5 text-primary" />;
            case 'passport':
                return <FileText className="h-5 w-5 text-primary" />;
            case 'business_registration':
                return <Building2 className="h-5 w-5 text-primary" />;
            default:
                return <Shield className="h-5 w-5 text-primary" />;
        }
    };

    const getTypeName = (type: string) => {
        switch (type) {
            case 'national_id':
                return 'National ID';
            case 'passport':
                return 'Passport';
            case 'business_registration':
                return 'Business Registration';
            default:
                return type;
        }
    };

    const handleReview = (request: VerificationRequest) => {
        setSelectedRequest(request);
        setIsReviewDialogOpen(true);
        setRejectionReason("");
        setAdminNotes("");
    };

    const handleApprove = async () => {
        if (!selectedRequest) return;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setRequests(requests.map(r =>
                r.id === selectedRequest.id
                    ? { ...r, status: 'approved', reviewedAt: new Date().toISOString() }
                    : r
            ));

            toast.success("Verification approved successfully!");
            setIsReviewDialogOpen(false);
        } catch (error) {
            toast.error("Failed to approve verification");
        }
    };

    const handleReject = async () => {
        if (!selectedRequest || !rejectionReason.trim()) {
            toast.error("Please provide a rejection reason");
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setRequests(requests.map(r =>
                r.id === selectedRequest.id
                    ? {
                        ...r,
                        status: 'rejected',
                        rejectionReason,
                        adminNotes,
                        reviewedAt: new Date().toISOString()
                    }
                    : r
            ));

            toast.success("Verification rejected");
            setIsReviewDialogOpen(false);
        } catch (error) {
            toast.error("Failed to reject verification");
        }
    };

    const filterRequests = (status?: string) => {
        if (!status) return requests;
        return requests.filter(r => r.status === status);
    };

    const pendingCount = filterRequests('pending').length;
    const underReviewCount = filterRequests('under_review').length;
    const approvedCount = filterRequests('approved').length;
    const rejectedCount = filterRequests('rejected').length;

    const RequestCard = ({ request }: { request: VerificationRequest }) => (
        <Card className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {getTypeIcon(request.verificationType)}
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">{request.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{getTypeName(request.verificationType)}</p>
                            {request.idNumber && (
                                <p className="text-xs text-muted-foreground mt-1">ID: {request.idNumber}</p>
                            )}
                            {request.businessRegNumber && (
                                <p className="text-xs text-muted-foreground mt-1">Reg: {request.businessRegNumber}</p>
                            )}
                        </div>
                    </div>
                    {getStatusBadge(request.status)}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Clock className="h-3 w-3" />
                    <span>Submitted {new Date(request.createdAt).toLocaleDateString()}</span>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleReview(request)}
                >
                    <Eye className="h-4 w-4 mr-2" />
                    Review Documents
                </Button>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="font-display text-3xl font-bold mb-2">Verification Queue</h1>
                <p className="text-muted-foreground">Review and approve identity verification requests</p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Pending</p>
                                <p className="text-2xl font-bold">{pendingCount}</p>
                            </div>
                            <Clock className="h-8 w-8 text-amber-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Under Review</p>
                                <p className="text-2xl font-bold">{underReviewCount}</p>
                            </div>
                            <Eye className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Approved</p>
                                <p className="text-2xl font-bold">{approvedCount}</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Rejected</p>
                                <p className="text-2xl font-bold">{rejectedCount}</p>
                            </div>
                            <XCircle className="h-8 w-8 text-destructive" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
                    <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
                    <TabsTrigger value="under_review">Under Review ({underReviewCount})</TabsTrigger>
                    <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {requests.map(request => (
                            <RequestCard key={request.id} request={request} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterRequests('pending').map(request => (
                            <RequestCard key={request.id} request={request} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="under_review" className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterRequests('under_review').map(request => (
                            <RequestCard key={request.id} request={request} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="approved" className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterRequests('approved').map(request => (
                            <RequestCard key={request.id} request={request} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="rejected" className="space-y-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterRequests('rejected').map(request => (
                            <RequestCard key={request.id} request={request} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Review Dialog */}
            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Review Verification Request</DialogTitle>
                        <DialogDescription>
                            Review the submitted documents and approve or reject the verification
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRequest && (
                        <div className="space-y-6">
                            {/* User Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">User Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Full Name</p>
                                            <p className="font-semibold">{selectedRequest.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Verification Type</p>
                                            <p className="font-semibold">{getTypeName(selectedRequest.verificationType)}</p>
                                        </div>
                                        {selectedRequest.idNumber && (
                                            <div>
                                                <p className="text-sm text-muted-foreground">ID Number</p>
                                                <p className="font-semibold">{selectedRequest.idNumber}</p>
                                            </div>
                                        )}
                                        {selectedRequest.businessName && (
                                            <div>
                                                <p className="text-sm text-muted-foreground">Business Name</p>
                                                <p className="font-semibold">{selectedRequest.businessName}</p>
                                            </div>
                                        )}
                                        {selectedRequest.businessRegNumber && (
                                            <div>
                                                <p className="text-sm text-muted-foreground">Registration Number</p>
                                                <p className="font-semibold">{selectedRequest.businessRegNumber}</p>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm text-muted-foreground">Submitted</p>
                                            <p className="font-semibold">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Documents */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Submitted Documents</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>
                                            {selectedRequest.verificationType === 'national_id' ? 'Front of ID' :
                                                selectedRequest.verificationType === 'passport' ? 'Passport Page' :
                                                    'Registration Certificate'}
                                        </Label>
                                        <div className="border rounded-lg overflow-hidden">
                                            <img
                                                src={selectedRequest.documentFrontUrl}
                                                alt="Document front"
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    </div>
                                    {selectedRequest.documentBackUrl && (
                                        <div className="space-y-2">
                                            <Label>Back of ID</Label>
                                            <div className="border rounded-lg overflow-hidden">
                                                <img
                                                    src={selectedRequest.documentBackUrl}
                                                    alt="Document back"
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Review Actions */}
                            {selectedRequest.status !== 'approved' && selectedRequest.status !== 'rejected' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="rejectionReason">Rejection Reason (if rejecting)</Label>
                                        <Textarea
                                            id="rejectionReason"
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            placeholder="e.g., Document image is not clear. Please upload a higher quality scan."
                                            rows={3}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="adminNotes">Admin Notes (optional)</Label>
                                        <Textarea
                                            id="adminNotes"
                                            value={adminNotes}
                                            onChange={(e) => setAdminNotes(e.target.value)}
                                            placeholder="Internal notes..."
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Status Alert */}
                            {selectedRequest.status === 'approved' && (
                                <Alert className="border-emerald-500 bg-emerald-500/10">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    <AlertDescription className="text-emerald-500">
                                        This verification has been approved
                                    </AlertDescription>
                                </Alert>
                            )}

                            {selectedRequest.status === 'rejected' && (
                                <Alert variant="destructive">
                                    <XCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        <p className="font-semibold">This verification was rejected</p>
                                        {selectedRequest.rejectionReason && (
                                            <p className="text-sm mt-1">Reason: {selectedRequest.rejectionReason}</p>
                                        )}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        {selectedRequest && selectedRequest.status !== 'approved' && selectedRequest.status !== 'rejected' && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleReject}
                                    disabled={!rejectionReason.trim()}
                                >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                </Button>
                                <Button
                                    variant="gold"
                                    onClick={handleApprove}
                                >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Approve Verification
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default VerificationQueue;
