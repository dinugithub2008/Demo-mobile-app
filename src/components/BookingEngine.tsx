import { useMemo, useState } from 'react';
import type { AddOn, BookingRecord, ServiceType } from '../types';
import { calculatePricing } from '../lib/pricing';
import { validateBooking } from '../lib/validation';
import { createStripeCheckoutSession, submitBooking } from '../lib/mockApi';

const ADD_ONS: AddOn[] = [
  { id: 'fragile', name: 'Fragile Handling', price: 25 },
  { id: 'express', name: 'Express Turnaround', price: 40 },
  { id: 'insurance', name: 'Premium Insurance', price: 30 }
];

export const BookingEngine = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('pickup');
  const [address, setAddress] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);

  const pricing = useMemo(() => calculatePricing(120, selectedAddOns, false), [selectedAddOns]);

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns((current) =>
      current.some((item) => item.id === addOn.id)
        ? current.filter((item) => item.id !== addOn.id)
        : [...current, addOn]
    );
  };

  const onUploadPlaceholder = (filename: string) => {
    setDocuments((current) => [...current, filename]);
  };

  const onSubmit = async () => {
    const validationErrors = validateBooking({ customerName, email, date, time, serviceType, address, addOns: selectedAddOns, basePrice: 120 });
    if (validationErrors.length > 0) {
      setError(validationErrors.join(' '));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const booking: BookingRecord = {
        id: crypto.randomUUID(),
        customerName,
        email,
        date,
        time,
        serviceType,
        address,
        addOns: selectedAddOns,
        basePrice: 120,
        status: 'pending'
      };

      const confirmed = await submitBooking(booking);
      const checkout = await createStripeCheckoutSession(confirmed.id);
      setConfirmation(`Booking ${confirmed.id.slice(0, 8)} confirmed. Continue payment: ${checkout.checkoutUrl}`);
    } catch {
      setError('Booking failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Booking Engine</h2>
      <div className="grid">
        <label>Name<input value={customerName} onChange={(e) => setCustomerName(e.target.value)} /></label>
        <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        <label>Time<input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
      </div>

      <div className="row">
        <button onClick={() => setServiceType('pickup')} className={serviceType === 'pickup' ? 'active' : ''}>Pickup</button>
        <button onClick={() => setServiceType('delivery')} className={serviceType === 'delivery' ? 'active' : ''}>Delivery</button>
      </div>

      {serviceType === 'delivery' && (
        <label>Address<input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" /></label>
      )}

      <h3>Add-ons</h3>
      <div className="row wrap">
        {ADD_ONS.map((addOn) => (
          <button key={addOn.id} onClick={() => toggleAddOn(addOn)} className={selectedAddOns.some((item) => item.id === addOn.id) ? 'active' : ''}>
            {addOn.name} (+${addOn.price})
          </button>
        ))}
      </div>

      <h3>Documents (Upload Placeholders)</h3>
      <div className="row">
        <button onClick={() => onUploadPlaceholder('photo-id.png')}>Upload ID</button>
        <button onClick={() => onUploadPlaceholder('invoice.pdf')}>Upload Invoice</button>
      </div>
      <ul>{documents.map((doc) => <li key={doc}>{doc}</li>)}</ul>

      <h3>Pricing</h3>
      <ul>
        <li>Base: ${pricing.basePrice.toFixed(2)}</li>
        <li>Add-ons: ${pricing.addOnTotal.toFixed(2)}</li>
        <li>Service fee: ${pricing.serviceFee.toFixed(2)}</li>
        <li><strong>Total: ${pricing.total.toFixed(2)}</strong></li>
      </ul>

      {error && <p className="error">{error}</p>}
      {confirmation && <p className="success">{confirmation}</p>}
      <button onClick={onSubmit} disabled={loading}>{loading ? 'Processing...' : 'Confirm & Checkout'}</button>
    </section>
  );
};
