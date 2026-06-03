'use client'

import { Archive, FileText, Home, KeyRound, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/', label: 'Vault', icon: Home },
  { href: '/notes', label: 'Notes', icon: KeyRound },
  { href: '/my', label: 'My Notes', icon: UserRound },
  { href: '/archive', label: 'Archive', icon: Archive }
]

export function TopTabs() {
  const pathname = usePathname()

  return (
    <nav className="top-tabs" aria-label="Primary navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
        return (
          <Link className={active ? 'tab active' : 'tab'} href={tab.href} key={tab.href}>
            <Icon size={16} />
            <span>{tab.label}</span>
          </Link>
        )
      })}
      <Link className={pathname.startsWith('/note') ? 'tab active detail-tab' : 'tab detail-tab'} href="/note/slot-001">
        <FileText size={16} />
        <span>Detail</span>
      </Link>
    </nav>
  )
}
