import React from 'react';

export interface SkillDecayTimelineProps {
    data: { name: string; lastUsed: string; decayLevel: string }[];
}

export function SkillDecayTimeline({ data }: SkillDecayTimelineProps) {
    const getDecayColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'low': return 'bg-emerald-500';
            case 'medium': return 'bg-yellow-500';
            case 'high': return 'bg-orange-500';
            case 'critical': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    const getWidth = (level: string) => {
        switch (level.toLowerCase()) {
            case 'low': return 'w-full';
            case 'medium': return 'w-3/4';
            case 'high': return 'w-1/2';
            case 'critical': return 'w-1/4';
            default: return 'w-full';
        }
    };

    return (
        <div className="p-6 border rounded-xl shadow-sm bg-card transition-all">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Skill Freshness</h3>
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">DECAY_ANALYSIS</span>
            </div>
            <div className="space-y-4">
                {data.map((skill, idx) => (
                    <div key={idx} className="group">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium group-hover:text-primary transition-colors">{skill.name}</span>
                            <span className="text-muted-foreground text-xs">{skill.lastUsed}</span>
                        </div>
                        <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${getDecayColor(skill.decayLevel)} transition-all duration-1000 ease-out`}
                                style={{ width: getWidth(skill.decayLevel) === 'w-full' ? '100%' : undefined }}
                            ></div>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Status: {skill.decayLevel.toUpperCase()} risk
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
