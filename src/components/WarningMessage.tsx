import { motion } from "framer-motion";

interface WarningMessageProps {
  message: { bold: string; text: string }[];
}

const WarningMessage: React.FC<WarningMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-2 rounded-md border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-800 shadow-md"
    >
      {message.map((item, index) => (
        <p key={index} className="mt-1">
          <strong>{item.bold}</strong> {item.text}
        </p>
      ))}
    </motion.div>
  );
};

export default WarningMessage;
