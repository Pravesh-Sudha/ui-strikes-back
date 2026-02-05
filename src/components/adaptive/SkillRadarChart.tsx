import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

export interface SkillRadarChartProps {
    data: { skill: string; value: number; fullMark: number }[];
    title?: string;
}

export function SkillRadarChart({ data, title = "Skill Balance" }: SkillRadarChartProps) {
    // Ensure data has fullMark for consistent scaling
    const chartData = data.map(d => ({ ...d, fullMark: d.fullMark || 100 }));

    return (
        <div className="p-6 border rounded-xl shadow-sm bg-card text-card-foreground hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-bold mb-4 tracking-tight">{title}</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                        <PolarAngleAxis
                            dataKey="skill"
                            tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 500 }}
                        />
                        {/* Hidden radius axis for scaling but cleanup visual */}
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Skill Level"
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            fill="hsl(var(--primary))"
                            fillOpacity={0.2}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground px-2">
                <span>Depth Focus</span>
                <span>Breadth Coverage</span>
            </div>
        </div>
    );
}
