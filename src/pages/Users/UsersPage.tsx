import { Typography, CircularProgress, Box } from '@mui/material';
import UserCard from '../../components/UserCard/UserCard';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUsersThunk, selectorUserData } from '../../store/slices/usersSlice';
import { Page } from '../../utils/constant';
import React from 'react';

const UsersPage = () => {
  const { users, page, loading, hasMore } = useAppSelector(selectorUserData);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const getUsers = async (currentPage: number) => {
    if (loading || !hasMore) return;
    dispatch(getUsersThunk({ page: currentPage, per_page: Page.pageSize }));
  };

  const handleScroll = useCallback(async () => {
    if (scrollRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        console.log('....loading more');
        await getUsers(page);
      }
    }
  }, [getUsers]);

  /**
   * Throttle the handleScroll to avoid uncessary call to api
   * @returns
   */
  const throttle = (func: Function, limit: number) => {
    let lastRun: number;
    let lastFunc: NodeJS.Timeout;
    return (...args: any) => {
      const lexical = this;
      if (!lastRun) {
        func.apply(lexical, ...args);
        lastRun = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRun >= limit) {
            func.apply(lexical, args);
            lastRun = Date.now();
          }
        }, limit);
      }
    };
  };

  
  const throttleHandleScroll = useCallback(throttle(handleScroll, 200), [
    handleScroll,
  ]);

  useEffect(() => {
    getUsers(page);
  }, []);

  useEffect(() => {
    const innerRef = scrollRef?.current;
    if (innerRef) innerRef.addEventListener('scroll', throttleHandleScroll);
    return () => innerRef?.removeEventListener('scroll', throttleHandleScroll);
  }, [throttleHandleScroll]);

  return (
    <Box
      ref={scrollRef}
      sx={{
        height: '900px',
        overflowY: 'scroll',
        padding: '2rem',
        marginTop: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      {users.map((user, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="1rem"
        >
          <UserCard user={user} />
        </Box>
      ))}
      {loading && <CircularProgress sx={{ color: '#7FB800' }} />}
      {!hasMore && !loading && <Typography>No more users to load.</Typography>}
    </Box>
  );
};

export default UsersPage;
