import { PostListResponseWithUser } from '../../api/type/posts.ts';
import { Avatar, Stack, Typography, useTheme } from '@mui/material';
import { formatDate } from '../../utils/date.ts';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';

type Props = {
  post: PostListResponseWithUser;
};

const PostListCard = ({ post }: Props) => {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        p: '1rem',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '4px',
        width: '100%',
        backgroundColor: theme.palette.common.white,
      }}
      direction="column"
      gap="16px"
    >
      <Stack direction="row" gap="16px">
        <Avatar
          alt={post.user.username}
          src={post.user.avatar}
          sx={{ width: 36, height: 36 }}
        />
        <Stack direction="column" gap="4px">
          <Typography
            variant="h1"
            fontSize="1.125rem"
            color="text.secondary"
            fontWeight={400}
          >
            {post.user.username}
          </Typography>
          <Typography fontSize="0.875rem" color="text.secondary">
            {formatDate(post.created_at)}
          </Typography>
        </Stack>
      </Stack>

      <Typography
        fontSize="1.875rem"
        fontWeight="bold"
        sx={{
          cursor: 'pointer',
          wordBreak: 'break-all',
          '&:hover': { color: theme.palette.primary.main },
        }}
        onClick={() => navigate(ROUTES.postDetail(post.id))}
      >
        {post.title}
      </Typography>

      <Stack direction="row" gap="16px">
        <Stack
          direction="row"
          gap="4px"
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            p: '0px 8px',
            borderRadius: '4px',
            '&:hover': { backgroundColor: theme.palette.action.hover },
          }}
          onClick={() => navigate(ROUTES.postDetail(post.id))}
        >
          <AddReactionOutlinedIcon
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
          <Typography variant="body1" color="text.secondary">
            {post.reactions.length} reactions
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap="4px"
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            p: '0px 8px',
            borderRadius: '4px',
            '&:hover': { backgroundColor: theme.palette.action.hover },
          }}
          onClick={() => navigate(ROUTES.postDetail(post.id))}
        >
          <ChatBubbleOutlineOutlinedIcon
            fontSize="small"
            sx={{ color: theme.palette.text.secondary }}
          />
          <Typography variant="body1" color="text.secondary">
            {post.comments.length} comments
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="column" gap="12px">
        {post.comments.slice(0, 2).map(comment => (
          <Stack direction="row" gap="16px" key={comment.id}>
            <Avatar
              alt={comment.user.username}
              src={comment.user.avatar}
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
              onClick={() =>
                console.log(`navigate to profile of ${comment.user.username}`)
              }
            />
            <Stack
              direction="column"
              gap="4px"
              sx={{
                width: '95%',
                backgroundColor: theme.palette.action.hover,
                p: '8px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <Typography
                variant="body1"
                fontSize="0.875rem"
                color="text.secondary"
              >
                {formatDate(comment.created_at)}
              </Typography>
              <Typography variant="body1">{comment.content}</Typography>
              <Typography
                variant="body1"
                fontSize="0.875rem"
                color="text.secondary"
                sx={{
                  mt: '8px',
                  cursor: 'pointer',
                  '&:hover': { color: theme.palette.primary.main },
                }}
                onClick={() => navigate(ROUTES.postDetail(post.id))}
              >
                See more
              </Typography>
            </Stack>
          </Stack>
        ))}
        <Typography
          variant="body1"
          sx={{
            cursor: 'pointer',
            '&:hover': { color: theme.palette.primary.main },
          }}
          onClick={() => navigate(ROUTES.postDetail(post.id))}
        >
          See All {post.comments.length} comments
        </Typography>
      </Stack>
    </Stack>
  );
};
export default PostListCard;
