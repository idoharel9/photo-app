import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Dashboard.css';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit, setStorageLimit] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        // Fetch user's events
        const eventsQuery = query(
          collection(db, 'events'),
          where('userId', '==', user.uid)
        );
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsList = eventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventsList);

        // Fetch user's subscription data
        const userDoc = await getDocs(query(
          collection(db, 'users'),
          where('uid', '==', user.uid)
        ));
        
        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          setStorageLimit(userData.storageLimit || 0);
          setStorageUsed(userData.storageUsed || 0);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </header>

      <div className="storage-info">
        <h2>Storage Usage</h2>
        <div className="storage-bar">
          <div 
            className="storage-used"
            style={{ width: `${(storageUsed / storageLimit) * 100}%` }}
          />
        </div>
        <p>
          {Math.round(storageUsed / 1024 / 1024)}MB / {Math.round(storageLimit / 1024 / 1024)}MB used
        </p>
      </div>

      <div className="events-section">
        <div className="events-header">
          <h2>Your Events</h2>
          <button onClick={handleCreateEvent} className="create-event-button">
            Create New Event
          </button>
        </div>

        {events.length === 0 ? (
          <p className="no-events">No events yet. Create your first event!</p>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.photoCount || 0} photos</p>
                <button 
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="view-event-button"
                >
                  View Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
