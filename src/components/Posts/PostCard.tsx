import { PostResponse } from '../../api/type/posts.ts';
import { Box, Button, Chip, Stack, Typography, useTheme } from '@mui/material';
import { capitalize } from '../../utils/text.ts';

type Props = {
  post: PostResponse;
};

const PostCard = ({ post }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        p: '1rem',
        borderRadius: '4px',
        border: `1px solid ${theme.palette.divider}`,
        // TODO: fix this
        width: '1024px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" fontSize="1.2rem">
        {post.title}
      </Typography>
      <Chip
        label={capitalize(post.status)}
        sx={{ height: '22px', '& .MuiChip-label': { px: '6px' } }}
      />
      <Stack direction="row" gap="6px">
        <Button variant="text" color="error" sx={{ fontSize: '12px' }}>
          Delete
        </Button>
        <Button variant="text" sx={{ fontSize: '12px' }}>
          Edit
        </Button>
      </Stack>
    </Box>
  );
};

export default PostCard;
