import React, { useState, useEffect } from 'react';
import { Mic, Wand2, Brain, ChevronRight, Play, Sparkles, Bot, LogOut, ArrowRight, Sun, Moon, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { supabase } from './lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Update theme
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-purple-50 to-white'} transition-colors duration-200`}>
      <Toaster position="top-right" />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80'} backdrop-blur-md shadow-sm z-50 transition-colors duration-200`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-purple-600" />
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>PodcastAI</span>
            </div>
            <div className="flex space-x-6 items-center">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <a href="#features" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-purple-600'}`}>Features</a>
              <a href="#pricing" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-purple-600'}`}>Pricing</a>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} px-4 py-2 rounded-lg transition`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section with padding to account for fixed nav */}
      <header className="container mx-auto px-4 pt-32 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Ideas Into
            <span className="text-purple-600"> Professional Podcasts</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Harness the power of AI to create engaging, professional-quality podcasts in minutes.
            No technical expertise required.
          </p>
          <div className="flex justify-center space-x-4 mb-16">
            <button
              onClick={() => !user && setIsAuthModalOpen(true)}
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition flex items-center"
            >
              {user ? 'Start Creating' : 'Sign Up to Start'} <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition flex items-center">
              Watch Demo <Play className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* Picture Buttons */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a href="#" className="group relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"/>
              <img 
                src="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800"
                alt="Podcast Recording"
                className="w-full h-[300px] object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                <h3 className="text-2xl font-bold mb-2">Content Creation</h3>
                <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition duration-300">
                  Generate engaging scripts and stories with AI assistance
                </p>
                <ArrowRight className="h-6 w-6 transform group-hover:translate-x-2 transition duration-300" />
              </div>
            </a>

            <a href="#" className="group relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"/>
              <img 
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800"
                alt="Voice Recording"
                className="w-full h-[300px] object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                <h3 className="text-2xl font-bold mb-2">Voice Synthesis</h3>
                <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition duration-300">
                  Choose from premium AI voices or clone your own
                </p>
                <ArrowRight className="h-6 w-6 transform group-hover:translate-x-2 transition duration-300" />
              </div>
            </a>

            <a href="#" className="group relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"/>
              <img 
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800"
                alt="Audio Production"
                className="w-full h-[300px] object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                <h3 className="text-2xl font-bold mb-2">Audio Production</h3>
                <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition duration-300">
                  Professional editing and sound effects automatically applied
                </p>
                <ArrowRight className="h-6 w-6 transform group-hover:translate-x-2 transition duration-300" />
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-purple-600" />}
              title="AI Script Generation"
              description="Input your topic and our AI creates engaging, well-researched scripts tailored to your style."
            />
            <FeatureCard
              icon={<Wand2 className="h-8 w-8 text-purple-600" />}
              title="Voice Synthesis"
              description="Choose from premium AI voices or clone your own voice for authentic delivery."
            />
            <FeatureCard
              icon={<Mic className="h-8 w-8 text-purple-600" />}
              title="Production Ready"
              description="Automatically add music, sound effects, and professional editing."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price="29"
              features={[
                "2 hours of content per month",
                "Basic AI voices",
                "Standard templates",
                "Email support"
              ]}
              onSelect={() => !user && setIsAuthModalOpen(true)}
            />
            <PricingCard
              title="Professional"
              price="79"
              featured={true}
              features={[
                "10 hours of content per month",
                "Premium AI voices",
                "Custom templates",
                "Voice cloning",
                "Priority support"
              ]}
              onSelect={() => !user && setIsAuthModalOpen(true)}
            />
            <PricingCard
              title="Enterprise"
              price="199"
              features={[
                "Unlimited content",
                "All premium features",
                "Custom voice training",
                "Dedicated support",
                "API access"
              ]}
              onSelect={() => !user && setIsAuthModalOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-6 w-6" />
                <span className="text-xl font-bold">PodcastAI</span>
              </div>
              <p className="text-gray-400">Transform your ideas into professional podcasts with the power of AI.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
              <p className="text-gray-400">Stay updated with our newsletter</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 PodcastAI. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, features, featured = false, onSelect }) {
  return (
    <div className={`p-8 rounded-xl ${featured ? 'bg-purple-600 text-white' : 'bg-white'}`}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-sm">/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          featured
            ? 'bg-white text-purple-600 hover:bg-gray-100'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        Get Started
      </button>
    </div>
  );
}

export default App;