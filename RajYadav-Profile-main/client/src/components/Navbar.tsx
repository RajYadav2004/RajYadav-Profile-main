import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });



    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const navLinks = [
        { name: 'Home', path: '#home' },
        { name: 'About', path: '#about' },
        { name: 'Skills', path: '#skills' },
        { name: 'Education', path: '#education' },
        { name: 'Work', path: '#work' },
        { name: 'Experience', path: '#experience' },
        { name: 'Contact', path: '#contact' },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-white/20 dark:border-white/10 shadow-sm">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-primary dark:text-slate-100">
                    <div className="w-10 h-10 bg-accent rounded-lg shadow-lg shadow-accent/20 overflow-hidden">
                        <img src="/user_avatar.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span>Raj<span className="text-accent">.</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={cn(
                                "px-4 py-2 text-sm font-bold transition-all rounded-full hover:bg-background-light dark:hover:bg-slate-800",
                                "text-primary/80 dark:text-slate-300 hover:text-primary dark:hover:text-white"
                            )}
                        >
                            {link.name}
                        </a>
                    ))}

                    <div className="flex items-center ml-4 gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full hover:bg-background-light dark:hover:bg-slate-800 transition-colors focus:outline-none"
                            aria-label="Toggle Theme"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
                        </button>

                        {/* Resume Button */}
                        <a
                            href="/RajYadav.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary dark:bg-accent text-white px-7 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 dark:shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            Resume
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-primary dark:text-slate-100"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-2xl animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-6 space-y-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="text-lg font-bold p-3 rounded-xl hover:bg-background-light dark:hover:bg-slate-800 active:bg-background-light dark:active:bg-slate-800 text-primary dark:text-slate-100"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="flex items-center justify-between pt-4 border-t dark:border-slate-800 gap-4">
                            <button
                                onClick={() => { toggleTheme(); setIsOpen(false); }}
                                className="flex-1 flex items-center justify-center gap-2 bg-background-light dark:bg-slate-800 p-4 rounded-xl font-bold text-primary dark:text-slate-100"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                            </button>
                            <a href="/RajYadav.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary dark:bg-accent text-white text-center p-4 rounded-xl font-bold shadow-lg shadow-primary/10 dark:shadow-accent/10">Resume</a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
