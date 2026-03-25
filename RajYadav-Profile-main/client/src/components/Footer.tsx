import { Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight, GraduationCap } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary pt-20 pb-10 text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <div className="p-1.5 bg-accent rounded-lg">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            Raj Yadav Portfolio
                        </h3>
                        <p className="text-white/60 font-medium leading-relaxed">
                            Thank you for visiting my professional portfolio. Let's connect and create something amazing together.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-lg font-black uppercase tracking-widest text-accent">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Skills', 'Work', 'Experience'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-white/70 hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                                        <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-lg font-black uppercase tracking-widest text-accent">Contact Info</h4>
                        <ul className="space-y-4 text-white/70">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-accent" />
                                +91 93244 45032
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-accent" />
                                Rajy415129@Gmail.Com
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-accent" />
                                Thane, India - 411033
                            </li>
                        </ul>
                        <div className="flex gap-4 pt-4">
                            {[Linkedin, Github, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-accent transition-all">
                                    <Icon className="w-5 h-5 text-white" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="pt-10 border-t border-white/10 text-center text-white/40 font-bold text-sm">
                    <p>Designed with ❤️ by <span className="text-accent">Raj Yadav</span> | &copy; {new Date().getFullYear()} All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
