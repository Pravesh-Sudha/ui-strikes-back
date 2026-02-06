import { z } from 'zod';
import { SkillRadarChart } from '../components/adaptive/SkillRadarChart';
import { SkillDecayTimeline } from '../components/adaptive/SkillDecayTimeline';
import { RiskWarningCard } from '../components/adaptive/RiskWarningCard';
import { UpgradeSuggestionCard } from '../components/adaptive/UpgradeSuggestionCard';
import { ExplanationToggle } from '../components/adaptive/ExplanationToggle';

export const tamboConfig = {
    components: [
        {
            name: 'skill_radar_chart',
            description: 'Visualizes the balance between depth and breadth of skills, or compares multiple skill categories.',
            component: SkillRadarChart,
            propsSchema: z.object({
                title: z.string().describe("Title of the chart, e.g., 'Frontend Skill Balance'").default("Skill Analysis"),
                data: z.array(z.object({
                    skill: z.string().describe("Name of the skill, e.g., 'React'").default("Unknown Skill"),
                    value: z.number().min(0).max(100).describe("Skill level from 0 to 100").default(50),
                    fullMark: z.number().default(100).optional(),
                })).describe("Array of 3-6 skills to visualize.").default([]),
            }),
        },
        {
            name: 'skill_decay_timeline',
            description: 'Shows a timeline of skills and their freshness/decay status based on last usage.',
            component: SkillDecayTimeline,
            propsSchema: z.object({
                data: z.array(z.object({
                    name: z.string().describe("Name of the skill, e.g. 'jQuery'").default("Unknown Skill"),
                    lastUsed: z.string().describe("Year or timeframe like '2023', 'Current'").default("Unknown"),
                    decayLevel: z.string().describe("Decay level: 'low', 'medium', 'high', 'critical'").default("medium"),
                })).describe("List of data points regarding skill usage and decay for the timeline.").default([]),
            }),
        },
        {
            name: 'risk_warning_card',
            description: 'Displays a warning about a specific career risk or skill obsolescence.',
            component: RiskWarningCard,
            propsSchema: z.object({
                title: z.string().describe("Short warning title, e.g. 'Legacy Stack Risk'").default("Risk Warning"),
                message: z.string().describe("Detailed explanation of the risk").default("Potential risk detected."),
                riskLevel: z.string().describe("Risk level: 'moderate', 'high', 'critical'").default('moderate'),
            }),
        },
        {
            name: 'upgrade_suggestion_card',
            description: 'Suggests a specific skill upgrade or learning path with potential impact.',
            component: UpgradeSuggestionCard,
            propsSchema: z.object({
                skill: z.string().describe("The recommended skill to learn").default("New Skill"),
                recommendation: z.string().describe("Why this skill is recommended").default("Recommended for career growth."),
                impact: z.string().describe("Impact: 'career_pivot', 'salary_bump', 'stability'").default("stability"),
            }),
        },
        {
            name: 'explanation_toggle',
            description: 'Can be used to provide deeper context or reasoning for a specific insight, hidden by default behind a toggle.',
            component: ExplanationToggle,
            propsSchema: z.object({
                reasoning: z.string().describe("The detailed reasoning or explanation to be hidden.").default("No additional details provided."),
                context: z.string().describe("Optional context or source data reference.").optional(),
            }),
        },
    ],
};
