import {
  BriefcaseBusiness,
  Users,
  ClipboardList,
  DollarSign,
  Bell,
  Search,
  Plus,
  FilePlus2,
  MessageSquare,
  CalendarDays,
  BarChart3,
  FolderKanban,
} from "lucide-react";
import "../styles/dashboardPage.css";

const projects = [
  ["Downtown Tower Build", "New York, NY", "32", "In Progress", "Jun 25, 2025"],
  ["Westside Plaza", "Los Angeles, CA", "28", "Open", "Jun 30, 2025"],
  ["Airport Road Expansion", "Austin, TX", "45", "In Progress", "Jul 05, 2025"],
  ["School Renovation", "Chicago, IL", "18", "Pending", "Jul 10, 2025"],
  ["Warehouse Construction", "Dallas, TX", "24", "Open", "Jul 15, 2025"],
];

const actions = [
  [Plus, "Create New Project"],
  [Users, "Add Workforce"],
  [ClipboardList, "Create Report"],
  [MessageSquare, "Send Message"],
  [CalendarDays, "View Calendar"],
];

export default function DashboardPage() {
  const stats = [
    [BriefcaseBusiness, "Total Projects", "24", "↑ 12% from last month"],
    [Users, "Active Workforce", "156", "↑ 8% from last month"],
    [ClipboardList, "Total Reports", "48", "↑ 15% from last month"],
    [DollarSign, "Outstanding", "$36,750", "↓ 5% from last month"],
  ];

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <img src="/assets/tradesmap-logo.png" alt="" />
          <strong>
            Trades<span>Map</span>
          </strong>
        </div>
        {[
          [FolderKanban, "Dashboard"],
          [BriefcaseBusiness, "Projects"],
          [Users, "Workforce"],
          [ClipboardList, "Billing"],
          [BarChart3, "Reports"],
          [MessageSquare, "Messages"],
          [BarChart3, "Profile"],
          [CalendarDays, "Subscription"],
          [ClipboardList, "Settings"],
        ].map(([Icon, label], index) => (
          <button key={label} className={index === 0 ? "active" : ""}>
            <Icon size={20} />
            {label}
          </button>
        ))}
        <div className="sidebar-bottom">
          <button>ⓘ Help</button>
          <button>◉ Support</button>
          <button>↪ Sign Out</button>
        </div>
        <small>© 2026 TradesMap. All rights reserved.</small>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening with your projects.</p>
          </div>
          <div className="dashboard-tools">
            <div className="dashboard-search">
              <Search size={19} />
              <input placeholder="Search projects, workforce, reports..." />
            </div>
            <Bell size={23} />
            <strong>ABC Construction Co.</strong>
          </div>
        </header>

        <section className="stat-grid">
          {stats.map(([Icon, label, value, trend]) => (
            <article key={label}>
              <div className="stat-icon">
                <Icon size={28} />
              </div>
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{trend}</small>
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-grid top-grid">
          <article className="panel projects-panel">
            <div className="panel-title">
              <h2>Recent Projects</h2>
              <button>View all</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Location</th>
                  <th>Workers</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i}>
                        {i === 3 ? (
                          <span
                            className={`status ${cell.toLowerCase().replace(" ", "-")}`}
                          >
                            {cell}
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                    <td>⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          <article className="panel quick-actions">
            <h2>Quick Actions</h2>
            {actions.map(([Icon, label]) => (
              <button key={label}>
                <Icon size={21} />
                <span>{label}</span>
                <b>›</b>
              </button>
            ))}
          </article>
        </section>

        <section className="dashboard-grid bottom-grid">
         <article className="panel workforce">
  <h2>Workforce Overview</h2>

  <div className="workforce-content">
    <div className="donut">
      <div className="donut-center">
        <strong>156</strong>
        <span>Total</span>
      </div>
    </div>

    <ul>
      <li>
        <span className="legend-dot on-site"></span>
        <span>On Site</span>
        <span className="legend-value">92 (59%)</span>
      </li>

      <li>
        <span className="legend-dot available"></span>
        <span>Available</span>
        <span className="legend-value">38 (24%)</span>
      </li>

      <li>
        <span className="legend-dot on-leave"></span>
        <span>On Leave</span>
        <span className="legend-value">16 (10%)</span>
      </li>

      <li>
        <span className="legend-dot unavailable"></span>
        <span>Unavailable</span>
        <span className="legend-value">10 (7%)</span>
      </li>
    </ul>
  </div>
</article>
          <article className="panel deadlines">
            <h2>Upcoming Deadlines</h2>
            {projects.slice(0, 3).map((p, i) => (
              <div key={p[0]}>
                <span>●</span>
                <p>
                  <strong>{p[0]}</strong>
                  <small>
                    {i === 0
                      ? "Material Approval"
                      : i === 1
                        ? "Workforce Review"
                        : "Progress Report"}
                  </small>
                </p>
                <b>{["Jun 25", "Jun 30", "Jul 05"][i]}</b>
              </div>
            ))}
            <button>View all deadlines</button>
          </article>
          <article className="panel messages">
            <div className="panel-title">
              <h2>Messages</h2>
              <button>View all</button>
            </div>
            {[
              ["JD", "John Doe", "Please review the updated project..."],
              ["SM", "Sarah Miller", "Workforce list for next week."],
              ["AM", "Admin Team", "Your project has been approved."],
            ].map((m) => (
              <div className="message" key={m[1]}>
                <span>{m[0]}</span>
                <p>
                  <strong>{m[1]}</strong>
                  <small>{m[2]}</small>
                </p>
              </div>
            ))}
          </article>
        </section>
      </main>
    </div>
  );
}
