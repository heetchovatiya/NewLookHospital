import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !profile?.is_admin) {
      navigate('/');
      return;
    }

    fetchAppointments();
  }, [user, profile, navigate]);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          time_slots (*),
          profiles (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (error: any) {
      toast.error('Failed to update appointment');
    }
  };

  const addFollowUp = async (id: string, date: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ follow_up_date: date })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Follow-up date added');
      fetchAppointments();
    } catch (error: any) {
      toast.error('Failed to add follow-up date');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointments Management</h2>

        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-6 hover:border-teal-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">
                    {appointment.profiles.full_name}
                  </h3>
                  <div className="text-gray-600">
                    {appointment.profiles.phone}
                  </div>
                  <div className="text-gray-600">
                    {appointment.profiles.email}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {format(new Date(appointment.time_slots.start_time), 'MMMM d, yyyy')}
                  </div>
                  <div className="text-gray-600">
                    {format(new Date(appointment.time_slots.start_time), 'h:mm a')} - 
                    {format(new Date(appointment.time_slots.end_time), 'h:mm a')}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <select
                  value={appointment.status}
                  onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <input
                  type="date"
                  value={appointment.follow_up_date || ''}
                  onChange={(e) => addFollowUp(appointment.id, e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              {appointment.notes && (
                <div className="mt-4 text-gray-600">
                  <strong>Notes:</strong> {appointment.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
