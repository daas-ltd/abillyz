import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="editor-markdown"
export default class extends Controller {
  static targets = [ 'code', 'dest' ]

  async connect() {
    const CodeEditor = (await import('editor_codemirror')).default
    this.cm = new CodeEditor(
      this.codeTarget,
      this.destTarget,
    )
  }

  disconnect() {
    this.cm.editor.destroy()
  }
}
