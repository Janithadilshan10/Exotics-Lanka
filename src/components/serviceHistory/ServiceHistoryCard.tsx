import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Calendar,
    Wrench,
    CheckCircle2,
    DollarSign,
    Gauge,
    Building2,
    User,
    Download
} from "lucide-react";
import type { ServiceHistoryResponse, OwnershipHistoryResponse } from "@/types/serviceHistory";

interface ServiceHistoryCardProps {
    serviceHistory: ServiceHistoryResponse;
    ownershipHistory: OwnershipHistoryResponse;
}

export const ServiceHistoryCard = ({ serviceHistory, ownershipHistory }: ServiceHistoryCardProps) => {
    const getServiceTypeIcon = (type: string) => {
        switch (type) {
            case 'regular_service':
                return <Wrench className="h-4 w-4" />;
            case 'oil_change':
                return <Wrench className="h-4 w-4" />;
            case 'brake_service':
                return <Wrench className="h-4 w-4" />;
            default:
                return <Wrench className="h-4 w-4" />;
        }
    };

    const getServiceTypeName = (type: string) => {
        const names: Record<string, string> = {
            regular_service: 'Regular Service',
            oil_change: 'Oil Change',
            brake_service: 'Brake Service',
            tire_replacement: 'Tire Replacement',
            engine_repair: 'Engine Repair',
            transmission_repair: 'Transmission Repair',
            body_work: 'Body Work',
            electrical: 'Electrical',
            inspection: 'Inspection',
            other: 'Other',
        };
        return names[type] || type;
    };

    const getProviderBadge = (type?: string) => {
        if (!type) return null;

        const badges: Record<string, { label: string; className: string }> = {
            authorized_dealer: { label: 'Authorized Dealer', className: 'bg-emerald-500' },
            independent_garage: { label: 'Independent Garage', className: 'bg-blue-500' },
            self: { label: 'Self Service', className: 'bg-amber-500' },
        };

        const badge = badges[type];
        if (!badge) return null;

        return <Badge className={badge.className}>{badge.label}</Badge>;
    };

    return (
        <div className="space-y-6">
            {/* Service History */}
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Service History
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Complete maintenance and repair records
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{serviceHistory.totalRecords}</div>
                            <div className="text-xs text-muted-foreground">Records</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Summary Stats */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Calendar className="h-4 w-4" />
                                Last Service
                            </div>
                            <div className="font-semibold">
                                {serviceHistory.lastServiceDate
                                    ? new Date(serviceHistory.lastServiceDate).toLocaleDateString()
                                    : 'N/A'}
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Gauge className="h-4 w-4" />
                                Last Service Odometer
                            </div>
                            <div className="font-semibold">
                                {serviceHistory.lastServiceOdometer
                                    ? `${serviceHistory.lastServiceOdometer.toLocaleString()} km`
                                    : 'N/A'}
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <DollarSign className="h-4 w-4" />
                                Total Spent
                            </div>
                            <div className="font-semibold">
                                LKR {serviceHistory.totalCost.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Service Records Timeline */}
                    <div>
                        <h4 className="font-semibold mb-4">Maintenance Timeline</h4>
                        <div className="space-y-3">
                            {serviceHistory.records.map((record) => (
                                <div
                                    key={record.id}
                                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        {getServiceTypeIcon(record.serviceType)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div>
                                                <h5 className="font-semibold">{getServiceTypeName(record.serviceType)}</h5>
                                                <p className="text-sm text-muted-foreground">{record.description}</p>
                                            </div>
                                            {record.verified && (
                                                <Badge variant="outline" className="border-emerald-500 text-emerald-500 flex-shrink-0">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                    Verified
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(record.serviceDate).toLocaleDateString()}
                                            </div>
                                            {record.odometerReading && (
                                                <div className="flex items-center gap-1">
                                                    <Gauge className="h-3 w-3" />
                                                    {record.odometerReading.toLocaleString()} km
                                                </div>
                                            )}
                                            {record.serviceProvider && (
                                                <div className="flex items-center gap-1">
                                                    <Building2 className="h-3 w-3" />
                                                    {record.serviceProvider}
                                                </div>
                                            )}
                                            {record.cost && (
                                                <div className="flex items-center gap-1 font-semibold text-foreground">
                                                    LKR {record.cost.toLocaleString()}
                                                </div>
                                            )}
                                        </div>

                                        {record.providerType && (
                                            <div className="mt-2">
                                                {getProviderBadge(record.providerType)}
                                            </div>
                                        )}

                                        {record.invoiceUrl && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 gap-2"
                                                onClick={() => window.open(record.invoiceUrl, '_blank')}
                                            >
                                                <Download className="h-3 w-3" />
                                                View Invoice
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Ownership History */}
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Ownership History
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Previous owners and usage details
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{ownershipHistory.totalOwners}</div>
                            <div className="text-xs text-muted-foreground">
                                {ownershipHistory.totalOwners === 1 ? 'Owner' : 'Owners'}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {ownershipHistory.history.map((owner) => (
                            <div
                                key={owner.id}
                                className="flex items-start gap-4 p-4 rounded-lg border border-border"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                                    {owner.ownerNumber}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div>
                                            <h5 className="font-semibold">
                                                {owner.ownerNumber === ownershipHistory.currentOwner ? 'Current Owner' : `Owner #${owner.ownerNumber}`}
                                            </h5>
                                            {owner.ownershipStart && (
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(owner.ownershipStart).toLocaleDateString()} -
                                                    {owner.ownershipEnd
                                                        ? ` ${new Date(owner.ownershipEnd).toLocaleDateString()}`
                                                        : ' Present'}
                                                    {owner.durationMonths && ` (${owner.durationMonths} months)`}
                                                </p>
                                            )}
                                        </div>
                                        {owner.verified && (
                                            <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-sm">
                                        {owner.ownerType && (
                                            <Badge variant="secondary">
                                                {owner.ownerType.charAt(0).toUpperCase() + owner.ownerType.slice(1)}
                                            </Badge>
                                        )}
                                        {owner.usageType && (
                                            <Badge variant="outline">
                                                {owner.usageType.charAt(0).toUpperCase() + owner.usageType.slice(1)} Use
                                            </Badge>
                                        )}
                                    </div>

                                    {(owner.startMileage !== undefined || owner.endMileage !== undefined) && (
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            <Gauge className="h-3 w-3 inline mr-1" />
                                            {owner.startMileage?.toLocaleString() || '0'} km → {owner.endMileage?.toLocaleString() || 'Current'} km
                                            {owner.startMileage !== undefined && owner.endMileage !== undefined && (
                                                <span className="ml-2 font-semibold">
                                                    ({(owner.endMileage - owner.startMileage).toLocaleString()} km driven)
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
