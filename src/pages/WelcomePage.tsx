import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface WelcomePageProps {
    onComplete: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onComplete }) => {
    const [countdown, setCountdown] = useState(5); // 5 seconds countdown

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const timer = setTimeout(() => {
            onComplete();
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onComplete]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-extrabold text-white mb-6 animate-fade-in">
                        Welcome to Dynamic Questions
                    </h1>
                    <p className="text-lg text-gray-200 mb-4">
                        You will be redirected to the questions in <strong>{countdown}</strong> seconds...
                    </p>
                    <button
                        onClick={onComplete}
                        className="mt-4 px-6 py-2 greenbtn hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Start Now
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default WelcomePage;
