import MarkdownEditor from '../Posts/MarkdownEditor.tsx';
import { useController, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  showErrorIcon?: boolean;
};

const RHFMarkdownEditor = ({ name, showErrorIcon }: Props) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <MarkdownEditor
      markdown={value}
      setMarkdown={onChange}
      showErrorIcon={showErrorIcon}
    />
  );
};

export default RHFMarkdownEditor;
