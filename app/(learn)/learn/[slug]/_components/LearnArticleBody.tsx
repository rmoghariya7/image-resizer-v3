import type { ContentBlock, ArticleSection, LearnArticle } from '@/registry/learn/schema'

// ─── Block renderers ──────────────────────────────────────────────────────────

function ParagraphBlock({ text }: { text: string }) {
  return (
    <p className="leading-relaxed text-foreground/80">
      {text}
    </p>
  )
}

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-1" role="list">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 leading-relaxed text-foreground/80">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

function SubsectionBlock({
  id,
  heading,
  content,
}: {
  id:      string
  heading: string
  content: ContentBlock[]
}) {
  return (
    <div id={id} className="space-y-3">
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {heading}
      </h3>
      <BlockList blocks={content} />
    </div>
  )
}

function BlockList({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.type === 'paragraph') {
          return <ParagraphBlock key={i} text={block.text} />
        }
        if (block.type === 'list') {
          return <ListBlock key={i} items={block.items} />
        }
        if (block.type === 'subsection') {
          return (
            <SubsectionBlock
              key={i}
              id={block.id}
              heading={block.heading}
              content={block.content}
            />
          )
        }
        return null
      })}
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

function SectionBlock({ section }: { section: ArticleSection }) {
  return (
    <section id={section.id} aria-labelledby={`h-${section.id}`}>
      <h2
        id={`h-${section.id}`}
        className="text-xl font-semibold tracking-tight text-foreground"
      >
        {section.heading}
      </h2>
      <div className="mt-4 space-y-4">
        <BlockList blocks={section.content} />
      </div>
    </section>
  )
}

// ─── FAQ section ─────────────────────────────────────────────────────────────

function FaqSection({ faqs }: { faqs: LearnArticle['faqs'] }) {
  return (
    <section id="faqs" aria-labelledby="h-faqs" className="mt-12 pt-12 border-t border-border">
      <h2
        id="h-faqs"
        className="text-xl font-semibold tracking-tight text-foreground"
      >
        Frequently asked questions
      </h2>
      <div className="mt-6 space-y-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3 className="text-base font-medium text-foreground">
              {faq.question}
            </h3>
            <p className="mt-2 leading-relaxed text-foreground/80">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Table of contents ────────────────────────────────────────────────────────

export function TableOfContents({ article }: { article: LearnArticle }) {
  const tocItems: Array<{ id: string; title: string; level: 2 | 3 }> = []

  for (const section of article.sections) {
    tocItems.push({ id: section.id, title: section.heading, level: 2 })
    for (const block of section.content) {
      if (block.type === 'subsection') {
        tocItems.push({ id: block.id, title: block.heading, level: 3 })
      }
    }
  }
  tocItems.push({ id: 'faqs', title: 'Frequently asked questions', level: 2 })

  return (
    <nav aria-label="Table of contents" className="space-y-1">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Contents
      </p>
      {tocItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block rounded px-2 py-1 text-sm leading-snug transition-colors hover:bg-muted hover:text-foreground ${
            item.level === 3
              ? 'pl-5 text-muted-foreground'
              : 'text-foreground/70'
          }`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  )
}

// ─── Full article body ────────────────────────────────────────────────────────

export function LearnArticleBody({ article }: { article: LearnArticle }) {
  return (
    <div className="space-y-10">
      {/* Introduction */}
      <div className="space-y-4">
        {article.introduction.map((para, i) => (
          <p key={i} className="leading-relaxed text-foreground/80">
            {para}
          </p>
        ))}
      </div>

      {/* Sections */}
      {article.sections.map((section) => (
        <SectionBlock key={section.id} section={section} />
      ))}

      {/* FAQs */}
      <FaqSection faqs={article.faqs} />

      {/* Conclusion */}
      <section id="conclusion" className="mt-6 pt-6 border-t border-border">
        <p className="font-medium leading-relaxed text-foreground">
          {article.conclusion}
        </p>
      </section>
    </div>
  )
}
