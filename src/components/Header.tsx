import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... text-white p-4 text-center shadow-lg">
            <h1 className="text-2xl font-bold">Dynamic Questions</h1> 
        </header>
    );
};

export default Header;