import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';

const PingContainer = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const InnerCircle = styled('div')(({ theme, color }) => ({
  borderRadius: '50%',
  backgroundColor: color || theme.palette.primary.main,
  width: '20px',
  height: '20px',
  zIndex: 2,
}));

// Define a custom interface for the outer circle props
interface OuterCircleProps extends BoxProps {
  delay?: string;
  width?: string;
  height?: string;
}

const OuterCircle = styled(Box)<OuterCircleProps>(
  ({ theme, color, delay, width, height }) => ({
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: color || theme.palette.primary.main,
    width: width || '50px',
    height: height || '50px',
    animation: 'ping 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Animation for outer circles
    boxShadow: `0 0 15px ${color || '#ff4081'}`,
    opacity: 0.6, // Initial opacity
    zIndex: 1,
    '@keyframes ping': {
      '0%': {
        transform: 'scale(1)', // Start at normal size
        opacity: 1, // Start visible
      },
      '50%': {
        transform: 'scale(1.5)', // Grow to 1.5x size at halfway
        opacity: 0.5, // Slightly fade out at halfway
      },
      '100%': {
        transform: 'scale(2)', // Grow to double the size
        opacity: 0, // Fade out completely
      },
    },
  })
);

const PingLoader = () => {
  return (
    <PingContainer>
      <InnerCircle color="#7FB800" />
      <OuterCircle color="#D0E4A3" delay="0s" width="40px" height="40px" />
      <OuterCircle color="#E4F1CB" delay="1s" width="60px" height="60px" />
    </PingContainer>
  );
};

export default PingLoader;
