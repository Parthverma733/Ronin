import { useEffect } from 'react';

/**
 * @param {{ onRun: () => void; onSave: () => void; onToggleInput: () => void }} handlers
 */
export function useKeyboardShortcuts({ onRun, onSave, onToggleInput }) {
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        onRun();
        return;
      }
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        onSave();
        return;
      }
      if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        onToggleInput();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onRun, onSave, onToggleInput]);
}
