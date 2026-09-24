import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

import './RichTextEditor.css';

const RichTextEditor = ({ value = '', onChange, onPendingImagesChange, }) => {
  const fileInputRef = useRef(null);
  const pendingImagesRef = useRef([]);
  const [uploading, setUploading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const convertContentForEditor = (content) => {
    if (!content) return '';

    return content.replaceAll(
      'src="/assets/',
      `src="${BACKEND_URL}/assets/`
    );
  };

  const convertContentForSave = (content) => {
    if (!content) return '';

    return content.replaceAll(
      `src="${BACKEND_URL}/assets/`,
      'src="/assets/'
    );
  };

  const updatePendingImages = (images) => {
    pendingImagesRef.current = images;

    onPendingImagesChange?.(images);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content: value,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      onChange?.(html);

      /*
       * Hapus pending image dari list
       * jika gambar sudah dihapus dari editor.
       */
      const currentImages = pendingImagesRef.current;

      const usedImages = currentImages.filter((image) =>
        html.includes(image.previewUrl)
      );

      if (usedImages.length !== currentImages.length) {
        updatePendingImages(usedImages);
      }
    },
  });

  /*
   * Update content ketika mode edit
   */
  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();
    const editorContent = convertContentForEditor(value);

    if (editorContent !== currentContent) {
      editor.commands.setContent(editorContent, false);
    }
  }, [value, editor]);

  /*
   * Cleanup blob URL ketika editor dihancurkan
   */
  useEffect(() => {
    return () => {
      pendingImagesRef.current.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, []);

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

  // ==============================
  // IMAGE URL
  // ==============================

  const handleInsertImageUrl = () => {
    const url = window.prompt(
      'Masukkan URL gambar:',
      'https://'
    );

    if (!url) {
      return;
    }

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  };

  // ==============================
  // IMAGE UPLOAD
  // ==============================

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('File yang dipilih harus berupa gambar.');

      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar maksimal 5MB.');

      event.target.value = '';
      return;
    }

    /*
     * Maksimal 20 gambar dalam satu artikel
     */
    if (pendingImagesRef.current.length >= 20) {
      alert('Maksimal 20 gambar dalam satu artikel.');

      event.target.value = '';
      return;
    }

    try {
      setUploading(true);

      /*
       * BELUM upload ke server.
       *
       * File hanya disimpan sementara
       * di memory browser.
       */
      const previewUrl = URL.createObjectURL(file);

      const id = crypto.randomUUID();

      const pendingImage = {
        id,
        file,
        previewUrl,
      };

      const newPendingImages = [
        ...pendingImagesRef.current,
        pendingImage,
      ];

      updatePendingImages(newPendingImages);

      /*
       * Tampilkan gambar di Tiptap
       */
      editor
        .chain()
        .focus()
        .setImage({
          src: previewUrl,
        })
        .run();

    } catch (error) {
      console.error('Image preview error:', error);

      alert(
        error?.message ||
        'Terjadi kesalahan ketika memproses gambar.'
      );
    } finally {
      setUploading(false);

      /*
       * Supaya file yang sama bisa dipilih lagi
       */
      event.target.value = '';
    }
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

        {/* IMAGE */}

        <div className="toolbar-group">

          <button
            type="button"
            title="Insert Image URL"
            onClick={handleInsertImageUrl}
          >
            <i className="bi bi-image"></i>
          </button>

          <button
            type="button"
            title="Upload Image"
            disabled={uploading}
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            {uploading ? (
              <span className="editor-spinner"></span>
            ) : (
              <i className="bi bi-cloud-arrow-up"></i>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleImageUpload}
            hidden
          />

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

export default RichTextEditor;