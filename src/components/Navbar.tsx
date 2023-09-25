import React from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const themeClass = darkMode ? 'bg-gray-900 text-white' : 'bg-blue-500 text-white';

  return (
    <nav className={`p-4 fixed top-0 left-0 right-0 z-10 ${themeClass}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Super Quiz</div>
        <button
          onClick={toggleDarkMode}
          className="text-xl focus:outline-none"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
