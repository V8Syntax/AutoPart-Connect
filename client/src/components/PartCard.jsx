import React, { useState } from 'react';
import PartViewer3D from './PartViewer3D';

/**
 * PartCard Component - Pro Motors Edition
 * Premium card design with dark borders and orange hover effects
 * 
 * @param {Object} part - The part object containing brand, name, price, etc.
 * @param {Object} selectedVehicle - Currently selected vehicle for compatibility badge
 */
const PartCard = ({ part, selectedVehicle }) => {
    const [show3DViewer, setShow3DViewer] = useState(false);

    // Format price to 2 decimal places
    const formattedPrice = parseFloat(part.price).toFixed(2);

    // Check if part is compatible with selected vehicle
    const isCompatible = selectedVehicle &&
        part.year === selectedVehicle.year &&
        part.make?.toLowerCase() === selectedVehicle.make?.toLowerCase() &&
        part.model?.toLowerCase() === selectedVehicle.model?.toLowerCase();

    const handleCardClick = () => {
        setShow3DViewer(true);
    };

    return (
        <>
            <div
                className="bg-card-bg border border-border-dark rounded-lg overflow-hidden transition-all duration-300 hover:border-primary-orange hover:shadow-card-hover cursor-pointer group"
                onClick={handleCardClick}
            >
                {/* Compatibility Badge */}
                {isCompatible && (
                    <div className="bg-primary-orange px-3 py-1 flex items-center gap-2">
                        <span className="text-white text-sm font-bold">✓</span>
                        <span className="text-white text-sm font-semibold">
                            Fits your {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                        </span>
                    </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <span className="text-primary-orange text-sm font-bold tracking-wider uppercase">
                            {part.brand}
                        </span>
                        {part.verified && (
                            <span
                                className="bg-primary-orange/20 text-primary-orange px-2 py-1 rounded text-xs font-bold"
                                title="Compatibility Verified"
                            >
                                ✓ VERIFIED
                            </span>
                        )}
                    </div>

                    {/* Part Name */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-orange transition-colors">
                        {part.name}
                    </h3>

                    {/* Details Grid */}
                    <div className="space-y-2 mb-4">
                        {part.part_number && (
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Part #:</span>
                                <span className="text-white font-mono">{part.part_number}</span>
                            </div>
                        )}

                        {part.category && (
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Category:</span>
                                <span className="text-white">{part.category}</span>
                            </div>
                        )}

                        {part.stock_quantity !== undefined && (
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Stock:</span>
                                <span className={part.stock_quantity > 0 ? 'text-green-400 font-semibold' : 'text-red-400'}>
                                    {part.stock_quantity > 0 ? `${part.stock_quantity} Available` : 'Out of Stock'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Vehicle Compatibility */}
                    {(part.year || part.make || part.model) && !isCompatible && (
                        <div className="bg-background border border-border-dark rounded p-3 mb-4">
                            <p className="text-text-secondary text-xs mb-1">Compatible with:</p>
                            <p className="text-white text-sm font-semibold">
                                {part.year} {part.make} {part.model}
                                {part.trim && ` ${part.trim}`}
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border-dark">
                        <div>
                            <p className="text-text-secondary text-xs mb-1">Price</p>
                            <p className="text-3xl font-bold text-primary-orange">
                                ₹{formattedPrice}
                            </p>
                        </div>
                        <button
                            className="bg-primary-orange hover:bg-orange-hover text-white font-bold py-3 px-6 rounded transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Add to cart logic here
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* 3D Viewer Modal */}
            {show3DViewer && (
                <PartViewer3D
                    part={part}
                    onClose={() => setShow3DViewer(false)}
                />
            )}
        </>
    );
};

export default PartCard;
