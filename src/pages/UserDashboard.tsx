import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchAppointments();
  }, [user, navigate]);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          time_slots (*)
        `)
        .eq('patient_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading your appointments...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
          <button
            onClick={() => navigate('/book')}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
          >
            Book New Appointment
          </button>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-600">You don't have any appointments yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 hover:border-teal-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">
                      {format(new Date(appointment.time_slots.start_time), 'MMMM d, yyyy')}
                    </div>
                    <div className="text-gray-600">
                      {format(new Date(appointment.time_slots.start_time), 'h:mm a')} - 
                      {format(new Date(appointment.time_slots.end_time), 'h:mm a')}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : appointment.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
                {appointment.notes && (
                  <div className="mt-2 text-gray-600">
                    <strong>Notes:</strong> {appointment.notes}
                  </div>
                )}
                {appointment.follow_up_date && (
                  <div className="mt-2 text-teal-600">
                    <strong>Follow-up:</strong>{' '}
                    {format(new Date(appointment.follow_up_date), 'MMMM d, yyyy')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}