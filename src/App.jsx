// App.jsx
import React from 'react';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-xl p-10 max-w-md text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400"
        >
          Welcome to My App
        </motion.h1>

     

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-lg transition duration-300"
        >
          Get Started 🚀
        </motion.button>
      </motion.div>
    </div>
  );
};

export default App;
