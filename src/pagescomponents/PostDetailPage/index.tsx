import { useParams } from 'react-router-dom';
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
import MarkdownEditor from '../../components/Posts/MarkdownEditor.tsx';
import { useState } from 'react';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [commentContent, setCommentContent] = useState<string>('');

  const theme = useTheme();

  const { data: post } = useGetPostByIdQuery(id!, { skip: !id });

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
                onClick={() => console.log(post?.user.id)}
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
            <Stack direction="column" gap="16px">
              <Typography fontSize="2rem" fontWeight={600}>
                Comments
              </Typography>

              <Stack>
                <MarkdownEditor
                  markdown={commentContent}
                  setMarkdown={setCommentContent}
                  useStyles={true}
                  placeholder="Add to discussion"
                />
              </Stack>
            </Stack>
            <Divider />

            {/*TODO: List of comments*/}
          </Stack>
        </Stack>
        <Stack
          sx={{
            backgroundColor: theme.palette.common.white,
            border: `1px solid ${theme.palette.divider}`,
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
                onClick={() => console.log(post?.user.id)}
              >
                {post?.user.username}
              </Typography>
            </Stack>
          </Stack>
          <Button variant="contained" fullWidth>
            Follow
          </Button>
          <Typography fontSize="1.125rem" fontWeight={600}>
            {post?.user.about}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default PostDetailPage;
