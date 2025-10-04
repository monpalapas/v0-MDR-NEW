"use client"

import { useState } from "react"
import AdminSidebar from "./admin-sidebar"
import AdminHeader from "./admin-header"
import AdminContent from "./admin-content"
import AdminHome from "./admin-home"

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  // Dummy logout handler
  const handleLogout = () => {
    // Implement logout logic here
    alert("Logged out!")
  }

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar: independent scroll */}
      <div className="h-full w-auto sm:w-80 lg:w-64 flex-shrink-0">
        <div className="h-full overflow-y-auto">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
      </div>
      {/* Main content and sticky footer */}
      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader onMenuToggle={() => setSidebarOpen((open) => !open)} onLogout={handleLogout} />
        <div className="flex-1 overflow-y-auto">
          <AdminContent activeSection={activeSection} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
