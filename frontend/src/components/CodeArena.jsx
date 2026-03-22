import { motion, AnimatePresence } from 'framer-motion';
import DojoMonacoEditor from './DojoMonacoEditor.jsx';

function KatanaMini({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function CodeArena({ code, onChange, output, error, isRunning }) {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[420px] lg:min-h-[calc(100vh-220px)]">
      <motion.section
        layout
        className="flex flex-col rounded-xl border border-dojo-border bg-dojo-panel/60 backdrop-blur-sm overflow-hidden shadow-[0_0_0_1px_rgba(196,30,58,0.08)]"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-dojo-border/80 bg-dojo-charcoal/50 gap-2 flex-wrap">
          <span className="text-xs font-mono text-dojo-cyan/90 tracking-wider uppercase flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-dojo-neon shadow-neon animate-shimmer" />
            Source
          </span>
          <div
            className="flex items-center gap-1.5 rounded-md border border-dojo-crimson/35 bg-dojo-crimson/10 px-2 py-1 text-[10px] font-mono text-dojo-crimson shadow-[0_0_12px_rgba(196,30,58,0.2)]"
            title="Active language"
          >
            <KatanaMini className="w-3.5 h-3.5 text-dojo-crimson" />
            <span className="text-slate-400">Ronin</span>
          </div>
        </div>
        <div className="flex-1 min-h-[280px] lg:min-h-0">
          <DojoMonacoEditor value={code} onChange={onChange} />
        </div>
      </motion.section>

      <motion.section
        layout
        className="flex flex-col rounded-xl border border-dojo-border bg-dojo-panel/60 backdrop-blur-sm overflow-hidden"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-dojo-border/80 bg-dojo-charcoal/50 gap-2">
          <span className="text-xs font-mono text-dojo-neon/90 tracking-wider uppercase flex items-center gap-2">
            <svg className="w-4 h-4 text-dojo-crimson" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M8 4h12v12H8V4z"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.4"
              />
              <path d="M4 8h12v12H4V8z" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            Console
          </span>
          {isRunning && (
            <span className="text-[10px] font-mono text-dojo-cyan animate-pulse text-right max-w-[min(100%,14rem)]">
              Executing Ronin code…
            </span>
          )}
        </div>

        <div className="flex-1 relative min-h-[200px] bg-[#0c0c10]">
          <div className="absolute inset-0 bg-brush-stroke pointer-events-none opacity-40" />

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="err"
                role="alert"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="relative h-full p-4 overflow-auto"
              >
                <div className="rounded-lg border-2 border-dojo-crimson/60 bg-dojo-crimson/10 px-4 py-3 shadow-strike">
                  <p className="text-xs font-mono font-semibold text-dojo-crimson tracking-[0.15em] uppercase mb-2 flex items-center gap-2">
                    <span aria-hidden>⚔</span> Battle alert
                  </p>
                  <pre className="text-sm text-red-200/95 whitespace-pre-wrap font-mono leading-relaxed">
                    {error}
                  </pre>
                </div>
              </motion.div>
            ) : (
              <motion.pre
                key="out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-full p-4 text-sm font-mono text-dojo-cyan/95 whitespace-pre-wrap overflow-auto leading-relaxed"
              >
                {output || (
                  <span className="text-slate-600">
                    Awaiting your command… output will appear here after Run.
                  </span>
                )}
              </motion.pre>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
}
