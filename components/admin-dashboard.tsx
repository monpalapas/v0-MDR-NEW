"use client"

import { useState } from "react"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertTriangle, Calendar, FileText, TrendingUp, Activity, MapPin, Bell } from "lucide-react"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  const stats = [
    {
      title: "Active Personnel",
      value: "45",
      change: "+3 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Alerts",
      value: "2",
      change: "1 critical",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Upcoming Events",
      value: "8",
      change: "Next: Feb 15",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Incident Reports",
      value: "12",
      change: "This week",
      icon: FileText,
      color: "text-yellow-600",
    },
  ]

  const recentActivities = [
    { id: 1, type: "alert", message: "New flood warning issued for Barangay San Jose", time: "2 hours ago" },
    { id: 2, type: "incident", message: "Fire incident reported at Poblacion", time: "5 hours ago" },
    { id: 3, type: "event", message: "Emergency drill scheduled for next week", time: "1 day ago" },
    { id: 4, type: "personnel", message: "New personnel added to Emergency Response team", time: "2 days ago" },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-blue-950 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome to the MDRRMO Admin Panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-950">{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Latest updates and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                        <div className="w-2 h-2 rounded-full bg-blue-950 mt-2" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                      <Bell className="h-6 w-6 text-blue-950 mb-2" />
                      <p className="text-sm font-medium text-blue-950">Send Alert</p>
                    </button>
                    <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-left">
                      <FileText className="h-6 w-6 text-yellow-600 mb-2" />
                      <p className="text-sm font-medium text-blue-950">New Report</p>
                    </button>
                    <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                      <Calendar className="h-6 w-6 text-purple-600 mb-2" />
                      <p className="text-sm font-medium text-blue-950">Schedule Event</p>
                    </button>
                    <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                      <MapPin className="h-6 w-6 text-green-600 mb-2" />
                      <p className="text-sm font-medium text-blue-950">View Map</p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )

      case "drrm-council":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">DRRM Council</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">DRRM Council management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "personnel":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">MDRRMO Personnel</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Personnel management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "announcement":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Announcements</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Announcement management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "weather":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Weather Updates</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Weather updates management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "news":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">News & Advisories</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">News and advisories management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "activities":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Events & Activities</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Events and activities management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "video":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Video Gallery</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Video gallery management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "gallery":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Photo Gallery</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Photo gallery management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "documents":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Public Documents</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Public documents management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "maps":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Hazard Maps</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Hazard maps management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "incident":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Incident Reports</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Incident report management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "public-message":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Public Messages</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Public message management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "quick-links":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Quick Links</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Quick links management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "alerts":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Alerts</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Alert management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "hotlines":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Hotlines</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Hotlines management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "barangay":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Barangay Portal</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Barangay portal management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "response":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Response Tracking</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Response tracking content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "analytics":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Analytics</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Analytics content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Settings</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Settings content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-4">Page Not Found</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">The requested section could not be found.</p>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className="h-full w-72 sm:w-80 lg:w-64 flex-shrink-0">
        <div className="h-full overflow-y-auto">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader onMenuToggle={() => setSidebarOpen((open) => !open)} onLogout={() => {}} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>

        <footer className="sticky bottom-0 w-full bg-blue-950 text-white border-t-4 border-yellow-500 shadow-lg z-50">
          <div className="text-center py-3">
            &copy; {new Date().getFullYear()} MDRRMO Pio Duran Admin Panel. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  )
}
