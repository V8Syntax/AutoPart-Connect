import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            title: "FIND YOUR PERFECT PART",
            subtitle: "Premium Auto Parts for Every Vehicle",
            description: "8,000+ genuine parts from trusted brands",
            cta: "Search Parts"
        },
        {
            title: "QUALITY GUARANTEED",
            subtitle: "100% Authentic Parts",
            description: "Verified compatibility for 500+ vehicle models",
            cta: "Browse Catalog"
        }
    ];

    // Auto-advance hero slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const services = [
        {
            icon: "⚙️",
            title: "Engine Parts",
            description: "Pistons, gaskets, filters, and complete engine components",
            count: "2,500+"
        },
        {
            icon: "💡",
            title: "Lighting",
            description: "Headlights, tail lights, LED assemblies, and bulbs",
            count: "1,200+"
        },
        {
            icon: "🔧",
            title: "Suspension",
            description: "Shock absorbers, struts, springs, and control arms",
            count: "1,800+"
        },
        {
            icon: "🚗",
            title: "Body Parts",
            description: "Bumpers, mirrors, fenders, and exterior components",
            count: "2,500+"
        }
    ];

    const stats = [
        { value: "8,000+", label: "Parts Available" },
        { value: "500+", label: "Vehicles Supported" },
        { value: "100%", label: "Fit Guarantee" }
    ];

    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-secondary to-orange-primary opacity-20"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUYxRjFGIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <div className="mb-4">
                        <span className="inline-block px-4 py-2 bg-orange-primary bg-opacity-20 border border-orange-primary rounded-full text-orange-primary text-sm font-semibold tracking-wider">
                            PREMIUM AUTOMOTIVE PARTS
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                        {heroSlides[currentSlide].title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-text-secondary mb-6">
                        {heroSlides[currentSlide].subtitle}
                    </h2>
                    <p className="text-lg text-text-secondary mb-8">
                        {heroSlides[currentSlide].description}
                    </p>
                    <Link to="/catalog" className="btn-primary inline-block text-lg">
                        {heroSlides[currentSlide].cta} →
                    </Link>
                </div>

                {/* Slider Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-orange-primary w-8'
                                    : 'bg-text-secondary hover:bg-orange-primary'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Performance Metrics */}
            <section className="bg-dark-secondary border-y border-border-dark py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-orange-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-text-secondary text-lg">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Grid */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-text-secondary text-lg">
                            Find the perfect parts for your vehicle across our extensive catalog
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <Link
                                key={index}
                                to="/catalog"
                                className="card-premium group cursor-pointer"
                            >
                                <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-text-secondary mb-4 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-orange-primary font-semibold">
                                        {service.count} Parts
                                    </span>
                                    <span className="text-orange-primary group-hover:translate-x-2 transition-transform">
                                        →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Brands */}
            <section className="bg-dark-secondary py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Trusted Brands
                        </h2>
                        <p className="text-text-secondary text-lg">
                            We stock parts from the world's leading automotive manufacturers
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {['Brembo', 'Denso', 'Monroe', 'Philips', 'Hella', 'OEM'].map((brand, index) => (
                            <div
                                key={index}
                                className="bg-dark-bg border border-border-dark rounded-lg p-6 flex items-center justify-center hover:border-orange-primary transition-colors"
                            >
                                <span className="text-xl font-bold text-text-secondary hover:text-orange-primary transition-colors">
                                    {brand}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Find Your Parts?
                    </h2>
                    <p className="text-text-secondary text-lg mb-8">
                        Browse our extensive catalog or use our vehicle selector to find compatible parts
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/catalog" className="btn-primary text-lg">
                            Browse Catalog
                        </Link>
                        <Link to="/catalog" className="btn-secondary text-lg">
                            Find by Vehicle
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
