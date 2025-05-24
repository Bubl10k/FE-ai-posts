import {
  alpha,
  Box,
  Button,
  TextareaAutosize,
  Typography, useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';
import { useState } from 'react';

const PostCreateInput = () => {
  const [focused, setFocused] = useState(false);
  const [postValue, setPostValue] = useState('');

  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '0.5rem',
        p: '0.5rem',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        backgroundColor: theme => alpha(theme.palette.common.white, 1),
        m: 0,
        width: '100%',
        maxWidth: 768,
      }}
    >
      <TextareaAutosize
        minRows={1}
        maxRows={10}
        placeholder="What's on your mind?"
        value={postValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={e => setPostValue(e.target.value)}
        style={{
          border: `2px solid ${theme.palette.divider}`,
          borderRadius: '4px',
          fontSize: '1rem',
          padding: '10px 14px',
          resize: 'none',
          background: 'transparent',
          fontFamily: theme.typography.fontFamily,
        }}
      />

      {focused && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '1rem',
              color: theme => alpha(theme.palette.text.primary, 0.5),
            }}
          >
            Quick Post show up in the feed — {/*TODO: fix link*/}
            <Link
              to={ROUTES.postCreate}
              style={{
                textDecoration: 'none',
                color: theme.palette.primary.main,
              }}
            >
              Open full editor
            </Link>
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '1rem',
                color: theme => alpha(theme.palette.text.primary, 0.5),
              }}
            >
              {postValue.length}/256
            </Typography>
            <Button variant="contained" onClick={() => console.log(postValue)}>
              Post
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PostCreateInput;
