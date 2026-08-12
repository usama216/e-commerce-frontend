import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Image,
  FileText,
  MessageSquare,
  Tag,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { adminLogout } from '../api';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Orders', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/banners', label: 'Banners', icon: Image },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText },
  { to: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { to: '/admin/promo-codes', label: 'Promo Codes', icon: Tag },
];

function navClassName(isActive) {
  return [
    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
    isActive
      ? 'bg-white/15 text-white shadow-sm'
      : 'text-white/80 hover:bg-white/10 hover:text-white',
  ].join(' ');
}

function mobileNavClassName(isActive) {
  return [
    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shrink-0',
    isActive ? 'bg-biomed-teal text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  ].join(' ');
}

export default function AdminShellLayout() {
  const navigate = useNavigate();

  const logout = () => {
    adminLogout();
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 flex-col bg-biomed-navy text-white shrink-0 shadow-xl">
        <div className="p-6 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-biomed-teal" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight tracking-tight">BioMed</p>
              <p className="text-xs text-white/60 font-medium">Admin dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 pt-2 pb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
            Manage
          </p>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={!!end} className={({ isActive }) => navClassName(isActive)}>
              <Icon className="w-5 h-5 shrink-0 opacity-90" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5 shrink-0" />
            View storefront
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
          <div className="md:hidden flex items-center gap-2 min-w-0">
            <Package className="w-7 h-7 text-biomed-navy shrink-0" />
            <div className="min-w-0">
              <p className="font-bold text-gray-900 truncate">BioMed Admin</p>
              <p className="text-xs text-gray-500 truncate">Dashboard</p>
            </div>
          </div>
          <div className="hidden md:block flex-1" />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-biomed-teal"
            >
              <ExternalLink className="w-4 h-4" />
              Store
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile horizontal nav */}
        <div className="md:hidden border-b border-gray-200 bg-white px-2 py-2 overflow-x-auto shadow-sm">
          <div className="flex gap-2 min-w-max pb-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={!!end} className={({ isActive }) => mobileNavClassName(isActive)}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
