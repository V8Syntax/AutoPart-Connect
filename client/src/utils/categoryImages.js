/**
 * Category Image Mapping - TEMPLATE for Local Images
 * 
 * INSTRUCTIONS:
 * 1. Add your part images to: client/src/assets/images/parts/
 * 2. Import them at the top of this file
 * 3. Update the CATEGORY_IMAGES object to use your imported images
 * 4. Remove the external URLs and replace with local imports
 * 
 * EXAMPLE:
 * import brakePads from '../assets/images/parts/brakes/brake-pads.png';
 * 
 * Then use: 'Brake Pads': brakePads,
 */

// ========================================
// STEP 1: Import your local images here
// ========================================
// Example imports (uncomment and update paths when you add images):
// import turbocharger from '../assets/images/parts/engine/turbocharger.png';
// import brakePads from '../assets/images/parts/brakes/brake-pads.png';
// import acCompressor from '../assets/images/parts/ac-compressor/ac-compressor.png';
// import suspension from '../assets/images/parts/suspension/coilovers.png';
// import headlight from '../assets/images/parts/lighting/headlight.png';

// ========================================
// STEP 2: Update this object with your local images
// ========================================
const CATEGORY_IMAGES = {
    // TODO: Replace these external URLs with your local image imports
    // Example: 'Engine': turbocharger,

    'Engine': 'https://www.pngplay.com/wp-content/uploads/13/Turbocharger-Transparent-File.png',
    'Transmission': 'https://www.pngplay.com/wp-content/uploads/13/Turbocharger-Transparent-File.png',
    'Brakes': 'https://www.pngplay.com/wp-content/uploads/13/Brembo-Brake-Transparent-Images.png',
    'Brake Pads': 'https://www.pngall.com/wp-content/uploads/11/Brake-Pad-PNG-Pic.png',
    'Suspension': 'https://www.pngplay.com/wp-content/uploads/13/Suspension-PNG-Images-Free-Download.png',
    'Electrical': 'https://www.pngall.com/wp-content/uploads/5/Car-Headlight-PNG-Download-Image.png',
    'Exhaust': 'https://www.pngplay.com/wp-content/uploads/13/Turbocharger-Transparent-File.png',
    'Cooling': 'https://www.pngplay.com/wp-content/uploads/13/Turbocharger-Transparent-File.png',
    'AC Compressor': 'https://5.imimg.com/data5/SELLER/Default/2023/8/334825033/LR/XB/VT/5911061/automotive-ac-compressor.png',
    'Air Conditioning': 'https://5.imimg.com/data5/SELLER/Default/2023/8/334825033/LR/XB/VT/5911061/automotive-ac-compressor.png',
    'Fuel System': 'https://www.pngplay.com/wp-content/uploads/13/Turbocharger-Transparent-File.png',
    'Interior': 'https://www.pngall.com/wp-content/uploads/5/Car-Headlight-PNG-Download-Image.png',
    'Exterior': 'https://www.pngall.com/wp-content/uploads/5/Car-Headlight-PNG-Download-Image.png',
    'Wheels': 'https://www.pngplay.com/wp-content/uploads/13/Brembo-Brake-Transparent-Images.png',
    'Lighting': 'https://www.pngall.com/wp-content/uploads/5/Car-Headlight-PNG-Download-Image.png',
    'Body': 'https://www.pngplay.com/wp-content/uploads/13/Suspension-PNG-Images-Free-Download.png',
    'Filters': 'https://www.pngplay.com/wp-content/uploads/13/Turbocharger-Transparent-File.png',
    'Belts & Hoses': 'https://www.pngplay.com/wp-content/uploads/13/Turbocharger-Transparent-File.png',
    'default': 'https://www.pngplay.com/wp-content/uploads/13/Brembo-Brake-Transparent-Images.png'
};

/**
 * Get image URL for a part based on category
 * @param {string} category - Part category
 * @param {string} imageUrl - Existing image URL from database
 * @returns {string} Image URL to display
 */
export const getPartImage = (category, imageUrl) => {
    // If part has an image URL, use it
    if (imageUrl && imageUrl.trim() !== '') {
        return imageUrl;
    }

    // Otherwise, use category-based mapping
    return CATEGORY_IMAGES[category] || CATEGORY_IMAGES['default'];
};

export default CATEGORY_IMAGES;
