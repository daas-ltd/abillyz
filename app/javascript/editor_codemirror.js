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
import { emacs } from '@replit/codemirror-emacs'
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
          indentWithTab,
          userKeybind == 'vscode' ? this.keybind[userKeybind] : null
        ]),
        markdown(),
        oneDarkTheme,
        syntaxHighlighting(oneDarkHighlightStyle, { fallback: true }),
        EditorView.lineWrapping,
        this.updateCodeHandler()
      ],
      parent: codeEl
    })

    this.getCursorContent = () => {
      return this.editor.state.sliceDoc(
        this.editor.state.selection.main.from,
        this.editor.state.selection.main.to
      )
    }

    this.toolbarReplace = (both, start = null, end = null) => {
      const startTag = both || start
      const endTag = both || end
      const target = this.getCursorContent()

      let content = target.replaceAll(startTag, '')

      content = content.replace(/\s\s/g, '')

      if (content === target.replace(/\n$/g, '')) {
        content = startTag + content + endTag
      } else {
        content = content.replace(/\n$/g, '')
        content = startTag + content + endTag + '\n'
      }

      this.editor.dispatch({
        changes: {
          from: this.editor.state.selection.main.from,
          to: this.editor.state.selection.main.to,
          insert: content
        }
      })
      return this.editor.state.selection.main.from + startTag.length
    },

    this.undoHandler = () => {
      undo(this.editor)
    }

    this.redoHandler = () => {
      redo(this.editor)
    }

    this.boldHandler = () => {
      const cursorTarget = this.toolbarReplace('**')
      this.editor.dispatch({
        selection: { anchor: cursorTarget }
      })
    }

    this.italicHandler = () => {
      const cursorTarget = this.toolbarReplace('_')
      this.editor.dispatch({
        selection: { anchor: cursorTarget }
      })
    }

    this.strikethroughHandler = () => {
      const cursorTarget = this.toolbarReplace('~~')
      this.editor.dispatch({
        selection: { anchor: cursorTarget }
      })
    }

    this.quoteHandler = () => {
      const state = this.editor.state
      const from = state.doc.lineAt(state.selection.main.from).number - 1
      const to = state.doc.lineAt(state.selection.main.to).number - 1

      const lines = state.doc.toString().split('\n')
      for (let i = from; i <= to; i++) {
        lines[i] = '> ' + lines[i]
      }

      this.editor.dispatch({
        changes: {
          from: 0,
          to: this.editor.state.doc.length,
          insert: lines.join('\n')
        }
      })
      this.editor.dispatch({
        selection: { anchor: state.selection.main.from + 2 }
      })
    }

    this.linkHandler = () => {
      const content = this.getCursorContent()
      if (content) {
        this.toolbarReplace('', '[', ']()')
        this.editor.dispatch({
          selection: { anchor: this.editor.state.selection.main.to - 1 }
        })
      } else {
        this.editor.dispatch({
          changes: {
            from: this.editor.state.selection.main.from,
            insert: '[]()'
          }
        })
        this.editor.dispatch({
          selection: { anchor: this.editor.state.selection.main.to + 1 }
        })
      }
    }

    this.codeHandler = () => {
      const state = this.editor.state

      // 選択行の始まりを取得する
      const from = state.doc.lineAt(state.selection.main.from).number - 1

      // 選択行の終わりを取得する
      const to = state.doc.lineAt(state.selection.main.to).number + 1

      // 選択されている箇所の一つ前と後の行に'```'を追加する
      const lines = state.doc.toString().split('\n')
      lines.splice(from, 0, '```')
      lines.splice(to, 0, '```')

      // ドキュメントを置き換える
      this.editor.dispatch({
        changes: {
          from: 0,
          to: this.editor.state.doc.length,
          insert: lines.join('\n')
        }
      })

      this.editor.dispatch({
        selection: { anchor: state.selection.main.head + 4 }
      })
    }

    this.imageHandler = (event) => {
      console.log('image')
      // this.imageUpload(event.target.files[0])
    }
  }
  // Hash for keybind
  keybind = {
    default: () => [],
    vscode: () => [],
    vim,
    emacs,
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
