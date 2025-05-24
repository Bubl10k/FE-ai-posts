import { PostResponse } from '../../api/type/posts.ts';
import { Box, Button, Chip, Stack, Typography, useTheme } from '@mui/material';
import { capitalize } from '../../utils/text.ts';
import { useDeletePostByIdMutation } from '../../api/extentedApi.ts';
import { useState } from 'react';
import { toast } from 'react-toastify';
import SubmitModal from '../SubmitModal.tsx';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';

type Props = {
  post: PostResponse;
};

const PostCard = ({ post }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [deletePost] = useDeletePostByIdMutation();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const deletePostHandler = async () => {
    try {
      await deletePost(post.id);
      toast.success('Post deleted successfully');
      setDeleteModalOpen(false);
    } catch (e) {
      setDeleteModalOpen(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      toast.error(`Failed to delete post: ${e?.message}`);
    }
  };

  const onOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
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
          <Button
            variant="text"
            color="error"
            sx={{ fontSize: '12px' }}
            onClick={onOpenDeleteModal}
          >
            Delete
          </Button>
          <Button
            variant="text"
            sx={{ fontSize: '12px' }}
            onClick={() => navigate(ROUTES.postEdit(post.id))}
          >
            Edit
          </Button>
        </Stack>
      </Box>
      <SubmitModal
        open={deleteModalOpen}
        onClose={onCloseDeleteModal}
        onSubmit={deletePostHandler}
        onCancel={onCloseDeleteModal}
        title="Delete Post"
        description="Are you sure you want to delete this post?"
        yesText="Delete"
        noText="Cancel"
      />
    </>
  );
};

export default PostCard;
