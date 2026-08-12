import React, { useRef, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { uploadBlogContentImage } from '../api';
import {
  Loader2,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  ImagePlus,
  Heading2,
  Heading3,
} from 'lucide-react';

const MenuButton = ({ onClick, active, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded hover:bg-gray-200 ${active ? 'bg-biomed-teal/20 text-biomed-navy' : 'text-gray-700'}`}
  >
    {children}
  </button>
);

const RichTextEditor = ({ value, onChange, placeholder, height = '280px', onImageUploadError, onUploadingChange }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = React.useState(false);
  const valueRef = useRef(value);
  const uploadHandlerRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-biomed-teal underline' } }),
      Placeholder.configure({ placeholder: placeholder || 'Write your blog post…' }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none px-3 py-2 focus:outline-none',
      },
      handleDrop(view, event) {
        const files = event.dataTransfer?.files;
        if (!files?.length) return false;
        const file = files[0];
        if (!file.type.startsWith('image/')) return false;
        event.preventDefault();
        uploadHandlerRef.current?.(file);
        return true;
      },
      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (!items) return false;
        const file = Array.from(items).find((i) => i.kind === 'file' && i.type.startsWith('image/'));
        if (!file) return false;
        uploadHandlerRef.current?.(file.getAsFile());
        return true;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      valueRef.current = html;
      onChange(html);
    },
  });

  const handleImageFile = useCallback(
    async (file) => {
      if (!file || !editor) return;
      setUploading(true);
      if (onUploadingChange) onUploadingChange(true);
      try {
        const url = await uploadBlogContentImage(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (err) {
        if (onImageUploadError) onImageUploadError(err.message);
        else console.error('Image upload failed:', err);
      } finally {
        setUploading(false);
        if (onUploadingChange) onUploadingChange(false);
      }
    },
    [editor, onImageUploadError, onUploadingChange]
  );

  uploadHandlerRef.current = handleImageFile;

  const onImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file?.type.startsWith('image/')) handleImageFile(file);
      e.target.value = '';
    },
    [handleImageFile]
  );

  // Sync external value (e.g. when editing existing blog)
  useEffect(() => {
    if (!editor) return;
    const v = value ?? '';
    if (v !== valueRef.current) {
      editor.commands.setContent(v, false);
      valueRef.current = v;
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-lg p-4" style={{ minHeight: height }}>
        <Loader2 className="w-6 h-6 animate-spin text-biomed-teal" />
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={onFileChange}
        className="hidden"
        aria-hidden
      />
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-300 bg-gray-50 px-1 py-1">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </MenuButton>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </MenuButton>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet list"
        >
          <List size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Numbered list"
        >
          <ListOrdered size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote size={18} />
        </MenuButton>
        <span className="w-px h-6 bg-gray-300 mx-1" />
        <MenuButton
          onClick={() => {
            const url = window.prompt('Link URL:');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive('link')}
          title="Insert link"
        >
          <LinkIcon size={18} />
        </MenuButton>
        <MenuButton onClick={onImageClick} title="Upload image">
          <ImagePlus size={18} />
        </MenuButton>
        {uploading && (
          <span className="ml-2 flex items-center gap-1 text-xs text-gray-600">
            <Loader2 size={14} className="animate-spin" />
            Uploading…
          </span>
        )}
      </div>
      <div className="min-h-[280px]" style={{ minHeight: height }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
