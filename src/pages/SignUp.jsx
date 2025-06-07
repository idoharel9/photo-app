import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { paddleService } from '../services/paddleService';
import { SUBSCRIPTION_PLANS } from '../config/paddle';
import './Auth.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
        subscriptionStatus: 'pending',
        plan: selectedPlan
      });

      // Open Paddle checkout
      await paddleService.openCheckout(
        SUBSCRIPTION_PLANS[selectedPlan].id,
        {
          email: user.email,
          userId: user.uid
        }
      );

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="plan">Select Plan</label>
            <select
              id="plan"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              required
            >
              {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
                <option key={key} value={key}>
                  {plan.name} - ${plan.price}/month
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?{' '}
          <a href="/login" onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
} 