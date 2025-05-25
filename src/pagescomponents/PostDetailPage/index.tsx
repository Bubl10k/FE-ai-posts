import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../layout/Header.tsx';
import { useGetPostByIdQuery } from '../../api/extentedApi.ts';
import {
  Avatar,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { formatDate } from '../../utils/date.ts';
import ReactMarkdown from 'react-markdown';
import PostCommentField from '../../components/Posts/PostCommentField.tsx';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useState } from 'react';
import PostCommentReplyField from '../../components/Posts/PostCommentReplyField.tsx';
import { ROUTES } from '../../routes/routes.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);
  const theme = useTheme();
  const { user } = useTypedSelector(state => state.auth);

  const { data: post } = useGetPostByIdQuery(id!, { skip: !id });

  const isAuthor = post?.user.id === user?.id;

  return (
    <>
      <Header />
      <Stack
        direction="row"
        gap="32px"
        sx={{
          px: '4rem',
          pt: '2rem',
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden',
        }}
      >
        <Stack
          sx={{
            backgroundColor: theme.palette.common.white,
            border: `1px solid ${theme.palette.divider}`,
            p: '2rem 3rem',
            borderRadius: '4px',
            width: '50%',
          }}
          gap="32px"
        >
          <Stack direction="row" gap="16px" sx={{ alignItems: 'center' }}>
            <Avatar
              alt={post?.user.username}
              src={post?.user.avatar}
              sx={{ width: 48, height: 48 }}
            />
            <Stack direction="column" gap="4px">
              <Typography
                fontSize="1.125rem"
                fontWeight={400}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: theme.palette.primary.main },
                }}
                onClick={() => navigate(ROUTES.profile(post!.user.id))}
              >
                {post?.user.username}
              </Typography>
              <Typography
                fontSize="0.875rem"
                fontWeight={400}
                color="text.secondary"
              >
                {post?.created_at && formatDate(post.created_at)}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" gap="16px">
            <Typography variant="h1" fontSize="2.25rem" fontWeight={700}>
              {post?.title}
            </Typography>
            <ReactMarkdown
              components={{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                p: ({ node, ...props }) => (
                  <Typography variant="body1" fontSize="1.125rem" {...props} />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                h1: ({ node, ...props }) => (
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                    {...props}
                  />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                h2: ({ node, ...props }) => (
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    {...props}
                  />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                li: ({ node, ...props }) => (
                  <li>
                    <Typography component="span" variant="body1" {...props} />
                  </li>
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                strong: ({ node, ...props }) => (
                  <Typography component="strong" fontWeight={600} {...props} />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                em: ({ node, ...props }) => (
                  <Typography component="em" fontStyle="italic" {...props} />
                ),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                blockquote: ({ node, ...props }) => (
                  <Typography
                    component="blockquote"
                    sx={{
                      pl: 2,
                      borderLeft: `4px solid ${theme.palette.grey[300]}`,
                      color: theme.palette.grey[700],
                      fontStyle: 'italic',
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {post?.content || ''}
            </ReactMarkdown>
            <Divider />
            {!isAuthor && (
              <Stack
                direction="row"
                gap="16px"
                sx={{ alignItems: 'center', justifyContent: 'flex-start' }}
              >
                <Button
                  variant="text"
                  startIcon={<ThumbUpIcon />}
                  color="inherit"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Like
                </Button>
                <Button
                  variant="text"
                  startIcon={<ThumbDownIcon />}
                  color="inherit"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Dislike
                </Button>
              </Stack>
            )}
            <PostCommentField postId={Number(id!)} />
            <Divider />
            <Stack direction="column">
              {post?.comments.map(comment => (
                <>
                  <Stack
                    direction="row"
                    gap="16px"
                    key={comment.id}
                    sx={{
                      pl: '1rem',
                      py: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <Avatar
                      alt={comment.user.username}
                      src={comment.user.avatar}
                      sx={{ width: 36, height: 36, cursor: 'pointer' }}
                      onClick={() => navigate(ROUTES.profile(comment.user.id))}
                    />
                    <Stack
                      direction="column"
                      gap="4px"
                      sx={{
                        border: `0.5px solid ${theme.palette.divider}`,
                        borderRadius: '4px',
                        p: '0.5rem',
                        width: '100%',
                      }}
                    >
                      <Stack
                        direction="row"
                        gap="8px"
                        sx={{ alignItems: 'center' }}
                      >
                        <Typography
                          fontSize="1rem"
                          fontWeight={400}
                          color="text.secondary"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': { color: theme.palette.primary.main },
                          }}
                          onClick={() =>
                            navigate(ROUTES.profile(comment.user.id))
                          }
                        >
                          {comment.user.username}
                        </Typography>
                        <Typography
                          fontSize="0.875rem"
                          fontWeight={400}
                          color="text.secondary"
                        >
                          {comment.created_at && formatDate(comment.created_at)}
                        </Typography>
                      </Stack>
                      <Typography variant="body1" fontSize="1.125rem">
                        {comment.content}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    sx={{
                      justifyContent: 'flex-start',
                      ml: 8,
                      pb: '1rem',
                    }}
                  >
                    {replyToCommentId === comment.id ? (
                      <PostCommentReplyField
                        commentId={comment.id}
                        onCancel={() => setReplyToCommentId(null)}
                      />
                    ) : (
                      <Button
                        variant="text"
                        sx={{
                          p: 0,
                          color: theme.palette.text.secondary,
                          textTransform: 'none',
                          width: '10%',
                          '&:hover': {
                            backgroundColor: theme.palette.grey[100],
                          },
                        }}
                        onClick={() => setReplyToCommentId(comment.id)}
                      >
                        <ReplyOutlinedIcon /> Reply
                      </Button>
                    )}
                  </Stack>
                  {comment.comment_responses &&
                    comment.comment_responses.map(response => (
                      <Stack
                        direction="row"
                        gap="16px"
                        key={comment.id}
                        sx={{
                          pl: '4rem',
                          py: '8px',
                          borderRadius: '4px',
                        }}
                      >
                        <Avatar
                          alt={response.user.username}
                          src={response.user.avatar}
                          sx={{ width: 36, height: 36, cursor: 'pointer' }}
                          onClick={() =>
                            navigate(ROUTES.profile(response.user.id))
                          }
                        />
                        <Stack
                          direction="column"
                          gap="4px"
                          sx={{
                            backgroundColor: theme.palette.action.hover,
                            borderRadius: '4px',
                            p: '0.5rem',
                            width: '100%',
                          }}
                        >
                          <Stack
                            direction="row"
                            gap="8px"
                            sx={{ alignItems: 'center' }}
                          >
                            <Typography
                              fontSize="1rem"
                              fontWeight={400}
                              color="text.secondary"
                              sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                              onClick={() =>
                                navigate(ROUTES.profile(response.user.id))
                              }
                            >
                              {response.user.username}
                            </Typography>
                            <Typography
                              fontSize="0.875rem"
                              fontWeight={400}
                              color="text.secondary"
                            >
                              {response.created_at &&
                                formatDate(response.created_at)}
                            </Typography>
                          </Stack>
                          <Typography variant="body1" fontSize="1.125rem">
                            {response.content}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                </>
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            backgroundColor: theme.palette.common.white,
            p: '2rem',
            borderRadius: '4px',
            width: '30%',
          }}
          gap="32px"
        >
          <Stack direction="row" gap="16px" sx={{ alignItems: 'center' }}>
            <Avatar
              alt={post?.user.username}
              src={post?.user.avatar}
              sx={{ width: 48, height: 48 }}
            />
            <Stack direction="column" gap="4px">
              <Typography
                fontSize="1.125rem"
                fontWeight={400}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { color: theme.palette.primary.main },
                }}
                onClick={() => navigate(ROUTES.profile(post!.user.id))}
              >
                {post?.user.username}
              </Typography>
            </Stack>
          </Stack>
          {!isAuthor && (
            <Button variant="contained" fullWidth>
              Follow
            </Button>
          )}
          <Typography fontSize="1.125rem" fontWeight={600}>
            {post?.user.about}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default PostDetailPage;
