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
import { vim, Vim } from '@replit/codemirror-vim'
import { oneDarkTheme, oneDarkHighlightStyle } from '@codemirror/theme-one-dark'

export default class CodeEditor {
  constructor(codeEl, destEl, lang='html', keybind='') {
    this.destEl = destEl
    this.codeEl = codeEl
    this.keymapConfig = new Compartment()
    this.editor = new EditorView({
      doc: destEl.value, // TODO : innerText? Value?
      extensions: [
        this.keymapConfig.of(keybind ? this.keymaps[keybind]() : []),
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
  // Hash for keymap
  keymaps = {
    default: () => [],
    vim
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
          this.destEl.value = this.editor.state.doc.toString()
          this.codeEl.setAttribute('data-editor-status', 'sync')
        },
        100
      )
    })
  }
}
