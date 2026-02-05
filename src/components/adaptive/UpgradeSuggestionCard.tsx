import { ArrowUpRight } from 'lucide-react';

export interface UpgradeSuggestionCardProps {
    skill: string;
    recommendation: string;
    impact: string;
}

export function UpgradeSuggestionCard({ skill, recommendation, impact }: UpgradeSuggestionCardProps) {
    const safeImpact = (impact || 'stability').replace('_', ' ');

    return (
        <div className="p-4 border rounded-lg shadow-sm bg-gradient-to-br from-card to-muted/20 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-primary">{skill}</h4>
                <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium tracking-wide">
                    {safeImpact}
                </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{recommendation}</p>
            <button className="text-sm font-medium flex items-center text-primary hover:underline">
                View Roadmap <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    );
}
