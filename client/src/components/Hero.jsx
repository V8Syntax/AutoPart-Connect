import React, { useState, useEffect } from 'react';

const Hero = ({ onSearch }) => {
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);

    // Generate years (current year to 30 years back)
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearList = [];
        for (let i = currentYear; i >= currentYear - 30; i--) {
            yearList.push(i);
        }
        setYears(yearList);
    }, []);

    // Fetch makes when year changes
    useEffect(() => {
        if (year) {
            // Simulated makes data
            setMakes(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes']);
        } else {
            setMakes([]);
            setMake('');
        }
    }, [year]);

    // Fetch models when make changes
    useEffect(() => {
        if (make) {
            // Simulated models data
            setModels(['Camry', 'Corolla', 'Civic', 'Accord', 'F-150', 'Silverado']);
        } else {
            setModels([]);
            setModel('');
        }
    }, [make]);

    const handleSearch = async () => {
        if (year && make && model) {
            setLoading(true);
            try {
                await onSearch({ year, make, model });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <section className="relative bg-gray-50 py-12 border-b border-gray-200">
            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <span className="hover:text-[#FF6B00] cursor-pointer">Home</span>
                    <span>›</span>
                    <span className="hover:text-[#FF6B00] cursor-pointer">Performance Parts</span>
                    <span>›</span>
                    <span className="hover:text-[#FF6B00] cursor-pointer">Turbochargers</span>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">GTX3582R Gen II</span>
                </div>

                {/* Vehicle Selector Bar */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Find Parts for Your Vehicle</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Year Dropdown */}
                        <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900"
                        >
                            <option value="">Select Year</option>
                            {years.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>

                        {/* Make Dropdown */}
                        <select
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                            disabled={!year}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Make</option>
                            {makes.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>

                        {/* Model Dropdown */}
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            disabled={!make}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Select Model</option>
                            {models.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            disabled={!year || !make || !model}
                            className="bg-[#FF6B00] hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed uppercase tracking-wide"
                        >
                            Search Parts
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
