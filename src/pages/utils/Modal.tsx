import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          key="modal-backdrop"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(event:any) => event.stopPropagation()}
          >
            {title && (
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            )}
            <div className="mt-4 space-y-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
