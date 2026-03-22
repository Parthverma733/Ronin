import { motion } from 'framer-motion';

export default function InputPanel({ input, onChange }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="rounded-xl border border-dojo-border bg-dojo-panel/50 backdrop-blur-sm p-3">
        <label className="block">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 block">
            Custom stdin
          </span>
          <textarea
            value={input}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            placeholder="Lines fed to your program (demo)…"
            className="w-full resize-y min-h-[72px] rounded-lg bg-dojo-black/80 border border-dojo-border px-3 py-2 text-sm font-mono text-dojo-cyan/90
              placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-dojo-crimson/40 focus:border-dojo-crimson/50
              transition-shadow"
          />
        </label>
      </div>
    </motion.div>
  );
}
