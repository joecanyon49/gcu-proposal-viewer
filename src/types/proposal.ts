// Proposal Types - Matches main portal exactly

export interface ProposalTheme {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
    overlayOpacity?: number;
}

export interface ProposalMeta {
    title: string;
    preparedFor: string;
    preparedBy: string;
    date: string;
    clientLogo?: string;
}

export interface SectionBase {
    id: string;
    type: string;
}

export interface CoverSection extends SectionBase {
    type: 'cover';
    title: string;
    subtitle: string;
    image: string;
}

export interface SummaryPillar {
    title: string;
    description: string;
    icon: string;
}

export interface SynopsisSection extends SectionBase {
    type: 'synopsis';
    title: string;
    content: string;
    summaryPillars: SummaryPillar[];
    image?: string;
}

export interface StorySection extends SectionBase {
    type: 'story';
    title: string;
    subtitle?: string;
    content: string;
    image?: string;
    quote?: string;
}

export interface ProblemSection extends SectionBase {
    type: 'problem';
    title: string;
    description: string;
    points: { title: string; description: string }[];
    image?: string;
}

export interface Deliverable {
    title: string;
    description: string;
    items: string[];
}

export interface ContentSection extends SectionBase {
    type: 'content';
    title: string;
    elements: Deliverable[];
    image?: string;
}

export interface StatItem {
    label: string;
    value: string;
    suffix?: string;
    description?: string;
}

export interface GraphDataPoint {
    name: string;
    value: number;
    [key: string]: any;
}

export interface GraphData {
    type: 'bar' | 'pie' | 'line';
    data: GraphDataPoint[];
    yAxisLabel?: string;
    xAxisLabel?: string;
}

export interface ImpactCalculatorConfig {
    costPerScholarship: number;
    costPerServiceHour: number;
    minDonation?: number;
    maxDonation?: number;
    step?: number;
}

export interface ImpactSection extends SectionBase {
    type: 'impact';
    title: string;
    displayType: 'stats' | 'graph';
    stats: StatItem[];
    graph?: GraphData;
    calculator?: ImpactCalculatorConfig;
}

export interface PricingItem {
    item: string;
    cost: string;
    isTotal?: boolean;
}

export interface InvestmentSection extends SectionBase {
    type: 'investment';
    title: string;
    elements: PricingItem[];
}

export interface BackCoverSection extends SectionBase {
    type: 'back_cover';
    title: string;
    content: string;
    copyrightText?: string;
    image?: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
}

export interface TeamSection extends SectionBase {
    type: 'team';
    title: string;
    subtitle?: string;
    members: TeamMember[];
}

export interface TimelineStep {
    date: string;
    title: string;
    description: string;
}

export interface TimelineSection extends SectionBase {
    type: 'timeline';
    title: string;
    subtitle?: string;
    steps: TimelineStep[];
}

export type ProposalSection = CoverSection | SynopsisSection | StorySection | ProblemSection | ContentSection | ImpactSection | InvestmentSection | TeamSection | TimelineSection | BackCoverSection;

export interface ProposalData {
    meta: ProposalMeta;
    theme: ProposalTheme;
    sections: ProposalSection[];
}
