import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundEffects from './components/BackgroundEffects.jsx';
import Navbar from './components/Navbar.jsx';
import CodeArena from './components/CodeArena.jsx';
import InputPanel from './components/InputPanel.jsx';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js';
import { RONIN_DEFAULT_CODE, RONIN_FILE_EXTENSION } from './lib/languages.js';

export default function App() {
  const [code, setCode] = useState(() => RONIN_DEFAULT_CODE);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showInputPanel, setShowInputPanel] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setPageReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const simulateRun = useCallback(async () => {
    setIsRunning(true);
    setError('');
    setOutput('');
    await new Promise((r) => setTimeout(r, 1200));
    const demoFail = code.includes('__DOJO_FAIL__');
    if (demoFail) {
      setError(
        '⚔ BATTLE ALERT: Compilation failed — unexpected token near line boundary. Sharpen your syntax, warrior.\n\nTip: remove __DOJO_FAIL__ from your source to clear this alert.'
      );
      setOutput('');
    } else {
      setOutput(
        input.trim()
          ? `[stdin]\n${input}\n\n── Ronin output ──\nHello from the Ronin Compiler.\n(Connect your backend to execute real code.)`
          : `── Ronin output ──\nHello from the Ronin Compiler.\n(Connect your backend to execute real code.)`
      );
    }
    setIsRunning(false);
  }, [input, code]);

  const handleReset = useCallback(() => {
    setCode(RONIN_DEFAULT_CODE);
    setOutput('');
    setError('');
  }, []);

  const handleSave = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dojo-snippet.${RONIN_FILE_EXTENSION}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [code]);

  useKeyboardShortcuts({
    onRun: simulateRun,
    onSave: handleSave,
    onToggleInput: () => setShowInputPanel((v) => !v),
  });

  return (
    <motion.div
      className="dojo-texture relative min-h-screen flex flex-col"
      initial={{ opacity: 0, filter: 'blur(10px)', y: 16 }}
      animate={
        pageReady
          ? { opacity: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: 0, filter: 'blur(10px)', y: 16 }
      }
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <BackgroundEffects />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onRun={simulateRun}
          onReset={handleReset}
          onSave={handleSave}
          isRunning={isRunning}
          showInputPanel={showInputPanel}
          onToggleInput={() => setShowInputPanel((v) => !v)}
        />

        <main className="flex-1 flex flex-col px-3 sm:px-4 pb-3 gap-3 max-w-[1920px] mx-auto w-full">
          <CodeArena
            code={code}
            onChange={setCode}
            output={output}
            error={error}
            isRunning={isRunning}
          />

          <AnimatePresence>
            {showInputPanel && (
              <InputPanel input={input} onChange={setInput} />
            )}
          </AnimatePresence>

          <p className="text-center text-[11px] text-slate-600 font-mono tracking-wide px-2">
            <kbd className="px-1.5 py-0.5 rounded bg-dojo-panel border border-dojo-border text-slate-500">
              Ctrl
            </kbd>{' '}
            +{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-dojo-panel border border-dojo-border text-slate-500">
              Enter
            </kbd>{' '}
            run ·{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-dojo-panel border border-dojo-border text-slate-500">
              Ctrl
            </kbd>{' '}
            +{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-dojo-panel border border-dojo-border text-slate-500">
              S
            </kbd>{' '}
            save ·{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-dojo-panel border border-dojo-border text-slate-500">
              Ctrl
            </kbd>{' '}
            +{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-dojo-panel border border-dojo-border text-slate-500">
              I
            </kbd>{' '}
            toggle input
          </p>
        </main>
      </div>
    </motion.div>
  );
}
