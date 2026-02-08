import React, { useState } from 'react';

const Hero = ({ onSearch }) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(false);

    // Indian vehicle data
    const makes = ['Maruti', 'Tata', 'Hyundai', 'Mahindra', 'Honda', 'Toyota', 'Kia', 'Renault', 'Nissan', 'Ford'];

    const modelsByMake = {
        'Maruti': ['Swift', 'Baleno', 'Wagon R', 'Alto', 'Dzire', 'Vitara Brezza', 'Ertiga'],
        'Tata': ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Tiago', 'Punch', 'Tigor'],
        'Hyundai': ['Creta', 'Venue', 'i20', 'Verna', 'Grand i10', 'Elantra', 'Tucson'],
        'Mahindra': ['XUV700', 'Scorpio', 'Thar', 'XUV300', 'Bolero', 'Marazzo'],
        'Honda': ['City', 'Amaze', 'Jazz', 'WR-V', 'Civic', 'CR-V'],
        'Toyota': ['Fortuner', 'Innova', 'Glanza', 'Urban Cruiser', 'Camry', 'Yaris'],
        'Kia': ['Seltos', 'Sonet', 'Carens', 'Carnival'],
        'Renault': ['Kwid', 'Triber', 'Duster', 'Kiger'],
        'Nissan': ['Magnite', 'Kicks', 'GT-R'],
        'Ford': ['EcoSport', 'Endeavour', 'Figo', 'Aspire']
    };

    const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];
    const availableModels = make ? modelsByMake[make] || [] : [];

    const handleSearch = async () => {
        if (!make || !model || !year) {
            alert('Please select Make, Model, and Year');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/parts?year=${year}&make=${make}&model=${model}`
            );
            const data = await response.json();

            if (data.success) {
                onSearch(data.data, { year, make, model });
            } else {
                alert('Failed to fetch parts');
            }
        } catch (error) {
            console.error('Error fetching parts:', error);
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Automotive Background with Dark Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(135deg, #0D0D0D 0%, #1a1a1a 50%, #0D0D0D 100%),
                                     radial-gradient(circle at 30% 50%, rgba(255, 107, 0, 0.1) 0%, transparent 50%)`
                }}
            >
                {/* Grid pattern for automotive/technical feel */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 107, 0, 0.3) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255, 107, 0, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Black Semi-Transparent Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
                {/* Typography & Messaging */}
                <div className="text-center mb-12">
                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        PRECISION PARTS FOR YOUR
                        <span className="block text-primary-orange mt-2">PERFORMANCE VEHICLE</span>
                    </h1>

                    {/* Sub-heading */}
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Find 100% compatible spare parts by model number and year.
                    </p>
                </div>

                {/* Horizontal Vehicle Selector Bar with Glassmorphism */}
                <div className="max-w-5xl mx-auto glass-effect rounded-lg p-6 border border-white/10">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        {/* Make Dropdown */}
                        <div className="flex-1">
                            <label className="block text-white text-sm font-semibold mb-2 uppercase tracking-widest">
                                Make
                            </label>
                            <select
                                value={make}
                                onChange={(e) => {
                                    setMake(e.target.value);
                                    setModel(''); // Reset model when make changes
                                }}
                                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all backdrop-blur-sm"
                            >
                                <option value="">Select Make</option>
                                {makes.map(m => (
                                    <option key={m} value={m} className="bg-[#1F1F1F]">{m}</option>
                                ))}
                            </select>
                        </div>

                        {/* Model Dropdown */}
                        <div className="flex-1">
                            <label className="block text-white text-sm font-semibold mb-2 uppercase tracking-widest">
                                Model
                            </label>
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                disabled={!make}
                                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                            >
                                <option value="">Select Model</option>
                                {availableModels.map(m => (
                                    <option key={m} value={m} className="bg-[#1F1F1F]">{m}</option>
                                ))}
                            </select>
                        </div>

                        {/* Year Dropdown */}
                        <div className="flex-1">
                            <label className="block text-white text-sm font-semibold mb-2 uppercase tracking-widest">
                                Year
                            </label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all backdrop-blur-sm"
                            >
                                <option value="">Select Year</option>
                                {years.map(y => (
                                    <option key={y} value={y} className="bg-[#1F1F1F]">{y}</option>
                                ))}
                            </select>
                        </div>

                        {/* Search Button with Glow */}
                        <div className="flex-1 md:flex-initial">
                            <button
                                onClick={handleSearch}
                                disabled={loading || !make || !model || !year}
                                className="w-full md:w-auto bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold px-8 py-3 rounded transition-all duration-300 hover:scale-105 glow-orange-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 uppercase tracking-widest"
                                style={{ boxShadow: (!loading && make && model && year) ? '0 0 25px rgba(255, 107, 0, 0.3)' : 'none' }}
                            >
                                {loading ? 'SEARCHING...' : 'SEARCH INVENTORY'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <span className="text-primary-orange text-xl">✓</span>
                        <span>OEM Quality Parts</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-primary-orange text-xl">✓</span>
                        <span>100% Compatibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-primary-orange text-xl">✓</span>
                        <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-primary-orange text-xl">✓</span>
                        <span>Expert Support</span>
                    </div>
                </div>
            </div>

            {/* Bottom Fade Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
};

export default Hero;
