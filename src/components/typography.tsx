import clsx from 'clsx'
import { ReactNode } from 'react'

interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'p'
    | 'blockquote'
    | 'list'
    | 'code'
    | 'lead'
    | 'large'
    | 'small'
    | 'muted'
  children: ReactNode
}

interface mapTagsProps {
  h1: 'h1'
  h2: 'h2'
  h3: 'h3'
  h4: 'h4'
  p: 'p'
  blockquote: 'blockquote'
  code: 'code'
  list: 'ul'
  lead: 'p'
  large: 'div'
  small: 'small'
  muted: 'p'
}

const mapTags: mapTagsProps = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  blockquote: 'blockquote',
  code: 'code',
  list: 'ul',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
}

export function Typography({ variant = 'p', children }: TypographyProps) {
  const Tag = mapTags[variant]
  return (
    <Tag
      className={clsx(
        variant === 'h1' &&
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        variant === 'h2' &&
          'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        variant === 'h3' && 'scroll-m-20 text-2xl font-semibold tracking-tight',
        variant === 'h4' && 'scroll-m-20 text-xl font-semibold tracking-tight',
        variant === 'p' && 'leading-7 [&:not(:first-child)]:mt-6',
        variant === 'blockquote' && 'mt-6 border-l-2 pl-6 italic',
        variant === 'code' &&
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        variant === 'list' && 'my-6 ml-6 list-disc [&>li]:mt-2',
        variant === 'lead' && 'text-xl text-muted-foreground',
        variant === 'large' && 'text-lg font-semibold',
        variant === 'small' && 'text-sm font-medium leading-none',
        variant === 'muted' && 'text-sm text-muted-foreground',
      )}
    >
      {children}
    </Tag>
  )
}
