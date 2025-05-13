'use client';
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, user, className = "" }) => {

  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`bg-white rounded-md shadow-md max-w-2xl w-full h-[80vh] flex flex-col p-6 m-4 ${className}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b pb-2 shrink-0">
              {title && (
                <h3 id="modal-title" className="text-xl font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              <IoClose onClick={onClose} className="cursor-pointer text-2xl" />
            </div>

            {/* Body */}
            <div className="flex-1 ultra-thin-scrollbar light overflow-y-auto text-gray-700 max-h-[calc(90vh-120px)]">
              {user && (
                <>
                  <img
                    src={user.picture.large}
                    alt="User"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <p className="text-center font-semibold">{`${user.name.first} ${user.name.last}`}</p>
                  <p className="text-center text-sm text-gray-600">{user.email}</p>
                  <p className="text-center text-sm text-gray-600">{user.location.city}, {user.location.country}</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
