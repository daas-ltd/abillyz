import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="editor-markdown"
export default class extends Controller {
  static targets = [ 'code', 'dest', 'preview', 'keymap' ]

  async connect() {
    const CodeEditor = (await import('editor_codemirror')).default
    this.cm = new CodeEditor(
      this.codeTarget,
      this.destTarget,
      this.previewTarget,
      this.keymapTarget.content
    )
    window.cm = this.cm
  }

  disconnect() {
    this.cm.editor.destroy()
  }
}
