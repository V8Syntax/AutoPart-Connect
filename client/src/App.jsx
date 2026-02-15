import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PartList from './components/PartList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white">
        {/* Navigation Header - Clean White Design */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[#FF6B00] rounded flex items-center justify-center">
                  <span className="text-white text-xl font-bold">A</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  AutoPart Connect
                </span>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-8">
                <input
                  type="text"
                  placeholder="Search by part name, SKU, or vehicle..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6">
                <Link to="/" className="text-gray-700 hover:text-[#FF6B00] transition-colors text-sm font-medium">
                  Account
                </Link>
                <Link to="/catalog" className="flex items-center gap-2 text-gray-700 hover:text-[#FF6B00] transition-colors text-sm font-medium">
                  <span>Cart (2)</span>
                </Link>
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
        <footer className="bg-[#1F1F1F] border-t border-[#2A2A2A] mt-20">
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
            <div className="border-t border-[#2A2A2A] mt-8 pt-8 text-center text-text-secondary">
              <p>&copy; 2026 AutoPart Connect. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;



