import { JSX } from 'react'
import type { LinkDefinition } from '@atproto/oauth-provider-api'
import { Override } from '#/lib/util.ts'
import { LinkExternal } from './link-external.tsx.js'
import { LinkTitle } from './link-title.tsx.js'

export type LinkAnchorProps = Override<
  JSX.IntrinsicElements['a'],
  {
    link: LinkDefinition
  }
>
export function LinkAnchor({
  link,

  // a
  children = <LinkTitle link={link} />,
  href = link.href,
  rel = link.rel,
  ...props
}: LinkAnchorProps) {
  return (
    <LinkExternal {...props} href={href} rel={rel}>
      {children}
    </LinkExternal>
  )
}
