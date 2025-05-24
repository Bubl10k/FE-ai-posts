import Header from '../../layout/Header.tsx';
import { useGetPostsQuery } from '../../api/extentedApi.ts';
import LoadingScreen from '../../components/LoadingScreen.tsx';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import PostListCard from '../../components/Posts/PostListCard.tsx';
import { PostListResponseWithUser } from '../../api/type/posts.ts';
import { useState } from 'react';
import PostCreateInput from '../../components/Posts/PostCreateInput.tsx';

const TABS = ['Feed', 'Following'];

const PostListPage = () => {
  const { data, isLoading } = useGetPostsQuery({});

  const theme = useTheme();

  const [tabSelected, setTabSelected] = useState(TABS[0]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header />
      <Stack
        direction="column"
        gap="16px"
        sx={{ pt: '2rem', width: '768px', mx: 'auto' }}
      >
        <PostCreateInput />

        <Stack direction="row" gap="16px">
          {TABS.map(tab => (
            <Box
              sx={{
                cursor: 'pointer',
                '&:hover': { color: theme.palette.primary.main },
                p: '0.5rem',
                borderRadius: 1,
                backgroundColor:
                  tabSelected === tab ? theme.palette.common.white : null,
              }}
              onClick={() => setTabSelected(tab)}
              key={tab}
            >
              <Typography variant="h1" fontSize="1.2rem" fontWeight={600}>
                {tab}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Stack direction="column" gap="16px" sx={{ width: '100%' }}>
          {data &&
            data.map((post: PostListResponseWithUser) => (
              <PostListCard key={post.id} post={post} />
            ))}
        </Stack>
      </Stack>
    </>
  );
};

export default PostListPage;
