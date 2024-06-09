import NavBar from '@/components/NavBar';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='w-full'>
            {/* Add your header component here */}
            <header className='mb-14'>
                <NavBar />
            </header>

            {/* Add your main content component here */}
            <main className='flex justify-center '>
                {children}
            </main>

            {/* Add your footer component here */}
            <footer>
                {/* Footer content */}
            </footer>
        </div>
    );
};

export default Layout;