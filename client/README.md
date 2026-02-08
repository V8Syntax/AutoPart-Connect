# AutoPart-Connect Frontend

React frontend application for browsing and filtering auto parts.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Backend server running on `http://localhost:3000`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   The `.env` file is already configured with:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The app will start on `http://localhost:5173`

## 📦 Components

### PartCard
Displays individual auto part information including:
- Brand and name
- Price
- Part number and category
- Stock status
- Vehicle compatibility (when filtered)
- Verification badge

### PartList
Main component that:
- Fetches parts from the backend API (`GET /api/parts`)
- Provides filtering by year, make, model, and brand
- Displays loading and error states
- Shows parts in a responsive grid layout

## 🎨 Features

- **Dynamic Filtering**: Filter parts by vehicle year, make, model, and brand
- **Real-time Search**: Filters update automatically as you type
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading States**: Visual feedback while fetching data
- **Error Handling**: Graceful error messages with retry functionality
- **Modern UI**: Clean, card-based design with hover effects

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 API Integration

The app connects to the backend API at the URL specified in `.env`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

### Example API Calls

**Get all parts:**
```
GET http://localhost:3000/api/parts
```

**Filter by vehicle:**
```
GET http://localhost:3000/api/parts?year=2020&model=Camry&make=Toyota
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── PartCard.jsx       # Individual part card component
│   │   ├── PartCard.css       # Part card styles
│   │   ├── PartList.jsx       # Parts list with filtering
│   │   └── PartList.css       # Parts list styles
│   ├── App.jsx                # Main app component
│   ├── App.css                # App styles
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── .env                       # Environment variables
└── package.json
```

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Fetch API** - HTTP requests
- **CSS3** - Styling with modern features

## 💡 Usage Tips

1. **Start the backend first** before running the frontend
2. **Clear filters** using the "Clear Filters" button to see all parts
3. **Combine filters** for more specific results (e.g., year + make + model)
4. **Check the console** for API request logs during development
