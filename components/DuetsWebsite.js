"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Music, Users, Star, Sparkles, Mail, Instagram, Facebook, Twitter, ChevronRight, Menu, X } from 'lucide-react';

const DuetsWebsite = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const canvasRef = useRef(null);
  
  // Replace with your actual hero image URL
  const heroImageUrl = "https://d3160fehqwenxu.cloudfront.net/duetsShow.jpeg";
  //const heroImageUrl = "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&q=80";

  const quotes = [
    "Where voices unite, magic ignites",
    "Two voices, one unforgettable experience",
    "The power of harmony brought to life",
    "Musical theatre's finest moments, reimagined"
  ];

  const features = [
    { icon: Star, title: "West End Performers", desc: "World-class talent from London's finest stages" },
    { icon: Music, title: "Vast Cruise Experience", desc: "Performed on the world's most prestigious cruise lines" },
    { icon: Users, title: "Audience Interactivity", desc: "Engage with the show like never before" },
    { icon: Sparkles, title: "Unforgettable Songs", desc: "From classic theatre to modern pop hits" }
  ];

  const cruiseLines = [
    { name: "P&O", color: "#00205B" },
    { name: "NCL", color: "#003DA5" },
    { name: "Windstar", color: "#1B4D89" },
    { name: "Ponant", color: "#8B4513" }
  ];

  const testimonials = [
    { text: "An absolutely mesmerizing performance! The chemistry between the performers is electric.", author: "Sarah M.", role: "Audience Member" },
    { text: "The best entertainment at sea. We were completely captivated from start to finish.", author: "James T.", role: "Cruise Guest" },
    { text: "Professional, engaging, and utterly spectacular. A must-see show!", author: "Emma R.", role: "Entertainment Director" }
  ];

  // Auto-typing effect
  useEffect(() => {
    const quote = quotes[currentQuote];
    let index = 0;
    
    if (isTyping) {
      if (index < quote.length) {
        const timer = setInterval(() => {
          setDisplayedText(quote.slice(0, index + 1));
          index++;
          if (index === quote.length) {
            setIsTyping(false);
            setTimeout(() => {
              setIsTyping(true);
              setDisplayedText('');
              setCurrentQuote((prev) => (prev + 1) % quotes.length);
            }, 3000);
          }
        }, 80);
        return () => clearInterval(timer);
      }
    }
  }, [currentQuote, isTyping]);

  // Mouse tracking and particle generation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (Math.random() > 0.85) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: ['#00F5FF', '#FF00FF', '#00D9FF'][Math.floor(Math.random() * 3)]
        };
        setParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrame;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#00F5FF15';
      ctx.lineWidth = 1;

      const gridSize = 50;
      time += 0.01;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const wave = Math.sin(time + x * 0.01 + y * 0.01) * 10;
          ctx.beginPath();
          ctx.rect(x, y + wave, gridSize, gridSize);
          ctx.stroke();
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Animated Grid Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0" />

      {/* Particle Effects */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 rounded-full pointer-events-none animate-ping z-10"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) forwards'
          }}
        />
      ))}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            DUETS
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {['Home', 'Features', 'Shows', 'Blog', 'Calendar'].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a 
              href="#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-b border-cyan-500/20 animate-slideDown">
            <div className="px-6 py-6 space-y-4">
              {['Home', 'Features', 'Shows', 'Blog', 'Calendar'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="block py-2 hover:text-cyan-400 transition-colors hover:translate-x-2 duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact"
                className="block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full font-semibold text-center hover:scale-105 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImageUrl}
            alt="Duets Performance"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${heroImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setHeroImageLoaded(true)}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-fuchsia-500/10"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl" style={{ fontFamily: 'Georgia, serif' }}>
              DUETS
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-300 mb-4 drop-shadow-lg">
              The best loved duets in Musical Theatre and Pop
            </p>
            <div className="h-16 flex items-center justify-center">
              <p className="text-lg md:text-xl text-gray-300 italic drop-shadow-lg">
                "{displayedText}<span className="animate-pulse">|</span>"
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Experience the magic of musical theatre's most iconic partnerships. From Broadway classics 
            to contemporary pop sensations, witness two extraordinary voices unite in perfect harmony.
          </p>

          <button className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full text-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get in Touch
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Parallax Elements */}
        <div 
          className="absolute top-1/4 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-10 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePos.x * -0.03}px, ${mousePos.y * -0.03}px)`
          }}
        />
      </section>

      {/* Video Showcase Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Watch Us Perform
          </h2>
          <p className="text-center text-gray-400 mb-20 text-xl">Experience the magic of our performances</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video 1 */}
            <div className="group relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/bXolxgGhb_A"
                title="Performance Video 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video 2 */}
            {/* <div className="group relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-fuchsia-500/20">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Performance Video 2"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div> */}

            {/* Video 3 */}
            {/* <div className="group relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Performance Video 3"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div> */}

            {/* Video 4 */}
            {/* <div className="group relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-fuchsia-500/20">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Performance Video 4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            What Makes Us Special
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group relative p-8 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <feature.icon className="w-16 h-16 text-cyan-400 mb-6 group-hover:text-fuchsia-400 transition-colors" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-fuchsia-500/0 group-hover:from-cyan-500/5 group-hover:to-fuchsia-500/5 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cruise Lines Section */}
      <section id="shows" className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Performed On
          </h2>
          <p className="text-center text-gray-400 mb-20 text-xl">World-class entertainment on prestigious cruise lines</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cruiseLines.map((line, idx) => (
              <div 
                key={idx}
                className="group relative aspect-square flex items-center justify-center bg-gray-900/50 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl cursor-pointer overflow-hidden"
                style={{
                  boxShadow: `0 0 30px ${line.color}20`
                }}
              >
                <div className="text-3xl font-bold text-gray-500 group-hover:text-white transition-colors z-10">
                  {line.name}
                </div>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: line.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            What People Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                style={{
                  transform: `translateY(${idx * 20}px)`
                }}
              >
                <div className="text-cyan-400 text-5xl mb-4">"</div>
                <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
                <div className="border-t border-cyan-500/20 pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Latest News
          </h2>
          <p className="text-center text-gray-400 mb-20 text-xl">Stay updated with our performances and behind-the-scenes stories</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group relative bg-gray-900/50 border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <Music className="w-16 h-16 text-cyan-400 opacity-50" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-cyan-400 mb-2">Coming Soon</p>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">Blog Post Title</h3>
                  <p className="text-gray-400 text-sm">Exciting content will be added here soon. Stay tuned for updates!</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Upcoming Shows
          </h2>
          <p className="text-center text-gray-400 mb-20 text-xl">Find us performing at a venue near you</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['January', 'February', 'March', 'April', 'May', 'June'].map((month) => (
              <div key={month} className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Calendar className="w-12 h-12 text-cyan-400 mb-4 group-hover:text-fuchsia-400 transition-colors" />
                <h3 className="text-2xl font-bold mb-4">{month} 2025</h3>
                <p className="text-gray-400">Schedule coming soon</p>
                <div className="mt-4 flex items-center text-cyan-400 text-sm">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 bg-gradient-to-b from-gray-900 to-black z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-center text-gray-400 mb-20 text-xl">Interested in booking us? Let's create magic together</p>
          
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-3xl">
            <div className="space-y-6">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-black/50 border border-cyan-500/30 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-gray-500"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-black/50 border border-cyan-500/30 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-gray-500"
                />
              </div>
              <div>
                <textarea 
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-6 py-4 bg-black/50 border border-cyan-500/30 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-gray-500 resize-none"
                />
              </div>
              <button className="w-full py-5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Send Message
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-cyan-500/20">
              <p className="text-center text-gray-400 mb-6">Follow us on social media</p>
              <div className="flex justify-center gap-6">
                {[
                  { Icon: Instagram, color: '#E1306C' },
                  { Icon: Facebook, color: '#1877F2' },
                  { Icon: Twitter, color: '#1DA1F2' }
                ].map(({ Icon, color }, idx) => (
                  <a 
                    key={idx}
                    href="#"
                    className="group relative w-14 h-14 flex items-center justify-center bg-gray-900/50 border border-cyan-500/20 rounded-full hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                    style={{
                      boxShadow: `0 0 0 ${color}00`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 ${color}00`;
                    }}
                  >
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-cyan-500/20 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            DUETS
          </div>
          <p className="text-gray-500 mb-4">© 2025 Duets. All rights reserved.</p>
          <p className="text-gray-600 text-sm">Bringing musical magic to stages and seas worldwide</p>
        </div>
      </footer>
    </div>
  );
};

export default DuetsWebsite;