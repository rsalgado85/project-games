import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/store'
import { getThemePreset } from '@/theme'

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: [0, 0.25, 0] },
    exit: { opacity: 0 },
  },
  blur: {
    initial: { opacity: 0, backdropFilter: 'blur(0px)' },
    animate: { opacity: [0, 0.3, 0], backdropFilter: ['blur(0px)', 'blur(18px)', 'blur(0px)'] },
    exit: { opacity: 0 },
  },
  morph: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: [0, 0.22, 0], scale: [0.98, 1, 1] },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -18 },
    animate: { opacity: [0, 0.24, 0], x: [-18, 0, 16] },
    exit: { opacity: 0 },
  },
} as const

export function ThemeTransitionLayer() {
  const signature = useAppStore((state) => `${state.theme}-${state.experience}`)
  const animationSpeed = useAppStore((state) => state.animationSpeed)
  const [activeSignature, setActiveSignature] = useState(signature)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (signature === activeSignature) return
    setActiveSignature(signature)
    setShow(true)
    const timeout = window.setTimeout(() => setShow(false), animationDuration(animationSpeed))
    return () => window.clearTimeout(timeout)
  }, [activeSignature, animationSpeed, signature])

  const experience = useAppStore((state) => state.experience)
  const preset = getThemePreset(experience)
  const variant = transitionVariants[preset.transition]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={signature}
          className="pointer-events-none fixed inset-0 z-[60]"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 40%), linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.02))',
          }}
          variants={variant}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: animationDuration(animationSpeed) / 1000, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  )
}

function animationDuration(speed: 'fast' | 'normal' | 'slow') {
  if (speed === 'fast') return 220
  if (speed === 'slow') return 560
  return 360
}
