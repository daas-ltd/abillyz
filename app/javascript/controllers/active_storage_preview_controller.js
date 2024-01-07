import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="active-storage-preview"
export default class extends Controller {
  static targets = [ "file", "preview", "label" ]

  connect() {
    console.log(this)
    this.fileCheck()
  }

  fileCheck() {
    this.fileTarget.addEventListener('change', e => {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.addEventListener("load", () => {
        this.previewTarget.src = reader.result
      }, false)
      reader.readAsDataURL(file)

      this.labelTarget.classList.add('hidden')
      this.previewTarget.classList.remove('hidden')
    })
  }
}
