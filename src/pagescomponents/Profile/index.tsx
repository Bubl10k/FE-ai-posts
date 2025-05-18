import Header from '../../layout/Header.tsx';
import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import { formatDate } from '../../utils/date.ts';

const ProfilePage = () => {
  const theme = useTheme();
  const { user } = useTypedSelector(state => state.auth);

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '5rem' }}>
        <Stack
          direction="column"
          gap="16px"
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.01)',
            width: '60%',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '8px',
            textAlign: 'center',
            p: '2rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              bottom: '100px',
              height: '48px',
            }}
          >
            <Avatar
              src={user?.avatar}
              alt={user?.username}
              sx={{ width: 128, height: 128, border: '14px solid #ffffff' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained">Edit profile</Button>
          </Box>
          <Typography variant="h1" fontSize="1.875rem" fontWeight={700}>
            {user!.username}
          </Typography>
          <Typography color="textSecondary" component="div">
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              justifyContent="center"
            >
              <CakeOutlinedIcon fontSize="small" />
              <span>Joined on {formatDate(new Date(user!.created_at))}</span>
            </Stack>
          </Typography>
        </Stack>
      </Box>

      {/* TODO: Use real user data */}
      <Stack
        direction="row"
        gap="16px"
        sx={{ justifyContent: 'center', pt: '2rem' }}
      >
        <Stack
          direction="column"
          gap="8px"
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.01)',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '8px',
            p: '1rem',
            width: '20%',
          }}
        >
          <Typography color="textSecondary" component="div">
            <Stack direction="row" alignItems="center" gap={1}>
              <CakeOutlinedIcon fontSize="small" />
              <span>0 posts published</span>
            </Stack>
          </Typography>
          <Typography color="textSecondary" component="div">
            <Stack direction="row" alignItems="center" gap={1}>
              <CakeOutlinedIcon fontSize="small" />
              <span>0 comments written</span>
            </Stack>
          </Typography>
          <Typography color="textSecondary" component="div">
            <Stack direction="row" alignItems="center" gap={1}>
              <CakeOutlinedIcon fontSize="small" />
              <span>12 tags followed</span>
            </Stack>
          </Typography>
        </Stack>
        <Stack
          direction="column"
          gap="12px"
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.01)',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '8px',
            p: '1rem',
            width: '39%',
          }}
        >
          <Typography variant={'h1'} fontSize="1.875rem" fontWeight={700}>
            About
          </Typography>
          {user?.about ? (
            <Typography variant={'body1'}>{user.about}</Typography>
          ) : (
            <Typography variant={'body1'} color="textSecondary">
              No description
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ProfilePage;
