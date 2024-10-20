import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PingLoader from '../../components/PingLoader/PingLoader';
import UserCard from '../../components/UserCard/UserCard';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUserThunk, selectorUserData } from '../../store/slices/usersSlice';
import React from 'react';

const UserDetail = () => {
  const { id } = useParams();
  const { loading, currentUser } = useAppSelector(selectorUserData);
  const dispatch = useAppDispatch();

  const getUser = async (id: number) => {
    if (loading) return;
    dispatch(getUserThunk(id));
  };

  useEffect(() => {
    getUser(Number(id));
  }, []);

  if (loading || !currentUser) {
    return <PingLoader />;
  }

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="1rem"
    >
      <UserCard user={currentUser}></UserCard>
    </Box>
  );
};

export default UserDetail;
