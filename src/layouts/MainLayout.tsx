import { useLocation, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from '../contexts/AuthContext';
import { ModalProvider, useModal } from '../contexts/ModalContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/loginModal';
import { RegisterModal } from '../components/registerModal';
import { ForgotPasswordModal } from '../components/forgotPasswordModal';

function MainLayoutContent() {
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        isForgotPasswordOpen,
        closeLoginModal,
        closeRegisterModal,
        closeForgotPasswordModal,
        switchToRegister,
        switchToLogin,
    } = useModal();
    const location = useLocation();
    const hideFooter = location.pathname.startsWith('/profile');

    return (
        <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-primary/30 selection:text-white flex flex-col overflow-x-hidden">
            <Navbar />
            <main className="flex-grow pt-20">
                <Outlet />
            </main>
            {!hideFooter && <Footer />}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#1C1A2D',
                        color: '#fff',
                        border: '1px solid #2D2B42'
                    }
                }}
            />
            {/* Global Modals */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLoginModal}
                onSwitchToRegister={switchToRegister}
            />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={closeRegisterModal}
                onSwitchToLogin={switchToLogin}
            />
            <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={closeForgotPasswordModal}
                onSwitchToLogin={switchToLogin}
            />
        </div>
    );
}

export default function MainLayout() {
    return (
        <AuthProvider>
            <ModalProvider>
                <MainLayoutContent />
            </ModalProvider>
        </AuthProvider>
    );
}
