import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Search, MapPin, Menu, X, ChevronDown } from "lucide-react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const toggleSubmenu = useCallback((submenu: string) => {
    setOpenSubmenu((current) => (current === submenu ? null : submenu))
  }, [])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    setSearchOpen(false)
    setSearchQuery("")
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      action()
    }
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false)
        setOpenSubmenu(null)
        setSearchOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  // Handle click outside mobile menu to close
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setOpenSubmenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav
      className="bg-blue-950 border-b-4 border-yellow-500 shadow-lg relative sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <a href="/" className="flex-shrink-0 flex items-center space-x-3 group" aria-label="Go to homepage">
            <img
              src="https://res.cloudinary.com/dedcmctqk/image/upload/v1758626524/logome_qttbxo.webp"
              alt="MDRRMO Pio Duran Official Logo"
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
              onError={(e) => (e.currentTarget.src = '/images/design-mode/mdrrmo_logo.webp')}
            />
            <div className="text-white">
              <div className="text-lg font-bold text-yellow-500">MDRRMO</div>
              <div className="text-xs font-medium text-center">PIO DURAN</div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2" role="menubar">
              <a
                href="/"
                className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                role="menuitem"
              >
                Home
              </a>

              {/* About Us Dropdown */}
              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="About Us menu"
                >
                  About Us
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <a
                      href="/about/history"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      History
                    </a>
                    <a
                      href="/about/vision-mission"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Vision & Mission
                    </a>
                    <a
                      href="/about/drrmc-council"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      The DRRM Council
                    </a>
                    <a
                      href="/about/mdrrmo-personnel"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      MDRRMO Personnel
                    </a>
                    <a
                      href="/about/legal-basis"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Legal Basis
                    </a>
                    <a
                      href="/about/our-services"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Our Services
                    </a>
                  </div>
                </div>
              </div>

              {/* Information Dropdown */}
              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="Information menu"
                >
                  Information
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <a
                      href="/information/announcements"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Announcements
                    </a>
                    <a
                      href="/information/weather-updates"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Weather Updates
                    </a>
                    <a
                      href="/information/news"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      News & Advisories
                    </a>
                    <a
                      href="/information/events"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Events & Activities
                    </a>
                    <a
                      href="/information/faq"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      FAQ
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="Resources menu"
                >
                  Resources
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <a
                      href="/resources/video-gallery"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Video Gallery
                    </a>
                    <a
                      href="/resources/gallery"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Photo Gallery
                    </a>
                    <a
                      href="/resources/public-documents"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Public Documents
                    </a>
                  </div>
                </div>
              </div>

              {/* Preparedness Dropdown */}
              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="Preparedness menu"
                >
                  Preparedness
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <a
                      href="/preparedness/emergency-procedures"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Emergency Procedures
                    </a>
                    <a
                      href="/preparedness/evacuation"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Evacuation Management
                    </a>
                    <a
                      href="/preparedness/hazard-maps"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Hazard Maps
                    </a>
                    <a
                      href="/preparedness/early-warning-systems"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Early Warning Systems
                    </a>
                    <a
                      href="/preparedness/community-training"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Community Training
                    </a>
                    <a
                      href="/preparedness/our-plans"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Our Plans
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <a
                      href="/preparedness/go-bag"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      What's in your GO-BAG?
                    </a>
                    <a
                      href="/preparedness/family-plan"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Family Emergency Plan
                    </a>
                    <a
                      href="/preparedness/ice-materials"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      IEC Materials
                    </a>
                    <a
                      href="/preparedness/training-and-drill"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Training and Drill
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Dropdown */}
              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="Contact menu"
                >
                  Contact
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <a
                      href="/contact/hotline"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Emergency Hotlines
                    </a>
                    <a
                      href="/contact/location"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Our Location
                    </a>
                    <a
                      href="/contact/message"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Leave a Message
                    </a>
                    <a
                      href="/contact/volunteer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Become a Volunteer
                    </a>
                    <a
                      href="/contact/report-incident"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Report an Incident
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="/admin"
                className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                role="menuitem"
              >
                Admin
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Button - Desktop */}
            <div className="hidden md:block relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center" role="search">
                  <label htmlFor="desktop-search" className="sr-only">
                    Search the website
                  </label>
                  <input
                    id="desktop-search"
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="bg-white text-blue-950 px-3 py-1 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-48"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-3 py-1 rounded-r-md transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    aria-label="Submit search"
                  >
                    <Search className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-2 text-white hover:text-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950 rounded"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white hover:text-yellow-500 p-2 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Barangay Portal Button - Desktop */}
            <a
              href="/barangay-portal"
              className="hidden md:flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Barangay Portal</span>
            </a>

            {/* Mobile Icons */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Search Icon - Mobile */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-yellow-500 focus:outline-none focus:text-yellow-500 transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Barangay Portal Icon - Mobile */}
              <a
                href="/barangay-portal"
                className="text-white hover:text-yellow-500 p-2 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                aria-label="Barangay Portal"
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-yellow-500 focus:outline-none focus:text-yellow-500 transition-colors duration-200 p-1 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950 rounded"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="md:hidden px-4 pb-4">
            <form onSubmit={handleSearch} className="flex" role="search">
              <label htmlFor="mobile-search" className="sr-only">
                Search the website
              </label>
              <input
                id="mobile-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-white text-blue-950 px-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-r-md transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => {
              setMobileMenuOpen(false);
              setOpenSubmenu(null);
            }}
            aria-hidden="true"
          />
          {/* Mobile menu panel */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 left-0 w-11/12 max-w-xs h-full bg-blue-900 border-r-4 border-yellow-500 z-50 overflow-y-auto transition-transform duration-300 md:hidden"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOpenSubmenu(null);
                }}
                className="text-white hover:text-yellow-500 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
            role="menuitem"
          >
            Home
          </a>

          {/* About Us Mobile */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("about")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("about"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "about"}
              aria-label="About Us submenu"
            >
              About Us
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "about" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 transition-all duration-200 overflow-hidden ${openSubmenu === "about" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              style={{ pointerEvents: openSubmenu === "about" ? 'auto' : 'none' }}
              role="menu"
              aria-hidden={openSubmenu !== "about"}
            >
              <a
                href="/about/history"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                History
              </a>
              <a
                href="/about/vision-mission"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Vision & Mission
              </a>
              <a
                href="/about/drrmc-council"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                The DRRM Council
              </a>
              <a
                href="/about/mdrrmo-personnel"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                MDRRMO Personnel
              </a>
              <a
                href="/about/legal-basis"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Legal Basis
              </a>
              <a
                href="/about/our-services"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Our Services
              </a>
            </div>
          </div>

          {/* Information Mobile Menu */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("information")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("information"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "information"}
              aria-label="Information submenu"
            >
              Information
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "information" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 transition-all duration-200 overflow-hidden ${openSubmenu === "information" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              style={{ pointerEvents: openSubmenu === "information" ? 'auto' : 'none' }}
              role="menu"
              aria-hidden={openSubmenu !== "information"}
            >
              <a
                href="/information/announcements"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Announcements
              </a>
              <a
                href="/information/weather-updates"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Weather Updates
              </a>
              <a
                href="/information/news"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                News & Advisories
              </a>
              <a
                href="/information/events"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Events & Activities
              </a>
              <a
                href="/information/faq"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                FAQ
              </a>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("resources")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("resources"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "resources"}
              aria-label="Resources submenu"
            >
              Resources
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "resources" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 transition-all duration-200 overflow-hidden ${openSubmenu === "resources" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              style={{ pointerEvents: openSubmenu === "resources" ? 'auto' : 'none' }}
              role="menu"
              aria-hidden={openSubmenu !== "resources"}
            >
              <a
                href="/resources/video-gallery"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Video Gallery
              </a>
              <a
                href="/resources/gallery"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Photo Gallery
              </a>
              <a
                href="/resources/public-documents"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Public Documents
              </a>
            </div>
          </div>

          {/* Preparedness Mobile Menu */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("preparedness")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("preparedness"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "preparedness"}
              aria-label="Preparedness submenu"
            >
              Preparedness
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "preparedness" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 transition-all duration-200 overflow-hidden ${openSubmenu === "preparedness" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              style={{ pointerEvents: openSubmenu === "preparedness" ? 'auto' : 'none' }}
              role="menu"
              aria-hidden={openSubmenu !== "preparedness"}
            >
              <a
                href="/preparedness/emergency-procedures"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Emergency Procedures
              </a>
              <a
                href="/preparedness/evacuation"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Evacuation Management
              </a>
              <a
                href="/preparedness/hazard-maps"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Hazard Maps
              </a>
              <a
                href="/preparedness/early-warning-systems"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Early Warning Systems
              </a>
              <a
                href="/preparedness/community-training"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Community Training
              </a>
              <a
                href="/preparedness/our-plans"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Our Plans
              </a>
              <div className="border-t border-blue-700 my-1"></div>
              <a
                href="/preparedness/go-bag"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                What's in your GO-BAG?
              </a>
              <a
                href="/preparedness/family-plan"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Family Emergency Plan
              </a>
              <a
                href="/preparedness/ice-materials"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                IEC Materials
              </a>
              <a
                href="/preparedness/training-and-drill"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Training and Drill
              </a>
            </div>
          </div>

          {/* Contact Mobile Menu */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("contact")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("contact"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "contact"}
              aria-label="Contact submenu"
            >
              Contact
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "contact" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 transition-all duration-200 overflow-hidden ${openSubmenu === "contact" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              style={{ pointerEvents: openSubmenu === "contact" ? 'auto' : 'none' }}
              role="menu"
              aria-hidden={openSubmenu !== "contact"}
            >
              <a
                href="/contact/hotline"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Emergency Hotlines
              </a>
              <a
                href="/contact/location"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Our Location
              </a>
              <a
                href="/contact/message"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Leave a Message
              </a>
              <a
                href="/contact/volunteer"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Become a Volunteer
              </a>
              <a
                href="/contact/report-incident"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Report an Incident
              </a>
            </div>
          </div>

          <a
            href="/admin"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
            role="menuitem"
          >
            Admin
          </a>

          <a
            href="/barangay-portal"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
            role="menuitem"
          >
            Barangay Portal
          </a>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
