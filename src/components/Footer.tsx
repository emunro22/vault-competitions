import Link from 'next/link';

const footerLinks = {
  Competitions: [
    { href: '/competitions', label: 'All Competitions' },
    { href: '/competitions?category=cars', label: 'Cars' },
    { href: '/competitions?category=cash', label: 'Cash Prizes' },
    { href: '/competitions?category=tech', label: 'Tech' },
    { href: '/competitions?category=holidays', label: 'Holidays' },
  ],
  Company: [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/winners', label: 'Winners' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact Us' },
  ],
  Legal: [
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/responsible-play', label: 'Responsible Play' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-lg">
                SC
              </div>
              <span className="text-xl font-bold text-foreground">
                Scot<span className="text-primary-light">Comps</span>
              </span>
            </Link>
            <p className="text-sm text-muted max-w-xs mb-6">
              Scotland&apos;s premier prize competition platform. Win incredible prizes from cars to cash, tech to holidays.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'TikTok', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-card hover:bg-card-hover border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-primary-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-muted">
              <span>18+ Only</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Please play responsibly</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Free postal entry available</span>
            </div>
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} ScotComps Ltd. All rights reserved. Registered in Scotland.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
