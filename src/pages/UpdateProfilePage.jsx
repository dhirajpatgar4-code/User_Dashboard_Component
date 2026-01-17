import React, { useState } from 'react';
import { Calendar, Phone, Users, Globe, Clock, Mail, Bell, Video, Mic, User, Camera } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { updateProfile } from '../services/authServiceNew.js';
import { useNavigate } from 'react-router-dom';
import {Toaster,toast} from 'react-hot-toast';
import { useRef } from 'react';

function UpdateProfilePage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const {
    fullName,
    clientEmail,
    clientPhone,
    dob,
    gender,
    preferred_language,
    timezone,
    profilePic,
    secureToken,
    setProfilePic,
    setFullName,
    setClientPhone,
    setDob,
    setGender,
    setLanguage,
    setTimeZone,
  } = useAuthStore();

  // Format date to YYYY-MM-DD for input type="date"
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    fullname: fullName || '',
    displayName: fullName || '',
    email: clientEmail || '',
    phone_number: clientPhone ? `+91 ${clientPhone}` : '',
    dob: formatDateForInput(dob),
    gender: gender || 'male',
    preferred_language: preferred_language || 'English',
    timezone: timezone || 'Asia/Kolkata'
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(profilePic || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=b6e3f4');
  const [loading, setLoading] = useState(false);

  const sessions = [
    { id: 1, doctor: 'Dr. Abhishek Mehta', date: '12 OCT 2024', time: '04:00PM', duration: '50 minutes', type: 'voice' },
    { id: 2, doctor: 'Dr. Abhishek Mehta', date: '12 OCT 2024', time: '04:00PM', duration: '50 minutes', type: 'video' },
    { id: 3, doctor: 'Dr. Abhishek Mehta', date: '12 OCT 2024', time: '04:00PM', duration: '50 minutes', type: 'voice' },
    { id: 4, doctor: 'Dr. Abhishek Mehta', date: '12 OCT 2024', time: '04:00PM', duration: '50 minutes', type: 'video' },
    { id: 5, doctor: 'Dr. Abhishek Mehta', date: '12 OCT 2024', time: '04:00PM', duration: '50 minutes', type: 'voice' },
    { id: 6, doctor: 'Dr. Abhishek Mehta', date: '12 OCT 2024', time: '04:00PM', duration: '50 minutes', type: 'video' },
    { id: 7, doctor: 'Dr. Abhishek Mehta', date: '12 OCT 2024', time: '04:00PM', duration: '50 minutes', type: 'voice' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return 'Age not set';
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let days = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return `${years} years, ${days} days`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();

      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('displayName', formData.fullname);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phone_number.replace('+91 ', '').trim());
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('preferred_language', formData.preferred_language);
      formDataToSend.append('timezone', formData.timezone);

      // Only append profile image if a new one was selected
      if (profileImage) {
        formDataToSend.append('profilePic', profileImage);
      }

      const response = await updateProfile(formDataToSend);

      console.log('Update response:', response);

      if (response && (response.status === 200 || response.data?.success)) {
        // Update the Zustand store with new values
        setFullName(formData.fullname);
        setClientPhone(formData.phone_number.replace('+91 ', '').trim());
        setDob(formData.dob);
        setGender(formData.gender);
        setLanguage(formData.preferred_language);
        setTimeZone(formData.timezone);
        if (profileImage && previewUrl !== profilePic) {
          setProfilePic(previewUrl);
        }

        toast.success('Profile updated successfully!');

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
  }}
/>


      <div className="min-h-screen bg-gray-50 py-6 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Panel - Profile Info */}
            <div className="lg:col-span-7 space-y-8">
              {/* Header Section */}
              <div className="flex items-start">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full"
                    />
                    <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-purple-200 hover:bg-purple-300 rounded-full p-2 cursor-pointer transition">
                      <Camera className="w-4 h-4 text-black" />
                      <input
                        type="file"
                        id="profilePic"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-black">{formData.fullname || 'User Name'}</h1>
                    <p className="text-gray-500 text-base mt-1">{calculateAge(formData.dob)}</p>
                  </div>
                </div>
              </div>

              {/* Personal Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-5">Personal</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                  {/* Full Name - NOW EDITABLE */}
                  <div className="relative">
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-300 bg-white text-gray-700 text-sm"
                    />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                  </div>

                  {/* Email - NOW EDITABLE */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      readOnly
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-300 bg-gray-50 text-gray-700 text-sm"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                  </div>


                  {/* Date of Birth - NOW EDITABLE */}
                  <div className="relative">
                    <input
                      type="date"
                      name="dob"
                      ref={inputRef}
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-300 bg-white text-gray-700 text-sm"
                    />
                    <Calendar
                      onClick={() => inputRef.current?.showPicker()}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black cursor-pointer"
                    />

                  </div>


                  <div className="relative">
                    <input
                      type="tel"
                      name="phone_number"
                      maxLength={10}
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-300 bg-white text-gray-700 text-sm"
                    />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                  </div>

                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-300 bg-white text-gray-700 text-sm appearance-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      name="preferred_language"
                      value={formData.preferred_language}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-300 bg-white text-gray-700 text-sm appearance-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                    <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-purple-300 bg-white text-gray-700 text-sm appearance-none"
                    >
                      <option value="Asia/Kolkata">India (IST)</option>
                    </select>
                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Session Preference */}
              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-5">Session Preference</h2>
                <div className="relative max-w-xs">
                  <input
                    type="text"
                    value="All Sessions"
                    readOnly
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full bg-gray-100 text-gray-500 text-sm focus:outline-none cursor-not-allowed"
                  />
                  <Video className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Notification Preference */}
              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-5">Notification Preference</h2>
                <div className="relative max-w-xs">
                  <input
                    type="text"
                    value="Email & Message"
                    readOnly
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full bg-gray-100 text-gray-500 text-sm focus:outline-none cursor-not-allowed"
                  />
                  <Bell className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Update Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full md:w-auto px-12 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : 'Save'}
                </button>
              </div>
            </div>

            {/* Right Panel - Sessions History */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6">
                <h2 className="text-xl font-bold text-gray-700 mb-5">Sessions History</h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center gap-3 py-2">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek&backgroundColor=c8e6c9"
                        alt="Doctor"
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-black text-base">{session.doctor}</h3>
                        <p className="text-xs text-gray-500">{session.duration} Voice Session</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-0.5 flex-shrink-0">
                        <p className="text-xs text-gray-400">{session.date}</p>
                        <p className="text-xs text-gray-400">{session.time}</p>
                        {session.type === 'voice' ? (
                          <Mic className="w-5 h-5 text-black mt-1" />
                        ) : (
                          <Video className="w-5 h-5 text-black mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-5 bg-purple-200 hover:bg-purple-300 text-black py-3 rounded-full font-semibold transition">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfilePage;