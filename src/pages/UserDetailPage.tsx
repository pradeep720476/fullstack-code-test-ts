import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PingLoader from "../components/PingLoader/PingLoader";


const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`); // Fetch user details by ID
            const userData = await response.json();
            console.log(userData.data);
            setUser(userData.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    if (loading) {
        return <PingLoader />;
    }

    return <Box>
        <div>{user?.email}</div>
        <div>Screen</div>
    </Box>
}

export default UserDetail;