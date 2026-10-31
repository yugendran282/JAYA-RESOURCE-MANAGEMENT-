import React, { useState, useEffect } from 'react';
import { InstitutionalLogo } from '../common/InstitutionalLogo';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, institutionId?: string, departmentId?: string) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenLogin }) => {
  const { currentUser, role, logout, isAdmin, isDeptHead } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Institutions', targetView: 'home', sectionId: 'institutions-directory' },
    { label: 'Academics', targetView: 'home', sectionId: 'academics-section' },
    { label: 'About Us', targetView: 'home', sectionId: 'about-section' },
    { label: 'Admissions', targetView: 'home', sectionId: 'admissions-section' },
    { label: 'Contact', targetView: 'home', sectionId: 'contact-section' },
  ];

  const handleLinkClick = (targetView: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    if (currentView !== targetView) {
      onNavigate(targetView);
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-300">
      {/* 1. Institutional Top Meta Bar */}
      <div className="bg-[#070F1E] text-slate-300 text-[11px] border-b border-[#1E3E62]/40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4 divide-x divide-slate-700/60">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              AICTE Approved • Anna University Affiliated • NAAC Accredited • PCI Approved
            </span>
            <span className="pl-4 text-slate-400">
              Institution Code: JEC-1108 | Estd. 1977
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a href="tel:+914426300982" className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors">
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span>+91 44 2630 0982</span>
            </a>
            <a href="mailto:info@jaya.edu.in" className="flex items-center gap-1.5 hover:text-[#C5A059] transition-colors">
              <Mail className="w-3 h-3 text-[#C5A059]" />
              <span>info@jaya.edu.in</span>
            </a>
            <span className="h-3 w-[1px] bg-slate-700" />
            <span className="text-[#C5A059] font-medium tracking-wide">
              Admissions 2026-27 Active
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Institutional Navigation Header */}
      <div className={`bg-white border-b border-slate-200/90 transition-shadow ${isScrolled ? 'shadow-md py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="text-left focus:outline-none hover:opacity-95 transition-opacity"
            aria-label="Jaya Group Home"
          >
            <InstitutionalLogo variant="dark" size="md" showTagline={!isScrolled} />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[14.5px] font-medium text-slate-700">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.targetView, item.sectionId)}
                className="hover:text-[#0B192C] relative py-1 text-slate-700 hover:font-semibold transition-all group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Portal & Auth CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 border border-slate-300 hover:border-[#0B192C] rounded text-slate-800 text-xs font-semibold bg-slate-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0B192C] text-[#C5A059] flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="leading-tight text-xs text-[#0B192C] font-semibold">{currentUser.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-slate-500 font-normal uppercase tracking-wider">
                      {isAdmin ? 'System Admin' : isDeptHead ? 'HOD Portal' : 'Faculty'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-md shadow-xl py-2 z-50 text-xs text-slate-700"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-slate-100 bg-slate-50">
                      <p className="font-semibold text-slate-900">{currentUser.name}</p>
                      <p className="text-slate-500 text-[11px] truncate">{currentUser.email}</p>
                      {currentUser.departmentName && (
                        <p className="text-[10px] text-[#0B192C] font-medium mt-0.5">
                          {currentUser.departmentName}
                        </p>
                      )}
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('admin-dashboard');
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-[#0B192C] font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#C5A059]" />
                        Executive Admin Dashboard
                      </button>
                    )}

                    {isDeptHead && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('dept-dashboard');
                        }}
                        className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 hover:text-[#0B192C] font-medium"
                      >
                        <Building2 className="w-4 h-4 text-[#C5A059]" />
                        Department Portal & Labs
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        onNavigate('home');
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-700 flex items-center gap-2 font-medium border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenLogin}
                  className="px-4 py-2 border border-[#0B192C] text-[#0B192C] hover:bg-[#0B192C] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Admin / Dept Login</span>
                </button>
              </div>
            )}

            {/* Quick Portal Switcher if already in another view */}
            {currentView !== 'home' && (
              <button
                onClick={() => onNavigate('home')}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-[#0B192C] font-medium border border-slate-200 rounded-sm"
              >
                Return to University Home
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenLogin}
              className="p-2 text-slate-700 hover:text-[#0B192C]"
              aria-label="Sign In"
            >
              <UserIcon className="w-5 h-5 text-[#C5A059]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0B192C]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070F1E] text-white border-b border-[#1E3E62] px-6 py-5 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.targetView, item.sectionId)}
                className="text-left py-2 text-slate-200 hover:text-[#C5A059] font-medium text-base border-b border-slate-800"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-2.5">
              {currentUser ? (
                <>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                    <p className="text-xs text-[#C5A059]">{currentUser.role.replace('_', ' ').toUpperCase()}</p>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('admin-dashboard');
                      }}
                      className="w-full py-2.5 bg-[#0B192C] border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold uppercase tracking-wider rounded"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  {isDeptHead && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('dept-dashboard');
                      }}
                      className="w-full py-2.5 bg-[#0B192C] border border-[#C5A059]/40 text-[#C5A059] text-xs font-semibold uppercase tracking-wider rounded"
                    >
                      Department Management
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                      onNavigate('home');
                    }}
                    className="w-full py-2 bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-semibold rounded"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-3 bg-[#C5A059] text-[#070F1E] font-bold text-xs uppercase tracking-wider rounded"
                >
                  Admin / Department Portal Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
