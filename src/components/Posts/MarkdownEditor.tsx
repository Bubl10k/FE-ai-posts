import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  linkPlugin,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

type Props = {
  markdown: string;
  setMarkdown: (markdown: string) => void;
  showErrorIcon?: boolean;
};

const MarkdownEditor = ({ markdown, setMarkdown }: Props) => {
  async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch('/uploads/new', {
      method: 'POST',
      body: formData,
    });
    const json = (await response.json()) as { url: string };
    return json.url;
  }

  return (
    <MDXEditor
      markdown={markdown}
      onChange={setMarkdown}
      plugins={[
        imagePlugin({
          imageUploadHandler,
        }),
        linkPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <InsertImage />
              <CreateLink />
              <InsertCodeBlock />
              <CodeToggle />
            </>
          ),
        }),
      ]}
    />
  );
};

export default MarkdownEditor;
