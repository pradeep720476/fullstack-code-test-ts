import {
    Typography,
    CircularProgress,
    Box,
} from '@mui/material';
import UserCard from '../components/UserCard/UserCard';
import { useCallback, useEffect, useRef, useState } from 'react';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1); // State to manage the current page
    const perPage = 4;
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const fetchUsers = async (page: number) => {
        if (loading || !hasMore) return; // Prevent fetching if already loading or no more users
        setLoading(true);
        try {
            const response: Response = await fetch(
                `https://reqres.in/api/users?page=${page}&per_page=${perPage}`
            );
            let results = await response.json();
            setUsers((prev) => {
                const existid = new Set(prev.map(user => user.id));
                return [...prev, ...results.data.filter((newuser: { id: any; }) => !existid.has(newuser.id))]
            });
            setLoading(false);

            // Set hasMore to false if there are no more users
            if (results.data.length < perPage) {
                setHasMore(false);
            }
        } finally {
            setLoading(false);
        }

    };

    const handleScroll = useCallback(() => {
        if (scrollRef?.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                console.log('....loading more');
                setPage((prev) => {
                    const next = prev + 1;
                    fetchUsers(next);
                    return next;
                });
            }
        }
    }, [scrollRef, loading, hasMore]);

    /**
     * Throttle the handleScroll for limited time
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
                lastFunc = setTimeout(
                    () => {
                        if (Date.now() - lastRun >= limit) {
                            func.apply(lexical, args);
                            lastRun = Date.now();
                        }
                    },
                    limit
                );
            }
        };
    };

    /**
     * Throttle Scroll callback to avoid uncessary re-render
     */
    const throttleHandleScroll = useCallback(throttle(handleScroll, 300), [
        handleScroll,
    ]);

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    useEffect(() => {
        const innerRef = scrollRef?.current;
        if (innerRef) innerRef.addEventListener('scroll', handleScroll);
        return () => innerRef?.removeEventListener('scroll', handleScroll);
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
                <Box key={index} display="flex" justifyContent="center" alignItems="center" margin="1rem"><UserCard user={user} /></Box>
            ))}
            {loading && <CircularProgress sx={{ color: '#7FB800' }} />}
            {!hasMore && !loading && (
                <Typography>No more users to load.</Typography>
            )}
        </Box>
    );
};

export default UsersPage;
