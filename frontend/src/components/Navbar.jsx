import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <FaChartLine className="text-blue-600 text-xl" />

          <span className="font-bold text-xl">CreditWise AI</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/assessment">Assessment</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
