import React, { useState, useEffect } from 'react';
import PartCard from './PartCard';
import Hero from './Hero';

/**
 * PartList Component - Pro Motors Edition
 * Features Hero section with integrated vehicle selector
 * Premium parts grid with compatibility indicators
 */
const PartList = () => {
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // API base URL - can be configured via environment variable
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    /**
     * Fetch all parts (no filters)
     */
    const fetchAllParts = async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `${API_BASE_URL}/api/parts`;
            console.log('Fetching all parts from:', url);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setParts(data.data);
            } else {
                throw new Error(data.error || 'Failed to fetch parts');
            }
        } catch (err) {
            console.error('Error fetching parts:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all parts on component mount
    useEffect(() => {
        fetchAllParts();
    }, []);

    /**
     * Handle vehicle search from Hero/VehicleSelector
     */
    const handleVehicleSearch = (filteredParts, vehicleInfo) => {
        if (filteredParts === null) {
            // Clear filters - fetch all parts
            setSelectedVehicle(null);
            fetchAllParts();
        } else {
            // Set filtered parts
            setParts(filteredParts);
            setSelectedVehicle(vehicleInfo);
            setLoading(false);
            setError(null);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Integrated Vehicle Selector */}
            <Hero onSearch={handleVehicleSearch} />

            {/* Parts Grid Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {selectedVehicle ? 'Compatible Parts' : 'All Parts'}
                            </h2>
                            <p className="text-gray-600 text-sm">
                                {selectedVehicle
                                    ? `Showing parts for ${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
                                    : 'Browse our complete catalog of premium automotive parts'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-gray-900">
                                {parts.length}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {parts.length === 1 ? 'Part' : 'Parts'}
                            </p>
                        </div>
                    </div>

                    {/* Filter indicator */}
                    {selectedVehicle && (
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-orange-100 border border-[#FF6B00] rounded text-[#FF6B00] text-sm font-semibold">
                                ✓ Filtered by Vehicle
                            </span>
                            <button
                                onClick={() => handleVehicleSearch(null, null)}
                                className="text-gray-600 hover:text-[#FF6B00] transition-colors text-sm underline"
                            >
                                Clear Filter
                            </button>
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#FF6B00] rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">Loading parts...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600 text-lg mb-4">⚠️ {error}</p>
                        <button
                            onClick={fetchAllParts}
                            className="bg-[#FF6B00] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Parts Grid */}
                {!loading && !error && (
                    <>
                        {parts.length === 0 ? (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                                <p className="text-2xl text-gray-600 mb-2">No parts found</p>
                                <p className="text-gray-500 mb-6">
                                    Try adjusting your vehicle selection or browse all parts
                                </p>
                                {selectedVehicle && (
                                    <button
                                        onClick={() => handleVehicleSearch(null, null)}
                                        className="bg-[#FF6B00] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded transition-colors"
                                    >
                                        View All Parts
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {parts.map((part) => (
                                    <PartCard
                                        key={part.id}
                                        part={part}
                                        selectedVehicle={selectedVehicle}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default PartList;

