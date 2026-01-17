import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertTriangle,
    MessageSquare,
    Clock,
    CheckCircle2,
    XCircle,
    Gavel,
    Shield,
    Filter
} from "lucide-react";
import { CreateDisputeDialog } from "@/components/dispute/CreateDisputeDialog";
import { cn } from "@/lib/utils";

// Mock Data
const mockDisputes = [
    {
        id: "case_123",
        listingTitle: "2020 BMW M4 Competition",
        listingImage: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=200&auto=format&fit=crop",
        reason: "misrepresentation",
        status: "under_review",
        createdAt: "2024-01-10T10:30:00Z",
        lastUpdate: "2024-01-11T14:20:00Z",
        messages: 3,
    },
    {
        id: "case_124",
        listingTitle: "2019 Mercedes-Benz C200 AMG",
        listingImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=200&auto=format&fit=crop",
        reason: "seller_refused_sale",
        status: "resolved_refunded",
        createdAt: "2023-12-15T09:00:00Z",
        lastUpdate: "2023-12-20T11:00:00Z",
        messages: 5,
    }
];

const ResolutionCenter = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [isDataOpen, setIsCreateOpen] = useState(false);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'open':
                return <Badge className="bg-blue-500">Open</Badge>;
            case 'under_review':
                return <Badge className="bg-amber-500">Under Review</Badge>;
            case 'waiting_for_response':
                return <Badge className="bg-orange-500">Action Required</Badge>;
            case 'resolved_refunded':
                return <Badge className="bg-emerald-500">Refunded</Badge>;
            case 'resolved_dismissed':
                return <Badge variant="secondary">Closed</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getReasonLabel = (reason: string) => {
        return reason.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-5xl">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
                                <Gavel className="h-8 w-8 text-primary" />
                                Resolution Center
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Manage your disputes and report issues with transactions
                            </p>
                        </div>
                        <Button onClick={() => setIsCreateOpen(true)} variant="destructive">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Open New Dispute
                        </Button>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6">
                        {/* Sidebar / Stats */}
                        <div className="lg:col-span-1 space-y-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Open Cases</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Resolved</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">5</div>
                                </CardContent>
                            </Card>

                            <div className="bg-muted/30 p-4 rounded-lg border border-border">
                                <h4 className="font-semibold flex items-center gap-2 mb-2 text-sm">
                                    <Shield className="h-4 w-4 text-emerald-500" />
                                    Buyer Protection
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Transactions verified by Exotics Lanka are covered up to LKR 100,000 against fraud and misrepresentation.
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <Tabs defaultValue="active" onValueChange={setActiveTab}>
                                <TabsList className="mb-6">
                                    <TabsTrigger value="active">Active Cases</TabsTrigger>
                                    <TabsTrigger value="closed">Closed Cases</TabsTrigger>
                                </TabsList>

                                <TabsContent value="active" className="space-y-4">
                                    {mockDisputes.filter(d => !d.status.startsWith('resolved')).map((dispute) => (
                                        <DisputeCard key={dispute.id} dispute={dispute} getStatusBadge={getStatusBadge} getReasonLabel={getReasonLabel} />
                                    ))}
                                </TabsContent>

                                <TabsContent value="closed" className="space-y-4">
                                    {mockDisputes.filter(d => d.status.startsWith('resolved')).map((dispute) => (
                                        <DisputeCard key={dispute.id} dispute={dispute} getStatusBadge={getStatusBadge} getReasonLabel={getReasonLabel} />
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>

            <CreateDisputeDialog
                isOpen={isDataOpen}
                onClose={() => setIsCreateOpen(false)}
            />

            <Footer />
        </div>
    );
};

const DisputeCard = ({ dispute, getStatusBadge, getReasonLabel }: any) => (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Listing Thumb */}
                <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img src={dispute.listingImage} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                            <h3 className="font-semibold truncate">{dispute.listingTitle}</h3>
                            <p className="text-xs text-muted-foreground font-mono mt-1">Ref: {dispute.id.toUpperCase()}</p>
                        </div>
                        {getStatusBadge(dispute.status)}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-destructive mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        {getReasonLabel(dispute.reason)}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Updated {new Date(dispute.lastUpdate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {dispute.messages} Messages
                            </span>
                        </div>
                        <Button variant="link" size="sm" className="h-auto p-0">View Details</Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default ResolutionCenter;
