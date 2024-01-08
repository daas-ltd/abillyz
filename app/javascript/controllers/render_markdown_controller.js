import { Controller } from "@hotwired/stimulus"
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Connects to data-controller="render-markdown"
export default class extends Controller {
  connect() {
    this.element.srcdoc = this.renderHtml(this.element.dataset.srcdoc)
  }

  renderHtml (markdown) {
    return DOMPurify.sanitize(
      marked.parse(markdown)
    )
  }
}
