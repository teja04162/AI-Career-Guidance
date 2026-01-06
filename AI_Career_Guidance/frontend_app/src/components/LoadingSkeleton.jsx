import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ width: 360 }}
    >
      <div className="skeleton title" />
      <div className="skeleton circle" />
      <div className="skeleton line" />
      <div className="skeleton line short" />
    </motion.div>
  );
}
