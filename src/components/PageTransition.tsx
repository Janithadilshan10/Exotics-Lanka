import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fade transition (faster)
const fadeVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function FadeTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={fadeVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide from bottom
const slideUpVariants = {
  initial: { opacity: 0, y: 50 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  exit: { 
    opacity: 0, 
    y: 30,
    transition: { duration: 0.3 }
  },
};

export function SlideUpTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={slideUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale transition for modals
const scaleVariants = {
  initial: { opacity: 0, scale: 0.95 },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.15 }
  },
};

export function ScaleTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={scaleVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger children animations
export function StaggerContainer({ 
  children, 
  className,
  staggerDelay = 0.1 
}: PageTransitionProps & { staggerDelay?: number }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        enter: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
};

// Animated number counter
export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 1,
  className 
}: { 
  from?: number; 
  to: number; 
  duration?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <motion.span
        initial={{ y: from }}
        animate={{ y: to }}
        transition={{ 
          duration,
          ease: "easeOut"
        }}
        onUpdate={(latest) => {
          const element = document.getElementById('counter');
          if (element && typeof latest.y === 'number') {
            element.textContent = Math.round(latest.y).toString();
          }
        }}
      >
        <span id="counter">{to}</span>
      </motion.span>
    </motion.span>
  );
}

// Success checkmark animation
export function SuccessCheckmark({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={className}
    >
      <motion.svg
        viewBox="0 0 50 50"
        className="w-full h-full"
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M 14 25 L 22 33 L 36 17"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}

// Shine effect on hover
export function ShineHover({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        variants={{
          hover: {
            x: ['-100%', '100%'],
            transition: {
              duration: 0.6,
              ease: "easeInOut",
            },
          },
        }}
      />
    </motion.div>
  );
}

