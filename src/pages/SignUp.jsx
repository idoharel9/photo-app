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
  const [step, setStep] = useState('form'); // 'form', 'creating', 'checkout'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setStep('creating');

    try {
      // Step 1: Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
        subscriptionStatus: 'pending',
        plan: selectedPlan,
        storageUsed: 0,
        storageLimit: 1024 * 1024 * 1024 // 1GB default
      });

      // Step 3: Open Paddle checkout
      setStep('checkout');
      await paddleService.openCheckout(
        SUBSCRIPTION_PLANS[selectedPlan].id,
        {
          email: user.email,
          userId: user.uid
        }
      );

    } catch (err) {
      console.error('Signup error:', err);
      let errorMessage = 'An error occurred during signup. ';
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please try logging in.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      setError(errorMessage);
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case 'creating':
        return (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Creating your account...</p>
          </div>
        );
      case 'checkout':
        return (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Preparing checkout...</p>
          </div>
        );
      default:
        return (
          <>
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
                  disabled={loading}
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
                  disabled={loading}
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="plan">Select Plan</label>
                <select
                  id="plan"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  required
                  disabled={loading}
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
          </>
        );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {renderContent()}
      </div>
    </div>
  );
} 