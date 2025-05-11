import {
  alpha,
  AppBar,
  Box,
  Button,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import SearchIcon from '../components/icons/SearchIcon.tsx';

const Header = () => {
  const theme = useTheme();

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
          <Typography
            variant="h6"
            noWrap
            sx={{ fontWeight: 'bold', width: 100 }}
          >
            Posts
          </Typography>
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
        <Stack direction="row" gap={1} sx={{ mb: 1 }}>
          <Button variant="outlined">Create Post</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
