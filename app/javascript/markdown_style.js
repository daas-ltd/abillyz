export default {
  style: `
html {
  scroll-behavior: smooth;
}

* {
  overflow: auto;
  word-wrap: break-word;
}

hr, h1, h2, h3, h4, h5, h6 {
  position: relative;
  margin-top: 24px;
  margin-bottom: 16px;
  padding-left: 22px;
  overflow: hidden;
}

h4, h5, h6 {
  margin-top: 16px;
}

h1 {
  font-size: 1.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #ddd;
}

h2 {
  font-size: 1.3rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #ddd;
}

h3 {
  font-size: 1.2rem;
}

h4 {
  font-size: 1.1rem;
}

h5 {
  font-size: 1.0rem;
}

h6 {
  font-size: 1.0rem;
}

hr {
  border: 0 none;
  border-bottom: 1px solid #ddd;
}

ol {
  padding: 8px 0 8px 32px;
  list-style-type: decimal;
  list-style-position: outside;
}

ul {
  padding: 8px 0 8px 32px;
  list-style-type: disc;
  list-style-position: outside;
}

li {
  line-height: 2rem;
  overflow: visible;
}

a,
p {
  margin: 16px 0;
  line-height: 1.8rem;
  letter-spacing: 0.05rem;
}

a {
  text-decoration: none;
  color: #00608d;
  &:hover {
    text-decoration: underline;
    color: #141D69;
  }
  &.absent {
    color: #660099;
  }
}

table {
  margin: 24px 0;
  border-left: 1px solid #ccc;
  border-collapse: collapse;
}

table,
th,
td {
  max-width: 100%;
  word-break: break-all;
}

table tr {
  background-color: white;
}

table tr:nth-child(odd) {
  background-color: #eee;
}

table tr th {
  font-weight: bold;
  background-color: white;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 8px 12px;
}

table tr td {
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 8px 12px;
}

pre,
pre code,
pre span {
  word-wrap: normal;
  line-height: 1.2rem;
}

pre {
  position: relative;
  margin: 24px 0;
  padding: 20px;
  background-color: #282c33;
  font-family: SFMono-Regular, Consolas, Menlo, Monaco, 'Osaka-mono', 'Osaka-等幅', monospace;
  word-spacing: normal;

  & code {
    background-color: #282c33;
    color: #abb2bf;
    padding: 0;
    border-radius: 0;
  }
}

.code__tool {
  position: sticky;
  top: 0;
  left: 0;
  width: calc(100% - 1px);
  height: 1px;
  overflow: visible;
  transform: translate(21px, -2400%);
}

code.code__filename {
  position: absolute;
  right: 0;
  background-color: #f2f0f0;
  color: black;
  margin: 1px 0px 1px 1px;
  padding: 0 0 1px 4px;
  border-radius: 0 0 0 4px;
}

code [data-prompt]:after {
  content: attr(data-prompt);
  margin-right: 0.5rem;
}

.code__clipboard {
  display: none;
  position: absolute;
  top: 1.5rem;
  right: 4px;
  background-color: white;
  border-radius: 4px;
  margin: 0;
  transition: all .1s;
  cursor: pointer;
}

.code__clipboard.clicked {
  filter: brightness(40%);
}

pre:hover .code__clipboard {
  display: block;
}

.mermaid {
  display: none;
  justify-content: center;
  margin: 16px auto;
  border: 1px solid #ddd;
  box-shadow: 0 0 4px 0 #4d4c4c;
  max-width: 90%;
}

.mermaid * {
  overflow: visible;
  word-wrap: normal;
}

.mermaid[data-processed="true"] {
  display: flex;
}

img {
  display: block;
  margin: 16px auto;
  border: 1px solid #ddd;
  box-shadow: 0 0 4px 0 #4d4c4c;
  max-width: 90%;
}

img.anchor {
  position: absolute;
  display: none;
  margin: 0;
  border: none;
  box-shadow: none;
  bottom: 12px;
  left: -2px;
  width: 24px;
  cursor: pointer;
}

h3 img.anchor {
  bottom: 2px;
}

h4 img.anchor {
  bottom: 0;
}

h5 img.anchor {
  bottom: -1px;
}

h6 img.anchor {
  bottom: -1px;
}

img.anchor.clicked {
  opacity: 0.2;
}

h1:hover img.anchor,
h2:hover img.anchor,
h3:hover img.anchor,
h4:hover img.anchor,
h5:hover img.anchor,
h6:hover img.anchor {
  display: inline;
}

.image__modal {
  display: none;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);

  &.show {
    display: block;
    animation: show 0.2s;
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.image__full {
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  max-height: 80%;
  background-color: white;
}

blockquote {
  border-left: 4px solid #80FF30;
  padding-left: 12px;
  margin: 4px 0;
  background-color: #F2F0F0;
  border-radius: 4px;
}

summary {
  cursor: pointer;
}

.youtube {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

.youtube iframe {
  width: 100%;
  height: 97%;
}

@media screen and (min-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.6rem;
  }
  h3 {
    font-size: 1.4rem;
  }
  h4 {
    font-size: 1.2rem;
  }
  h5 {
    font-size: 1.1rem;
  }
}
`
}
