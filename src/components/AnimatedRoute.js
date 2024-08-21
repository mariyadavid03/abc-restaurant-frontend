import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    x: -50
  },
  in: {
    opacity: 1,
    x: 0
  },
  out: {
    opacity: 0,
    x: 50
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
};

function AnimatedRoute({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence>
      <motion.div
        key={location.key}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedRoute;