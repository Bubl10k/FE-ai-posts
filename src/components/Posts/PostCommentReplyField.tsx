import FormProvider from '../RHF/FormProvider.tsx';
import RHFMarkdownEditor from '../RHF/RHFMarkdownEditor.tsx';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateCommentResponseMutation } from '../../api/extentedApi.ts';
import { toast } from 'react-toastify';
import { Button, Stack } from '@mui/material';

type CommentFormInput = {
  content: string;
};

type Props = {
  commentId: string | number;
  onCancel: VoidFunction;
};

const PostCommentReplyField = ({ commentId, onCancel }: Props) => {
  const [createCommentResponse] = useCreateCommentResponseMutation();

  const schema = yup.object({
    content: yup.string().required('Content is required'),
  });

  const methods = useForm<CommentFormInput>({
    defaultValues: { content: '' },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: CommentFormInput) => {
    try {
      await createCommentResponse({
        content: data.content,
        commentId: Number(commentId),
      }).unwrap();
      toast.success('Response to this comment created successfully');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      toast.error(`Failed to create comment: ${error?.message}`);
    }
  };

  console.log(commentId);

  return (
    <Stack sx={{ width: '100%' }} gap={1}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFMarkdownEditor
          name="content"
          placeholder="Reply..."
          className="editor-content"
        />
        <Stack direction="row" gap={1} sx={{ py: 1 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button onClick={onCancel} variant="text" color="inherit">
            Cancel
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default PostCommentReplyField;
