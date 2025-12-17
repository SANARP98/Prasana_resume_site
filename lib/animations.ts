// Smooth animation configurations for Framer Motion

export const smoothTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export const ultraSmoothTransition = {
  type: "spring",
  stiffness: 50,
  damping: 15,
  mass: 0.8,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: ultraSmoothTransition,
};

export const fadeInDown = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0 },
  transition: ultraSmoothTransition,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: ultraSmoothTransition,
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: ultraSmoothTransition,
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: ultraSmoothTransition,
};

// Stagger children animations
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Scroll-triggered animation variants
export const scrollFadeIn = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.2,
    },
  },
};

export const scrollSlideIn = {
  offscreen: {
    opacity: 0,
    x: -100,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: ultraSmoothTransition,
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
};

export const hoverLift = {
  y: -4,
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
};

export const hoverGlow = {
  boxShadow: "0 8px 30px rgba(16, 32, 204, 0.12)",
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
};
