import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api'; // Ensure this path is correct based on your aliases
import { ArrowUpRight } from 'lucide-react';

interface Project {
    _id: string;
    title: string;
    shortDescription: string;
    category: string;
    // images: string[]; // Assuming images array exists
    // links: { demo: string; github: string };
    links?: {
        demo?: string;
        repo?: string;
    };
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">My <span className="text-primary">Projects</span></h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    Here are some of the projects I've worked on. Each one was a unique challenge that helped me grow as a developer.
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                                {/* Fallback pattern if no image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 text-6xl font-black text-gray-500">
                                    {project.title.charAt(0)}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary-hover uppercase tracking-wider">
                                        {project.category}
                                    </span>
                                    {project.links?.demo && (
                                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{project.shortDescription}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projects;
