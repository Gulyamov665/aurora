import { motion } from "framer-motion";
import { forwardRef } from "react";

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const zoomVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1.2, opacity: 0 },
};

const transition = {
  duration: 0.8,
  // delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
};

const MotionWrapper = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <motion.div
    ref={ref}
    variants={fadeVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={transition}
    style={{ position: "absolute", width: "100%" }}
    // layout
  >
    {children}
  </motion.div>
));

export default MotionWrapper;
