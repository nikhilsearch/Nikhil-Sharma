import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  placeholder = "Start writing your blog post content..."
}) => {
  const editorRef = useRef<any>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('tinymce-key');
        if (!isMounted) return;
        if (error) {
          console.error('Failed to load TinyMCE key', error);
          setApiKey('');
        } else {
          // data is typed as any from invoke
          // @ts-ignore
          setApiKey(data?.apiKey || '');
        }
      } catch (e) {
        console.error('TinyMCE key fetch error', e);
        if (isMounted) setApiKey('');
      }
    })();
    return () => { isMounted = false; };
  }, []);
  const handleImageUpload = async (blobInfo: any, progress: (percent: number) => void) => {
    if (!onImageUpload) {
      throw new Error('Image upload handler not provided');
    }

    try {
      progress(0);
      const file = blobInfo.blob();
      progress(50);
      const url = await onImageUpload(file);
      progress(100);
      return url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Editor</CardTitle>
      </CardHeader>
      <CardContent>
        {apiKey === null ? (
          <div className="min-h-[300px] text-sm text-muted-foreground">Loading editor...</div>
        ) : (
          <Editor
            apiKey={apiKey || ''}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={value}
            onEditorChange={onChange}
            init={{
              height: 600,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                'emoticons', 'template', 'codesample'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help | image media | code codesample | fullscreen preview',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              placeholder,
              images_upload_handler: onImageUpload ? handleImageUpload : undefined,
              automatic_uploads: true,
              file_picker_types: 'image',
              paste_data_images: true,
              block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6',
              style_formats: [
                { title: 'Bold text', inline: 'b' },
                { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
                { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
                { title: 'Example 1', inline: 'span', classes: 'example1' },
                { title: 'Example 2', inline: 'span', classes: 'example2' },
                { title: 'Table styles' },
                { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
              ],
              templates: [
                { title: 'Blog Post Template', description: 'Standard blog post structure', content: `
                  <h1>Blog Post Title</h1>
                  <h2>Introduction</h2>
                  <p>Write your introduction here...</p>
                  <h2>Main Content</h2>
                  <p>Your main content goes here...</p>
                  <h2>Conclusion</h2>
                  <p>Wrap up your thoughts...</p>
                ` },
                { title: 'FAQ Template', description: 'Frequently Asked Questions', content: `
                  <h1>Frequently Asked Questions</h1>
                  <h3>Question 1</h3>
                  <p>Answer to question 1...</p>
                  <h3>Question 2</h3>
                  <p>Answer to question 2...</p>
                ` }
              ]
            }}
          />
        )}

      </CardContent>
    </Card>
  );
};