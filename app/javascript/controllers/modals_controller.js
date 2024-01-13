import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modals"
export default class extends Controller {
  connect() {
    this.element.showModal()
    this.element.addEventListener('click', (event) => {
      if (event.target !== this.element) {
        return
      }
      this.element.close()
    })
  }

  open() {
    this.element.showModal()
  }

  close(event) {
    this.element.close()
  }
}
