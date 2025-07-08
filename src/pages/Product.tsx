import React, { useState } from 'react';
import { Eye, Cpu, Battery, Wifi, Camera, Headphones, Shield, Zap, ArrowRight, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DownloadSection from '../components/DownloadSection';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

const Product = () => {
  const [activeTab, setActiveTab] = useState('specs');
  const [currentView, setCurrentView] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const glassesViews = [
    { name: 'Front View', image: '/glasses/front.png', description: 'Main camera and display components' },
    { name: 'Right Side', image: '/glasses/right.png', description: 'Processing unit and connectivity ports' },
    { name: 'Back View', image: '/glasses/back.png', description: 'Internal circuitry and connections' },
    { name: 'Top View', image: '/glasses/up.png', description: 'Frame structure and component layout' }
  ];

  const specifications = [
    {
      category: "Microprocessor",
      items: [
        { label: "Model", value: "Raspberry Pi 4 Model B (8GB)" },
        { label: "CPU", value: "Quad-core Cortex-A72 @ 1.5 GHz" },
        { label: "GPU", value: "VideoCore VI @ 500 MHz" },
        { label: "RAM", value: "8GB LPDDR4-2400 SDRAM" },
        { label: "Power Consumption", value: "3.4–7.6W" }
      ]
    },
    {
      category: "Camera Module",
      items: [
        { label: "Model", value: "Raspberry Pi Camera Module V3" },
        { label: "Sensor", value: "Sony IMX708, 12.3MP" },
        { label: "Resolution", value: "4608 × 2592 (stills), 1920 × 1080 (video)" },
        { label: "Frame Rate", value: "30 fps (1080p)" },
        { label: "Interface", value: "MIPI CSI-2" }
      ]
    },
    {
      category: "Display Module",
      items: [
        { label: "Model", value: "2.8-inch HDMI LCD" },
        { label: "Resolution", value: "480 × 320" },
        { label: "Panel Type", value: "IPS" },
        { label: "Touchscreen", value: "Capacitive" },
        { label: "Power Consumption", value: "0.5–1W" }
      ]
    },
    {
      category: "Audio Components",
      items: [
        { label: "Microphone", value: "BOYA Wireless (2.4 GHz, 48 kHz)" },
        { label: "Speaker", value: "Generic 1W mono (200 Hz–20 kHz)" },
        { label: "Microphone Range", value: "50m" },
        { label: "Microphone Battery", value: "9-hour" }
      ]
    },
    {
      category: "Power & Storage",
      items: [
        { label: "Battery", value: "Anker PowerCore 20000 (20,000 mAh)" },
        { label: "Storage", value: "32GB microSD (100 MB/s)" },
        { label: "Battery Output", value: "30W" },
        { label: "Dimensions", value: "150 × 62 × 26 mm" }
      ]
    }
  ];

  const features = [
    {
      icon: Cpu,
      title: "Powerful Processing",
      description: "Quad-core Cortex-A72 CPU provides sufficient performance for AR proof-of-concept applications."
    },
    {
      icon: Camera,
      title: "High-Quality Imaging",
      description: "12.3MP camera with autofocus captures clear images for AR object recognition and tracking."
    },
    {
      icon: Eye,
      title: "Compact Display",
      description: "2.8-inch touchscreen provides intuitive interaction with AR elements in a portable form factor."
    },
    {
      icon: Headphones,
      title: "Wireless Audio",
      description: "BOYA wireless microphone enables voice commands while maintaining mobility."
    },
    {
      icon: Battery,
      title: "Extended Battery Life",
      description: "20,000 mAh power bank ensures all-day operation for field testing."
    },
    {
      icon: Wifi,
      title: "Connectivity Options",
      description: "Multiple interfaces including HDMI, USB 3.0, and GPIO for flexible component integration."
    }
  ];

  const useCases = [
    {
      title: "Real-Time OCR",
      description: "Instantly read and digitize text from books, documents, signs, and any printed material in your field of view. Perfect for students, researchers, and professionals who need quick text extraction.",
      icon: Eye,
      features: [
        "Multi-language text recognition",
        "Real-time text highlighting",
        "Copy to clipboard functionality",
        "Handwriting recognition support"
      ]
    },
    {
      title: "Live Translation",
      description: "Break language barriers with instant translation of text, signs, menus, and conversations. Supports over 100 languages with real-time overlay translation directly in your view.",
      icon: Wifi,
      features: [
        "100+ language support",
        "Conversation mode",
        "Offline translation capability",
        "Cultural context awareness"
      ]
    },
    {
      title: "Object Recognition",
      description: "Identify and learn about objects, landmarks, plants, animals, and products around you. Get instant information, reviews, and contextual data about anything you see.",
      icon: Camera,
      features: [
        "Visual search capabilities",
        "Product information & reviews",
        "Educational content overlay",
        "Navigation assistance"
      ]
    }
  ];

  const handleViewChange = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    let newView = currentView;
    
    switch (direction) {
      case 'up':
        newView = 3; // Top view
        break;
      case 'down':
        newView = 0; // Front view
        break;
      case 'left':
        newView = 1; // Right side (from user perspective, swiping left shows right side)
        break;
      case 'right':
        newView = 2; // Back view
        break;
    }
    
    setCurrentView(newView);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleSwipe = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    
    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endX = endEvent.changedTouches[0].clientX;
      const endY = endEvent.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      const minSwipeDistance = 50;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            handleViewChange('right');
          } else {
            handleViewChange('left');
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            handleViewChange('down');
          } else {
            handleViewChange('up');
          }
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AR Prototype System
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A practical augmented reality prototype built with accessible components. 
                Demonstrates AR capabilities using cost-effective, locally available hardware.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg"
                >
                  <span>Contact to Learn More</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">12.3MP</div>
                  <div className="text-gray-400 text-sm">Camera Resolution</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">8GB</div>
                  <div className="text-gray-400 text-sm">RAM Capacity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">20Ah</div>
                  <div className="text-gray-400 text-sm">Battery Capacity</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Interactive 360° Glasses Viewer */}
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl blur-3xl animate-pulse"></div>
                
                {/* Glasses Viewer Container */}
                <div 
                  className="relative z-10 group"
                  onTouchStart={handleSwipe}
                >
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900">
                    {/* Current View */}
                    <div className={`absolute inset-0 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                      <img
                        src={glassesViews[currentView].image}
                        alt={glassesViews[currentView].name}
                        className="w-full h-full object-contain p-8"
                      />
                    </div>

                    {/* View Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{glassesViews[currentView].name}</h3>
                      <p className="text-gray-300 text-sm">{glassesViews[currentView].description}</p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Top */}
                      <button
                        onClick={() => handleViewChange('up')}
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 pointer-events-auto"
                        title="Top View"
                      >
                        <ChevronUp className="h-4 w-4 text-white" />
                      </button>
                      
                      {/* Bottom */}
                      <button
                        onClick={() => handleViewChange('down')}
                        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 pointer-events-auto"
                        title="Front View"
                      >
                        <ChevronDown className="h-4 w-4 text-white" />
                      </button>
                      
                      {/* Left */}
                      <button
                        onClick={() => handleViewChange('left')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 pointer-events-auto"
                        title="Right Side"
                      >
                        <ChevronLeft className="h-4 w-4 text-white" />
                      </button>
                      
                      {/* Right */}
                      <button
                        onClick={() => handleViewChange('right')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 pointer-events-auto"
                        title="Back View"
                      >
                        <ChevronRight className="h-4 w-4 text-white" />
                      </button>
                    </div>

                    {/* View Indicators */}
                    <div className="absolute top-4 right-4 flex space-x-1">
                      {glassesViews.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentView === index ? 'bg-blue-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center mt-6">
                  <p className="text-gray-400 text-sm mb-2">
                    Swipe or use arrows to explore different angles
                  </p>
                  <div className="flex justify-center space-x-4 text-xs text-gray-500">
                    <span>↑ Top</span>
                    <span>↓ Front</span>
                    <span>← Right</span>
                    <span>→ Back</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'specs', label: 'Specifications' },
              { id: 'features', label: 'Features' },
              { id: 'use-cases', label: 'Use Cases' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'specs' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Technical Specifications
                  </span>
                </h2>
                <p className="text-xl text-gray-400">Practical components selected for accessibility and performance</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {specifications.map((category, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-blue-400/50 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-blue-400 mb-4">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-start">
                          <span className="text-gray-300 text-sm">{item.label}</span>
                          <span className="text-white text-sm font-medium text-right ml-4">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Key Features
                  </span>
                </h2>
                <p className="text-xl text-gray-400">Balanced performance and practicality</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'use-cases' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Use Cases & Applications
                  </span>
                </h2>
                <p className="text-xl text-gray-400">Revolutionary AR features that transform how you interact with the world</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <useCase.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{useCase.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {useCase.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Interested in AR Prototyping?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Learn how to build affordable AR systems with accessible components. 
            Contact us for more information about this prototype and its implementation.
          </p>
          
          <Link
            to="/contact"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <DownloadSection />

      <style>{`
        @media (max-width: 768px) {
          .glasses-viewer {
            touch-action: pan-y;
          }
        }
      `}</style>
      <Footer/>
      <ChatBot/>
    </div>
  );
};

export default Product;