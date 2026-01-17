import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatProps {
    end: number;
    label: string;
    suffix?: string;
    prefix?: string;
    decimals?: number;
}

function AnimatedStat({ end, label, suffix = "", prefix = "", decimals = 0 }: StatProps) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    useEffect(() => {
        if (!inView) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = end / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [inView, end]);

    return (
        <div ref={ref} className="text-center">
            <div className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-2">
                <span className="text-primary">
                    {prefix}
                    {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
                    {suffix}
                </span>
            </div>
            <p className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-medium">
                {label}
            </p>
        </div>
    );
}

export function StatsBar() {
    return (
        <section className="relative py-16 md:py-20 overflow-hidden border-y border-border/30 bg-gradient-to-b from-background to-muted/20">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <AnimatedStat end={1247} label="Premium Vehicles" suffix="+" />
                    <AnimatedStat end={24.5} label="Total Value (Billion)" prefix="LKR " suffix="B+" decimals={1} />
                    <AnimatedStat end={4.9} label="Average Rating" suffix="★" decimals={1} />
                    <AnimatedStat end={24} label="Response Time (Hours)" suffix="hr" />
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </section>
    );
}
