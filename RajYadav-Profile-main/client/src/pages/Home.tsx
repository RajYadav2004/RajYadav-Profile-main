import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Github, Mail, ArrowRight, User, GraduationCap, Laptop, ExternalLink, Code, Briefcase, Headset, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/Button';
import api from '../services/api';
import { cn } from '../utils/cn';


interface Project {
    _id: string;
    title: string;
    shortDescription: string;
    category: string;
    image?: string;
    links?: {
        demo?: string;
        repo?: string;
    };
    techStack?: string[];
}

const Home = () => {
    const [projects, setProjects] = useState<Project[]>([
        {
            _id: 'static-1',
            title: "Maa Sita Medical Foundation",
            shortDescription: "A non-profit organization dedicated to providing essential medical aid and healthcare support to underprivileged communities in Bihar.",
            category: "Healthcare",
            links: { demo: "https://maasitamedicalfoundation.org/" },
            techStack: ["React", "Tailwind", "Node.js"]
        },
        {
            _id: 'static-2',
            title: "Biogenex Diagnostic",
            shortDescription: "A professional diagnostic center offering a wide range of health tests and cardiac care with a focus on accuracy and reliability.",
            category: "HealthTech",
            links: { demo: "https://lab.maasitamedicalfoundation.org/" },
            techStack: ["MERN Stack", "Tailwind CSS"]
        },
        {
            _id: 'static-3',
            title: "BioGenex Management System",
            shortDescription: "A specialized Diagnostic Laboratory Management System designed to streamline clinical laboratory operations for both staff and patients.",
            category: "Management System",
            links: { demo: "https://phelebo.maasitamedicalfoundation.org/" },
            techStack: ["React", "Express", "MongoDB"]
        },
        {
            _id: 'static-4',
            title: "Raj's Portfolio",
            shortDescription: "A high-performance personal portfolio website showcasing technical expertise, projects, and professional background.",
            category: "Portfolio",
            links: { demo: "https://test.maasitamedicalfoundation.org/" },
            techStack: ["Vite", "React", "Framer Motion"]
        },
        {
            _id: 'static-5',
            title: "GYMX Fitness",
            shortDescription: "A modern fitness platform that provides elite membership plans, expert training programs, and state-of-the-art facilities.",
            category: "Fitness",
            links: { demo: "https://gym-membership-one.vercel.app/" },
            techStack: ["React", "Node.js", "Full Stack"]
        }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                if (data && data.length > 0) {
                    setProjects(prev => [...prev, ...data]);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);
    return (
        <div id="home" className="min-h-screen pt-20 flex flex-col justify-center overflow-hidden">
            <section className="container mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 relative">

                {/* Left Background Glow */}
                <div className="absolute -z-10 top-1/4 -left-20 w-96 h-96 bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-[120px] filter" />

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 space-y-7 text-center md:text-left z-10"
                >
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-primary dark:text-slate-100">
                            Hi There,
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-primary dark:text-slate-50">
                            I'm Raj. <span className="text-accent underline decoration-accent/30 dark:decoration-accent/10 decoration-8 underline-offset-8">Yadav</span>
                        </h1>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-primary/90 dark:text-slate-300 flex flex-wrap justify-center md:justify-start gap-x-2">
                        I Am Into <span className="text-accent">Frontend Development</span>
                    </h3>

                    <p className="text-lg text-primary/70 dark:text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
                        I build production-grade web applications with focused attention on design, performance, and scalability.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-4">
                        <a href="#about">
                            <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-primary text-white shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2 group">
                                About Me
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>
                    </div>

                    {/* Socials */}
                    <div className="pt-10 flex items-center justify-center md:justify-start gap-5">
                        {[
                            { icon: Github, href: "#", label: "Github" },
                            { icon: Linkedin, href: "#", label: "Linkedin" },
                            { icon: Twitter, href: "#", label: "Twitter" },
                            { icon: Instagram, href: "#", label: "Instagram" },
                            { icon: Mail, href: "mailto:Rajy415129@Gmail.Com", label: "Email" }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-md text-primary dark:text-slate-300 hover:bg-accent hover:text-white dark:hover:bg-accent hover:-translate-y-1.5 transition-all duration-300 group"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Hero Image / Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "backOut" }}
                    className="flex-1 relative z-10"
                >
                    <div className="relative w-72 h-72 md:w-[500px] md:h-[500px] mx-auto group">
                        {/* Animated Multi-layer Borders */}
                        <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse" />
                        <div className="absolute -inset-4 rounded-full border-2 border-dashed border-accent/10 animate-[spin_20s_linear_infinite]" />

                        {/* Main Avatar Container */}
                        <div className="absolute inset-2 md:inset-4 rounded-full bg-accent/90 p-1 md:p-2 shadow-2xl shadow-accent/40 overflow-hidden ring-8 ring-white/50 dark:ring-slate-800/50">
                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 overflow-hidden relative group-hover:scale-105 transition-transform duration-700">
                                <img
                                    src="/user_avatar.png"
                                    alt="Raj Yadav Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Floating Tech Badges */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center animate-bounce duration-[3s]">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-3/4" alt="React" />
                        </div>
                        <div className="absolute -bottom-2 -left-2 w-14 h-14 md:w-20 md:h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center animate-bounce duration-[4s] delay-1000">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-3/4" alt="JS" />
                        </div>
                    </div>
                </motion.div>

            </section>

            {/* About Me Section */}
            <section id="about" className="py-20 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-16 px-4">
                        <div className="flex items-center gap-4 text-4xl md:text-5xl font-black text-primary dark:text-slate-100">
                            <span className="p-3 bg-primary/5 dark:bg-white/5 rounded-2xl shadow-inner">
                                <User className="w-10 h-10 text-primary dark:text-slate-100" />
                            </span>
                            <h2>About <span className="text-accent">Me</span></h2>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Square Avatar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 max-w-md"
                        >
                            <div className="relative group p-4">
                                <div className="absolute inset-0 bg-accent rounded-[40px] rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl" />
                                <div className="relative bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden aspect-square shadow-2xl ring-4 ring-white dark:ring-slate-700">
                                    <img
                                        src="/user_avatar.png"
                                        alt="Raj Yadav Portrait"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Bio Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-[1.5] space-y-8"
                        >
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold text-primary dark:text-slate-100">I'm Raj. Yadav</h3>
                                <p className="text-accent font-extrabold text-xl tracking-wide uppercase">Full Stack Developer</p>
                            </div>

                            <p className="text-lg text-primary/80 dark:text-slate-300 leading-relaxed font-medium">
                                I Am A Full-Stack Developer Based In Thane, India. I Am An Information Technology Undergraduate From SPPU. I Am Very Passionate About Improving My Coding Skills & Developing Applications & Websites. I Build WebApps And Websites Using MERN Stack. Working For Myself To Improve My Skills. Love To Build Full-Stack Clones.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-lg">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-primary dark:text-slate-100 min-w-[80px]">Email :</span>
                                    <a href="mailto:Rajy415129@Gmail.Com" className="text-primary/70 dark:text-slate-400 hover:text-accent font-semibold transition-colors">Rajy415129@Gmail.Com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-primary dark:text-slate-100 min-w-[80px]">Place :</span>
                                    <span className="text-primary/70 dark:text-slate-400 font-semibold">Thane, India - 411033</span>
                                </div>
                            </div>

                            <div className="pt-8">
                                <a href="/RajYadav.pdf" target="_blank" rel="noopener noreferrer">
                                    <Button className="rounded-2xl px-12 py-7 text-lg bg-primary dark:bg-accent text-white shadow-xl shadow-primary/20 dark:shadow-accent/20 hover:shadow-accent/40 hover:bg-accent hover:-translate-y-1 transition-all group flex items-center gap-3">
                                        Resume
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Education & Skills Section */}
            <section id="skills" className="py-20 bg-background-light dark:bg-slate-900/40">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex flex-col items-center mb-16">
                        <div className="flex items-center gap-4 text-4xl md:text-5xl font-black text-primary dark:text-slate-100">
                            <span className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                                <GraduationCap className="w-10 h-10 text-primary dark:text-slate-100" />
                            </span>
                            <h2>Education & <span className="text-accent">Skills</span></h2>
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-12 text-left">
                        {/* Education Side */}
                        <div className="flex-1 space-y-8 bg-white/50 dark:bg-slate-800/40 p-8 rounded-[40px] shadow-xl border border-white dark:border-white/5">
                            <h3 className="text-2xl font-bold text-primary dark:text-slate-100 mb-6">Education</h3>
                            {[
                                {
                                    year: "2020-2024",
                                    title: "Bachelor of Engineering in Information Technology",
                                    school: "Savitribai Phule Pune University (SPPU)",
                                    status: "Completed"
                                },
                                {
                                    year: "2018-2020",
                                    title: "Higher Secondary Certificate (HSC)",
                                    school: "Maharashtra State Board",
                                    status: "Completed"
                                }
                            ].map((edu, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-3xl bg-white dark:bg-slate-800 shadow-md border-l-8 border-accent group hover:scale-[1.02] transition-transform"
                                >
                                    <span className="text-accent font-black text-sm">{edu.year}</span>
                                    <h4 className="text-xl font-extrabold text-primary dark:text-slate-100 mt-1">{edu.title}</h4>
                                    <p className="text-primary/70 dark:text-slate-400 font-bold">{edu.school}</p>
                                    <span className="inline-block mt-3 px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-black rounded-full uppercase tracking-tighter">
                                        {edu.status}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Skills Side */}
                        <div className="flex-[1.5] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 content-start">
                            {[
                                { name: "ReactJS", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" },
                                { name: "NodeJS", icon: "https://img.icons8.com/color/48/000000/nodejs.png" },
                                { name: "ExpressJS", icon: "https://img.icons8.com/fluency/48/000000/node-js.png" },
                                { name: "MongoDB", icon: "https://img.icons8.com/color/48/000000/mongodb.png" },
                                { name: "Redux", icon: "https://img.icons8.com/color/48/000000/redux.png" },
                                { name: "Tailwind", icon: "https://img.icons8.com/color/48/000000/tailwindcss.png" },
                                { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
                                { name: "TypeScript", icon: "https://img.icons8.com/color/48/000000/typescript.png" },
                                { name: "Git", icon: "https://img.icons8.com/color/48/000000/git.png" },
                                { name: "HTML5", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
                                { name: "CSS3", icon: "https://img.icons8.com/color/48/000000/css3.png" },
                                { name: "Firebase", icon: "https://img.icons8.com/color/48/000000/firebase.png" }
                            ].map((skill, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl shadow-lg border border-white dark:border-white/5 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-2 transition-all flex flex-col items-center gap-4 group"
                                >
                                    <div className="w-14 h-14 p-2 bg-background-light dark:bg-slate-900 rounded-2xl group-hover:bg-accent/10 transition-colors">
                                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                                    </div>
                                    <span className="font-extrabold text-primary dark:text-slate-100 text-sm tracking-tight">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects (Work) Section */}
            <section id="work" className="py-20 bg-white/20 dark:bg-slate-900/20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-16">
                        <div className="flex items-center gap-4 text-4xl md:text-5xl font-black text-primary dark:text-slate-100">
                            <span className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                                <Laptop className="w-10 h-10 text-primary dark:text-slate-100" />
                            </span>
                            <h2>Projects <span className="text-accent">Made</span></h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {loading ? (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="h-[450px] bg-white/50 dark:bg-slate-800/50 animate-pulse rounded-[40px]" />
                            ))
                        ) : (
                            projects.map((project, i) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group bg-white dark:bg-slate-800 rounded-[40px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-50 dark:border-slate-700 flex flex-col"
                                >
                                    {/* Project Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-background-light dark:bg-slate-900">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-20 text-8xl font-black text-primary dark:text-slate-100 select-none">
                                                {project.title.charAt(0)}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 dark:group-hover:bg-white/5 transition-colors duration-500" />
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.techStack?.slice(0, 3).map((tech) => (
                                                <span key={tech} className="px-3 py-1 bg-background-light dark:bg-slate-900 text-primary dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/5 dark:border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-black text-primary dark:text-slate-100 mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                                        <p className="text-primary/60 dark:text-slate-400 font-medium text-sm line-clamp-3 mb-6">
                                            {project.shortDescription}
                                        </p>

                                        <div className="mt-auto flex items-center gap-4">
                                            {project.links?.demo && (
                                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                    <Button className="w-full rounded-2xl bg-primary text-white py-4 font-black text-xs uppercase tracking-widest hover:bg-accent ring-8 ring-transparent hover:ring-accent/10 transition-all flex items-center justify-center gap-2">
                                                        <ExternalLink className="w-4 h-4" />
                                                        View
                                                    </Button>
                                                </a>
                                            )}
                                            {project.links?.repo && (
                                                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                    <Button variant="outline" className="w-full rounded-2xl border-2 border-primary/10 dark:border-white/10 py-4 font-black text-xs uppercase tracking-widest text-primary dark:text-slate-300 hover:bg-primary dark:hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2">
                                                        <Code className="w-4 h-4" />
                                                        Code
                                                    </Button>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 bg-background-light dark:bg-slate-900/40">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-16">
                        <div className="flex items-center gap-4 text-4xl md:text-5xl font-black text-primary dark:text-slate-100">
                            <span className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                                <Briefcase className="w-10 h-10 text-primary dark:text-slate-100" />
                            </span>
                            <h2>Experience</h2>
                        </div>
                    </div>

                    <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
                        {/* Vertical Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-primary/10 -translate-x-1/2 rounded-full" />

                        {[
                            {
                                duration: "2024 - Present",
                                role: "Full Stack Developer",
                                company: "Self Employed",
                                description: "Developing various full-stack clones and freelance projects using MERN stack."
                            },
                            {
                                duration: "2023 - 2024",
                                role: "Frontend Intern",
                                company: "Tech Solutions",
                                description: "Focused on building responsive UI components and integrating APIs."
                            }
                        ].map((exp, i) => (
                            <div key={i} className={cn(
                                "relative mb-12 flex flex-col md:flex-row items-center",
                                i % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}>
                                {/* Marker */}
                                <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-white border-4 border-accent rounded-full -translate-x-1/2 z-10 shadow-lg shadow-accent/40" />

                                <div className="w-full md:w-1/2 md:px-12">
                                    <motion.div
                                        initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-xl border border-white dark:border-slate-700 hover:border-accent/30 transition-all group"
                                    >
                                        <span className="text-accent font-black text-sm block mb-2">{exp.duration}</span>
                                        <h4 className="text-2xl font-black text-primary dark:text-slate-100 mb-1">{exp.role}</h4>
                                        <p className="text-primary/70 dark:text-slate-300 font-bold text-lg mb-4">{exp.company}</p>
                                        <p className="text-primary/60 dark:text-slate-400 font-medium leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-16">
                        <div className="flex items-center gap-4 text-4xl md:text-5xl font-black text-primary dark:text-slate-100">
                            <span className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
                                <Headset className="w-10 h-10 text-primary dark:text-slate-100" />
                            </span>
                            <h2>Get In <span className="text-accent">Touch</span></h2>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-[50px] shadow-2xl overflow-hidden max-w-6xl mx-auto flex flex-col md:flex-row border border-white dark:border-slate-700">
                        {/* Illustration / Info Side */}
                        <div className="md:w-5/12 bg-primary dark:bg-slate-900 p-12 text-white flex flex-col justify-between">
                            <div className="space-y-8">
                                <h3 className="text-3xl font-black">Let's build something together!</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="p-4 bg-white/10 dark:bg-white/5 rounded-2xl group-hover:bg-accent transition-colors">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs font-black uppercase tracking-widest">Call Me</p>
                                            <p className="text-lg font-bold">+91 93244 45032</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="p-4 bg-white/10 dark:bg-white/5 rounded-2xl group-hover:bg-accent transition-colors">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs font-black uppercase tracking-widest">Email Me</p>
                                            <p className="text-lg font-bold">Rajy415129@Gmail.Com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="p-4 bg-white/10 dark:bg-white/5 rounded-2xl group-hover:bg-accent transition-colors">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-xs font-black uppercase tracking-widest">Location</p>
                                            <p className="text-lg font-bold">Thane, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-12">
                                {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-accent transition-all">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="md:w-7/12 p-8 md:p-16">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input type="text" placeholder="Your Name" className="w-full bg-background-light dark:bg-slate-900 rounded-2xl px-6 py-4 font-bold text-primary dark:text-slate-100 placeholder:text-primary/30 dark:placeholder:text-slate-500 border-2 border-transparent focus:border-accent outline-none transition-all" />
                                    <input type="email" placeholder="Your Email" className="w-full bg-background-light dark:bg-slate-900 rounded-2xl px-6 py-4 font-bold text-primary dark:text-slate-100 placeholder:text-primary/30 dark:placeholder:text-slate-500 border-2 border-transparent focus:border-accent outline-none transition-all" />
                                </div>
                                <input type="text" placeholder="Subject" className="w-full bg-background-light dark:bg-slate-900 rounded-2xl px-6 py-4 font-bold text-primary dark:text-slate-100 placeholder:text-primary/30 dark:placeholder:text-slate-500 border-2 border-transparent focus:border-accent outline-none transition-all" />
                                <textarea placeholder="How can I help you?" rows={5} className="w-full bg-background-light dark:bg-slate-900 rounded-3xl px-6 py-6 font-bold text-primary dark:text-slate-100 placeholder:text-primary/30 dark:placeholder:text-slate-500 border-2 border-transparent focus:border-accent outline-none transition-all resize-none"></textarea>
                                <Button className="w-full md:w-auto rounded-2xl px-12 py-5 bg-primary dark:bg-accent text-white font-black uppercase tracking-widest hover:bg-accent shadow-xl shadow-primary/20 dark:shadow-accent/40 flex items-center justify-center gap-3 group">
                                    Send Message
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
