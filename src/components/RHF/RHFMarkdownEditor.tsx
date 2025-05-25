import MarkdownEditor from '../MarkdownEditor.tsx';
import { useController, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  placeholder?: string;
  className?: string;
  showErrorIcon?: boolean;
};

const RHFMarkdownEditor = ({
  name,
  showErrorIcon,
  placeholder,
  className,
}: Props) => {
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
      placeholder={placeholder}
      showErrorIcon={showErrorIcon}
      className={className}
    />
  );
};

export default RHFMarkdownEditor;
