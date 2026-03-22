import { motion } from 'framer-motion';

const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3) % 100}%`,
  delay: i * 0.9,
  duration: 12 + (i % 5),
}));

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
      {/* Drifting mist / smoke */}
      <motion.div
        className="absolute -inset-[20%] bg-smoke-radial opacity-70"
        animate={{ opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-dojo-crimson/[0.03] via-transparent to-dojo-cyan/[0.04] animate-mist-drift"
      />

      {/* Sakura petals */}
      {PETALS.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 w-2 h-2 rounded-full bg-dojo-crimson/30"
          style={{ left: p.left }}
          initial={{ y: '-5vh', opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, 25 + (p.id % 5) * 8],
            rotate: [0, 180 + p.id * 10],
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Subtle diagonal brush strokes */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-18deg, transparent, transparent 120px, rgba(196,30,58,0.15) 121px, transparent 122px)',
        }}
      />
    </div>
  );
}
