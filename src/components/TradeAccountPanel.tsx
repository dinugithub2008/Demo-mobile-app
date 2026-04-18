import { useMemo, useState } from 'react';
import type { BookingRecord, BusinessProfile, TeamMember } from '../types';
import { calculatePricing } from '../lib/pricing';
import { validateBusinessProfile } from '../lib/validation';
import { addTeamMember, submitTradeApplication } from '../lib/mockApi';

const initialProfile: BusinessProfile = {
  companyName: '',
  contactName: '',
  taxId: '',
  approved: false
};

const mockBookings: BookingRecord[] = [
  {
    id: 'bkg-1001',
    customerName: 'Acme HQ',
    email: 'ops@acme.com',
    date: '2026-04-21',
    time: '11:00',
    serviceType: 'pickup',
    addOns: [],
    basePrice: 140,
    status: 'completed'
  }
];

export const TradeAccountPanel = () => {
  const [profile, setProfile] = useState<BusinessProfile>(initialProfile);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tradePricingExample = useMemo(
    () => calculatePricing(150, [{ id: 'bulk', name: 'Bulk Dispatch', price: 20 }], true),
    []
  );

  const apply = async () => {
    const errors = validateBusinessProfile(profile);
    if (errors.length) {
      setError(errors.join(' '));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const created = await submitTradeApplication(profile);
      setProfile(created);
    } catch {
      setError('Unable to submit trade application.');
    } finally {
      setLoading(false);
    }
  };

  const inviteMember = async () => {
    const member: TeamMember = {
      id: crypto.randomUUID(),
      name: `Member ${team.length + 1}`,
      email: `member${team.length + 1}@company.com`,
      role: 'staff'
    };

    setTeam((current) => [...current, member]);

    try {
      await addTeamMember(member);
    } catch {
      setTeam((current) => current.filter((m) => m.id !== member.id));
      setError('Failed to add team member, reverted optimistic update.');
    }
  };

  return (
    <section>
      <h2>Trade Account Features</h2>
      <div className="grid">
        <label>Company<input value={profile.companyName} onChange={(e) => setProfile({ ...profile, companyName: e.target.value })} /></label>
        <label>Contact<input value={profile.contactName} onChange={(e) => setProfile({ ...profile, contactName: e.target.value })} /></label>
        <label>Tax ID<input value={profile.taxId} onChange={(e) => setProfile({ ...profile, taxId: e.target.value })} /></label>
      </div>
      <button onClick={apply} disabled={loading}>{loading ? 'Submitting...' : 'Apply for Trade Account'}</button>

      <h3>Team Members</h3>
      <button onClick={inviteMember}>Add Team Member (Optimistic)</button>
      <ul>{team.map((m) => <li key={m.id}>{m.name} — {m.email}</li>)}</ul>

      <h3>Trade Pricing Visibility</h3>
      <p>Standard subtotal + fee: ${(tradePricingExample.basePrice + tradePricingExample.addOnTotal + tradePricingExample.serviceFee).toFixed(2)}</p>
      <p>Trade discount: -${tradePricingExample.tradeDiscount.toFixed(2)}</p>
      <p><strong>Trade total: ${tradePricingExample.total.toFixed(2)}</strong></p>

      <h3>Company-wide Booking / History View</h3>
      <ul>
        {mockBookings.concat(team.map((member, index) => ({
          id: `team-${index}`,
          customerName: member.name,
          email: member.email,
          date: '2026-04-23',
          time: '09:00',
          serviceType: 'pickup' as const,
          addOns: [],
          basePrice: 95,
          status: 'pending' as const
        }))).map((booking) => (
          <li key={booking.id}>{booking.id} — {booking.customerName} — {booking.status}</li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}
    </section>
  );
};
