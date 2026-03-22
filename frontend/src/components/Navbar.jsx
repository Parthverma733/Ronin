import { motion } from 'framer-motion';

function KatanaIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20L18 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="text-dojo-crimson"
      />
      <path
        d="M18 6l2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-slate-500"
      />
      <path
        d="M5 19l-1 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-dojo-cyan/80"
      />
    </svg>
  );
}

function RoninLanguageBadge() {
  return (
    <div
      className="relative flex items-center gap-2 rounded-lg border border-dojo-crimson/45 bg-gradient-to-r from-dojo-crimson/20 via-dojo-panel/90 to-dojo-crimson/15 px-3 py-2 shadow-[0_0_24px_rgba(196,30,58,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden"
      title="Ronin is the only language in this dojo"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-12deg, transparent, transparent 6px, rgba(196,30,58,0.35) 7px, transparent 8px)',
        }}
      />
      <KatanaIcon className="w-4 h-4 shrink-0 text-dojo-crimson drop-shadow-[0_0_8px_rgba(196,30,58,0.6)]" />
      <span className="relative text-xs font-mono tracking-wide text-slate-300">
        <span className="text-slate-500">Language:</span>{' '}
        <span className="text-dojo-crimson font-semibold drop-shadow-[0_0_12px_rgba(196,30,58,0.45)]">
          Ronin
        </span>{' '}
        <span className="text-base leading-none" aria-hidden>
          🗡️
        </span>
      </span>
    </div>
  );
}

export default function Navbar({
  onRun,
  onReset,
  onSave,
  isRunning,
  showInputPanel,
  onToggleInput,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-dojo-border/80 bg-dojo-charcoal/90 backdrop-blur-md">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-4 py-3 flex flex-wrap items-center gap-3">
        <motion.div
          className="flex items-center gap-2 min-w-0"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-dojo-panel border border-dojo-border shadow-strike">
            <KatanaIcon className="w-6 h-6" />
            <span className="absolute -bottom-0.5 text-[8px] font-display font-bold tracking-[0.2em] text-dojo-cyan/90">
              道
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-xl text-slate-100 tracking-tight truncate">
              Ronin Compiler
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 font-mono uppercase tracking-widest">
              Code Arena
            </p>
          </div>
        </motion.div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3">
          <RoninLanguageBadge />

          <motion.button
            type="button"
            onClick={onToggleInput}
            className={`text-xs font-mono px-3 py-2 rounded-md border transition-colors ${
              showInputPanel
                ? 'border-dojo-cyan/50 text-dojo-cyan bg-dojo-cyan/10'
                : 'border-dojo-border text-slate-400 hover:text-slate-200'
            }`}
            whileTap={{ scale: 0.96 }}
          >
            Input
          </motion.button>

          <div className="flex items-center gap-2">
            <StrikeButton variant="ghost" onClick={onReset} disabled={isRunning}>
              Reset
            </StrikeButton>
            <StrikeButton variant="ghost" onClick={onSave} disabled={isRunning}>
              Save
            </StrikeButton>
            <StrikeButton variant="primary" onClick={onRun} disabled={isRunning} loading={isRunning}>
              {isRunning ? 'Unleashing Ronin strike…' : 'Run'}
            </StrikeButton>
          </div>
        </div>
      </div>
    </header>
  );
}

function StrikeButton({ children, variant = 'primary', loading, disabled, ...rest }) {
  const base =
    'relative overflow-hidden font-mono text-sm font-medium px-3 sm:px-4 py-2 rounded-md border transition-colors';
  const styles =
    variant === 'primary'
      ? 'min-w-[88px] sm:min-w-[220px] border-dojo-crimson/70 bg-gradient-to-b from-dojo-crimson/25 to-dojo-crimson-dim/30 text-slate-100 hover:from-dojo-crimson/40 hover:shadow-strike disabled:opacity-60'
      : 'min-w-[88px] border-dojo-border bg-dojo-panel/80 text-slate-300 hover:border-dojo-crimson/35 hover:text-white disabled:opacity-50';

  return (
    <motion.button
      type="button"
      disabled={disabled}
      className={`${base} ${styles}`}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      {...rest}
    >
      {loading && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="absolute inset-x-4 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-dojo-cyan to-transparent opacity-90 animate-slash-loop" />
        </motion.span>
      )}
      <span className={`${loading ? 'opacity-50' : ''} text-center leading-tight`}>{children}</span>
    </motion.button>
  );
}
