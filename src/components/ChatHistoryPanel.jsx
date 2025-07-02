// ChatHistoryPanel.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatHistoryPanel = ({ isOpen }) => {
  return (
    <AnimatePresence>
      
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-[210px] w-[254px] h-[928px] bg-white border border-gray-200 p-3 z-30 shadow-sm"
        >
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Chat history</h2>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full h-[40px] px-3 py-2 border rounded-md text-sm text-gray-600 mb-4"
          />
          <div className="text-center text-gray-400 text-xs">No result</div>
        </motion.div>
      
    </AnimatePresence>
  );
};

export default ChatHistoryPanel;
