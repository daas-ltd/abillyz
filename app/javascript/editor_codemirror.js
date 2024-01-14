import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor
} from '@codemirror/view'
import {
  Compartment,
  EditorState
} from '@codemirror/state'
import {
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
  bracketMatching
} from '@codemirror/language'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
  undo,
  redo
} from '@codemirror/commands'
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from '@codemirror/autocomplete'
import {
  highlightSelectionMatches,
  searchKeymap
} from '@codemirror/search'

import { markdown } from '@codemirror/lang-markdown'
import { vim } from '@replit/codemirror-vim'
import { vscodeKeymap } from '@replit/codemirror-vscode-keymap'
import { oneDarkTheme, oneDarkHighlightStyle } from '@codemirror/theme-one-dark'

export default class CodeEditor {
  constructor(codeEl, destEl, previewEl, userKeybind) {
    this.destEl = destEl
    this.codeEl = codeEl
    this.previewEl = previewEl

    this.keybindConfig = new Compartment()
    this.editor = new EditorView({
      doc: destEl.value,
      extensions: [
        this.keybindConfig.of(userKeybind ? this.keybind[userKeybind]() : []),
        lineNumbers(),
        highlightActiveLineGutter(),
        foldGutter(),
        history(),
        drawSelection(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        bracketMatching(),
        autocompletion(),
        closeBrackets(),
        keymap.of([
          ...defaultKeymap,
          ...closeBracketsKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          indentWithTab
        ]),
        markdown(),
        oneDarkTheme,
        syntaxHighlighting(oneDarkHighlightStyle, { fallback: true }),
        EditorView.lineWrapping,
        this.updateCodeHandler()
      ],
      parent: codeEl
    })
  }
  // Hash for keybind
  keybind = {
    default: () => [],
    vscode: () => [],
    vim,
  }

  debounce (callback, interval) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      callback()
    }, interval)
  }

  updateCodeHandler (callback) {
    return EditorView.updateListener.of(() => {
      this.codeEl.setAttribute('data-editor-status', 'insync')
      this.debounce(
        () => {
          const value = this.editor.state.doc.toString()
          this.destEl.value = value
          // this.previewEl.srcdoc = this.renderHtml(value)
          this.previewEl.setAttribute('data-render-markdown-body-value' ,value)
          this.destEl.value = this.editor.state.doc.toString()
          this.codeEl.setAttribute('data-editor-status', 'sync')
        },
        100
      )
    })
  }
}
