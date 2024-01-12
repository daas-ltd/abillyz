import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="active-storage-preview"
export default class extends Controller {
  static targets = [ "file", "preview", "label" ]

  connect() {
    this.fileCheck()
  }

  fileCheck() {
    this.fileTarget.addEventListener('change', e => {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.addEventListener("load", () => {
        this.previewTargets.forEach((preview) => {
          preview.src = reader.result
        })
      }, false)
      reader.readAsDataURL(file)

      this.labelTargets.forEach((label) => {
        label.classList.add('hidden')
      })
      this.previewTargets.forEach((preview) => {
        preview.classList.remove('hidden')
      })
    })
  }
}
