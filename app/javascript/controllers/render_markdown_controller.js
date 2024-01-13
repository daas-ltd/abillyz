import { Controller } from "@hotwired/stimulus"
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import MarkdownStyle from 'markdown_style'

// Connects to data-controller="render-markdown"
export default class extends Controller {
  static values = {
    body: String
  }

  connect() {
    this.showHtml()

    // watch element attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          this.showHtml()
        }
      })
    })

    observer.observe(this.element, {
      attributes: true
    })
  }

  showHtml() {
    if (!this.shadow) {
      this.shadow = this.element.attachShadow({mode: 'open'})
      const styleEl = document.createElement('style')
      styleEl.textContent = MarkdownStyle.style
      this.shadow.appendChild(styleEl)
    } else {
      this.shadow.removeChild(this.shadow.lastChild)
    }

    const nodes = new DOMParser().parseFromString(this.renderHtml(this.bodyValue), 'text/html')
    this.shadow.appendChild(nodes.documentElement.lastChild)
  }

  renderHtml (markdown) {
    return DOMPurify.sanitize(
      marked.parse(markdown)
    )
  }
}
