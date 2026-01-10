import { useState, useEffect } from "react";
import "./index.scss";
import useLoading from "@/hooks/useLoading";
import { useAuth } from "../hooks/useAuth";

interface LoadingProps {
    type?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'progress';
    message?: string;
    showProgress?: boolean;
    progress?: number;
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark' | 'auto';
}

const Loading = ({
    type = 'spinner',
    message = '',
    showProgress = false,
    progress = 0,
    size = 'medium',
    theme = 'auto'
}: LoadingProps) => {
    const { isLoading, setLoading }: any = useLoading();
    const [progressValue, setProgressValue] = useState(0);
    const [dots, setDots] = useState('');

    // FORCE dark mode for demonstration
    const effectiveTheme = 'dark';
    const { isGoogleAuth } = useAuth();

    // Animate dots for dot type loading
    useEffect(() => {
        if (type === 'dots' && isLoading) {
            const interval = setInterval(() => {
                setDots(prev => prev.length >= 3 ? '' : prev + '.');
            }, 500);
            return () => clearInterval(interval);
        }
    }, [type, isLoading]);

    useEffect(() => {
        if (!isGoogleAuth && isLoading) {
            setLoading(false);
        }
    }, [])

    // Animate progress bar
    useEffect(() => {
        if (showProgress && isLoading) {
            const interval = setInterval(() => {
                setProgressValue(prev => {
                    if (prev >= progress) return prev;
                    return prev + Math.random() * 10;
                });
            }, 200);
            return () => clearInterval(interval);
        }
    }, [showProgress, isLoading, progress]);

    if (!isLoading) return null;

    return (
        <>
            {!isGoogleAuth ? <div></div> :
                <div className={`loading-overlay loading-${effectiveTheme}`}>
                    <div className={`loading-container loading-${size}`}>
                        <div className="loading-content">
                            {/* Spinner Animation */}
                            {type === 'spinner' && (
                                <div className="loading-spinner">
                                    <div className="spinner-ring"></div>
                                    <div className="spinner-ring"></div>
                                    <div className="spinner-ring"></div>
                                </div>
                            )}

                            {/* Dots Animation */}
                            {type === 'dots' && (
                                <div className="loading-dots">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                            )}

                            {/* Pulse Animation */}
                            {type === 'pulse' && (
                                <div className="loading-pulse">
                                    <div className="pulse-circle"></div>
                                </div>
                            )}

                            {/* Wave Animation */}
                            {type === 'wave' && (
                                <div className="loading-wave">
                                    <div className="wave-bar"></div>
                                    <div className="wave-bar"></div>
                                    <div className="wave-bar"></div>
                                    <div className="wave-bar"></div>
                                    <div className="wave-bar"></div>
                                </div>
                            )}

                            {/* Progress Bar */}
                            {type === 'progress' && (
                                <div className="loading-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${Math.min(progressValue, 100)}%` }}
                                        ></div>
                                    </div>
                                    <div className="progress-text">{Math.round(progressValue)}%</div>
                                </div>
                            )}

                            {/* Message */}
                            <div className="loading-message">
                                {type === 'dots' ? `${message}${dots}` : message}
                            </div>

                            {/* Optional Progress Display */}
                            {showProgress && type !== 'progress' && (
                                <div className="loading-progress-indicator">
                                    <div className="progress-bar-mini">
                                        <div
                                            className="progress-fill-mini"
                                            style={{ width: `${Math.min(progressValue, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Loading;