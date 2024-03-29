import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle"
export default class extends Controller {
  static targets = [
    'menu',
    'button'
  ]

  connect() {
    this.buttonTarget.dataset.testId = this.buttonTarget.dataset.testId + '-ready'
  }

  click(event) {
    const els = document.querySelectorAll('[data-controller="toggle"] [data-toggle-target="menu"]')
    els.forEach((el) => {
      if (el === this.menuTarget) {
        el.classList.toggle('hidden')
      } else {
        el.classList.add('hidden')
      }
    })
  }
}
