import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export interface ExplanationToggleProps {
    reasoning: string;
    context?: string;
}

export function ExplanationToggle({ reasoning, context }: ExplanationToggleProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-2 text-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium text-xs uppercase tracking-wide"
            >
                <HelpCircle className="w-3.5 h-3.5" />
                {isOpen ? "Hide Reasoning" : "Why am I seeing this?"}
                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {isOpen && (
                <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border text-muted-foreground animate-in fade-in slide-in-from-top-1">
                    <p className="leading-relaxed">{reasoning}</p>
                    {context && (
                        <div className="mt-2 pt-2 border-t border-border/50">
                            <span className="text-xs font-semibold text-primary">Context: </span>
                            <span className="text-xs italic">{context}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
