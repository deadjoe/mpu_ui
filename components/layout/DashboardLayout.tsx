'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Database,
  Server,
  Settings,
  BarChart,
  Menu,
  LogOut,
  User,
  Bell,
  Command,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resources', href: '/dashboard/datacenters', icon: Database },
  { name: 'Services', href: '/dashboard/services', icon: Server },
  { name: 'Instances', href: '/dashboard/instances', icon: Settings },
  { name: 'Statistics', href: '/dashboard/statistics', icon: BarChart },
  { name: 'Users', href: '/dashboard/users', icon: Users },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r bg-background',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Command className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span
                  className="font-bold text-2xl tracking-wide bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent uppercase"
                  style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                  MPU
                </span>
                <span
                  className="text-base tracking-wide text-muted-foreground/90 font-bold"
                  style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                  For Enterprise
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 py-4">
          <nav className="grid gap-1 px-2">
            {navigation.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1">
        {/* Global Top Navigation */}
        <header
          className={cn(
            'fixed h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
            'flex items-center justify-between px-4 z-50',
            isCollapsed ? 'left-16 right-0' : 'left-64 right-0',
            'top-0'
          )}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:flex"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main
          className={cn(
            'fixed p-4 overflow-auto bg-background',
            isCollapsed ? 'left-16' : 'left-64',
            'right-0 top-16 bottom-0'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
