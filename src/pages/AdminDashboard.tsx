import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchAppointments();
    fetchTimeSlots();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          profiles (*),
          time_slots (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      toast.error('Failed to load appointments');
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      setTimeSlots(data || []);
    } catch (error: any) {
      toast.error('Failed to load time slots');
    }
  };

  const handleTimeSlotUpdate = async (id: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from('time_slots')
        .update({ is_available: isAvailable })
        .eq('id', id);

      if (error) throw error;
      fetchTimeSlots();
      toast.success('Time slot updated successfully');
    } catch (error: any) {
      toast.error('Failed to update time slot');
    }
  };

  const handleAppointmentUpdate = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchAppointments();
      toast.success('Appointment updated successfully');
    } catch (error: any) {
      toast.error('Failed to update appointment');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Manage Time Slots</h3>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Start Time</th>
              <th className="py-2 px-4 border-b">End Time</th>
              <th className="py-2 px-4 border-b">Available</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.id}>
                <td className="py-2 px-4 border-b">{new Date(slot.start_time).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{new Date(slot.end_time).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{slot.is_available ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleTimeSlotUpdate(slot.id, !slot.is_available)}
                    className={`px-4 py-2 rounded-md ${slot.is_available ? 'bg-red-600' : 'bg-green-600'} text-white`}
                  >
                    {slot.is_available ? 'Mark Unavailable' : 'Mark Available'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Manage Appointments</h3>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Patient</th>
              <th className="py-2 px-4 border-b">Time Slot</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4 border-b">{appointment.profiles.full_name}</td>
                <td className="py-2 px-4 border-b">{new Date(appointment.time_slots.start_time).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{appointment.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleAppointmentUpdate(appointment.id, 'confirmed')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md mr-2"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleAppointmentUpdate(appointment.id, 'cancelled')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
