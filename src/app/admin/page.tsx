import Link from 'next/link';

const stats = [
  { label: 'Active Competitions', value: '10', change: '+2 this week', color: 'text-primary-light' },
  { label: 'Total Revenue', value: '£48,250', change: '+12.5% vs last month', color: 'text-success' },
  { label: 'Total Users', value: '3,842', change: '+156 this week', color: 'text-accent' },
  { label: 'Tickets Sold Today', value: '284', change: '+18% vs yesterday', color: 'text-primary-light' },
];

const recentOrders = [
  { id: 'ORD-001', user: 'Jamie M.', competition: 'BMW M4 Competition', tickets: 5, total: '£9.95', time: '2 min ago' },
  { id: 'ORD-002', user: 'Sarah K.', competition: '£25,000 Cash Prize', tickets: 10, total: '£9.90', time: '8 min ago' },
  { id: 'ORD-003', user: 'Craig D.', competition: 'Rolex Submariner', tickets: 3, total: '£3.87', time: '15 min ago' },
  { id: 'ORD-004', user: 'Emma R.', competition: 'Maldives Holiday', tickets: 2, total: '£2.98', time: '23 min ago' },
  { id: 'ORD-005', user: 'Mark T.', competition: 'PS5 Pro Gaming Setup', tickets: 8, total: '£6.32', time: '31 min ago' },
];

const upcomingDraws = [
  { competition: '£5,000 Cash Quickie', date: '3 Jul 2026', sold: '870/999', percent: 87 },
  { competition: 'Rolex Submariner', date: '5 Jul 2026', sold: '1,876/1,999', percent: 94 },
  { competition: 'MacBook Pro Bundle', date: '8 Jul 2026', sold: '1,287/1,999', percent: 64 },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="animate-fade-in-up mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Dashboard</h1>
        <p className="text-muted">Welcome back. Here&apos;s what&apos;s happening with ScotComps.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="animate-fade-in-up bg-card border border-border rounded-xl p-5"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-sm text-muted mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="animate-fade-in-up lg:col-span-2" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
            <span className="text-xs text-muted">Live feed</span>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Order</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">User</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3 hidden sm:table-cell">Competition</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Total</th>
                    <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-white/[0.02]">
                      <td className="px-5 py-3.5 text-sm font-mono text-primary-light">{order.id}</td>
                      <td className="px-5 py-3.5 text-sm text-foreground">{order.user}</td>
                      <td className="px-5 py-3.5 text-sm text-muted hidden sm:table-cell truncate max-w-[200px]">{order.competition}</td>
                      <td className="px-5 py-3.5 text-sm font-medium text-foreground">{order.total}</td>
                      <td className="px-5 py-3.5 text-xs text-muted">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Draws</h2>
            <Link href="/admin/draws" className="text-xs text-primary-light hover:text-primary transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingDraws.map((draw) => (
              <div key={draw.competition} className="bg-card border border-border rounded-xl p-4">
                <h3 className="text-sm font-medium text-foreground mb-1 truncate">{draw.competition}</h3>
                <p className="text-xs text-muted mb-3">{draw.date}</p>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted">{draw.sold} sold</span>
                  <span className={`text-xs font-semibold ${draw.percent >= 80 ? 'text-danger' : draw.percent >= 50 ? 'text-accent' : 'text-success'}`}>
                    {draw.percent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      draw.percent >= 80
                        ? 'bg-gradient-to-r from-accent to-danger'
                        : draw.percent >= 50
                        ? 'bg-gradient-to-r from-success to-accent'
                        : 'bg-gradient-to-r from-primary to-success'
                    }`}
                    style={{ width: `${draw.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/admin/competitions/new"
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 hover:border-primary/50 transition-colors"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">New Competition</span>
              </Link>
              <Link
                href="/admin/draws"
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 hover:border-primary/50 transition-colors"
              >
                <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">Run a Draw</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
