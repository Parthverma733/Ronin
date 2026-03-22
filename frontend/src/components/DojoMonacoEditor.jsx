import Editor from '@monaco-editor/react';

const DOJO_THEME = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c41e3a' },
    { token: 'string', foreground: '39ff14' },
    { token: 'number', foreground: '00f5d4' },
    { token: 'type', foreground: 'f472b6' },
  ],
  colors: {
    'editor.background': '#121218',
    'editor.foreground': '#e2e8f0',
    'editorLineNumber.foreground': '#64748b',
    'editorLineNumber.activeForeground': '#00f5d4',
    'editorCursor.foreground': '#c41e3a',
    'editor.selectionBackground': '#c41e3a33',
    'editor.inactiveSelectionBackground': '#00f5d422',
    'editor.lineHighlightBackground': '#16161f',
    'editorGutter.background': '#121218',
    'editorWidget.background': '#16161f',
    'editorWidget.border': '#2a1f28',
  },
};

function handleBeforeMount(monaco) {
  monaco.editor.defineTheme('dojo-dark', DOJO_THEME);

  const id = 'ronin';
  monaco.languages.register({ id });
  monaco.languages.setLanguageConfiguration(id, {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
  });

  monaco.languages.setMonarchTokensProvider(id, {
    tokenizer: {
      root: [
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@blockcomment'],
        [/#.*$/, 'comment'],
        [/\b(?:strike|blade|void|return|sensei|path|ronin|if|else|for|while|true|false)\b/i, 'keyword'],
        [/\d+\.?\d*(?:[eE][+-]?\d+)?/, 'number'],
        [/"([^"\\]|\\.)*"/, 'string'],
        [/'([^'\\]|\\.)*'/, 'string'],
      ],
      blockcomment: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[/*]/, 'comment'],
      ],
    },
  });
}

export default function DojoMonacoEditor({ value, onChange, options = {} }) {
  return (
    <Editor
      height="100%"
      language="ronin"
      theme="dojo-dark"
      value={value}
      onChange={(v) => onChange?.(v ?? '')}
      beforeMount={handleBeforeMount}
      options={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 14,
        minimap: { enabled: true, scale: 0.85 },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        padding: { top: 12, bottom: 12 },
        bracketPairColorization: { enabled: true },
        renderLineHighlight: 'line',
        ...options,
      }}
    />
  );
}
