import { createPageTemplate } from "@/lib/page-templates";

type BreadcrumbItem = {
  title: string;
  href?: string;
  isCurrent?: boolean;
}

export function createRoutePage(
  title: string,
  description: string,
  breadcrumbPath: BreadcrumbItem[]
) {
  return async function Page() {
    return createPageTemplate({
      title,
      description,
      breadcrumbPath,
      content: (
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-muted-foreground mb-8">{description}</p>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <p>This page is under development. Check back soon for updates.</p>
          </div>
        </div>
      )
    });
  }
} 