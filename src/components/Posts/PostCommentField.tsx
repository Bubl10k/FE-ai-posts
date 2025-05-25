import { Button, Stack, Typography } from '@mui/material';
import { useCreateCommentMutation } from '../../api/extentedApi.ts';
import FormProvider from '../RHF/FormProvider.tsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import RHFMarkdownEditor from '../RHF/RHFMarkdownEditor.tsx';

type CommentFormInput = {
  content: string;
};

type Props = {
  postId: string | number;
};

const PostCommentField = ({ postId }: Props) => {
  const [createComment] = useCreateCommentMutation();

  const schema = yup.object({
    content: yup.string().required('Content is required'),
  });

  const methods = useForm<CommentFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { content: '' },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: CommentFormInput) => {
    try {
      await createComment({
        content: data.content,
        postId: Number(postId),
      }).unwrap();
      reset();
      toast.success('Comment created successfully');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      toast.error(`Failed to create comment: ${error?.message}`);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap="16px">
        <Typography fontSize="2rem" fontWeight={600}>
          Comments
        </Typography>

        <Stack>
          <RHFMarkdownEditor
            name="content"
            placeholder="Add to discussion"
            className={'editor-content'}
          />
        </Stack>
        <Button variant="contained" sx={{ width: '20%' }} type="submit">
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default PostCommentField;
