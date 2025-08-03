import { Language } from "@/contexts/LanguageContext";

function translate<T>(dict: Record<Language, T>) {
    return (lang: Language): T => dict[lang];
}

export interface Project {
    title: string;
    description: (l: Language) => string;
    technologies: string[];
    githubUrl: string
    color: string;
    isPrivate?: boolean
    period: {
        start: Date;
        end?: Date;
    }
}

const projects: Project[] = [
    {
        title: 'Bot automatizado whatsapp',
        description: translate({
            en: "WhatsApp automation tool designed to capture demand from each user number. It provides a web interface where agents can connect via a QR code. The system intelligently redirects conversations to the least busy agents, ensuring efficient and balanced response handling.",
            es: "Herramienta de automatización para WhatsApp diseñada para capturar la demanda de cada número de usuario. Ofrece una interfaz web donde los agentes pueden conectarse mediante un código QR. El sistema redirige las conversaciones a los agentes menos ocupados, garantizando una atención eficiente y equilibrada."
        }),
        technologies: ['Preact', 'Node.js', 'Baileys', 'Typescript', "Express", "Vite"],
        githubUrl: 'https://github.com/franwerner/wsp-777',
        color: 'from-blue-500 to-purple-600',
        period: {
            start: new Date("07/01/2025")
        },
        isPrivate: true
    },
    {
        title: "E-Commerce",
        description: translate({
            es: "Plataforma de e-commerce desarrollada para automatizar el proceso de ventas. Incluye integración con MercadoPago, gestión de productos y un carrito de compras funcional.",
            en: "E-commerce platform built to automate the sales process. Includes MercadoPago integration, product management, and a functional shopping cart."
        }),
        technologies: ["React", "Vite", "Express", "NodeJS", "Typescript", "MySQL", "Knex", "Zod", "React router", "HeroUI", "Tailwindcss", "Framer motion"],
        color: 'from-red-500 to-orange-600',
        githubUrl: "https://github.com/franwerner/clothing-store",
        period: {
            start: new Date("10/01/2024"),
            end: new Date("01/01/2025")
        }
    },
    {
        title: "Swipeable",
        description: translate({
            es: "Aplicación móvil para matchear ideas entre usuarios de forma intuitiva. Inspirada en la experiencia de deslizamiento, permite descubrir y conectar con personas que comparten intereses similares.",
            en: "Mobile app to match ideas between users in an intuitive way. Inspired by swipe-based interaction, it helps discover and connect with people who share similar interests."
        }),
        color: "from-pink-500 to-rose-600",
        githubUrl: "https://github.com/franwerner/swipeable-app",
        period: {
            start: new Date("07/01/2025"),
            end: new Date("08/01/2025")
        },
        technologies: ["React native", "Expo", "Zustand", "Typescript", "Nativewind"]
    },
    {
        title: "Sistema de stock",
        description: translate({
            es: "Sistema de gestión de stock desarrollado para una heladería, permite controlar y administrar entradas de productos de manera milimétrica, asegurando precisión",
            en: "Stock management system developed for an ice cream shop. It allows precise control and tracking of incoming stock to ensure accuracy"
        }),
        period: {
            start: new Date("02/01/2024"),
            end: new Date("03/01/2024")
        },
        githubUrl: "https://github.com/franwerner/stock",
        color: "from-green-500 to-orange-600",
        technologies: ["NodeJS", "Express", "Boostrap", "React", "React router", "Vite", "Redux", "Javascript"]
    },
    {
        title: "Motor gráfico 2D",
        description: translate({
            en: "Experimental game engine focused on infinite rendering and inspired by games like Terraria. It features tile-based rendering, basic physics, and collision detection.",
            es: "Motor gráfico experimental apuntado al renderizado infinito, inspirado en juegos como Terraria. Incluye renderizado por tiles, físicas básicas y detección de colisiones."
        }),
        color: "from-red-500 to-yellow-600",
        githubUrl: "https://github.com/franwerner/pixelforge-engine",
        period: {
            start: new Date("02/01/2025"),
        },
        technologies: ["Typescript", "Vite"]
    }
]


export default projects