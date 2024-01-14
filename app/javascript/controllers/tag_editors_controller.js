import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tag-editors"
export default class extends Controller {
  static targets = [
    'input',
    'highlight'
  ]
  connect() {
    this.highlight(this.inputTarget.value)
  }

  updateOutput (event) {
    console.log(event)
    const tag = event.target.value
      .replace(/\u3000/, ' ')
      .replace(/^ /, '')
      .replace(/ {2}/, ' ')
    this.inputTarget.value = tag

    this.highlight(tag)
  }

  highlight (value) {
    const tags = value.split(' ').filter(item => item !== '')

    let spanGeneration = ''
    for (let i = 0; i < tags.length; i++) {
      if (spanGeneration !== '' && !spanGeneration.match(/ $/)) {
        spanGeneration += ' '
      }
      if (tags[i] === '') {
        spanGeneration += ' '
      } else {
        spanGeneration +=
          `<span style="background-color: #f4f9ff;
                          border-radius: 2px;
                          box-shadow: 0 0 0 1px #bbdbf3;
                          padding: 0px;
                          overflow: hidden;
                          letter-spacing: .02rem
                          box-sizing: border-box;"
            >${tags[i]}</span>`
      }
    }
    this.highlightTarget.innerHTML = spanGeneration
  }
}
