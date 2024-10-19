import { Person } from "@mui/icons-material";
import { CardContent, Avatar, Typography, CardActions, Button, Container, Grid, Grid2, Box, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import UserCard from "../components/UserCard/UserCard";
import Header from "../components/Header";
import { useCallback, useEffect, useRef, useState } from "react";


const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1); // State to manage the current page
    const perPage = 2;
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const fetchUsers = async (page: number) => {
        if (loading || !hasMore) return; // Prevent fetching if already loading or no more users

        setLoading(true);
        // Replace with your API call to fetch users
        const response: Response = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${perPage}`);
        const results = await response.json();
        setUsers((prev) => [...prev, ...results.data]);
        setLoading(false);

        // Set hasMore to false if there are no more users
        if (results.data.length < perPage) {
            setHasMore(false);
        }
    };

    const handleScroll = useCallback(() => {
        if (scrollRef?.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                console.log("....loading more");
                setPage((prev) => {
                    const next = prev + 1;
                    fetchUsers(next);
                    return next;
                });
            }
        }
    }, [scrollRef, loading, hasMore]);

    /**
     * Throttle the handleScroll
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
                    if ((Date.now() - lastRun >= limit)) {
                        func.apply(lexical, args);
                        lastRun = Date.now();
                    }
                }, limit - (Date.now() - lastRun));
            }
        }
    }

    const throttleHandleScroll = useCallback(throttle(handleScroll, 200), [handleScroll]);


    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    useEffect(() => {
        const innerRef = scrollRef?.current;
        if (innerRef)
            innerRef.addEventListener('scroll', handleScroll);
        return () => innerRef?.removeEventListener('scroll', handleScroll);;
    }, [throttleHandleScroll])



    return <div>
        <Header toggleDarkMode={() => { }} darkMode={true} />
        <Box paddingTop="2rem" width="100%" height="100%">
            <Box ref={scrollRef}
                sx={{
                    height: '500px', overflowY: 'scroll',
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    textAlign: 'center',
                }}>
                {users.map((user, index) => (
                    <UserCard user={user} key={index} />
                ))}
                {loading && <CircularProgress sx={{ color: "#7FB800" }} />}
                {!hasMore && !loading && <Typography>No more users to load.</Typography>}
            </Box>
        </Box >
    </div>;

};

export default UsersPage;
