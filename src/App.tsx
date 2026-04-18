import { BookingEngine } from './components/BookingEngine';
import { TradeAccountPanel } from './components/TradeAccountPanel';
import { AdminDashboard } from './components/AdminDashboard';

export const App = () => (
  <main>
    <h1>Operations Platform Prototype</h1>
    <p>Tasks 4-7 implementation: booking, trade accounts, admin dashboard, and quality improvements.</p>
    <BookingEngine />
    <TradeAccountPanel />
    <AdminDashboard />
  </main>
);
