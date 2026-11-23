'use client';

import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Airplane,
  Buildings,
  Train,
  CheckCircle,
  WarningCircle,
  Plus,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from '@phosphor-icons/react';
import { Booking } from '@/types';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
        setSelectedBooking(data.bookings[0] || null);
      }
    } catch (err) {
      console.error('Fetch bookings error:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirmBooking = async (id: string, optionId?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          confirmBooking: true,
          selectedOptionId: optionId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmingId(null);
        await fetchBookings();
      }
    } catch (err) {
      console.error('Confirm booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Travel & Logistics Engine
          </span>
          <h1 className="heading-3 text-white font-semibold">Autonomous Booking Assistant</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Real-time flight, hotel, and transit research. Strict user confirmation required before any transaction execution.
          </p>
        </div>
      </div>

      {/* Safeguard Notice per Section 14 */}
      <div className="p-4 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder caption-3 text-jarvis-textSecondary flex items-center gap-3">
        <ShieldCheck size={22} className="text-jarvis-success shrink-0" />
        <span>
          <strong>Transaction Safeguard:</strong> JARVIS never charges credit cards, completes payments, or claims a booking is confirmed without explicit user confirmation and verified provider reference codes.
        </span>
      </div>

      {/* Bookings View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings List (1 Col) */}
        <div className="space-y-3">
          <span className="caption-4 font-mono text-jarvis-textMuted uppercase px-1 block">Prepared Bookings</span>
          {bookings.map((b) => {
            const isSelected = selectedBooking?.id === b.id;
            const isConfirmed = b.status === 'confirmed';
            return (
              <button
                key={b.id}
                onClick={() => setSelectedBooking(b)}
                className={`w-full p-4 rounded-xl border text-left transition-all interactive-tap ${
                  isSelected
                    ? 'bg-jarvis-surfaceElevated border-jarvis-accentBlue shadow-lg'
                    : 'bg-surface-dark1 border-jarvis-surfaceBorder hover:border-jarvis-textMuted'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                    {b.serviceType}
                  </span>
                  <span
                    className={`caption-5 font-mono uppercase px-2 py-0.5 rounded ${
                      isConfirmed
                        ? 'text-jarvis-success bg-jarvis-success/10 border border-jarvis-success/20'
                        : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <h3 className="title-4 text-white font-semibold truncate">{b.title}</h3>
              </button>
            );
          })}
        </div>

        {/* Booking Details & Comparison (2 Cols) */}
        {selectedBooking && (
          <div className="lg:col-span-2 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-jarvis-surfaceBorder pb-6">
              <div>
                <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2.5 py-0.5 rounded border border-jarvis-surfaceBorder inline-block mb-1">
                  Service: {selectedBooking.serviceType}
                </span>
                <h2 className="heading-4 text-white font-bold">{selectedBooking.title}</h2>
                <div className="flex items-center gap-3 mt-1 caption-4 text-jarvis-textSecondary font-mono">
                  {Object.entries(selectedBooking.searchCriteria).map(([k, v]) => (
                    <span key={k}>
                      {k}: <strong className="text-white">{v}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {selectedBooking.confirmationCode && (
                <div className="text-right sm:self-center shrink-0 p-3 rounded-xl bg-surface-dark2 border border-jarvis-success/30">
                  <span className="caption-5 font-mono text-jarvis-success uppercase block">Confirmed Code</span>
                  <span className="heading-4 text-white font-mono font-bold">{selectedBooking.confirmationCode}</span>
                </div>
              )}
            </div>

            {/* Options Comparison */}
            <div>
              <h3 className="title-3 text-white font-semibold mb-3">Verified Travel Options</h3>
              <div className="space-y-3">
                {selectedBooking.options.map((opt) => {
                  const isSelected = selectedBooking.selectedOptionId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-jarvis-surfaceElevated border-jarvis-accentCyan'
                          : 'bg-surface-dark2 border-jarvis-surfaceBorder'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="title-3 text-white font-semibold">{opt.name}</h4>
                          {opt.rating && (
                            <span className="caption-5 font-mono text-amber-400 bg-surface-dark3 px-1.5 py-0.5 rounded">
                              ★ {opt.rating}
                            </span>
                          )}
                        </div>
                        <p className="caption-3 text-jarvis-textSecondary">{opt.details}</p>
                        <span className="caption-4 font-mono text-jarvis-accentCyan mt-1 block">
                          Availability: {opt.availability}
                        </span>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <span className="heading-4 text-white font-mono font-bold">{opt.price}</span>

                        {selectedBooking.status !== 'confirmed' ? (
                          <button
                            onClick={() => handleConfirmBooking(selectedBooking.id, opt.id)}
                            disabled={loading}
                            className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white rounded-lg interactive-tap shadow-md"
                          >
                            {loading ? 'Confirming...' : 'Approve & Confirm'}
                          </button>
                        ) : (
                          <span className="caption-4 font-mono text-jarvis-success flex items-center gap-1">
                            <CheckCircle size={14} weight="fill" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedBooking.confirmedDetails && (
              <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder caption-3 text-jarvis-textSecondary font-mono">
                <strong className="text-white block mb-1">Execution Status:</strong>
                {selectedBooking.confirmedDetails}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
