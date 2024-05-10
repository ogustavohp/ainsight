'use client'
import React from 'react'
import { Typography } from './typography'
import { ModeToggle } from './mode-toggle'
import { Separator } from './ui/separator'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export function Header() {
  return (
    <>
      <header>
        <div className="flex px-6 py-3 justify-between items-center">
          <Typography variant="h1">AInsight</Typography>
          <div className="flex items-center gap-2">
            <Link
              href={'https://github.com/ogustavohp/ainsight'}
              className="flex items-center gap-2 px-2 h-9 rounded-md border text-sm hover:bg-primary/10"
              target="_blank"
            >
              <Typography variant="small">GitHub</Typography>
              <GitHubLogoIcon className="size-6" />
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <ModeToggle />
          </div>
        </div>
        <Separator />
      </header>
    </>
  )
}
