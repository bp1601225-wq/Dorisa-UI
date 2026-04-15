import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode } from "react";

Modal.setAppElement("#root");

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string; // optional styling prop
};

export default function SettingsModal({
  isOpen,
  onClose,
  children,
  className,
}: SettingsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
           shouldCloseOnOverlayClick={true}
          className="fixed inset-0 flex justify-center items-start mt-20 outline-none"
          overlayClassName="fixed inset-0 bg-black/30 z-50"
          ariaHideApp={false}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={className}
          >
            {children}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}