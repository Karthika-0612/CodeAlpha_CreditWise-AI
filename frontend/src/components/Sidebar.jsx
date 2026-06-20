import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white p-4">
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/assessment">Assessment</Link>
        </li>
        <li>
          <Link to="/results">Results</Link>
        </li>
      </ul>
    </aside>
  );
}
