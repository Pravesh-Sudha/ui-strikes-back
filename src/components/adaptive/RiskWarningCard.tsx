import { AlertTriangle } from 'lucide-react';

export interface RiskWarningCardProps {
    title: string;
    message: string;
    riskLevel: string;
}

export function RiskWarningCard({ title, message, riskLevel }: RiskWarningCardProps) {
    const colors: Record<string, string> = {
        moderate: 'border-yellow-500 text-yellow-800',
        high: 'border-orange-500 text-orange-800',
        critical: 'border-red-500 text-red-800',
    };

    const colorClass = colors[riskLevel.toLowerCase()] || colors.moderate;

    return (
        <div className={`p-4 border-l-4 rounded-r-lg shadow-sm flex items-start gap-3 bg-white ${colorClass}`}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
                <h4 className="font-bold">{title}</h4>
                <p className="text-sm mt-1">{message}</p>
            </div>
        </div>
    );
}
