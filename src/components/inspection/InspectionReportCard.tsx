import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Shield,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Calendar,
    ThumbsUp,
    ThumbsDown,
    Wrench
} from "lucide-react";
import type { ListingInspectionResponse } from "@/types/inspection";

interface InspectionReportCardProps {
    data: ListingInspectionResponse;
}

export const InspectionReportCard = ({ data }: InspectionReportCardProps) => {
    if (!data.hasInspection || !data.report) {
        return null;
    }

    const { report } = data;

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'excellent':
                return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'good':
                return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
            case 'fair':
                return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'poor':
                return 'text-destructive bg-destructive/10 border-destructive/20';
            default:
                return '';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 85) return 'text-emerald-500';
        if (score >= 70) return 'text-blue-500';
        if (score >= 50) return 'text-amber-500';
        return 'text-destructive';
    };

    const getScoreBarColor = (score: number) => {
        if (score >= 85) return 'bg-emerald-500';
        if (score >= 70) return 'bg-blue-500';
        if (score >= 50) return 'bg-amber-500';
        return 'bg-destructive';
    };

    const categoryScores = [
        { label: 'Exterior', score: report.scores.exterior },
        { label: 'Interior', score: report.scores.interior },
        { label: 'Engine', score: report.scores.engine },
        { label: 'Transmission', score: report.scores.transmission },
        { label: 'Suspension', score: report.scores.suspension },
        { label: 'Brakes', score: report.scores.brakes },
        { label: 'Electrical', score: report.scores.electrical },
    ];

    return (
        <Card className="border-2 border-primary/20">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                Professional Inspection Report
                                <Badge className="bg-emerald-500">Verified</Badge>
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                                <Calendar className="h-3 w-3" />
                                Inspected on {new Date(report.inspectionDate).toLocaleDateString()}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{report.overallRating}/10</div>
                        <Badge className={getConditionColor(report.overallCondition)} variant="outline">
                            {report.overallCondition.charAt(0).toUpperCase() + report.overallCondition.slice(1)}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Recommendation */}
                <Alert className={report.recommendedPurchase ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-500 bg-amber-500/10'}>
                    {report.recommendedPurchase ? (
                        <ThumbsUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                        <ThumbsDown className="h-4 w-4 text-amber-500" />
                    )}
                    <AlertDescription className={report.recommendedPurchase ? 'text-emerald-500' : 'text-amber-500'}>
                        <span className="font-semibold">
                            {report.recommendedPurchase ? 'Recommended Purchase' : 'Purchase with Caution'}
                        </span>
                        <p className="text-sm mt-1 text-muted-foreground">{report.inspectorSummary}</p>
                    </AlertDescription>
                </Alert>

                {/* Category Scores */}
                <div>
                    <h4 className="font-semibold mb-4">Inspection Scores</h4>
                    <div className="space-y-3">
                        {categoryScores.map((category) => (
                            <div key={category.label}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium">{category.label}</span>
                                    <span className={`text-sm font-bold ${getScoreColor(category.score)}`}>
                                        {category.score}/100
                                    </span>
                                </div>
                                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`absolute inset-y-0 left-0 ${getScoreBarColor(category.score)} transition-all`}
                                        style={{ width: `${category.score}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Issues */}
                {report.majorIssues.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-destructive" />
                            Major Issues ({report.majorIssues.length})
                        </h4>
                        <div className="space-y-2">
                            {report.majorIssues.map((issue, index) => (
                                <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                                    <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{issue.item}</p>
                                        <p className="text-xs text-muted-foreground">{issue.category}</p>
                                        {issue.estimatedCost && (
                                            <p className="text-xs text-destructive mt-1">
                                                Est. repair: LKR {issue.estimatedCost.toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                    <Badge variant="destructive" className="text-xs">
                                        {issue.severity}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {report.minorIssues.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-amber-500" />
                            Minor Issues ({report.minorIssues.length})
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                            {report.minorIssues.map((issue, index) => (
                                <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                                    <AlertTriangle className="h-3 w-3 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-xs">{issue.item}</p>
                                        {issue.estimatedCost && (
                                            <p className="text-xs text-muted-foreground">
                                                LKR {issue.estimatedCost.toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {report.majorIssues.length === 0 && report.minorIssues.length === 0 && (
                    <Alert className="border-emerald-500 bg-emerald-500/10">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <AlertDescription className="text-emerald-500">
                            <span className="font-semibold">No Issues Found</span>
                            <p className="text-sm mt-1 text-muted-foreground">
                                This vehicle passed all inspection points with no significant issues detected.
                            </p>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Trust Badge */}
                <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Inspected by certified Exotics Lanka inspector</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
