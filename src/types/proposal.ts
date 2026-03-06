// New Interfaces for the revised structure
export interface ProposalTheme {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
    overlayOpacity?: number; // 0 to 1
}

export interface ProposalMeta {
    title: string;
    preparedFor: string;
    preparedBy: string;
    date: string;
    clientLogo?: string; // Base64 or URL
}

// --- Section Types ---

export interface SectionBase {
    id: string; // Unique ID for React keys and reordering
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
    icon: string; // '1', '2', '3'
}

// 1. Synopsis (formerly Executive Summary)
export interface SynopsisSection extends SectionBase {
    type: 'synopsis';
    title: string;
    content: string;
    summaryPillars: SummaryPillar[];
    image?: string;
}

// 2. Story (The "Why")
export interface StorySection extends SectionBase {
    type: 'story';
    title: string;
    subtitle?: string;
    content: string;
    image?: string;
    quote?: string;
}

// 3. Problem (The "Gap" or "Need")
export interface ProblemSection extends SectionBase {
    type: 'problem';
    title: string;
    description: string;
    points: { title: string; description: string }[];
    image?: string;
}

// 4. Content (Formerly Scope of Work / The "What")
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

// 5. Impact Charts (Formerly Stats)
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

// 6. Proposal (Formerly Pricing / Investment)
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

export interface VideoShowcaseSection extends SectionBase {
    type: 'video_showcase';
    title: string;
    description?: string;
    videoUrl: string;
}

export interface VideoStorySection extends SectionBase {
    type: 'video_story';
    title: string;
    subtitle?: string;
    content: string;
    videoUrl: string;
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

export type ProposalSection = CoverSection | SynopsisSection | StorySection | ProblemSection | ContentSection | ImpactSection | InvestmentSection | TeamSection | TimelineSection | BackCoverSection | VideoShowcaseSection | VideoStorySection;
export interface ProposalData {
    meta: ProposalMeta;
    theme: ProposalTheme;
    sections: ProposalSection[];
}


export const INITIAL_PROPOSAL_DATA: ProposalData = {
    meta: {
        title: "Partnership Proposal",
        preparedFor: "A.R. Mays Construction",
        preparedBy: "Grand Canyon University",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        clientLogo: ""
    },
    theme: {
        primaryColor: "#522398", // GCU Purple
        secondaryColor: "#E0E0E0", // Light Gray
        textColor: "#000000",
        backgroundColor: "#FFFFFF",
        fontFamily: "sans-serif"
    },
    sections: [
        {
            id: 'cover-1',
            type: 'cover',
            title: "Partnership Proposal",
            subtitle: "Find Your Purpose",
            image: "/assets/proposal-template/image1.jpeg"
        },
        // 1. Synopsis
        {
            id: 'synopsis-1',
            type: 'synopsis',
            title: "Synopsis",
            content: "Grand Canyon University (GCU) is a private Christian university located in Phoenix, Arizona, dedicated to helping students find their purpose. We propose a collaboration with A.R. Mays Construction to support workforce development and student success along 3 key pillars.",
            image: "/assets/proposal-template/image7.jpeg",
            summaryPillars: [
                {
                    title: "Workforce",
                    description: "Collaborating to anticipate hiring needs.",
                    icon: "1"
                },
                {
                    title: "Integration",
                    description: "Curriculum advice & talent pipelines.",
                    icon: "2"
                },
                {
                    title: "Impact",
                    description: "Community engagement & access.",
                    icon: "3"
                }
            ]
        },
        // 2. Story
        {
            id: 'story',
            type: 'story',
            title: "Our Shared Story",
            subtitle: "Building Communities Together",
            image: "/assets/proposal/cover-aerial.jpg",
            quote: "Education | Service | Integrity",
            content: "For over 75 years, GCU has been a beacon of education in the Southwest. Just as A.R. Mays builds physical foundations, we build the intellectual and spiritual foundations of the next generation. Together, our story is one of growth, resilience, and a commitment to excellence in the Phoenix valley."
        },
        // 3. Problem
        {
            id: 'problem-1',
            type: 'problem',
            title: "The Challenge",
            description: "The construction industry faces a critical shortage of qualified, values-driven leadership talent.",
            image: "/assets/proposal/basketball-action.jpg",
            points: [
                { title: "Talent Gap", description: "Difficulty finding job-ready graduates with practical management skills." },
                { title: "Retention", description: "High turnover rates in early-career professionals." },
                { title: "Culture Match", description: "Need for employees who align with core company values." }
            ]
        },
        // 4. Content (Scope)
        {
            id: 'content-1',
            type: 'content',
            title: "Strategic Content & Pillars",
            image: "/assets/proposal/crowd-purple.jpg",
            elements: [
                {
                    title: "Workforce Development Center",
                    description: "Collaborate to anticipate hiring needs within the mechanical pathway.",
                    items: [
                        "Premier Access to Students",
                        "Advisory Board Seat",
                        "Pathway Graduation Table"
                    ]
                },
                {
                    title: "Academic Integration",
                    description: "Integration into Construction Management via talent pipeline.",
                    items: [
                        "Talent Acquisition Pipeline",
                        "Guest Lecturing",
                        "Partner Wall Branding"
                    ]
                },
                {
                    title: "All Access Pass",
                    description: "Athletic passes to GCU games and events for client engagement.",
                    items: [
                        "Computery Athletic Passes",
                        "Client Hosting Opportunities",
                        "Team Nights"
                    ]
                }
            ]
        },
        // 5. Impact Charts (Stats)
        {
            id: 'impact-1',
            type: 'impact',
            title: "Impact & Reach",
            stats: [
                {
                    label: "On-Campus Students",
                    value: "25,000",
                    suffix: "+",
                    description: "Vibrant community"
                },
                {
                    label: "Online Learners",
                    value: "108,000",
                    suffix: "+",
                    description: "National reach"
                },
                {
                    label: "Total Enrollment",
                    value: "133,000",
                    suffix: "+",
                    description: "Projected Fall 2025"
                },
                {
                    label: "Tuition Freeze",
                    value: "17",
                    suffix: " Years",
                    description: "Affordability focus"
                }
            ],
            displayType: 'stats',
            // Defaulting to calculator view by omitting graph
            calculator: {
                costPerScholarship: 2500,
                costPerServiceHour: 50,
                minDonation: 1000,
                maxDonation: 50000,
                step: 1000
            }
        },
        // 6. Proposal (Investment)
        {
            id: 'proposal-1',
            type: 'investment',
            title: "The Proposal",
            elements: [
                {
                    item: "Annual Partnership Investment",
                    cost: "$10,000"
                },
                {
                    item: "Includes all recruiting, branding, and access benefits.",
                    cost: "",
                },
                {
                    item: "Total Commitment",
                    cost: "$10,000",
                    isTotal: true
                }
            ]
        },
        // 7. Back Cover (Legal)
        {
            id: 'back-cover-1',
            type: 'back_cover',
            title: "Thank You",
            content: "This proposal contains proprietary and confidential information of Grand Canyon University. It is submitted to the intended recipient with the understanding that it will be held in strict confidence and not disclosed, duplicated, or used, in whole or in part, for any purpose other than evaluation of this proposal, without the prior written consent of GCU.",
            copyrightText: "© 2025 Grand Canyon University. All Rights Reserved.",
            image: "/assets/proposal-template/image10.jpeg"
        }
    ]
};
