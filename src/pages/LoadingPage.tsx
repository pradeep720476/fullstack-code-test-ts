import { useEffect, useState } from 'react';
import PingLoader from '../components/PingLoader/PingLoader';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/users');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <PingLoader/>;
};

export default LoadingPage;
