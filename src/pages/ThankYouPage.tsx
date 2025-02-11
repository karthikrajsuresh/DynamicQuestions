import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ThankYouPageProps {
    onRestart: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ onRestart }) => {
    const [countdown, setCountdown] = useState(5); // 5 seconds countdown

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const timer = setTimeout(() => {
            onRestart();
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onRestart]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-extrabold text-gray-200 mb-6">
                        Thank You for Your Responses!
                    </h1>
                    <p className="text-lg text-gray-300 mb-4">
                        You will be redirected back to the start in <strong>{countdown}</strong> seconds...
                    </p>
                    <button
                        onClick={onRestart}
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ... rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Restart Now
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThankYouPage;
