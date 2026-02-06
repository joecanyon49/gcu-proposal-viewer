'use client';

import React from 'react';
import { ProposalData, ProposalSection, CoverSection, SynopsisSection, StorySection, ProblemSection, ContentSection, ImpactSection, InvestmentSection, BackCoverSection } from '@/types/proposal';
import clsx from 'clsx';
import { Quote, CheckCircle2, Star, Target, Zap, Layout, TrendingUp, DollarSign, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Area, AreaChart } from 'recharts';

const MAIN_PORTAL_URL = 'https://gcu-development-portal.vercel.app';

const Preview = ({ data }: { data: ProposalData }) => {

    // Helper: Dynamic Styles
    const getPrimaryColor = () => data.theme.primaryColor || '#522398';
    const getSecondaryColor = () => data.theme.secondaryColor || '#E0E0E0';
    const getTextColor = () => data.theme.textColor || '#000000';
    const getBgColor = () => data.theme.backgroundColor || '#FFFFFF';
    const getFont = () => data.theme.fontFamily || 'sans-serif';

    const primaryStyle = { color: getPrimaryColor() };
    const bgPrimaryStyle = { backgroundColor: getPrimaryColor() };
    const borderPrimaryStyle = { borderColor: getPrimaryColor() };
    const secondaryStyle = { color: getSecondaryColor() };
    const bgSecondaryStyle = { backgroundColor: getSecondaryColor() };

    // Common Section Container
    const SectionContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
        <div className={clsx(
            "relative w-full min-h-[1056px] flex flex-col p-16 break-before-page print:break-before-page overflow-hidden",
            className
        )} style={{ fontFamily: getFont(), backgroundColor: getBgColor(), color: getTextColor() }}>
            {children}
        </div>
    );

    // Common Header
    const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
        <div className="mb-12 relative z-10">
            <div className="flex items-center gap-3 mb-2">
                <div className="h-1 w-12 rounded-full" style={bgPrimaryStyle}></div>
                <span className="text-sm font-bold tracking-widest uppercase opacity-60">Grand Canyon University</span>
            </div>
            <h2 className="text-5xl font-extrabold uppercase tracking-tight text-gray-900 leading-none mb-4" style={{ color: getPrimaryColor() }}>
                {title}
            </h2>
            {subtitle && (
                <p className="text-xl font-light text-gray-500 max-w-2xl">{subtitle}</p>
            )}
        </div>
    );


    // --- SECTIONS ---

    const Cover = ({ section, meta }: { section: CoverSection, meta: any }) => (
        <div className="relative w-full h-[1056px] flex flex-col justify-end p-20 break-before-page text-white overflow-hidden" style={{ fontFamily: getFont() }}>
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {section.image && (
                    <img src={section.image.startsWith('/') ? `${MAIN_PORTAL_URL}${section.image}` : section.image} alt="Cover" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
                {/* Accent Overlay */}
                <div className="absolute inset-0 mix-blend-multiply transition-opacity duration-300" style={{ ...bgPrimaryStyle, opacity: data.theme.overlayOpacity ?? 0.6 }}></div>
            </div>

            {/* Top Left Logo */}
            <div className="absolute top-0 left-0 p-16 z-20">
                <img src="/assets/RunningLope_WHITE.png" alt="GCU" className="h-20 w-auto object-contain" />
            </div>

            {/* Content */}
            <div className="relative z-10 mb-12 animate-slide-up">
                <div className="w-24 h-2 mb-8 bg-white/80"></div>
                <h1 className="text-7xl font-extrabold uppercase tracking-tighter mb-4 leading-tight">
                    {section.title}
                </h1>
                <p className="text-3xl font-light opacity-90 mb-16 max-w-3xl">{section.subtitle}</p>

                <div className="grid grid-cols-2 gap-12 border-t border-white/20 pt-10">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Prepared For</p>
                        <p className="text-2xl font-bold">{meta.preparedFor}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">Prepared By</p>
                        <p className="text-2xl font-bold">{meta.preparedBy}</p>
                        <p className="text-sm opacity-60 mt-1">{meta.date}</p>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 p-16 z-20">
                {meta.clientLogo ? (
                    <img src={meta.clientLogo} alt="Client Logo" className="h-20 object-contain drop-shadow-lg bg-white/10 backdrop-blur-md p-2 rounded-lg" />
                ) : (
                    <div className="text-right">
                        <div className="text-4xl font-black tracking-tighter opacity-20">PROPOSAL</div>
                    </div>
                )}
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 border-t-[32px] border-l-[32px] border-white/10 rounded-tl-[100px] pointer-events-none"></div>
        </div>
    );

    const Synopsis = ({ section }: { section: SynopsisSection }) => (
        <SectionContainer>
            <SectionHeader title={section.title} subtitle="Executive Summary" />

            <div className="flex flex-col-reverse lg:flex-row gap-16 flex-1">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="prose prose-lg text-gray-600 mb-12 text-justify leading-relaxed">
                        {section.content}
                    </div>

                    <div className="space-y-6">
                        {(section.summaryPillars || []).map((pillar, i) => (
                            <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0" style={bgPrimaryStyle}>
                                    {pillar.icon === '1' && <Target size={28} />}
                                    {pillar.icon === '2' && <Zap size={28} />}
                                    {pillar.icon === '3' && <Star size={28} />}
                                    {!['1', '2', '3'].includes(pillar.icon) && pillar.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{pillar.title}</h4>
                                    <p className="text-gray-500 leading-snug">{pillar.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-5/12 relative">
                    <div className="absolute inset-0 rounded-[4rem] transform rotate-3 opacity-20" style={bgPrimaryStyle}></div>
                    <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                        {section.image ? (
                            <img src={section.image.startsWith('/') ? `${MAIN_PORTAL_URL}${section.image}` : section.image} alt="Synopsis" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">NO IMAGE</div>
                        )}
                        {/* Overlay Text */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <p className="font-bold text-lg uppercase tracking-wider">Our Commitment</p>
                            <p className="text-sm opacity-80">Building foundations for the future.</p>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );

    const Story = ({ section }: { section: StorySection }) => (
        <SectionContainer className="justify-center items-center text-center !p-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(${getPrimaryColor()} 2px, transparent 2px)`, backgroundSize: '30px 30px' }}></div>

            <div className="relative z-10 max-w-4xl">
                <div className="inline-block p-4 px-8 rounded-full bg-gray-100 text-gray-500 font-bold uppercase tracking-widest text-sm mb-8 animate-fade-in">
                    {section.title}
                </div>

                <h2 className="text-6xl font-black text-gray-900 mb-12 leading-tight">
                    {section.subtitle || "Building a Legacy Together"}
                </h2>

                <div className="relative mb-16">
                    <Quote className="absolute -top-10 -left-12 opacity-10 transform -scale-x-100" size={120} style={{ color: getPrimaryColor() }} />
                    <p className="text-2xl md:text-3xl font-serif italic text-gray-600 leading-relaxed relative z-10">
                        "{section.content}"
                    </p>
                </div>

                {section.image && (
                    <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl mt-12 relative group">
                        <img src={section.image.startsWith('/') ? `${MAIN_PORTAL_URL}${section.image}` : section.image} alt="Story" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-8 py-4 rounded-xl shadow-lg text-center">
                            <p className="font-bold text-gray-900">{section.quote || "Our Shared Vision"}</p>
                        </div>
                    </div>
                )}
            </div>
        </SectionContainer>
    );

    const Problem = ({ section }: { section: ProblemSection }) => (
        <SectionContainer>
            <SectionHeader title={section.title} subtitle="Understanding the Landscape" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 flex-1 items-center">
                <div>
                    <p className="text-3xl font-light text-gray-700 mb-12 leading-normal border-l-4 pl-6" style={borderPrimaryStyle}>
                        {section.description}
                    </p>

                    <div className="space-y-6">
                        {section.points.map((point, i) => (
                            <div key={i} className="flex gap-6 items-start">
                                <div className="mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold" style={bgSecondaryStyle}>
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{point.title}</h4>
                                    <p className="text-gray-500 mt-1">{point.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative h-full min-h-[500px] w-full bg-gray-100 rounded-[3rem] overflow-hidden shadow-inner">
                    {section.image ? (
                        <div className="absolute inset-0">
                            <img src={section.image.startsWith('/') ? `${MAIN_PORTAL_URL}${section.image}` : section.image} alt="Problem" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40"></div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <Layout size={200} />
                        </div>
                    )}
                </div>
            </div>
        </SectionContainer>
    );

    const Content = ({ section }: { section: ContentSection }) => (
        <SectionContainer>
            <SectionHeader title={section.title} subtitle="Strategic Roadmap" />

            <div className="grid grid-cols-12 gap-12 flex-1">
                {/* Left Column: List */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    {section.elements.map((el, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-300 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <h4 className="text-9xl font-black text-gray-900">{i + 1}</h4>
                            </div>

                            <div className="relative z-10 flex gap-6">
                                <div className="w-2 h-24 rounded-full flex-shrink-0" style={bgPrimaryStyle}></div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{el.title}</h3>
                                    <p className="text-gray-600 mb-6 font-medium">{el.description}</p>
                                    <div className="flex flex-wrap gap-3">
                                        {el.items.map((item, j) => (
                                            <span key={j} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-sm font-semibold text-gray-700 border border-gray-200">
                                                <CheckCircle2 size={14} style={{ color: getPrimaryColor() }} />
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Visual/Sidebar */}
                <div className="col-span-0 lg:col-span-4 hidden lg:flex flex-col gap-6">
                    <div className="flex-1 bg-gray-900 rounded-3xl overflow-hidden relative text-white p-10 flex flex-col justify-end shadow-2xl">
                        {section.image && (
                            <img src={section.image.startsWith('/') ? `${MAIN_PORTAL_URL}${section.image}` : section.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Sidebar" />
                        )}
                        <div className="relative z-10">
                            <h4 className="text-3xl font-bold mb-4">Scope Summary</h4>
                            <p className="opacity-80 mb-8">A comprehensive approach tailored to your specific organizational needs.</p>
                            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );

    const GivingImpactCalculator = ({ primaryColor, config }: { primaryColor: string, config?: { costPerScholarship: number, costPerServiceHour: number, minDonation?: number, maxDonation?: number, step?: number } }) => {

        // Defaults if not provided
        const costPerScholarship = config?.costPerScholarship || 2500;
        const costPerServiceHour = config?.costPerServiceHour || 50;
        const minDonation = config?.minDonation || 1000;
        const maxDonation = config?.maxDonation || 50000;
        const step = config?.step || 1000;

        const [amount, setAmount] = React.useState(minDonation);

        const scholarships = Math.floor(amount / costPerScholarship);
        const serviceHours = Math.floor(amount / costPerServiceHour);

        // Calculate percentage for slider position
        const percentage = ((amount - minDonation) / (maxDonation - minDonation)) * 100;

        return (
            <div
                id="impact-calculator-container"
                data-cost-scholarship={costPerScholarship}
                data-cost-hour={costPerServiceHour}
                data-min={minDonation}
                data-max={maxDonation}
                data-primary-color={primaryColor}
                className="absolute inset-0 flex flex-col items-center justify-center p-8"
            >
                <div className="w-full max-w-lg space-y-10 animate-fade-in">
                    <div className="space-y-6">
                        <div className="flex justify-between items-end text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <span>Contribution</span>
                            <span id="impact-amount-display" className="text-3xl font-black" style={{ color: primaryColor }}>${amount.toLocaleString()}</span>
                        </div>
                        <div className="relative h-4 bg-gray-100 rounded-full print:hidden">
                            <div
                                id="impact-slider-fill"
                                className="absolute top-0 left-0 h-full rounded-full transition-all duration-75"
                                style={{ backgroundColor: primaryColor, width: `${percentage}%` }}
                            />
                            <input
                                id="impact-slider-input"
                                type="range"
                                min={minDonation}
                                max={maxDonation}
                                step={step}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div
                                id="impact-slider-thumb"
                                className="absolute top-1/2 w-6 h-6 bg-white border-2 rounded-full shadow-md pointer-events-none transition-all duration-75"
                                style={{ left: `${percentage}%`, borderColor: primaryColor, transform: `translate(-50%, calc(-50% + 0.5px))` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs font-medium text-gray-400 print:hidden">
                            <span>${minDonation.toLocaleString()}</span>
                            <span>${maxDonation.toLocaleString()}+</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className="mb-2 p-3 rounded-full bg-purple-50 text-purple-600">
                                <Target size={24} style={{ color: primaryColor }} />
                            </div>
                            <div id="impact-scholarships-display" className="text-4xl font-black text-gray-900 mb-1 transition-all">{scholarships}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Scholarships Funded</div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className="mb-2 p-3 rounded-full bg-blue-50 text-blue-600">
                                <Zap size={24} style={{ color: primaryColor }} />
                            </div>
                            <div id="impact-hours-display" className="text-4xl font-black text-gray-900 mb-1 transition-all">{serviceHours.toLocaleString()}+</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Hours of Impact</div>
                        </div>
                    </div>

                    <p className="text-center text-xs font-medium text-gray-400 max-w-xs mx-auto print:hidden">
                        Drag the slider to see how your contribution directly impacts our students and community.
                    </p>
                </div>
            </div>
        );
    };

    const Impact = ({ section }: { section: ImpactSection }) => (
        <SectionContainer>
            <SectionHeader title={section.title} subtitle="Measurable Outcomes" />

            <div className="flex flex-col gap-12 flex-1 min-h-0">
                {/* Stats Row */}
                <div className="flex flex-wrap gap-4 shrink-0 w-full">
                    {section.stats.map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl shadow-lg border-t-4 text-center hover:-translate-y-1 transition-transform duration-500 flex flex-col items-center justify-center min-h-[160px] flex-1 min-w-[150px]" style={{ borderColor: i % 2 === 0 ? getPrimaryColor() : getSecondaryColor() }}>
                            <div className="flex items-baseline justify-center gap-1 mb-2 w-full px-2">
                                <span
                                    className={clsx(
                                        "font-black tracking-tighter leading-none text-center whitespace-nowrap",
                                        section.stats.length >= 4 ? "text-xl lg:text-2xl" : stat.value.length > 4 ? "text-3xl" : "text-4xl"
                                    )}
                                    style={{ color: getPrimaryColor() }}
                                >
                                    {stat.value}
                                </span>
                                {stat.suffix && (
                                    <span className={clsx(
                                        "font-bold text-gray-400 mt-1",
                                        section.stats.length >= 4 ? "text-[10px]" : "text-sm"
                                    )}>{stat.suffix}</span>
                                )}
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 line-clamp-2">{stat.label}</p>
                            {stat.description && <p className="text-[10px] text-gray-500 font-medium line-clamp-2">{stat.description}</p>}
                        </div>
                    ))}
                </div>

                {/* Graph / Data Analysis Area */}
                <div className="flex-1 bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-inner relative flex flex-col min-h-[350px]">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h3 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                            {section.graph && section.graph.data.length > 0 ? <TrendingUp size={20} /> : <Calculator size={20} />}
                            {section.graph && section.graph.data.length > 0 ? "Data Analysis" : "Impact Calculator"}
                        </h3>
                        {section.graph && section.graph.data.length > 0 && (
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                    <span className="w-3 h-3 rounded-full" style={bgPrimaryStyle}></span> Projected
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 w-full relative">
                        {section.graph && section.graph.data.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                {section.graph.type === 'bar' ? (
                                    <BarChart data={section.graph.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                        <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                        <Bar dataKey="value" fill={getPrimaryColor()} radius={[6, 6, 0, 0]} barSize={50} animationDuration={1000} />
                                    </BarChart>
                                ) : section.graph.type === 'pie' ? (
                                    <PieChart>
                                        <Pie data={section.graph.data} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                                            {section.graph.data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={[getPrimaryColor(), getSecondaryColor(), '#10b981', '#f59e0b', '#6366f1'][index % 5]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                ) : (
                                    <AreaChart data={section.graph.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={getPrimaryColor()} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={getPrimaryColor()} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                        <Area type="monotone" dataKey="value" stroke={getPrimaryColor()} fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} animationDuration={1000} />
                                    </AreaChart>
                                )}
                            </ResponsiveContainer>
                        ) : (
                            <GivingImpactCalculator primaryColor={getPrimaryColor()} config={section.calculator} />
                        )}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );

    const Investment = ({ section }: { section: InvestmentSection }) => (
        <SectionContainer className="justify-center items-center">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            <div className="max-w-4xl w-full">
                <div className="text-center mb-16">
                    <h2 className="text-6xl font-black uppercase tracking-tight mb-4" style={{ color: getPrimaryColor() }}>{section.title}</h2>
                    <p className="text-xl text-gray-500">Partnership Commitment</p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden relative">
                    <div className="h-4 w-full" style={bgPrimaryStyle}></div>
                    <div className="p-16 flex flex-col gap-10">
                        {section.elements.map((el, i) => (
                            <React.Fragment key={i}>
                                {el.isTotal ? (
                                    <div className="mt-8 pt-10 border-t-2 border-dashed border-gray-200">
                                        <div className="flex justify-between items-end">
                                            <span className="text-2xl font-bold text-gray-400 uppercase tracking-widest">{el.item}</span>
                                            <span className="text-7xl font-black tracking-tighter" style={{ color: getPrimaryColor() }}>{el.cost}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-lg bg-gray-50 text-gray-400 group-hover:bg-gray-100 transition-colors">
                                                <DollarSign size={20} />
                                            </div>
                                            <span className="text-xl font-semibold text-gray-700">{el.item}</span>
                                        </div>
                                        <span className="text-2xl font-bold text-gray-900">{el.cost || "—"}</span>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="bg-gray-50 px-16 py-8 text-center border-t border-gray-100">
                        <p className="text-gray-500 text-sm font-medium">
                            This proposal is valid for 30 days from presentation.
                        </p>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );

    const Team = ({ section }: { section: any }) => (
        <SectionContainer>
            <SectionHeader title={section.title} subtitle="Meet the Experts" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {(section.members || []).map((member: any, i: number) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
                        <div className="h-24 bg-gray-100 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={bgPrimaryStyle}></div>
                        </div>
                        <div className="px-6 relative">
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md -mt-12 overflow-hidden bg-gray-200 mx-auto">
                                <img src={member.image || `${MAIN_PORTAL_URL}/assets/proposal/avatar-placeholder.jpg`} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="p-6 text-center">
                            <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                            <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: getPrimaryColor() }}>{member.role}</p>
                            <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );

    const Timeline = ({ section }: { section: any }) => (
        <SectionContainer>
            <SectionHeader title={section.title} subtitle="Implementation Roadmap" />
            <div className="relative py-10 flex-1">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
                <div className="space-y-16 relative">
                    {(section.steps || []).map((step: any, i: number) => (
                        <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="hidden md:block w-1/2"></div>
                            <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow transform -translate-x-1/2" style={bgPrimaryStyle}></div>
                            <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-lg transition-shadow">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style={bgPrimaryStyle}>
                                        {step.date}
                                    </span>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                                    <p className="text-gray-500">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );

    const BackCover = ({ section, meta }: { section: BackCoverSection, meta: any }) => (
        <div className="relative w-full h-[1056px] flex flex-col justify-center p-20 break-before-page overflow-hidden bg-gray-900 text-white" style={{ fontFamily: getFont() }}>
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {section.image ? (
                    <img src={section.image.startsWith('/') ? `${MAIN_PORTAL_URL}${section.image}` : section.image} alt="Back Cover" className="w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0" style={bgPrimaryStyle}></div>
                )}
                {section.image && (
                    <div className="absolute inset-0 bg-black/80"></div>
                )}
                {/* Geometric Accent */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] border-[2px] border-white/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[1px] border-white/10 rounded-full"></div>
                </div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-12">
                {/* Logo or Brand Mark */}
                <div className="flex justify-center mb-12">
                    <img
                        src="/assets/RunningLope_WHITE.png"
                        alt="GCU Lope"
                        className="h-32 object-contain opacity-90 drop-shadow-2xl"
                    />
                </div>

                <h1 className="text-6xl font-black uppercase tracking-tight leading-none drop-shadow-lg">
                    {section.title}
                </h1>

                <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>

                <div className="text-xs font-light text-gray-300 leading-relaxed text-justify opacity-80 uppercase tracking-wide">
                    {section.content}
                </div>

                <div className="pt-20 border-t border-white/10 mt-12">
                    <p className="text-sm font-bold tracking-widest uppercase mb-2">Grand Canyon University</p>
                    <p className="text-xs text-gray-400">3300 West Camelback Road, Phoenix, AZ 85017</p>
                    <p className="text-xs text-gray-400 mt-1">gcu.edu</p>

                    {section.copyrightText && (
                        <p className="text-[10px] text-gray-500 mt-8 font-mono">{section.copyrightText}</p>
                    )}
                </div>
            </div>
        </div>
    );

    // --- MAIN RENDER ---
    return (
        <div className="w-full max-w-[816px] mx-auto bg-white shadow-2xl my-10 overflow-hidden print:w-full print:max-w-none print:shadow-none print:my-0">
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;600;800&family=Open+Sans:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Roboto:wght@300;400;500;700&display=swap');`}
            </style>
            {data.sections.map((section) => (
                <div key={section.id} data-section-id={section.id}>
                    {section.type === 'cover' && <Cover section={section as CoverSection} meta={data.meta} />}
                    {section.type === 'synopsis' && <Synopsis section={section as SynopsisSection} />}
                    {section.type === 'story' && <Story section={section as StorySection} />}
                    {section.type === 'problem' && <Problem section={section as ProblemSection} />}
                    {section.type === 'content' && <Content section={section as ContentSection} />}
                    {section.type === 'impact' && <Impact section={section as ImpactSection} />}
                    {section.type === 'investment' && <Investment section={section as InvestmentSection} />}
                    {section.type === 'back_cover' && <BackCover section={section as BackCoverSection} meta={data.meta} />}
                    {section.type === 'team' && <Team section={section} />}
                    {section.type === 'timeline' && <Timeline section={section} />}
                </div>
            ))}
        </div>
    );
};

export default Preview;
