import Header from '../../layout/Header.tsx';
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useGetUserPostsQuery } from '../../api/extentedApi.ts';
import LoadingScreen from '../../components/LoadingScreen.tsx';
import { useMemo } from 'react';
import PostCard from '../../components/Posts/PostCard.tsx';

const DashboardPage = () => {
  const theme = useTheme();
  const { user } = useTypedSelector(state => state.auth);

  const { data: userPosts, isLoading } = useGetUserPostsQuery(user!.id);

  const { totalReactions, totalComments } = useMemo(() => {
    const totalReactions =
      userPosts?.reduce((sum, post) => sum + post.reactions.length, 0) ?? 0;

    const totalComments =
      userPosts?.reduce((sum, post) => {
        return (
          sum +
          post.comments.length +
          post.comments.reduce(
            (respSum: number, comment: any) =>
              respSum + comment.comment_responses.length,
            0,
          )
        );
      }, 0) ?? 0;

    return { totalReactions, totalComments };
  }, [userPosts]);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <Header />
      <Box
        sx={{
          mt: 2,
          mx: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Stack direction="column" gap="12px">
          <Typography variant="h1" fontSize="1.875rem" fontWeight={700}>
            Dashboard
          </Typography>
          <Stack direction="row" gap="1rem">
            <Box
              sx={{
                backgroundColor: 'white',
                width: '100%',
                p: '24px',
                borderRadius: '6px',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h2" fontSize="1.5rem" fontWeight={700}>
                {userPosts?.length}
              </Typography>
              <Typography color="textSecondary" fontWeight={400}>
                Total posts
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'white',
                width: '100%',
                p: '24px',
                borderRadius: '6px',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h2" fontSize="1.5rem" fontWeight={700}>
                {totalReactions}
              </Typography>
              <Typography color="textSecondary" fontWeight={400}>
                Total post reactions
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'white',
                width: '100%',
                p: '24px',
                borderRadius: '6px',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h2" fontSize="1.5rem" fontWeight={700}>
                {totalComments}
              </Typography>
              <Typography color="textSecondary" fontWeight={400}>
                Total post comments
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack direction="row" gap="12px">
          <Stack direction="column" gap="12px" sx={{ width: '20%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '6px',
                p: '8px',
                cursor: 'pointer',
              }}
              onClick={() => console.log('Posts')}
            >
              <Typography>Posts</Typography>
              <Chip
                label={userPosts?.length}
                sx={{
                  borderRadius: '6px',
                  width: '16px',
                  height: '30px',
                  textAlign: 'center',
                  backgroundColor: '#e3e3e3',

                  '& .MuiChip-label': {
                    pl: '6px',
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '6px',
                p: '8px',
                cursor: 'pointer',
              }}
              onClick={() => console.log('Followers')}
            >
              <Typography>Followers</Typography>
              <Chip
                label={userPosts?.length}
                sx={{
                  borderRadius: '6px',
                  width: '16px',
                  height: '30px',
                  textAlign: 'center',
                  backgroundColor: '#e3e3e3',

                  '& .MuiChip-label': {
                    pl: '6px',
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '6px',
                p: '8px',
                cursor: 'pointer',
              }}
              onClick={() => console.log('Analytics')}
            >
              <Typography>Analytics</Typography>
            </Box>
          </Stack>

          <Stack>
            <Typography
              variant="h2"
              fontSize="1.3rem"
              fontWeight={700}
              sx={{ my: '12px' }}
            >
              Posts
            </Typography>
            <Stack direction="column" gap="12px">
              {userPosts?.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default DashboardPage;
