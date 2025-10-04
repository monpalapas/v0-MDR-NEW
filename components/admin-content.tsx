import DRRMCCouncilManagement from "./admin/drrm-council-management"
import PersonnelManagement from "./admin/personnel-management"
import AnnouncementManagement from "./admin/announcement-management"
import NewsManagement from "./admin/news-management"
import ActivitiesManagement from "./admin/activities-management"
import VideoManagement from "./admin/video-management"
import GalleryManagement from "./admin/gallery-management"
import ResourcesManagement from "./admin/resources-management"
import IncidentManagement from "./admin/incident-management"
import MapsManagement from "./admin/maps-management"
import PublicMessage from "./admin/public-message"
import QuickLinksManagement from "./admin/quick-links-management"
import AlertsManagement from "./admin/alerts-management"
import HotlineManagement from "./admin/hotline-management"
import { default as BarangayPortal } from "./admin/barangay-portal"
import { Users, AlertTriangle, UserCheck, Wrench, Megaphone, Newspaper, CalendarPlus, Upload, Plus, User, Edit, CloudSun, Droplets, Wind, CloudRain, Map, FileText, Image, Video, MessageCircle } from "lucide-react"

interface AdminContentProps {
  activeSection: string
}

export default function AdminContent({ activeSection }: AdminContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "drrm-council-management":
        return <DRRMCCouncilManagement />
      case "personnel-management":
        return <PersonnelManagement />
      case "announcement-management":
        return <AnnouncementManagement />
      case "news-management":
        return <NewsManagement />
      case "activities-management":
        return <ActivitiesManagement />
      case "video-management":
        return <VideoManagement />
      case "gallery-management":
        return <GalleryManagement />
      case "resources-management":
        return <ResourcesManagement />
      case "incident-management":
        return <IncidentManagement />
      case "maps-management":
        return <MapsManagement />
      case "public-message":
        return <PublicMessage />
      case "quick-links-management":
        return <QuickLinksManagement />
      case "alerts-management":
        return <AlertsManagement />
      case "hotline-management":
        return <HotlineManagement />
      case "barangay-portal":
        return <BarangayPortal />
      default:
        return <DashboardContent />
    }
  }

  return (
    <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-900 p-3 sm:p-4 lg:p-6">
      {renderContent()}
    </main>
  )
}

function DashboardContent() {
  return (
    <>
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <StatCard title="Total Personnel" value="24" icon={<Users className="w-7 h-7 text-blue-700" />} gradient="from-blue-100 to-blue-300" />
        <StatCard title="Active Incidents" value="3" icon={<AlertTriangle className="w-7 h-7 text-red-600" />} gradient="from-red-100 to-red-300" />
        <StatCard title="Response Teams" value="8" icon={<UserCheck className="w-7 h-7 text-green-600" />} gradient="from-green-100 to-green-300" />
        <StatCard title="Equipment Ready" value="95%" icon={<Wrench className="w-7 h-7 text-yellow-600" />} gradient="from-yellow-100 to-yellow-300" />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="xl:col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-blue-950 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <ActionButton label="Add Announcement" icon={<Megaphone className="w-6 h-6 text-yellow-500" />} />
              <ActionButton label="Add News" icon={<Newspaper className="w-6 h-6 text-yellow-500" />} />
              <ActionButton label="Add Activity" icon={<CalendarPlus className="w-6 h-6 text-yellow-500" />} />
              <ActionButton label="Upload Media" icon={<Upload className="w-6 h-6 text-yellow-500" />} />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-blue-950 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <RecentActivity icon={<Plus className="w-6 h-6 text-yellow-500" />} title="New announcement posted" time="2 minutes ago" />
            <RecentActivity icon={<User className="w-6 h-6 text-blue-950" />} title="New user registered" time="15 minutes ago" />
            <RecentActivity icon={<Edit className="w-6 h-6 text-red-500" />} title="News article updated" time="1 hour ago" />
          </div>
        </div>
      </div>

      {/* Events & Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-blue-950 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            <EventCard color="blue" title="Community Disaster Preparedness Training" date="Dec 15, 2024 • 9:00 AM" location="Barangay Hall, Poblacion" />
            <EventCard color="yellow" title="Emergency Equipment Check" date="Dec 18, 2024 • 2:00 PM" location="MDRRMO Office" />
            <EventCard color="green" title="Monthly Coordination Meeting" date="Dec 20, 2024 • 10:00 AM" location="Conference Room" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-blue-950 mb-6">Weather Overview</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-blue-950">28°C</p>
              <p className="text-base text-gray-600">Partly Cloudy</p>
            </div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <CloudSun className="text-yellow-600 w-10 h-10" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <WeatherStat label="Humidity" value="78%" icon={<Droplets className="w-5 h-5 text-blue-400 mx-auto" />} />
            <WeatherStat label="Wind" value="12 km/h" icon={<Wind className="w-5 h-5 text-blue-400 mx-auto" />} />
            <WeatherStat label="Rain" value="10%" icon={<CloudRain className="w-5 h-5 text-blue-400 mx-auto" />} />
          </div>
        </div>
      </div>

      {/* Incident Reports Summary */}
      <div className="mt-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-blue-950 mb-6">Incident Reports Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <IncidentStat color="red" value="12" label="Flood Reports" />
          <IncidentStat color="orange" value="5" label="Landslide Reports" />
          <IncidentStat color="blue" value="8" label="Road Incidents" />
          <IncidentStat color="green" value="3" label="Other Reports" />
        </div>
      </div>
    </>
  )
}

