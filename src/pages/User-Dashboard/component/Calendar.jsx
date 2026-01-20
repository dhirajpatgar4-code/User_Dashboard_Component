// components/Calendar.jsx - Update with these mobile improvements
import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(29);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const days = [
    null, null, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, null, null, null, null
  ];

  // Check if mobile on component mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDate(day);
      if (day === 29) {
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleJoinSession = () => {
    alert('Joining video session with Dr. Anil Ojha at 13:00 PM');
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-title">Monthly</div>
        <div className="month-nav">
          <span className="month-year">Jan 2026</span>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="weekdays">
          <div>SUN</div>
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div>SAT</div>
        </div>

        <div className="days-grid">
          {days.map((day, index) => (
            <div
              key={index}
              className={`day ${!day ? 'empty' : ''} ${day === 26 ? 'today' : ''} ${day === selectedDate ? 'selected' : ''} ${[27, 28].includes(day) ? 'has-session' : ''}`}
              onClick={() => handleDayClick(day)}
              aria-label={day ? `Date ${day}` : 'Empty day'}
              role="button"
              tabIndex={day ? 0 : -1}
            >
              {day || ''}
            </div>
          ))}
        </div>
        
        <div className="today-indicator">
          <div className="today-dot"></div>
          <span>Today</span>
        </div>
      </div>

      <div className="video-session text-center">
        <h3>Video Session</h3>
        <div className="session-time">13:00 PM to 14:00 PM</div>
        <a 
          href="#" 
          className="session-doctor"
          onClick={(e) => {
            e.preventDefault();
            alert('Viewing Dr. Anil Ojha profile');
          }}
        >
          Dr. Anil Ojha
        </a>
        <div className="session-topic mb-8">Depression Treatment</div>
        
        <button 
          className="join-btn-pulse"
          onClick={handleJoinSession}
          aria-label="Join video session"
        >
          <span className="btn-content">
            <i className="fas fa-video mr-3"></i>
            Join Session
          </span>
          <span className="pulse-ring"></span>
          <span className="pulse-ring ring-2"></span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="modal-overlay" 
          style={{display: 'flex'}} 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-btn" 
              onClick={closeModal}
              aria-label="Close modal"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-header">
              <div id="modal-title" className="modal-title">
                Change Date / Time Calendar
              </div>
              <div className="modal-doctor">Dr. Nitin Mehta</div>
              <div className="month-nav">
                <span className="month-year">June 2025</span>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>

            <div className="calendar-grid">
              <div className="weekdays">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
              </div>

              <div className="days-grid">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`day ${!day ? 'empty' : ''} ${day === 26 ? 'today' : ''} ${day === 29 ? 'selected' : ''}`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day || ''}
                  </div>
                ))}
              </div>
            </div>

            <div className="time-slots-section">
              <div className="time-slots-title">Select time slot you are available</div>
              
              <div className="time-slot">
                <div className="slot-time">All Day Available</div>
                <div className="slot-cta">Choose Time Slot</div>
              </div>
              
              <div className="time-slot">
                <div className="slot-time">04:00 PM to 05:00 PM</div>
                <div className="slot-cta">Choose Time Slot</div>
              </div>
              
              <div className="time-slot">
                <div className="slot-time">12:00 PM to 02:00 PM</div>
                <div className="slot-cta">Choose Time Slot</div>
              </div>
            </div>

            <button className="btn btn-primary">Request Change</button>
            <button className="btn btn-secondary">Suggest Reschedule</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;