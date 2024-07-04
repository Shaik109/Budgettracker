import styles from './Logout.module.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/login'); // Redirect to login page after sign-out
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <div className= {styles.container}>
    <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
