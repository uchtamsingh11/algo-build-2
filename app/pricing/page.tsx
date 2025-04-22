import { createPageTemplate } from "@/lib/page-templates";
import DashboardPricing from "@/components/dashboard-pricing";

export default async function Page() {
  return createPageTemplate({
    title: "Pricing Plans",
    description: "Choose the right plan for your trading needs.",
    breadcrumbPath: [
      { title: "Dashboard", href: "/dashboard" },
      { title: "Pricing", isCurrent: true }
    ],
    content: (
      <div className="py-4">
        <DashboardPricing />
      </div>
    )
  });
} 