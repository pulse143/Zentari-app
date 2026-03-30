export interface TrustScore {
  current: number;
  previous: number;
  change: number;
  factors: {
    label: string;
    score: number;
    impact: 'positive' | 'negative' | 'neutral';
  }[];
}

export interface ImpactEvent {
  id: string;
  type: 'verification' | 'funding' | 'fraud_alert' | 'milestone';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'verified' | 'rejected';
  location?: string;
  value?: string;
  confidence?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  category: 'agriculture' | 'reforestation' | 'water' | 'education';
  trustScore: number;
  fundingGoal: number;
  fundingRaised: number;
  impactMetrics: {
    label: string;
    value: string;
    change: number;
  }[];
  timeline: {
    date: string;
    event: string;
    status: 'completed' | 'current' | 'upcoming';
  }[];
}

export interface Evidence {
  id: string;
  projectId: string;
  type: 'image' | 'document' | 'sensor' | 'witness';
  url: string;
  timestamp: string;
  aiFeedback: {
    label: string;
    confidence: number;
    insight: string;
  }[];
  status: 'pending' | 'verified' | 'flagged';
}

export interface FundingAllocation {
  projectId: string;
  amount: number;
  riskLevel: 'low' | 'medium' | 'high';
  aiRecommendation: string;
}
