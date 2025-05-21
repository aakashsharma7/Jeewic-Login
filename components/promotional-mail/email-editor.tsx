"use client"

import { useState, useRef } from "react"
import { Editor } from '@tinymce/tinymce-react'
import { Send } from "lucide-react"
import { EmailPreview } from "./email-preview"
import { ImageUpload } from "./image-upload"
import { EmailTemplates } from "./email-templates"
import { usePopup } from "@/context/popup-context"

// Define types for the TinyMCE editor instance
type TinyMCEInstance = {
  insertContent: (content: string) => void;
  getContent: () => string;
  setContent: (content: string) => void;
  focus: () => void;
}

export function EmailEditor() {
  const [subject, setSubject] = useState("Feastables is now available at Jeevic 🔥🔥🔥")
  const [content, setContent] = useState(`
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://i.pinimg.com/736x/25/22/d0/2522d0c55048c075f84289c0d9def846.jpg?height=300&width=600&text=Feastables+Product" alt="Feastables Product" style="max-width: 100%;" />
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  `)
  const [sendToAll, setSendToAll] = useState(true)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const editorRef = useRef<TinyMCEInstance | null>(null)
  const { showPopup } = usePopup()

  const handleEditorChange = (content: string) => {
    setContent(content)
  }

  const handleSendEmail = () => {
    showPopup("Email sent successfully!", { type: "success" })
  }

  const handleImageSelectedAction = (imageUrl: string) => {
    if (editorRef.current) {
      editorRef.current.insertContent(`<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%; margin: 10px 0;" />`)
    }
    setShowImageUpload(false)
  }

  const handleSelectTemplateAction = (templateContent: string) => {
    setContent(templateContent)
    setShowTemplates(false)
  }

  return (
    <div className="flex-1 flex">
      <div className="w-1/2 border-r p-6 flex flex-col">
        <div className="mb-4">
          <label className="block text-sm text-gray-800 mb-1">Subject of Email</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-800 mb-1">Compose your mail</label>
          <div className="border rounded-md mb-2">
            {showImageUpload && (
              <div className="p-4 border-b">
                <ImageUpload onImageSelectedAction={handleImageSelectedAction} />
              </div>
            )}

            {showTemplates && (
              <div className="p-4 border-b">
                <EmailTemplates onSelectTemplateAction={handleSelectTemplateAction} />
              </div>
            )}

            <Editor
              apiKey="l8xhuswghojjq8qw4hsbkssa0zmskqvo1lkw26940o5o1hl1"
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={content}
              onEditorChange={handleEditorChange}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | image | help',
                content_style: 'body { font-family: Inter, sans-serif; font-size: 14px }',
                branding: false,
                promotion: false
              }}
            />
          </div>
        </div>

        <div className="flex items-center mb-4 text-gray-800">
          <input
            type="checkbox"
            id="sendToAll"
            checked={sendToAll}
            onChange={() => setSendToAll(!sendToAll)}
            className="mr-2"
          />
          <label htmlFor="sendToAll" className="text-sm">
            The mail will be sent to all the users by default.
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 text-gray-700"
          >
            Add Image
          </button>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 text-gray-700"
          >
            Use Template
          </button>
          <button
            onClick={handleSendEmail}
            className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-orange-600 transition-colors ml-auto"
          >
            Send Email <Send size={18} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Email Preview */}
      <EmailPreview subject={subject} content={content} />
    </div>
  )
}