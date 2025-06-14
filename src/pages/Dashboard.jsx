import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './Dashboard.css';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit, setStorageLimit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        setError(null);

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
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setStorageLimit(userData.storageLimit || 1024 * 1024 * 1024); // 1GB default
          setStorageUsed(userData.storageUsed || 0);
        } else {
          // If user document doesn't exist, create it with default values
          setStorageLimit(1024 * 1024 * 1024); // 1GB default
          setStorageUsed(0);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load dashboard data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
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
      setError('Failed to log out. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
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
            style={{ width: `${Math.min((storageUsed / storageLimit) * 100, 100)}%` }}
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
          <div className="no-events">
            <p>You haven't created any events yet.</p>
            <button onClick={handleCreateEvent} className="create-event-button">
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <p>Date: {new Date(event.date.toDate()).toLocaleDateString()}</p>
                <p>Photos: {event.photoCount || 0}</p>
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
