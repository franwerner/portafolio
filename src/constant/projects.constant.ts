

export interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    category: string;
    color: string;
}

const projects: Project[] = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and real-time updates.',
        image: '/api/placeholder/600/400',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'E-Commerce',
        color: 'from-blue-500 to-purple-600'
    },
    {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern web technologies.',
        image: '/api/placeholder/600/400',
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Productivity',
        color: 'from-green-500 to-emerald-600'
    },
    {
        title: 'Weather Dashboard',
        description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and weather maps. Features location-based services and data visualization.',
        image: '/api/placeholder/600/400',
        technologies: ['React', 'Chart.js', 'OpenWeather API', 'Geolocation API'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Data Visualization',
        color: 'from-sky-500 to-blue-600'
    },
    {
        title: 'Social Media Analytics',
        description: 'A comprehensive analytics platform for social media metrics with real-time data processing, custom dashboards, and automated reporting features.',
        image: '/api/placeholder/600/400',
        technologies: ['Vue.js', 'Python', 'FastAPI', 'Redis', 'Docker'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Analytics',
        color: 'from-purple-500 to-pink-600'
    },
    {
        title: 'Real Estate Platform',
        description: 'Modern real estate platform with property listings, virtual tours, mortgage calculator, and advanced search filters. Integrated with mapping services.',
        image: '/api/placeholder/600/400',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Mapbox', 'AWS S3'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Real Estate',
        color: 'from-orange-500 to-red-600'
    },
    {
        title: 'Learning Management System',
        description: 'Complete LMS with course creation, video streaming, progress tracking, quizzes, and certificates. Supports multiple user roles and payment integration.',
        image: '/api/placeholder/600/400',
        technologies: ['React', 'Express', 'MySQL', 'Video.js', 'Stripe'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Education',
        color: 'from-indigo-500 to-purple-600'
    },
    {
        title: 'Healthcare Management',
        description: 'Digital healthcare platform for appointment scheduling, patient records, telemedicine, and prescription management with HIPAA compliance.',
        image: '/api/placeholder/600/400',
        technologies: ['Angular', 'NestJS', 'PostgreSQL', 'WebRTC', 'Docker'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Healthcare',
        color: 'from-teal-500 to-green-600'
    },
    {
        title: 'Financial Dashboard',
        description: 'Advanced financial dashboard with portfolio tracking, market analysis, cryptocurrency monitoring, and automated trading strategies.',
        image: '/api/placeholder/600/400',
        technologies: ['React', 'D3.js', 'Python', 'TradingView', 'WebSocket'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'FinTech',
        color: 'from-yellow-500 to-orange-600'
    },
    {
        title: 'Restaurant Management',
        description: 'Complete restaurant management system with POS, inventory tracking, staff scheduling, table reservations, and delivery integration.',
        image: '/api/placeholder/600/400',
        technologies: ['Vue.js', 'Laravel', 'MySQL', 'Pusher', 'Stripe'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'Hospitality',
        color: 'from-red-500 to-pink-600'
    },
    {
        title: 'IoT Monitoring Platform',
        description: 'IoT device monitoring platform with real-time sensor data, alerts, device management, and predictive maintenance using machine learning.',
        image: '/api/placeholder/600/400',
        technologies: ['React', 'Node.js', 'InfluxDB', 'MQTT', 'TensorFlow'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        category: 'IoT',
        color: 'from-cyan-500 to-blue-600'
    }
];


export default projects