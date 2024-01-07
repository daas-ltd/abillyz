# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"

# CodeMirror
pin "editor_codemirror"

pin "@codemirror/commands", to: "@codemirror--commands.js" # @6.3.3
pin "@codemirror/lint", to: "@codemirror--lint.js" # @6.4.2
pin "crelt" # @1.0.6
pin "@codemirror/search", to: "@codemirror--search.js" # @6.5.5
pin "@codemirror/theme-one-dark", to: "@codemirror--theme-one-dark.js" # @6.1.2
pin "@codemirror/autocomplete", to: "@codemirror--autocomplete.js" # @6.11.1
pin "@codemirror/language", to: "@codemirror--language.js" # @6.10.0
pin "@codemirror/state", to: "@codemirror--state.js" # @6.4.0
pin "@codemirror/view", to: "@codemirror--view.js" # @6.23.0
pin "@lezer/common", to: "@lezer--common.js" # @1.2.0
pin "@lezer/highlight", to: "@lezer--highlight.js" # @1.2.0
pin "style-mod" # @4.1.0
pin "w3c-keyname" # @2.2.8
pin "@replit/codemirror-vim", to: "@replit--codemirror-vim.js" # @6.1.0
pin "@codemirror/lang-markdown", to: "@codemirror--lang-markdown.js" # @6.2.3
pin "@codemirror/lang-css", to: "@codemirror--lang-css.js" # @6.2.1
pin "@codemirror/lang-html", to: "@codemirror--lang-html.js" # @6.4.7
pin "@codemirror/lang-javascript", to: "@codemirror--lang-javascript.js" # @6.2.1
pin "@lezer/css", to: "@lezer--css.js" # @1.1.6
pin "@lezer/html", to: "@lezer--html.js" # @1.3.8
pin "@lezer/javascript", to: "@lezer--javascript.js" # @1.4.12
pin "@lezer/lr", to: "@lezer--lr.js" # @1.3.14
pin "@lezer/markdown", to: "@lezer--markdown.js" # @1.2.0
