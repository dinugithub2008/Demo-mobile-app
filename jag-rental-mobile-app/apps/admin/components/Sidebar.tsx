import Link from 'next/link';

const routes = [
  ['Bookings', '/bookings'],
  ['Inventory', '/inventory'],
  ['Pricing Rules', '/pricing'],
  ['Delivery Zones', '/delivery-zones'],
  ['Customers', '/customers'],
  ['Trade Accounts', '/trade-accounts'],
  ['Support Tickets', '/support'],
  ['Payments & Refunds', '/payments'],
  ['Content & Promotions', '/content'],
];

export function Sidebar() {
  return (
    <aside className="bg-slate-900 text-slate-100 p-5">
      <h2 className="text-lg font-semibold mb-4">JAG RENT</h2>
      <nav className="space-y-2">
        {routes.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded px-3 py-2 hover:bg-slate-700">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
