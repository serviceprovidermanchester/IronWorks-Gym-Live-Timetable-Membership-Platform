/**
 * IronWorks CMS Admin Server — Standalone Express
 * SPManchester Private Limited · https://www.spmanchester.com
 *
 * Runs on port 3001. No database required.
 * Provides a full-featured admin UI for managing gym content.
 */
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/* ═══════════════════════════════════════════════════════════════
   IN-MEMORY DATA STORE
══════════════════════════════════════════════════════════════ */
const store = {
  classes: [
    { id: 'c1',  name: 'Strength Foundations',         day: 'MON', time: '06:30', duration: 60,  category: 'STRENGTH',     coach: 'Sarah Jenkins',  capacity: 16, active: true },
    { id: 'c2',  name: 'Lunch Express HIIT',            day: 'MON', time: '12:15', duration: 30,  category: 'HIIT',         coach: 'Marcus Vance',   capacity: 20, active: true },
    { id: 'c3',  name: 'Olympic Weightlifting',         day: 'MON', time: '18:00', duration: 75,  category: 'STRENGTH',     coach: 'Sarah Jenkins',  capacity: 12, active: true },
    { id: 'c4',  name: 'Engine Room Conditioning',      day: 'TUE', time: '07:00', duration: 60,  category: 'CONDITIONING', coach: 'Marcus Vance',   capacity: 18, active: true },
    { id: 'c5',  name: 'Yoga for Heavy Lifters',        day: 'TUE', time: '17:45', duration: 60,  category: 'MOBILITY',     coach: 'David Kim',      capacity: 20, active: true },
    { id: 'c6',  name: 'Boxing Fundamentals',           day: 'TUE', time: '19:00', duration: 60,  category: 'COMBAT',       coach: 'Elena Rostova',  capacity: 14, active: true },
    { id: 'c7',  name: 'Powerlifting Club: Squat & Bench', day: 'WED', time: '06:30', duration: 75, category: 'STRENGTH',  coach: 'Sarah Jenkins',  capacity: 14, active: true },
    { id: 'c8',  name: 'Lunch Express HIIT',            day: 'WED', time: '12:15', duration: 30,  category: 'HIIT',         coach: 'Marcus Vance',   capacity: 20, active: true },
    { id: 'c9',  name: 'Track Sprint Intervals',        day: 'WED', time: '18:30', duration: 45,  category: 'CONDITIONING', coach: 'Marcus Vance',   capacity: 16, active: true },
    { id: 'c10', name: 'Snatch & Clean Mastery',        day: 'THU', time: '07:00', duration: 75,  category: 'STRENGTH',     coach: 'Sarah Jenkins',  capacity: 12, active: true },
    { id: 'c11', name: 'Active Mobility & Core',        day: 'THU', time: '17:45', duration: 60,  category: 'MOBILITY',     coach: 'David Kim',      capacity: 20, active: true },
    { id: 'c12', name: 'Pugilist Technical Boxing',     day: 'THU', time: '19:00', duration: 60,  category: 'COMBAT',       coach: 'Elena Rostova',  capacity: 14, active: true },
    { id: 'c13', name: 'Engine Room Friday Assault',    day: 'FRI', time: '06:30', duration: 60,  category: 'CONDITIONING', coach: 'Marcus Vance',   capacity: 18, active: true },
    { id: 'c14', name: 'Friday Fight Club (Advanced)',  day: 'FRI', time: '17:30', duration: 90,  category: 'COMBAT',       coach: 'Elena Rostova',  capacity: 10, active: true },
    { id: 'c15', name: 'Weekend Warrior Community WOD', day: 'SAT', time: '09:00', duration: 75,  category: 'CONDITIONING', coach: 'Marcus Vance',   capacity: 24, active: true },
    { id: 'c16', name: 'Restorative Lifters Yoga',      day: 'SAT', time: '10:45', duration: 60,  category: 'MOBILITY',     coach: 'David Kim',      capacity: 20, active: true },
    { id: 'c17', name: 'Sunday Heavy Barbell Session',  day: 'SUN', time: '10:00', duration: 90,  category: 'STRENGTH',     coach: 'Sarah Jenkins',  capacity: 16, active: true },
    { id: 'c18', name: 'Open Mat Mobility & Stretch',   day: 'SUN', time: '11:45', duration: 60,  category: 'MOBILITY',     coach: 'David Kim',      capacity: 20, active: true },
  ],
  coaches: [
    { id: 'coach_1', name: 'Sarah Jenkins',  role: 'Head Strength & Olympic Lifting',      bio: 'NSCA-certified strength & conditioning specialist with 12 years of competitive weightlifting.',  certifications: 'NSCA-CSCS, USAW Level 2, First Aid', active: true },
    { id: 'coach_2', name: 'Marcus Vance',   role: 'HIIT & Conditioning Specialist',         bio: 'Former GB-level sprinter turned conditioning coach. Engine Room sessions built for mental grit.', certifications: 'Level 3 PT, Sprint Mechanics (UK Athletics)', active: true },
    { id: 'coach_3', name: 'Elena Rostova',  role: 'Striking & Combat Head Coach',           bio: 'Golden Gloves champion with European competition background. Pugilist footwork meets anaerobic conditioning.', certifications: 'England Boxing Coach Level 2, Level 3 PT', active: true },
    { id: 'coach_4', name: 'David Kim',      role: 'Mobility, Recovery & Longevity',         bio: 'Licensed physiotherapist and mobility specialist dedicated to helping heavy lifters prevent injury and restore joint health.', certifications: '200-hr RYT, FRC Mobility Specialist', active: true },
  ],
  plans: [
    { id: 'plan_1', name: 'Standard Tier',   tier: 'STANDARD',        price: '£49/mo', pence: 4900, tagline: 'Full gym floor + 4 coach classes/month', active: true },
    { id: 'plan_2', name: 'Unlimited Tier',  tier: 'UNLIMITED',       price: '£75/mo', pence: 7500, tagline: 'All 18 weekly classes unmetered — our flagship', active: true },
    { id: 'plan_3', name: 'Founding Member', tier: 'FOUNDING_MEMBER', price: '£99/mo', pence: 9900, tagline: 'VIP tier with monthly 1-on-1 coaching session', active: true },
  ],
  announcements: [
    { id: 'ann_1', title: 'New Saturday WOD Added!', body: 'We\'ve added a 2nd Saturday session at 12:00. Unlimited members get automatic access.', published: true, createdAt: '2026-11-20' },
    { id: 'ann_2', title: 'Holiday Hours — Dec 25 & 26', body: 'Gym closed Christmas Day and Boxing Day. Normal hours resume 27th Dec.', published: true, createdAt: '2026-11-18' },
    { id: 'ann_3', title: 'New Lifting Platform Installed', body: '4 new Eleiko platforms now live on the gym floor for open and class sessions.', published: true, createdAt: '2026-11-15' },
  ],
  members: [
    { id: 'm1', name: 'Alex Morgan',      email: 'member@ironworksgym.com', tier: 'Unlimited',       ref: 'IW-2026-M920', joined: '2026-10-01', status: 'ACTIVE' },
    { id: 'm2', name: 'James Thornton',   email: 'james@example.com',       tier: 'Standard',        ref: 'IW-2026-M919', joined: '2026-10-05', status: 'ACTIVE' },
    { id: 'm3', name: 'Chloe Davies',     email: 'chloe@example.com',       tier: 'Founding Member', ref: 'IW-2026-M918', joined: '2026-09-15', status: 'ACTIVE' },
    { id: 'm4', name: 'Tariq Al-Mansoor', email: 'tariq@example.com',       tier: 'Unlimited',       ref: 'IW-2026-M917', joined: '2026-09-20', status: 'ACTIVE' },
    { id: 'm5', name: 'Priya Sharma',     email: 'priya@example.com',       tier: 'Standard',        ref: 'IW-2026-M916', joined: '2026-11-01', status: 'ACTIVE' },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   JSON API
══════════════════════════════════════════════════════════════ */
app.get('/api/classes',       (_req, res) => res.json({ success: true, data: store.classes }));
app.get('/api/coaches',       (_req, res) => res.json({ success: true, data: store.coaches }));
app.get('/api/plans',         (_req, res) => res.json({ success: true, data: store.plans }));
app.get('/api/announcements', (_req, res) => res.json({ success: true, data: store.announcements }));
app.get('/api/members',       (_req, res) => res.json({ success: true, data: store.members }));
app.get('/api/stats',         (_req, res) => res.json({ success: true, data: { activeMembers: 418, monthlyRevenue: '£28,450', todayBookings: '94 / 110', waitlistRequests: 14 } }));

/* ═══════════════════════════════════════════════════════════════
   HTML LAYOUT
══════════════════════════════════════════════════════════════ */
function layout(title: string, content: string, activeTab: string): string {
  const tabs = [
    { id: 'dashboard',     label: '📊 Dashboard',        href: '/admin' },
    { id: 'classes',       label: '🏋️ Classes',           href: '/admin/classes' },
    { id: 'coaches',       label: '👤 Coaches',           href: '/admin/coaches' },
    { id: 'plans',         label: '💳 Membership Plans',  href: '/admin/plans' },
    { id: 'announcements', label: '📢 Announcements',     href: '/admin/announcements' },
    { id: 'members',       label: '👥 Members',           href: '/admin/members' },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title} | IronWorks CMS</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    :root{
      --brand:#ff5500;--brand-light:#ff7733;
      --bg:#020617;--surface:#0f172a;--surface2:#1e293b;--surface3:#334155;
      --border:#1e293b;--border2:#334155;
      --text:#f1f5f9;--text2:#94a3b8;--text3:#64748b;
      --green:#22c55e;--red:#ef4444;--amber:#f59e0b;--blue:#3b82f6;
    }
    html,body{height:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);font-size:14px}
    a{color:inherit;text-decoration:none}
    .topbar{position:fixed;top:0;left:0;right:0;height:52px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:16px;z-index:100}
    .topbar-logo{display:flex;align-items:center;gap:10px}
    .dot{width:8px;height:8px;border-radius:50%;background:var(--brand);animation:pulse 2s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .topbar-title{font-size:11px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.08em}
    .topbar-sub{font-size:10px;color:var(--text3);margin-top:1px}
    .spacer{flex:1}
    .topbar-badge{font-size:10px;font-weight:700;color:var(--brand);border:1px solid var(--brand);padding:3px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:.08em}
    .topbar-link{font-size:11px;font-weight:600;color:var(--text2);padding:6px 12px;border-radius:8px;border:1px solid var(--border2);transition:.15s}
    .topbar-link:hover{background:var(--surface2);color:var(--text)}
    .sidebar{position:fixed;top:52px;left:0;width:220px;bottom:0;background:var(--surface);border-right:1px solid var(--border);padding:16px 12px;overflow-y:auto;z-index:90}
    .nav-section{font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.12em;padding:12px 8px 6px}
    .nav-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;font-size:12px;font-weight:600;color:var(--text2);transition:.15s;margin-bottom:2px}
    .nav-link:hover{background:var(--surface2);color:var(--text)}
    .nav-link.active{background:rgba(255,85,0,.12);color:var(--brand);border:1px solid rgba(255,85,0,.2)}
    .main{margin-left:220px;margin-top:52px;padding:28px 32px;min-height:calc(100vh - 52px)}
    .page-header{margin-bottom:28px}
    .page-header h1{font-size:26px;font-weight:800;color:var(--text);letter-spacing:-.02em}
    .page-header p{font-size:13px;color:var(--text2);margin-top:4px}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
    @media(max-width:1100px){.stats-grid{grid-template-columns:repeat(2,1fr)}}
    .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px}
    .stat-label{font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px}
    .stat-value{font-size:28px;font-weight:900;letter-spacing:-.03em}
    .stat-sub{font-size:11px;color:var(--text2);margin-top:4px}
    .c-green{color:var(--green)}.c-brand{color:var(--brand)}.c-blue{color:var(--blue)}.c-amber{color:var(--amber)}
    .card{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:24px}
    .card-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
    .card-header h2{font-size:14px;font-weight:700;color:var(--text)}
    .card-header .count{font-size:11px;color:var(--text3);margin-top:1px}
    table{width:100%;border-collapse:collapse}
    thead tr{background:rgba(0,0,0,.3)}
    th{padding:10px 16px;text-align:left;font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;white-space:nowrap}
    td{padding:12px 16px;border-top:1px solid var(--border);font-size:12px;color:var(--text2);vertical-align:middle}
    tr:hover td{background:rgba(255,255,255,.02)}
    .badge{display:inline-block;padding:2px 8px;border-radius:6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
    .badge-strength{background:rgba(99,102,241,.12);color:#818cf8;border:1px solid rgba(99,102,241,.25)}
    .badge-hiit{background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25)}
    .badge-conditioning{background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.25)}
    .badge-mobility{background:rgba(6,182,212,.12);color:#22d3ee;border:1px solid rgba(6,182,212,.25)}
    .badge-combat{background:rgba(245,158,11,.12);color:#fbbf24;border:1px solid rgba(245,158,11,.25)}
    .badge-active{background:rgba(34,197,94,.1);color:var(--green);border:1px solid rgba(34,197,94,.2)}
    .badge-inactive{background:rgba(100,116,139,.1);color:var(--text3);border:1px solid rgba(100,116,139,.2)}
    .btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;border:none;text-transform:uppercase;letter-spacing:.06em;transition:.15s}
    .btn-brand{background:var(--brand);color:#fff}.btn-brand:hover{background:var(--brand-light)}
    .btn-ghost{background:var(--surface2);color:var(--text2);border:1px solid var(--border2)}.btn-ghost:hover{color:var(--text)}
    .two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    @media(max-width:900px){.two-col{grid-template-columns:1fr}}
    .ann-card{background:var(--surface2);border:1px solid var(--border2);border-radius:12px;padding:16px;margin-bottom:12px}
    .ann-card h3{font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px}
    .ann-card p{font-size:12px;color:var(--text2);line-height:1.6}
    .ann-card .meta{font-size:10px;color:var(--text3);margin-top:8px;display:flex;gap:12px;align-items:center}
    .coach-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;padding:20px}
    @media(max-width:800px){.coach-grid{grid-template-columns:1fr}}
    .coach-card{background:var(--surface2);border:1px solid var(--border2);border-radius:12px;padding:20px}
    .coach-card h3{font-size:14px;font-weight:800;color:var(--text)}
    .coach-card .role{font-size:11px;color:var(--brand);font-weight:600;margin-top:2px;margin-bottom:10px}
    .coach-card .bio{font-size:11px;color:var(--text2);line-height:1.6}
    .coach-card .certs{font-size:10px;color:var(--text3);margin-top:8px;padding-top:8px;border-top:1px solid var(--border)}
    .plan-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:20px}
    @media(max-width:800px){.plan-grid{grid-template-columns:1fr}}
    .plan-card{background:var(--surface2);border:1px solid var(--border2);border-radius:14px;padding:20px}
    .plan-card .tier{font-size:9px;font-weight:700;color:var(--brand);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px}
    .plan-card h3{font-size:16px;font-weight:800;color:var(--text)}
    .plan-card .price{font-size:30px;font-weight:900;color:var(--text);margin:10px 0}
    .plan-card .tagline{font-size:11px;color:var(--text2);line-height:1.5}
    .alert-info{background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:10px;padding:12px 16px;font-size:12px;color:#93c5fd;display:flex;align-items:center;gap:10px;margin-bottom:20px}
  </style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-logo">
      <div class="dot"></div>
      <div>
        <div class="topbar-title">IronWorks CMS · Flagship Ancoats</div>
        <div class="topbar-sub">Content Management Console · Port 3001</div>
      </div>
    </div>
    <div class="spacer"></div>
    <span class="topbar-badge">🟢 Live</span>
    <a href="http://localhost:3000" target="_blank" class="topbar-link">🌐 View Site</a>
    <a href="http://localhost:3000/admin" target="_blank" class="topbar-link">⚙️ Admin Dashboard</a>
  </div>
  <nav class="sidebar">
    <div class="nav-section">Content</div>
    ${tabs.map(t => `<a href="${t.href}" class="nav-link ${activeTab === t.id ? 'active' : ''}">${t.label}</a>`).join('\n    ')}
    <div class="nav-section" style="margin-top:16px">API Endpoints</div>
    <a href="/api/classes" target="_blank" class="nav-link">🔗 Classes JSON</a>
    <a href="/api/coaches" target="_blank" class="nav-link">🔗 Coaches JSON</a>
    <a href="/api/stats" target="_blank" class="nav-link">📈 Stats JSON</a>
  </nav>
  <main class="main">${content}</main>
</body>
</html>`;
}

/* ═══════════════════════════════════════════════════════════════
   ADMIN ROUTES
══════════════════════════════════════════════════════════════ */
app.get('/admin', (_req: Request, res: Response) => {
  const html = `
    <div class="page-header">
      <h1>Admin Dashboard</h1>
      <p>IronWorks Gym · Ancoats, Manchester · Real-time operations console</p>
    </div>
    <div class="alert-info">ℹ️ Running in <strong>offline demo mode</strong> — PostgreSQL not required. Data is served from memory.</div>
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-label">Active Members</div><div class="stat-value c-green">418</div><div class="stat-sub">+12% this month</div></div>
      <div class="stat-card"><div class="stat-label">Monthly Revenue</div><div class="stat-value c-brand">£28,450</div><div class="stat-sub">+8.4% vs Oct</div></div>
      <div class="stat-card"><div class="stat-label">Today's Bookings</div><div class="stat-value c-blue">94 / 110</div><div class="stat-sub">85.4% capacity</div></div>
      <div class="stat-card"><div class="stat-label">Waitlist Requests</div><div class="stat-value c-amber">14</div><div class="stat-sub">Across 3 classes</div></div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-header"><div><h2>📅 Today's Class Schedule</h2><div class="count">Monday 25 Nov 2026</div></div></div>
        <table>
          <thead><tr><th>Time</th><th>Class</th><th>Coach</th><th>Booked</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>06:30</td><td style="color:var(--text);font-weight:700">Engine Room HIIT</td><td>Marcus Vance</td><td><strong style="color:var(--brand)">20/20</strong></td><td><span class="badge badge-hiit">FULL</span></td></tr>
            <tr><td>07:30</td><td style="color:var(--text);font-weight:700">Iron Strength &amp; Barbells</td><td>Sarah Jenkins</td><td>18/20</td><td><span class="badge badge-active">OPEN</span></td></tr>
            <tr><td>12:00</td><td style="color:var(--text);font-weight:700">Striking &amp; Heavy Bag</td><td>Elena Rostova</td><td>16/16</td><td><span class="badge badge-combat">FULL</span></td></tr>
            <tr><td>17:45</td><td style="color:var(--text);font-weight:700">Yoga for Heavy Lifters</td><td>David Kim</td><td>12/20</td><td><span class="badge badge-active">OPEN</span></td></tr>
            <tr><td>19:00</td><td style="color:var(--text);font-weight:700">Boxing Fundamentals</td><td>Elena Rostova</td><td>8/14</td><td><span class="badge badge-active">OPEN</span></td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-header"><div><h2>👥 Recent Joiners</h2><div class="count">Last 7 days</div></div></div>
        <table>
          <thead><tr><th>Name</th><th>Tier</th><th>Ref</th><th>Joined</th></tr></thead>
          <tbody>
            <tr><td style="color:var(--text);font-weight:600">Alex Morgan</td><td>Unlimited</td><td style="font-family:monospace;font-size:11px;color:var(--text3)">IW-2026-M920</td><td style="color:var(--brand)">Today</td></tr>
            <tr><td style="color:var(--text);font-weight:600">James Thornton</td><td>Standard</td><td style="font-family:monospace;font-size:11px;color:var(--text3)">IW-2026-M919</td><td style="color:var(--brand)">Today</td></tr>
            <tr><td style="color:var(--text);font-weight:600">Chloe Davies</td><td>Founding Member</td><td style="font-family:monospace;font-size:11px;color:var(--text3)">IW-2026-M918</td><td style="color:var(--text3)">Yesterday</td></tr>
            <tr><td style="color:var(--text);font-weight:600">Tariq Al-Mansoor</td><td>Unlimited</td><td style="font-family:monospace;font-size:11px;color:var(--text3)">IW-2026-M917</td><td style="color:var(--text3)">Yesterday</td></tr>
            <tr><td style="color:var(--text);font-weight:600">Priya Sharma</td><td>Standard</td><td style="font-family:monospace;font-size:11px;color:var(--text3)">IW-2026-M916</td><td style="color:var(--text3)">2 days ago</td></tr>
          </tbody>
        </table>
      </div>
    </div>`;
  res.send(layout('Dashboard', html, 'dashboard'));
});

app.get('/admin/classes', (_req: Request, res: Response) => {
  const rows = store.classes.map(c => {
    const badgeClass = `badge-${c.category.toLowerCase()}`;
    return `<tr>
      <td style="font-family:monospace;font-size:10px;color:var(--text3)">${c.id}</td>
      <td style="color:var(--text);font-weight:700">${c.name}</td>
      <td><span class="badge badge-strength" style="font-family:monospace">${c.day}</span></td>
      <td style="font-family:monospace">${c.time}</td><td>${c.duration}m</td>
      <td>${c.coach}</td><td>${c.capacity}</td>
      <td><span class="badge ${badgeClass}">${c.category}</span></td>
      <td><span class="badge ${c.active ? 'badge-active' : 'badge-inactive'}">${c.active ? 'ACTIVE' : 'OFF'}</span></td>
    </tr>`;
  }).join('');
  const html = `
    <div class="page-header"><h1>🏋️ Class Timetable</h1><p>Manage all ${store.classes.length} weekly coach-led sessions.</p></div>
    <div class="card">
      <div class="card-header"><div><h2>All Classes</h2><div class="count">${store.classes.length} sessions per week</div></div><a href="#" class="btn btn-brand">+ Add Class</a></div>
      <div style="overflow-x:auto"><table><thead><tr><th>ID</th><th>Class Name</th><th>Day</th><th>Time</th><th>Duration</th><th>Coach</th><th>Cap.</th><th>Category</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>`;
  res.send(layout('Classes', html, 'classes'));
});

app.get('/admin/coaches', (_req: Request, res: Response) => {
  const cards = store.coaches.map(c => `
    <div class="coach-card">
      <h3>${c.name}</h3><div class="role">${c.role}</div>
      <div class="bio">${c.bio}</div>
      <div class="certs">📜 ${c.certifications}</div>
      <div style="margin-top:12px"><span class="badge badge-active">ACTIVE</span></div>
    </div>`).join('');
  const html = `
    <div class="page-header"><h1>👤 Coaches</h1><p>Manage coach profiles, bios, certifications and class assignments.</p></div>
    <div class="card">
      <div class="card-header"><div><h2>All Coaches</h2><div class="count">${store.coaches.length} coaching staff</div></div><a href="#" class="btn btn-brand">+ Add Coach</a></div>
      <div class="coach-grid">${cards}</div>
    </div>`;
  res.send(layout('Coaches', html, 'coaches'));
});

app.get('/admin/plans', (_req: Request, res: Response) => {
  const cards = store.plans.map(p => `
    <div class="plan-card">
      <div class="tier">${p.tier.replace(/_/g, ' ')}</div>
      <h3>${p.name}</h3><div class="price">${p.price}</div>
      <div class="tagline">${p.tagline}</div>
      <div style="margin-top:16px;display:flex;gap:8px"><span class="badge badge-active">ACTIVE</span><a href="#" class="btn btn-ghost" style="font-size:10px">Edit</a></div>
    </div>`).join('');
  const html = `
    <div class="page-header"><h1>💳 Membership Plans</h1><p>Manage pricing tiers, features and Stripe price IDs.</p></div>
    <div class="card">
      <div class="card-header"><div><h2>All Plans</h2><div class="count">${store.plans.length} tiers</div></div><a href="#" class="btn btn-brand">+ Add Plan</a></div>
      <div class="plan-grid">${cards}</div>
    </div>`;
  res.send(layout('Membership Plans', html, 'plans'));
});

app.get('/admin/announcements', (_req: Request, res: Response) => {
  const cards = store.announcements.map(a => `
    <div class="ann-card">
      <h3>${a.title}</h3><p>${a.body}</p>
      <div class="meta"><span class="badge badge-active">Published</span><span>📅 ${a.createdAt}</span><a href="#" style="color:var(--brand);font-size:10px;font-weight:700">Edit</a></div>
    </div>`).join('');
  const html = `
    <div class="page-header"><h1>📢 Announcements</h1><p>Publish gym announcements and notices to the member portal.</p></div>
    <div style="margin-bottom:20px"><a href="#" class="btn btn-brand">+ New Announcement</a></div>
    ${cards}`;
  res.send(layout('Announcements', html, 'announcements'));
});

app.get('/admin/members', (_req: Request, res: Response) => {
  const rows = store.members.map(m => `
    <tr>
      <td style="color:var(--text);font-weight:600">${m.name}</td>
      <td style="color:var(--text2)">${m.email}</td><td>${m.tier}</td>
      <td style="font-family:monospace;font-size:11px;color:var(--text3)">${m.ref}</td>
      <td>${m.joined}</td>
      <td><span class="badge badge-active">${m.status}</span></td>
    </tr>`).join('');
  const html = `
    <div class="page-header"><h1>👥 Members Directory</h1><p>View and manage registered gym members.</p></div>
    <div class="card">
      <div class="card-header"><div><h2>All Members</h2><div class="count">${store.members.length} shown · 418 total</div></div><a href="#" class="btn btn-brand">+ Add Member</a></div>
      <div style="overflow-x:auto"><table><thead><tr><th>Name</th><th>Email</th><th>Tier</th><th>Ref</th><th>Joined</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>`;
  res.send(layout('Members', html, 'members'));
});

app.get('/', (_req: Request, res: Response) => res.redirect('/admin'));
app.use((_req: Request, res: Response) => res.status(404).redirect('/admin'));

app.listen(PORT, () => {
  console.log(`\n🏋️  IronWorks CMS Admin → http://localhost:${PORT}/admin`);
  console.log(`📊  API endpoints  → http://localhost:${PORT}/api/`);
  console.log(`✅  No database required\n`);
});
