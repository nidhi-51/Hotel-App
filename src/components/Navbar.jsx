import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 border-b border-slate-100 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 tracking-tight">
          <span>🏨</span> RestAway
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Find Hotels</Link>
          <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-semibold">
            v1.0.0
          </span>
        </div>
      </div>
    </nav>
  );
}