import Header from '../../layout/Header.tsx';
import { useGetPostsQuery } from '../../api/extentedApi.ts';
import LoadingScreen from '../../components/LoadingScreen.tsx';
import PostCard from '../../components/Posts/PostCard.tsx';
import { Box, Typography } from '@mui/material';

const PostListPage = () => {
  const { data, isLoading } = useGetPostsQuery({});

  if (isLoading) {
    return <LoadingScreen />;
  }

  console.log(data);

  return (
    <>
      <Header />
      <Box>
        <Typography variant="h2">Post</Typography>
      </Box>
      <Box>
        {data &&
          data.map((post: any) => <PostCard key={post.id} post={post} />)}
      </Box>
    </>
  );
};

export default PostListPage;
