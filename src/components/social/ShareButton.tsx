import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Check, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
    title: string;
    url: string;
    description?: string;
    imageUrl?: string;
    price?: string;
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
}

export function ShareButton({
    title,
    url,
    description,
    imageUrl,
    price,
    variant = "outline",
    size = "default",
    className
}: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const shareUrl = `${window.location.origin}${url}`;
    const shareText = `${title}${price ? ` - ${price}` : ''} | Exotics Lanka`;
    const fullDescription = description || `Check out this ${title} on Exotics Lanka - Sri Lanka's premier luxury car marketplace.`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareOptions = [
        {
            name: "WhatsApp",
            icon: "💬",
            color: "hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400",
            action: () => {
                window.open(
                    `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${fullDescription}\n\n${shareUrl}`)}`,
                    '_blank'
                );
            }
        },
        {
            name: "Facebook",
            icon: "📘",
            color: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400",
            action: () => {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                    'width=600,height=400'
                );
            }
        },
        {
            name: "Twitter",
            icon: "𝕏",
            color: "hover:bg-zinc-500/10 hover:text-zinc-900 dark:hover:text-zinc-100",
            action: () => {
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                    'width=600,height=400'
                );
            }
        },
        {
            name: "Email",
            icon: "✉️",
            color: "hover:bg-primary/10 hover:text-primary",
            action: () => {
                window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${fullDescription}\n\nView listing: ${shareUrl}`)}`;
            }
        }
    ];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={variant}
                    size={size}
                    className={cn("gap-2", className)}
                >
                    <Share2 className="h-4 w-4" />
                    {size !== "icon" && "Share"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Share this listing</DialogTitle>
                    <DialogDescription>
                        Share this {title} with others
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Social Share Options */}
                    <div className="grid grid-cols-2 gap-3">
                        {shareOptions.map((option) => (
                            <Button
                                key={option.name}
                                variant="outline"
                                className={cn(
                                    "h-auto flex-col gap-2 py-4 transition-colors",
                                    option.color
                                )}
                                onClick={() => {
                                    option.action();
                                    setOpen(false);
                                }}
                            >
                                <span className="text-3xl">{option.icon}</span>
                                <span className="text-sm font-medium">{option.name}</span>
                            </Button>
                        ))}
                    </div>

                    {/* Copy Link */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Or copy link</label>
                        <div className="flex gap-2">
                            <div className="flex-1 px-3 py-2 bg-muted rounded-lg text-sm truncate">
                                {shareUrl}
                            </div>
                            <Button
                                size="sm"
                                onClick={handleCopyLink}
                                className="shrink-0"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 mr-1" />
                                        Copied!
                                    </>
                                ) : (
                                    "Copy"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
