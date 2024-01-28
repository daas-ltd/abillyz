import { Controller } from "@hotwired/stimulus"

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

  image() {
    this.cm.imageHandler()
  }
}
