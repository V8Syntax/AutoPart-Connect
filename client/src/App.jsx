import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PartList from './components/PartList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white">
        {/* Navigation Header - Clean White Design */}
        <nav className="bg-[var(--deep-evergreen)] border-b border-[var(--border-dark)] sticky top-0 z-50 shadow-sm backdrop-blur-md bg-opacity-95">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-[var(--mint-bloom)] rounded flex items-center justify-center shadow-[var(--orange-glow)]">
                  <span className="text-[var(--deep-evergreen)] text-xl font-bold">A</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-[var(--soft-pistachio)]">
                  AutoPart Connect
                </span>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-8">
                <input
                  type="text"
                  placeholder="Search by part name, SKU, or vehicle..."
                  className="w-full px-4 py-2 bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-dark)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--mint-bloom)] focus:border-transparent placeholder-gray-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-6">
                <Link to="/" className="text-[var(--text-primary)] hover:text-[var(--mint-bloom)] transition-colors text-sm font-medium">
                  Account
                </Link>
                <Link to="/catalog" className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--mint-bloom)] transition-colors text-sm font-medium">
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
        <footer className="bg-[var(--background)] border-t border-[var(--border-dark)] mt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* About Section */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-[var(--primary-orange)]">
                  About AutoPart Connect
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Your trusted source for premium automotive parts and accessories.
                  Quality guaranteed, fast shipping, expert support.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-[var(--primary-orange)]">
                  Quick Links
                </h3>
                <div className="flex flex-col gap-2">
                  <Link to="/catalog" className="text-[var(--text-secondary)] hover:text-[var(--primary-orange)] transition-colors">
                    Shop Now
                  </Link>
                  <Link to="/catalog" className="text-[var(--text-secondary)] hover:text-[var(--primary-orange)] transition-colors">
                    Categories
                  </Link>
                  <Link to="/catalog" className="text-[var(--text-secondary)] hover:text-[var(--primary-orange)] transition-colors">
                    Best Sellers
                  </Link>
                  <Link to="/catalog" className="text-[var(--text-secondary)] hover:text-[var(--primary-orange)] transition-colors">
                    New Arrivals
                  </Link>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-[var(--primary-orange)]">
                  Contact Us
                </h3>
                <div className="flex flex-col gap-2 text-[var(--text-secondary)]">
                  <p>📧 support@autopartconnect.com</p>
                  <p>📞 +91 1234567890</p>
                  <p>⏰ Mon-Sat: 9AM - 6PM IST</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--border-dark)] mt-8 pt-8 text-center text-[var(--text-secondary)]">
              <p>&copy; 2026 AutoPart Connect. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;



