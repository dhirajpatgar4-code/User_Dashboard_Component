import React from 'react';
import './RecentSessions.css';

const RecentSessions = () => {
  const sessions = [
    {
      id: 1,
      doctor: 'Dr. Abhishek Mehta',
      type: '50 minutes Voice Session',
      date: '12 OCT 2024',
      time: '04:00 PM',
      status: 'completed',
      initials: 'AM'
    },
    {
      id: 2,
      doctor: 'Dr. Abhishek Mehta',
      type: '50 minutes Voice Session',
      date: '12 Oct 2024',
      time: '04:00 PM',
      status: 'completed',
      initials: 'AM'
    },
    {
      id: 3,
      doctor: 'Dr. Abhishek Mehta',
      type: '50 minutes Voice Session',
      date: '12 OCT 2024',
      time: '04:00 PM',
      status: 'upcoming',
      initials: 'AM'
    },
    {
      id: 4,
      doctor: 'Dr. Nitin Mehta',
      type: '45 minutes Voice Session',
      date: '11 OCT 2024',
      time: '03:00 PM',
      status: 'completed',
      initials: 'NM'
    },
    {
      id: 5,
      doctor: 'Dr. Anil Ojha',
      type: '60 minutes Video Session',
      date: '10 OCT 2024',
      time: '01:00 PM',
      status: 'completed',
      initials: 'AO'
    }
  ];

  const handleJoinSession = (doctor) => {
    alert(`Joining session with ${doctor}`);
  };

  const handleViewAll = () => {
    alert('Navigating to all sessions page');
  };

  const handleActionClick = (doctor) => {
    alert(`Options for ${doctor}'s session`);
  };

  const handleProfileClick = (doctor) => {
    alert(`Viewing ${doctor}'s profile`);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <div className="history-title">Recent Sessions</div>
        <div className="history-subtitle">Your therapy session history</div>
      </div>

      <div className="sessions-list">
        {sessions.map(session => (
          <div key={session.id} className="session-item">
            <div className="doctor-profile" onClick={() => handleProfileClick(session.doctor)}>
              <div className="doctor-avatar">
                {session.initials}
              </div>
            </div>
            
            <div className="session-details">
              <div className="doctor-name">{session.doctor}</div>
              <div className="session-type">{session.type}</div>
              <div className="session-date">
                <i className="far fa-calendar"></i> {session.date}
              </div>
              <div className="session-time">{session.time}</div>
              <div className="session-status">
                <span className={`status-badge ${session.status === 'completed' ? 'status-completed' : 'status-upcoming'}`}>
                  {session.status === 'completed' ? 'Completed' : 'Upcoming'}
                </span>
                <button 
                  className={`join-btn ${session.status === 'completed' ? 'disabled' : ''}`}
                  onClick={() => handleJoinSession(session.doctor)}
                  disabled={session.status === 'completed'}
                >
                  {session.status === 'completed' ? 'Session Ended' : 'Join Session'}
                </button>
              </div>
            </div>
            
            <div className="session-actions">
              <button 
                className="action-btn" 
                title="More options"
                onClick={() => handleActionClick(session.doctor)}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="view-all">
        <button className="view-all-btn" onClick={handleViewAll}>
          <i className="fas fa-list"></i> View All Sessions
        </button>
      </div>
    </div>
  );
};

export default RecentSessions;