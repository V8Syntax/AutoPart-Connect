import React from 'react';
import { getPartImage } from '../utils/categoryImages';

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
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all flex flex-col h-full cursor-pointer"
            onClick={() => {
                // Navigate to part detail page
            }}
        >
            {/* Compatibility Badge */}
            {isCompatible && (
                <div className="bg-[#FF6B00] px-3 py-2 flex items-center gap-2">
                    <span className="text-white text-sm font-bold">✓</span>
                    <span className="text-white text-xs font-semibold">
                        Fits your {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                    </span>
                </div>
            )}

            {/* Part Image */}
            <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100">
                <img
                    src={getPartImage(part.category, part.image_url)}
                    alt={part.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        e.target.src = 'https://www.pngplay.com/wp-content/uploads/13/Brembo-Brake-Transparent-Images.png';
                    }}
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Brand */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[#FF6B00] text-xs font-bold tracking-wide uppercase">
                        {part.brand}
                    </span>
                    {part.verified && (
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-200">
                            ✓ VERIFIED
                        </span>
                    )}
                </div>

                {/* Part Name */}
                <h3 className="text-base font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
                    {part.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400 text-sm">
                        ★★★★★
                    </div>
                    <span className="text-xs text-gray-500">(128 Reviews)</span>
                </div>

                {/* Stock Status */}
                <div className="space-y-1.5 text-sm mb-3">
                    {part.stock_quantity !== undefined && (
                        <div className="flex items-center gap-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${part.stock_quantity > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {part.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="mt-auto pt-3 border-t border-gray-100">
                    <p className="text-2xl font-extrabold text-gray-900">
                        ₹{formattedPrice}
                    </p>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-bold py-3 uppercase tracking-wider transition-all text-sm"
                onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                }}
            >
                ADD TO CART
            </button>
        </div>
    );
};

export default PartCard;
