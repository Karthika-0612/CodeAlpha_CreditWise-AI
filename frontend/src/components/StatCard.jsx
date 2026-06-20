import { motion } from "framer-motion";

export default function StatCard({ title, value, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        y: -4,
      }}
      transition={{ duration: 0.2 }}
      className="rounded-xl bg-white p-6 shadow-md"
    >
      <h3 className="text-gray-500 font-medium">{title}</h3>

      {children ? (
        <div className="mt-4">{children}</div>
      ) : (
        <p className="mt-2 text-3xl font-bold">{value}</p>
      )}
    </motion.div>
  );
}
