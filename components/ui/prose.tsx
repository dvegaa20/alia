import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

interface ProseProps {
  content: string | null | undefined
  size?: 'sm' | 'base' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'prose-sm',
  base: 'prose-base',
  lg: 'prose-lg',
  xl: 'prose-xl',
}

/**
 * Renders markdown content with consistent Tailwind Typography styling.
 * Safe by default — no dangerouslySetInnerHTML.
 * Supports bold, italic, lists, links, and line breaks from admin input.
 */
export function Prose({ content, size = 'base', className }: ProseProps) {
  if (!content) return null

  return (
    <div
      className={cn(
        'prose dark:prose-invert max-w-none',
        'prose-p:text-foreground-secondary prose-p:leading-relaxed',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-li:text-foreground-secondary',
        'prose-headings:text-foreground prose-headings:font-sans prose-headings:font-semibold',
        'prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5',
        sizeClasses[size],
        className
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
