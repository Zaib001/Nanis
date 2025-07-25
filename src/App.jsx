// import Sidebar from './components/Sidebar';

// function App() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         {/* Replace this with your main content */}
//         <h1 className="text-2xl font-bold">Main Content Area</h1>
//       </div>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './components/DashboardLayout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import OtpVerificationPage from './pages/OtpVerificationPage';
import OnboardingFlow from './pages/OnboardingFlow';
import './index.css';
import Home from './pages/Home';
import DashboardSection from './components/DashboardSection';
import ChatPage from './pages/ChatPage';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage  />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        {/* Protected/Main Routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
            <DashboardSection/>
            </DashboardLayout>
          }
        />
        <Route
          path="/home"
          element={
            <DashboardLayout>
            <Home/>
            </DashboardLayout>
          }
        />
        <Route
          path="/chat/:chatId"
          element={
            <DashboardLayout>
            <ChatPage />

            </DashboardLayout>
          }
        />

        {/* 404 */}
        <Route path="*" element={<div className="text-center p-10">Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;


