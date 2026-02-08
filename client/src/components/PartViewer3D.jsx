import React from 'react';
import Scene from './Scene';

/**
 * PartViewer3D Component - Dashboard Edition
 * Modal overlay with 3D technical preview of auto parts
 * Features brake disc model with showroom lighting
 * 
 * @param {Object} part - The part object to display
 * @param {Function} onClose - Callback to close the viewer
 */
const PartViewer3D = ({ part, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-[#0D0D0D] border border-white/20 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-[#1F1F1F] border-b border-white/10 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest mb-2">
                            {part.name}
                        </h2>
                        <p className="text-[#FF6B00] text-lg font-semibold uppercase tracking-wide">
                            {part.brand}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white text-3xl w-12 h-12 flex items-center justify-center rounded hover:bg-white/10 transition-all"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    {/* 3D Preview - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="mb-4">
                            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-2">
                                3D Technical Preview
                            </h3>
                            <p className="text-white/60 text-sm uppercase tracking-wide">
                                Interactive Model Viewer
                            </p>
                        </div>
                        <Scene
                            modelUrl={part.model_url}
                            key={part.model_url || part.id}
                        />
                    </div>

                    {/* Part Information - 1 column */}
                    <div className="space-y-6">
                        {/* Specifications */}
                        <div className="bg-[#1F1F1F] border border-white/10 rounded-lg p-6">
                            <h3 className="text-[#FF6B00] text-lg font-bold uppercase tracking-widest mb-4">
                                Specifications
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-white/60 text-sm uppercase tracking-wide">Part Number</span>
                                    <span className="text-white font-mono font-semibold">{part.part_number || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-white/60 text-sm uppercase tracking-wide">Category</span>
                                    <span className="text-white font-semibold">{part.category || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-white/60 text-sm uppercase tracking-wide">Stock</span>
                                    <span className={`font-semibold ${part.stock_quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {part.stock_quantity > 0 ? `${part.stock_quantity} Available` : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Compatibility */}
                        {(part.year || part.make || part.model) && (
                            <div className="bg-[#1F1F1F] border border-white/10 rounded-lg p-6">
                                <h3 className="text-[#FF6B00] text-lg font-bold uppercase tracking-widest mb-4">
                                    Compatibility
                                </h3>
                                <div className="bg-black/30 border border-white/5 rounded p-4">
                                    <p className="text-white font-semibold text-lg">
                                        {part.year} {part.make} {part.model}
                                        {part.trim && ` ${part.trim}`}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Price & Action */}
                        <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8533] rounded-lg p-6">
                            <p className="text-white/80 text-sm uppercase tracking-widest mb-2">Price</p>
                            <p className="text-white text-4xl font-bold mb-4">
                                ₹{parseFloat(part.price).toFixed(2)}
                            </p>
                            <button className="w-full bg-white text-[#FF6B00] font-bold py-3 px-6 rounded uppercase tracking-widest hover:bg-white/90 transition-all">
                                Add to Cart
                            </button>
                        </div>

                        {/* Verified Badge */}
                        {part.verified && (
                            <div className="bg-[#1F1F1F] border border-[#FF6B00]/30 rounded-lg p-4 flex items-center gap-3">
                                <span className="text-[#FF6B00] text-2xl">✓</span>
                                <div>
                                    <p className="text-white font-semibold uppercase tracking-wide">Verified Part</p>
                                    <p className="text-white/60 text-sm">Compatibility Confirmed</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartViewer3D;
