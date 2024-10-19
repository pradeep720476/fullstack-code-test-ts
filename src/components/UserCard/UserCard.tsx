import { Person } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
    const navigation = useNavigate();
    const next = () => {
        navigation(`/users/${user.id}`);
    }
    return (
        <Card
            sx={{
                margin: '1rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                alignItems: 'center',
                width: "20rem", height: "20rem",
                '&:hover': {
                    boxShadow: 3, // Add a shadow effect on hover
                    cursor: 'pointer', // Change cursor to pointer on hover
                },
            }}
            onClick={next}
        >
            <CardContent
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CardMedia
                    component="img"
                    image={user.avatar ? user.avatar : ''} // Show the user's avatar if available
                    alt={user.name}
                    sx={{
                        height: 140,
                        width: 140,
                        borderRadius: '50%',
                    }}
                />
            </CardContent>
            <CardContent
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{ fontWeight: 'bold' }}
                    >
                        {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard;
