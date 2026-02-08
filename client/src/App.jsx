import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PartList from './components/PartList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white">
        {/* Navigation Header */}
        <nav className="bg-card-bg border-b border-border-dark sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <span className="text-3xl">🚗</span>
                <span className="text-xl font-bold">
                  <span className="text-white">AUTO</span>
                  <span className="text-primary-orange">PART</span>
                  <span className="text-white"> CONNECT</span>
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <Link
                  to="/"
                  className="text-text-secondary hover:text-primary-orange transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/catalog"
                  className="text-text-secondary hover:text-primary-orange transition-colors font-medium"
                >
                  Catalog
                </Link>
                <Link
                  to="/catalog"
                  className="text-text-secondary hover:text-primary-orange transition-colors font-medium"
                >
                  Categories
                </Link>
                <Link
                  to="/catalog"
                  className="text-text-secondary hover:text-primary-orange transition-colors font-medium"
                >
                  Brands
                </Link>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-4">
                <button className="text-text-secondary hover:text-primary-orange transition-colors text-xl">
                  🔍
                </button>
                <button className="text-text-secondary hover:text-primary-orange transition-colors text-xl">
                  👤
                </button>
                <button className="text-text-secondary hover:text-primary-orange transition-colors text-xl">
                  ❤️
                </button>
                <button className="relative text-text-secondary hover:text-primary-orange transition-colors text-xl">
                  🛒
                  <span className="absolute -top-1 -right-1 bg-primary-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<PartList />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-card-bg border-t border-border-dark mt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* About Section */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary-orange">
                  About AutoPart Connect
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Your trusted source for premium automotive parts and accessories.
                  Quality guaranteed, fast shipping, expert support.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary-orange">
                  Quick Links
                </h3>
                <div className="flex flex-col gap-2">
                  <Link to="/catalog" className="text-text-secondary hover:text-primary-orange transition-colors">
                    Shop Now
                  </Link>
                  <Link to="/catalog" className="text-text-secondary hover:text-primary-orange transition-colors">
                    Categories
                  </Link>
                  <Link to="/catalog" className="text-text-secondary hover:text-primary-orange transition-colors">
                    Best Sellers
                  </Link>
                  <Link to="/catalog" className="text-text-secondary hover:text-primary-orange transition-colors">
                    New Arrivals
                  </Link>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary-orange">
                  Contact Us
                </h3>
                <div className="flex flex-col gap-2 text-text-secondary">
                  <p>📧 support@autopartconnect.com</p>
                  <p>📞 +91 1234567890</p>
                  <p>⏰ Mon-Sat: 9AM - 6PM IST</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border-dark mt-8 pt-8 text-center text-text-secondary">
              <p>&copy; 2026 AutoPart Connect. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;



