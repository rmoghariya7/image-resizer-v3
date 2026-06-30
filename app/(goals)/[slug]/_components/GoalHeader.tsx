import Link from "next/link";
import type { GoalDefinition } from "@/types/registry";

const CATEGORY_NAMES: Record<string, { label: string; href: string }> = {
  exam: { label: "Exam Photos", href: "/categories/exam" },
  "id-documents": { label: "ID Documents", href: "/categories/id-documents" },
  compress: { label: "Compress Image", href: "/categories/compress" },
  signature: { label: "Signature Tools", href: "/categories/signature" },
};

interface Props {
  goal: GoalDefinition;
}

export function GoalHeader({ goal }: Props) {
  const cat = CATEGORY_NAMES[goal.category];

  return (
    <div className="border-b border-gray-100 bg-white px-4 py-6 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb — server-rendered, crawlable */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" role="list">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Home
              </Link>
            </li>
            {cat && (
              <>
                <li aria-hidden="true" className="select-none">/</li>
                <li>
                  <Link href={cat.href} className="hover:text-indigo-600 transition-colors">
                    {cat.label}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="select-none">/</li>
            <li className="font-medium text-gray-900 line-clamp-1" aria-current="page">
              {goal.shortTitle}
            </li>
          </ol>
        </nav>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {goal.title}
        </h1>

        {/* Mobile: clamp to 2 lines to keep tool above the fold */}
        <p className="mt-3 text-base leading-relaxed text-gray-600 line-clamp-2 sm:mt-4 sm:text-lg sm:line-clamp-none">
          {goal.description}
        </p>

        {/* Long description — hidden on mobile (tool stays above fold), shown on sm+ */}
        {goal.longDescription && (
          <p className="mt-3 hidden text-sm leading-relaxed text-gray-500 sm:block">
            {goal.longDescription}
          </p>
        )}

        {/* Tags hidden on mobile — visible on sm+ only */}
        <div className="mt-6 hidden flex-wrap items-center gap-2 sm:flex">
          {goal.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
