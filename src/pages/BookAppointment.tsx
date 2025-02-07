import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function BookAppointment() {
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchTimeSlots();
  }, [user, navigate]);

  const fetchTimeSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('is_available', true)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true });

      if (error) throw error;
      setTimeSlots(data || []);
    } catch (error: any) {
      toast.error('Failed to load time slots');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot) return;

    try {
      setLoading(true);
      const { error: appointmentError } = await supabase
        .from('appointments')
        .insert([
          {
            patient_id: user?.id,
            time_slot_id: selectedSlot,
            status: 'pending',
          },
        ]);

      if (appointmentError) throw appointmentError;

      const { error: slotError } = await supabase
        .from('time_slots')
        .update({ is_available: false })
        .eq('id', selectedSlot);

      if (slotError) throw slotError;

      toast.success('Appointment booked successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading available time slots...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book an Appointment</h2>
        
        {timeSlots.length === 0 ? (
          <p className="text-gray-600">No available time slots. Please check back later.</p>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`p-4 rounded-lg border ${
                    selectedSlot === slot.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-500'
                  }`}
                >
                  <div className="font-medium">
                    {format(new Date(slot.start_time), 'MMMM d, yyyy')}
                  </div>
                  <div className="text-gray-600">
                    {format(new Date(slot.start_time), 'h:mm a')} - 
                    {format(new Date(slot.end_time), 'h:mm a')}
                  </div>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleBooking}
              disabled={!selectedSlot || loading}
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}