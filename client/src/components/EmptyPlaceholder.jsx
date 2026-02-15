import React from 'react';

/**
 * EmptyPlaceholder Component
 * Shows a technical blueprint icon when images or 3D models are missing
 * 
 * @param {string} type - 'image' or 'model'
 */
const EmptyPlaceholder = ({ type = 'image' }) => {
    return (
        <div className="flex items-center justify-center bg-[#0D0D0D] border-2 border-dashed border-[#2A2A2A] rounded-lg p-12 min-h-[200px]">
            <div className="text-center">
                {/* Technical Blueprint Icon */}
                <svg
                    className="w-20 h-20 mx-auto text-[#FF6B00] mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {type === 'image' ? (
                        // Image placeholder icon
                        <>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </>
                    ) : (
                        // 3D model placeholder icon
                        <>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                        </>
                    )}
                </svg>
                <p className="text-white/60 text-sm uppercase tracking-wide font-semibold">
                    {type === 'image' ? 'Technical Diagram' : '3D Model Preview'}
                </p>
                <p className="text-white/40 text-xs mt-1">
                    {type === 'image' ? 'Image not available' : 'Model not available'}
                </p>
            </div>
        </div>
    );
};

export default EmptyPlaceholder;
