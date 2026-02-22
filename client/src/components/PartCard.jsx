import React from 'react';

/**
 * PartCard Component - Clean White Design
 * Simple product card with white background and orange accents
 * 
 * @param {Object} part - The part object containing brand, name, price, etc.
 * @param {Object} selectedVehicle - Currently selected vehicle for compatibility badge
 */
const PartCard = ({ part, selectedVehicle }) => {
    // Format price to 2 decimal places
    const formattedPrice = parseFloat(part.price).toFixed(2);

    // Check if part is compatible with selected vehicle
    const isCompatible = selectedVehicle &&
        part.year === selectedVehicle.year &&
        part.make?.toLowerCase() === selectedVehicle.make?.toLowerCase() &&
        part.model?.toLowerCase() === selectedVehicle.model?.toLowerCase();

    return (
        <div
            className="bg-[#121212] border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-red-900/20 transition-all flex flex-col h-full cursor-pointer"
            onClick={() => {
                // Navigate to part detail page
            }}
        >
            {/* Compatibility Badge */}
            {isCompatible && (
                <div className="bg-green-600 px-3 py-2 flex items-center gap-2">
                    <span className="text-white text-sm font-bold">✓</span>
                    <span className="text-white text-xs font-semibold">
                        Fits your {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                    </span>
                </div>
            )}

            {/* Part Image */}
            <div className="relative bg-[#1a1a1a] flex items-center justify-center p-4 border-b border-gray-800">
                <img
                    src={part.image_url?.startsWith('http') ? part.image_url : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${part.image_url}`}
                    alt={part.name}
                    className="object-contain h-48 w-full"
                    onError={(e) => {
                        e.target.src = 'https://www.pngplay.com/wp-content/uploads/13/Brembo-Brake-Transparent-Images.png';
                    }}
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Brand */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[#E60000] text-xs font-bold tracking-wide uppercase">
                        {part.brand}
                    </span>
                    {part.verified && (
                        <span className="bg-green-900/20 text-green-400 px-2 py-1 rounded text-xs font-bold border border-green-800/30">
                            ✓ VERIFIED
                        </span>
                    )}
                </div>

                {/* Part Name */}
                <h3 className="text-base font-bold text-white leading-tight mb-3 line-clamp-2">
                    {part.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400 text-sm">
                        ★★★★★
                    </div>
                    <span className="text-xs text-gray-400">(128 Reviews)</span>
                </div>

                {/* Stock Status */}
                <div className="space-y-1.5 text-sm mb-3">
                    {part.stock_quantity !== undefined && (
                        <div className="flex items-center gap-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${part.stock_quantity > 0 ? 'bg-green-900/20 text-green-400 border border-green-800/30' : 'bg-red-900/20 text-red-400 border border-red-800/30'}`}>
                                {part.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="mt-auto pt-3 border-t border-gray-800">
                    <p className="text-2xl font-extrabold text-white">
                        ₹{formattedPrice}
                    </p>
                </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto">
                <button
                    className="w-full bg-[#E60000] hover:bg-red-700 text-white font-bold py-3 uppercase tracking-wider transition-all text-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                    }}
                >
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

export default PartCard;
