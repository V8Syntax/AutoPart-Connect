import React, { useState } from 'react';

const VehicleSelector = ({ onSearch }) => {
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [loading, setLoading] = useState(false);

    // Indian vehicle data
    const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];

    const makes = [
        'Maruti',
        'Tata',
        'Hyundai',
        'Mahindra',
        'Honda',
        'Toyota',
        'Kia',
        'Renault',
        'Nissan',
        'Ford'
    ];

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

    const availableModels = make ? modelsByMake[make] || [] : [];

    const handleSearch = async () => {
        if (!year || !make || !model) {
            alert('Please select Year, Make, and Model');
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

    const handleClear = () => {
        setYear('');
        setMake('');
        setModel('');
        onSearch(null, null); // Clear filters
    };

    return (
        <div className="bg-card-bg rounded-lg p-6 border border-border-dark">
            <h2 className="text-2xl font-bold text-white mb-2">Find Parts for Your Vehicle</h2>
            <p className="text-text-secondary mb-6">Select your vehicle to see compatible parts</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label htmlFor="year" className="block text-white text-sm font-semibold mb-2">Year</label>
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-background border border-border-dark text-white px-4 py-3 rounded focus:outline-none focus:border-primary-orange transition-colors"
                    >
                        <option value="">Select Year</option>
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="make" className="block text-white text-sm font-semibold mb-2">Make</label>
                    <select
                        id="make"
                        value={make}
                        onChange={(e) => {
                            setMake(e.target.value);
                            setModel(''); // Reset model when make changes
                        }}
                        className="w-full bg-background border border-border-dark text-white px-4 py-3 rounded focus:outline-none focus:border-primary-orange transition-colors"
                    >
                        <option value="">Select Make</option>
                        {makes.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="model" className="block text-white text-sm font-semibold mb-2">Model</label>
                    <select
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full bg-background border border-border-dark text-white px-4 py-3 rounded focus:outline-none focus:border-primary-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!make}
                    >
                        <option value="">Select Model</option>
                        {availableModels.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleSearch}
                    className="flex-1 bg-primary-orange hover:bg-orange-hover text-white font-bold py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || !year || !make || !model}
                >
                    {loading ? 'Searching...' : '🔍 Find Parts'}
                </button>
                <button
                    onClick={handleClear}
                    className="bg-card-bg hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded border border-border-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!year && !make && !model}
                >
                    Clear
                </button>
            </div>

            {year && make && model && (
                <div className="mt-4 bg-primary-orange/20 border border-primary-orange rounded p-3 flex items-center gap-2">
                    <span className="text-2xl">🚗</span>
                    <span className="text-white font-semibold">
                        {year} {make} {model}
                    </span>
                </div>
            )}
        </div>
    );
};

export default VehicleSelector;