// --- Dashboard UI Helper Components ---
type StatCardProps = { title: string; value: string; icon: React.ReactNode; gradient: string };
function StatCard({ title, value, icon, gradient }: StatCardProps) {
  return (
    <div className={`rounded-xl shadow bg-gradient-to-br ${gradient} p-5 flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-blue-950 mt-1">{value}</p>
      </div>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/70 shadow-inner">
        {icon}
      </div>
    </div>
  )
}

type ActionButtonProps = { label: string; icon: React.ReactNode };
function ActionButton({ label, icon }: ActionButtonProps) {
  return (
    <button className="group bg-white hover:bg-blue-100 rounded-lg p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20 shadow">
      <div className="w-10 h-10 bg-blue-950 group-hover:bg-blue-800 rounded-full flex items-center justify-center mb-2 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-blue-950 text-center">{label}</span>
    </button>
  )
}

type RecentActivityProps = { icon: React.ReactNode; title: string; time: string };
function RecentActivity({ icon, title, time }: RecentActivityProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">{icon}</div>
      <div className="min-w-0">
        <p className="text-base font-medium text-blue-950">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  )
}

type EventCardProps = { color: string; title: string; date: string; location: string };
function EventCard({ color, title, date, location }: EventCardProps) {
  const border = color === "blue" ? "border-blue-950" : color === "yellow" ? "border-yellow-500" : color === "green" ? "border-green-500" : "border-gray-300"
  return (
    <div className={`border-l-4 ${border} pl-4 py-2 bg-white/80 rounded-lg shadow-sm`}>
      <h3 className="font-medium text-blue-950">{title}</h3>
      <p className="text-sm text-gray-600">{date}</p>
      <p className="text-xs text-gray-500 mt-1">{location}</p>
    </div>
  )
}

type WeatherStatProps = { label: string; value: string; icon: React.ReactNode };
function WeatherStat({ label, value, icon }: WeatherStatProps) {
  return (
    <div className="text-center">
      <div className="mb-1">{icon}</div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

type IncidentStatProps = { color: string; value: string; label: string };
function IncidentStat({ color, value, label }: IncidentStatProps) {
  const colorClass = color === "red" ? "text-red-600 bg-red-50" : color === "orange" ? "text-orange-600 bg-orange-50" : color === "blue" ? "text-blue-600 bg-blue-50" : "text-green-600 bg-green-50"
  return (
    <div className={`text-center p-4 rounded-lg ${colorClass}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  )
}