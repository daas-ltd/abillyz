import { Controller } from "@hotwired/stimulus"
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import MarkdownStyle from 'markdown_style'

import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/highlight.min.js'
import hljsStyle from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-dark.min.css' with { type: 'css' };

// Connects to data-controller="render-markdown"
export default class extends Controller {
  static values = {
    body: String
  }

  markedRenderer = {
    code (code, infostring, escaped) {
      let lang
      let filename
      if (infostring) {
        lang = (infostring.split(':')[0] || '').match(/\S*/)[0]
        filename = (infostring.split(':')[1] || '').match(/\S*/)[0]
      }

      const SHELL_REGEX = /^bash|zsh|powershell|ps$/

      const clipboard = '<img src="/images/clipboard.svg" class="code__clipboard clipboard" data-code="' + encodeURIComponent(code) + '">'
      if (this.options.highlight) {
        code = this.options.highlight(code, lang)
        escaped = true
      }
      if (!lang) {
        return '<pre><div class="code__tool">' + clipboard + '</div><code>' + (escaped ? code : escape(code, true)) + '</code></pre>\n'
      }

      if (SHELL_REGEX.test(lang)) {
        // rendering shell prompto
        const prompt = (infostring.split(':')[1] || '').match(/\S*/)[0]
        if (prompt) {
          const promptData = `data-prompt="${prompt}"`
          code = code.replace(/^/gm, `<span ${promptData}></span>`)
        }

        return '<pre class="code"><div class="code__tool">' + clipboard + '</div><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '</code></pre>\n'
      } else if (lang === 'mermaid') {
        return '<div class="mermaid">' + (escaped ? code : escape(code, true)) + '</div>\n'
      } else {
        // rendering filename
        let fileInfo = ''
        if (filename) {
          fileInfo = `<code class="code__filename">${filename}</code>`
        }
        return '<pre class="code"><div class="code__tool">' + fileInfo + clipboard + '</div><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '</code></pre>\n'
      }
    }
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

      const abillyzStyle = new CSSStyleSheet();
      abillyzStyle.replaceSync(MarkdownStyle.style);
      this.shadow.adoptedStyleSheets = [abillyzStyle, hljsStyle];
    } else {
      this.shadow.removeChild(this.shadow.lastChild)
    }

    const nodes = new DOMParser().parseFromString(this.renderHtml(this.bodyValue), 'text/html')
    this.shadow.appendChild(nodes.documentElement.lastChild)
  }

  renderHtml (markdown) {
    // integrate marked and highlight
    marked.setOptions({
      langPrefix: '',
      highlight: (code, lang) => {
        return hljs.highlightAuto(code, [lang]).value
      }
    })

    marked.use({
      renderer: this.markedRenderer
    })

    return DOMPurify.sanitize(
      marked.parse(markdown)
    )
  }
}
