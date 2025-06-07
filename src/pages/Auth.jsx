import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('התחברת בהצלחה!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('נרשמת בהצלחה!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{isLogin ? "התחברות" : "הרשמה"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">{isLogin ? "התחבר" : "הירשם"}</button>
      </form>
      <br />
      <button onClick={() => setIsLogin(!isLogin)}>
        עבור ל־{isLogin ? "הרשמה" : "התחברות"}
      </button>
    </div>
  );
}
