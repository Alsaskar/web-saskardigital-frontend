import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

import './TextEditor.css';

const TextEditor = ({ value = '', onChange }) => {

  const editor = useEditor({
    extensions: [
      StarterKit,

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],

    content: value,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      onChange?.(html);
    },
  });

  /*
   * Update content ketika mode edit
   */
  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();

    if (value !== currentContent) {
      editor.commands.setContent(value || '', false);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  // ==============================
  // LINK
  // ==============================

  const handleSetLink = () => {
    const previousUrl = editor.getAttributes('link').href;

    const url = window.prompt(
      'Masukkan URL:',
      previousUrl || 'https://'
    );

    if (url === null) {
      return;
    }

    if (url === '') {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
      })
      .run();
  };

  return (
    <div className="rich-text-editor">

      {/* =========================
          TOOLBAR
      ========================== */}

      <div className="rich-text-toolbar">

        {/* TEXT STYLE */}

        <div className="toolbar-group">

          <button
            type="button"
            title="Bold"
            className={editor.isActive('bold') ? 'active' : ''}
            onClick={() =>
              editor.chain().focus().toggleBold().run()
            }
          >
            <i className="bi bi-type-bold"></i>
          </button>

          <button
            type="button"
            title="Italic"
            className={editor.isActive('italic') ? 'active' : ''}
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
          >
            <i className="bi bi-type-italic"></i>
          </button>

          <button
            type="button"
            title="Strike"
            className={editor.isActive('strike') ? 'active' : ''}
            onClick={() =>
              editor.chain().focus().toggleStrike().run()
            }
          >
            <i className="bi bi-type-strikethrough"></i>
          </button>

        </div>

        {/* HEADING */}

        <div className="toolbar-group">

          <button
            type="button"
            title="Heading 1"
            className={
              editor.isActive('heading', { level: 1 })
                ? 'active'
                : ''
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 1 })
                .run()
            }
          >
            <strong>H1</strong>
          </button>

          <button
            type="button"
            title="Heading 2"
            className={
              editor.isActive('heading', { level: 2 })
                ? 'active'
                : ''
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 2 })
                .run()
            }
          >
            <strong>H2</strong>
          </button>

          <button
            type="button"
            title="Heading 3"
            className={
              editor.isActive('heading', { level: 3 })
                ? 'active'
                : ''
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 3 })
                .run()
            }
          >
            <strong>H3</strong>
          </button>

        </div>

        {/* LIST */}

        <div className="toolbar-group">

          <button
            type="button"
            title="Bullet List"
            className={
              editor.isActive('bulletList')
                ? 'active'
                : ''
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
          >
            <i className="bi bi-list-ul"></i>
          </button>

          <button
            type="button"
            title="Numbered List"
            className={
              editor.isActive('orderedList')
                ? 'active'
                : ''
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
          >
            <i className="bi bi-list-ol"></i>
          </button>

        </div>

        {/* QUOTE */}

        <div className="toolbar-group">

          <button
            type="button"
            title="Quote"
            className={
              editor.isActive('blockquote')
                ? 'active'
                : ''
            }
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
          >
            <i className="bi bi-quote"></i>
          </button>

        </div>

        {/* LINK */}

        <div className="toolbar-group">

          <button
            type="button"
            title="Insert Link"
            className={
              editor.isActive('link')
                ? 'active'
                : ''
            }
            onClick={handleSetLink}
          >
            <i className="bi bi-link-45deg"></i>
          </button>

          {editor.isActive('link') && (
            <button
              type="button"
              title="Remove Link"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .unsetLink()
                  .run()
              }
            >
              <i className="bi bi-link-45deg"></i>
              <i className="bi bi-x"></i>
            </button>
          )}

        </div>

        {/* UNDO REDO */}

        <div className="toolbar-group toolbar-group-last">

          <button
            type="button"
            title="Undo"
            disabled={!editor.can().undo()}
            onClick={() =>
              editor.chain().focus().undo().run()
            }
          >
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>

          <button
            type="button"
            title="Redo"
            disabled={!editor.can().redo()}
            onClick={() =>
              editor.chain().focus().redo().run()
            }
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>

        </div>

      </div>

      {/* =========================
          EDITOR
      ========================== */}

      <div className="rich-text-content">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
};

export default TextEditor;