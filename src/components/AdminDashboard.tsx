import { useEffect, useState } from 'react';
import type { SupportTicket } from '../types';
import { fetchDashboard, updateSupportTicket } from '../lib/mockApi';

const initialTickets: SupportTicket[] = [
  { id: 'T-101', customer: 'Acme', issue: 'Delayed courier', status: 'open' },
  { id: 'T-102', customer: 'Northwind', issue: 'Invoice mismatch', status: 'open' }
];

export const AdminDashboard = () => {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof fetchDashboard>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchDashboard();
        setStats(data);
      } catch {
        setError('Failed to load dashboard.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const closeTicket = async (ticket: SupportTicket) => {
    const optimistic = tickets.map((t) => (t.id === ticket.id ? { ...t, status: 'closed' as const } : t));
    setTickets(optimistic);
    try {
      await updateSupportTicket({ ...ticket, status: 'closed' });
    } catch {
      setTickets(tickets);
      setError('Ticket update failed; rolled back.');
    }
  };

  return (
    <section>
      <h2>Admin Dashboard</h2>
      {loading && <p>Loading dashboard...</p>}
      {error && <p className="error">{error}</p>}
      {stats && (
        <div className="grid cards">
          <article><h4>Total bookings</h4><p>{stats.totalBookings}</p></article>
          <article><h4>Pending bookings</h4><p>{stats.pendingBookings}</p></article>
          <article><h4>Open tickets</h4><p>{stats.openTickets}</p></article>
          <article><h4>Low stock items</h4><p>{stats.inventoryLowStock}</p></article>
          <article><h4>Trade approvals pending</h4><p>{stats.approvalsPending}</p></article>
        </div>
      )}

      <h3>Booking management</h3>
      <p>View queue, assign drivers, and update booking statuses.</p>

      <h3>Inventory management</h3>
      <p>Track low stock alerts and replenishment status.</p>

      <h3>Customer management</h3>
      <p>Inspect customer profiles and account health.</p>

      <h3>Trade approvals</h3>
      <p>Review trade applications and tax documentation.</p>

      <h3>Pricing rules</h3>
      <p>Configure service multipliers, promotions, and trade discounts.</p>

      <h3>Delivery zones</h3>
      <p>Manage zone coverage and distance-based surcharge tiers.</p>

      <h3>Support tickets</h3>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.id}: {ticket.issue} ({ticket.status})
            {ticket.status === 'open' && <button onClick={() => closeTicket(ticket)}>Close</button>}
          </li>
        ))}
      </ul>
    </section>
  );
};
