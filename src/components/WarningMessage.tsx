import { motion } from "framer-motion";

interface WarningMessageProps {
  message: React.ReactNode[];
  color?: "yellow" | "red" | "blue" | "green";
}

const colorClasses: Record<string, string> = {
  yellow: "border-yellow-500 bg-yellow-100 text-yellow-800",
  red: "border-red-500 bg-red-100 text-red-800",
  blue: "border-blue-500 bg-blue-100 text-blue-800",
  green: "border-green-500 bg-green-100 text-green-800",
};

const WarningMessage: React.FC<WarningMessageProps> = ({
  message,
  color = "yellow",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`rounded-md border-l-4 p-4 shadow-md ${colorClasses[color]}`}
    >
      {message.map((line, index) => (
        <p key={index} className="mt-1">
          {line}
        </p>
      ))}
    </motion.div>
  );
};

export default WarningMessage;
