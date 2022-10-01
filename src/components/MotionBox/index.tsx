import { motion } from 'framer-motion';

export const MotionBox = ({ children, ...rest } : any) => {
  return (
    <motion.div
      initial={{  opacity: 0 }}
      animate={{  opacity: 1 }}
      exit={{ opacity: 0 }}
      // @ts-ignore no problem in operation, although type error appears.
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};