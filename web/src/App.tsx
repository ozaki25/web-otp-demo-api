import React from 'react';
import { useSelector } from 'react-redux';
import Router from './routes/router';
import useWebOtp from './hooks/useWebOtp';
import { selectId } from './store/otpSlice';

function App() {
  useWebOtp();
  const id = useSelector(selectId);
  return (
    <>
      <h1>Web Otp Demo</h1>
      <p>id: {id}</p>
      <Router />
    </>
  );
}

export default App;
