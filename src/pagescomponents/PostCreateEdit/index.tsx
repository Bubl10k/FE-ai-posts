import Header from '../../layout/Header.tsx';
import { Box, Button, Stack } from '@mui/material';

import { useEffect, useMemo } from 'react';
import FormProvider from '../../components/RHF/FormProvider.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../../api/extentedApi.ts';
import { toast } from 'react-toastify';
import RHFTextField from '../../components/RHF/RHFTextField.tsx';
import RHFMarkdownEditor from '../../components/RHF/RHFMarkdownEditor.tsx';

type Props = {
  postId?: number;
};

type FormValues = {
  title: string;
  content: string;
};

const PostCreateEditPage = ({ postId }: Props) => {
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const defaultValues = useMemo(
    () => ({
      title: '',
      content: '',
    }),
    [],
  );

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
  });

  const methods = useForm({ resolver: yupResolver(schema), defaultValues });

  const { handleSubmit, reset, watch } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      if (postId) {
        await updatePost({ id: postId, ...data }).unwrap();
      } else {
        await createPost(data).unwrap();
      }
      toast.success('Post created successfully');
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      toast.error(`Failed to create post: ${e?.message}`);
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  console.log(watch());

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: '5rem',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ backgroundColor: 'white', width: '60%' }}>
          <RHFTextField
            placeholder="New post title here..."
            fullWidth
            name="title"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '2.25rem',
                fontWeight: 600,
                padding: '16px 14px',
              },
              minHeight: '56px',

              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
          />
          <RHFMarkdownEditor name="content" />
        </Box>
      </Box>
      <Stack
        direction="row"
        gap={1}
        sx={{ width: '55%', pt: '1rem', justifyContent: 'center' }}
      >
        <Button variant="contained" type="submit">
          Publish
        </Button>
        <Button variant="outlined" type="submit">
          Save as draft
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default PostCreateEditPage;
