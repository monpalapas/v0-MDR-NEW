"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  X,
  ChevronDown,
  ChevronRight,
  Info,
  Megaphone,
  FolderOpen,
} from "lucide-react"
import { useState } from "react"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuSections = [
  {
    id: "about",
    label: "About Us",
    icon: Info,
    items: [
      { id: "drrm-council-management", label: "DRRM Council", path: "/components/admin/drrm-council-management.tsx" },
      { id: "personnel-management", label: "MDRRMO Personnel", path: "/components/admin/personnel-management.tsx" },
    ],
  },
  {
    id: "information",
    label: "Information",
    icon: Megaphone,
    items: [
      { id: "announcement-management", label: "Announcement", path: "/components/admin/announcement-management.tsx" },
      { id: "weather-updates", label: "Weather Updates", path: "" },
      { id: "news-management", label: "News & Advisories", path: "/components/admin/news-management.tsx" },
      { id: "activities-management", label: "Events & Activities", path: "/components/admin/activities-management.tsx" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: FolderOpen,
    items: [
      { id: "video-management", label: "Video Gallery", path: "/components/admin/video-management.tsx" },
      { id: "gallery-management", label: "Photo Gallery", path: "/components/admin/gallery-management.tsx" },
      { id: "resources-management", label: "Public Documents", path: "/components/admin/resources-management.tsx" },
      { id: "maps-management", label: "Hazard Maps", path: "/components/admin/maps-management.tsx" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: ClipboardList,
    items: [
      { id: "incident-management", label: "Incident Report", path: "/components/admin/incident-management.tsx" },
      { id: "public-message", label: "Public Message", path: "/components/admin/public-message.tsx" },
    ],
  },
  {
    id: "others",
    label: "Others",
    icon: LayoutDashboard,
    items: [
      { id: "quick-links-management", label: "Quick Links", path: "/components/admin/quick-links-management.tsx" },
      { id: "alerts-management", label: "Alert", path: "/components/admin/alerts-management.tsx" },
      { id: "hotlines-management", label: "Hotlines", path: "/components/admin/hotline-management.tsx" },
      { id: "barangay-portal", label: "Barangay Portal", path: "/components/admin/barangay-portal.tsx" },
    ],
  },
  {
    id: "system",
    label: "System Tools",
    icon: Settings,
    items: [
      { id: "response", label: "Response Tracking", path: "" },
      { id: "analytics", label: "Analytics", path: "" },
      { id: "settings", label: "Settings", path: "" },
    ],
  },
]

export function AdminSidebar({ isOpen, onClose, activeSection, onSectionChange }: AdminSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "about",
    "information",
    "resources",
    "reports",
    "others",
    "system",
  ])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-blue-950 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-blue-900 p-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <span className="text-blue-950 font-bold text-sm">MD</span>
              </div>
              <span className="font-semibold">MDRRMO</span>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-blue-900" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto space-y-1 p-4">
            {menuSections.map((section) => {
              const SectionIcon = section.icon
              const isExpanded = expandedSections.includes(section.id)

              return (
                <div key={section.id} className="space-y-1">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-900 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <SectionIcon className="h-4 w-4" />
                      <span className="uppercase text-xs tracking-wider">{section.label}</span>
                    </div>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>

                  {/* Section Items */}
                  {isExpanded && (
                    <div className="ml-4 space-y-1">
                      {section.items.map((item) => {
                        const isActive = activeSection === item.id

                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              onSectionChange(item.id)
                              onClose()
                            }}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                              isActive ? "bg-yellow-500 text-blue-950" : "text-white hover:bg-blue-900",
                            )}
                          >
                            {item.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-blue-900 p-4">
            <div className="text-xs text-blue-300">© {new Date().getFullYear()} MDRRMO Pio Duran</div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
