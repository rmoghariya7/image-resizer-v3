import { getGoal } from '@/registry/goals'

const TOKEN_RE = /\{\{goal:([a-z0-9-]+)\}\}/g

/**
 * Converts `{{goal:slug}}` tokens in FAQ answer strings into clickable anchor tags.
 * Runs server-side only — tokens are resolved at render time, not stored.
 */
export function resolveGoalLinks(text: string): React.ReactNode[] {
  const re = new RegExp(TOKEN_RE.source, TOKEN_RE.flags)
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const slug = match[1]
    const label = getGoal(slug)?.shortTitle ?? slug
    parts.push(
      <a
        key={slug}
        href={`/goals/${slug}`}
        className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-500 transition-colors"
      >
        {label}
      </a>,
    )
    lastIndex = re.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

/**
 * Strips `{{goal:slug}}` tokens from a string, replacing them with the goal's
 * shortTitle. Used for plain-text contexts such as JSON-LD structured data.
 */
export function stripGoalTokens(text: string): string {
  return text.replace(/\{\{goal:([a-z0-9-]+)\}\}/g, (_match, slug: string) => {
    return getGoal(slug)?.shortTitle ?? slug
  })
}
