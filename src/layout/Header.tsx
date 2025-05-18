import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import SearchIcon from '../components/icons/SearchIcon.tsx';
import { useTypedSelector } from '../hooks/useTypedSelector.ts';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes.ts';

const Header = () => {
  const theme = useTheme();
  const { user } = useTypedSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        borderBottom: `2px solid ${theme.palette.divider}`,
        maxHeight: 56,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', px: 4, mb: 1 }}
        >
          <RouterLink
            to={ROUTES.root}
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 'bold',
                width: 100,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Posts
            </Typography>
          </RouterLink>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: theme => alpha(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: theme =>
                  alpha(theme.palette.common.white, 0.25),
              },
              m: 0,
              width: '100%',
              maxWidth: 400,
            }}
          >
            <Box
              sx={{
                padding: theme => theme.spacing(0, 2),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon color={theme.palette.text.secondary} />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                color: 'inherit',
                width: '100%',
                paddingLeft: theme => theme.spacing(5),
                paddingY: 0.8,
                border: `2px solid ${theme.palette.divider}`,
                borderRadius: 2,
                height: '40px',
                maxWidth: '680px',
                minWidth: '520px',
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </Stack>
        <Stack direction="row" gap={1} sx={{ mb: 1, pr: 4 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.postCreate)}
          >
            Create Post
          </Button>
          {user && (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar src={user.avatar} alt={user.username} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => navigate(ROUTES.profile)}>
                  {user.username}
                </MenuItem>
                <MenuItem onClick={() => navigate(ROUTES.postCreate)}>
                  Create Post
                </MenuItem>
                <MenuItem onClick={() => navigate(ROUTES.dashboard)}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => console.log('Settings')}>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => console.log('Logout')}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
