import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PingLoader from '../components/PingLoader/PingLoader';
import UserCard from '../components/UserCard/UserCard';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getUserThunk, selectorUserData } from '../store/slices/usersSlcie';

const UserDetail = () => {
    const { id } = useParams();
    const { loading, currentUser } = useAppSelector(selectorUserData);
    const dispatch = useAppDispatch();
    console.log(id);

    const getUser = async (id: string) => {
        if (loading) return;
        dispatch(getUserThunk(id));
    };

    useEffect(() => {
        getUser(id);
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
