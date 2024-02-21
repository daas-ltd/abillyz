import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"

// Connects to data-controller="editor-markdown"
export default class extends Controller {
  static targets = [ 'code', 'dest', 'preview', 'keybind' ]

  async connect() {
    const CodeEditor = (await import('editor_codemirror')).default
    this.cm = new CodeEditor(
      this.codeTarget,
      this.destTarget,
      this.previewTarget,
      this.keybindTarget.content
    )
    window.cm = this.cm
  }

  disconnect() {
    this.cm.editor.destroy()
  }

  undo() {
    this.cm.undoHandler()
  }

  redo() {
    this.cm.redoHandler()
  }

  bold() {
    this.cm.boldHandler()
  }

  italic() {
    this.cm.italicHandler()
  }

  strikethrough() {
    this.cm.strikethroughHandler()
  }

  quote() {
    this.cm.quoteHandler()
  }

  link() {
    this.cm.linkHandler()
  }

  code() {
    this.cm.codeHandler()
  }

  async image(event) {
    const formData = new FormData()
    formData.append("post[image]", event.target.files[0])

    const path = await post(event.target.dataset.postUrl, {
      body: formData
    }).then(response => response.json)
      .then(data => data.path)

    this.cm.imageHandler(path)

    // reset input field
    event.target.value = ''
  }
}
