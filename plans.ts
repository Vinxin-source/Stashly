export type PlanId = "free" | "pro";

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  highlighted?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Everything you need to start organising your craft",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "Up to 25 yarns in your stash",
      "Up to 5 active projects",
      "Basic search & filters",
      "Beautiful, calm interface",
      "Magic link sign-in",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For makers who want unlimited calm organisation",
    priceMonthly: 9,
    priceYearly: 79,
    highlighted: true,
    features: [
      "Unlimited yarns",
      "Unlimited projects",
      "Photo uploads",
      "Advanced filters & insights",
      "Priority support",
      "Early access to new features",
      "Export your data anytime",
    ],
  },
];

export function formatPrice(amount: number, period: "month" | "year" = "month") {
  if (amount === 0) return "Free";
  return period === "month" ? `$${amount}/mo` : `$${amount}/year`;
}
