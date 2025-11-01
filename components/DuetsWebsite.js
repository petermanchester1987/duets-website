'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
import { Calendar, Music, Users, Star, Sparkles, Mail, Instagram, Facebook, Twitter, ChevronRight, Menu, X } from 'lucide-react';

const DuetsWebsite = ({ 
  heroImage: initialHeroImage, 
  videos: initialVideos, 
  blogs: initialBlogs, 
  calendarEvents: initialCalendarEvents, 
  testimonials: initialTestimonials 
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Use props instead of state for content
  const heroImage = initialHeroImage;
  const videos = initialVideos || [];
  const blogs = initialBlogs || [];
  const calendarEvents = initialCalendarEvents || [];
  const testimonials = initialTestimonials || [];
  
  const canvasRef = useRef(null);
  
  // Replace with your actual hero image URL
  const fallbackHeroImage = "https://d3160fehqwenxu.cloudfront.net/duetShow2.jpg";
  //const heroImageUrl = "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&q=80";

  // const features = [
  //   { icon: Star, title: "West End Performers", desc: "World-class talent from London's finest stages" },
  //   { icon: Music, title: "Vast Cruise Experience", desc: "Performed on the world's most prestigious cruise lines" },
  //   { icon: Users, title: "Audience Interactivity", desc: "Engage with the show like never before" },
  //   { icon: Sparkles, title: "Unforgettable Songs", desc: "From classic theatre to modern pop hits" }
  // ];

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
    { name: "P&O", color: "#00205B", logo: "/po.svg"},
    { name: "NCL", color: "#003DA5", logo: "/ncl.svg" },
    { name: "Windstar", color: "#1B4D89", logo: "/windstar.svg" },
    { name: "Ponant", color: "#8B4513", logo: "/ponant.svg" },
    { name: "Royal Albert Hall", color: "#00205B" },
    { name: "London Coliseum", color: "#003DA5" },
    { name: "London o2 Arena", color: "#1B4D89" },
    { name: "The North Pole", color: "#8B4513" }
  ];

// Fetch data from Sanity
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const [heroRes, videosRes, blogsRes, calendarRes, testimonialsRes] = await Promise.all([
//         fetch('/api/sanity?type=hero'),
//         fetch('/api/sanity?type=videos'),
//         fetch('/api/sanity?type=blogs'),
//         fetch('/api/sanity?type=calendar'),
//         fetch('/api/sanity?type=testimonials')
//       ]);

//       // Check if responses are ok
//       if (!heroRes.ok) console.error('Hero fetch failed:', await heroRes.text());
//       if (!videosRes.ok) console.error('Videos fetch failed:', await videosRes.text());
//       if (!blogsRes.ok) console.error('Blogs fetch failed:', await blogsRes.text());
//       if (!calendarRes.ok) console.error('Calendar fetch failed:', await calendarRes.text());
//       if (!testimonialsRes.ok) console.error('Testimonials fetch failed:', await testimonialsRes.text());

//       const heroData = heroRes.ok ? await heroRes.json() : null;
//       const videosData = videosRes.ok ? await videosRes.json() : [];
//       const blogsData = blogsRes.ok ? await blogsRes.json() : [];
//       const calendarData = calendarRes.ok ? await calendarRes.json() : [];
//       const testimonialsData = testimonialsRes.ok ? await testimonialsRes.json() : [];

//       if (heroData && !heroData.error) setHeroImage(heroData);
//       if (videosData && !videosData.error) setVideos(videosData);
//       if (blogsData && !blogsData.error) setBlogs(blogsData);
//       if (calendarData && !calendarData.error) setCalendarEvents(calendarData);
//       if (testimonialsData && !testimonialsData.error) setTestimonials(testimonialsData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []);

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

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
    <Image
      src={heroImage?.imageUrl || fallbackHeroImage}
      alt={heroImage?.alt || "Duets Performance"}
      fill
      className="object-cover"
      priority // This loads the image immediately
      quality={90}
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
            Experience the magic of music's most iconic partnerships. From Broadway 
            to Pop, witness two extraordinary voices unite in perfect harmony. Two West End performers bring you an unforgettable show filled with passion, energy, and timeless hits.
          </p>

          <a href="#contact">
            <button className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full text-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get in Touch
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </a>
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
      {videos.length > 0 && (
        <section className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900 z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Watch Us Perform
            </h2>
            <p className="text-center text-gray-400 mb-20 text-xl">Experience the magic of our performances</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video._id} className="group relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId ? video.youtubeId : 'bXolxgGhb_A'}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {video.description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-sm text-gray-300">{video.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            Performed On or In
          </h2>
          <p className="text-center text-gray-400 mb-20 text-xl">World-class entertainment on prestigious cruise lines and in theatres</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cruiseLines.map((line, idx) => (
              <div 
                key={idx}
                className="group relative aspect-square flex items-center justify-center bg-gray-900/50 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl overflow-hidden"
                style={{
                  boxShadow: `0 0 30px ${line.color}20`
                }}
              >
                <div className="text-3xl font-bold text-gray-500 group-hover:text-white transition-colors z-10">
                  {line.logo ? (
                    <img src={line.logo} alt={line.name} className="max-h-50 object-contain" />
                  ) : (
                    line.name
                  )
                  }
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
      {testimonials.length > 0 && (
        <section className="relative py-32 px-6 z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              What People Say
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial, idx) => (
                <div 
                  key={testimonial._id}
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
      )}

      {/* Blog Preview Section */}
      <section id="blog" className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Latest News
          </h2>
          <p className="text-center text-gray-400 mb-20 text-xl">Stay updated with our performances and behind-the-scenes stories</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogs.length > 0 ? blogs.map((blog) => (
              <a key={blog._id} href={`/blog/${blog.slug.current}`} className="group relative bg-gray-900/50 border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                {blog.imageUrl ? (
                  <div className="aspect-video overflow-hidden">
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                    <Music className="w-16 h-16 text-cyan-400 opacity-50" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm text-cyan-400 mb-2">{formatDate(blog.publishedAt)}</p>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
                  <p className="text-gray-400 text-sm">{blog.excerpt}</p>
                </div>
              </a>
            )) : (
              [1, 2, 3].map((item) => (
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
              ))
            )}
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
            {calendarEvents.length > 0 ? calendarEvents.map((event) => (
              <div key={event._id} className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
<Calendar className="w-12 h-12 text-cyan-400 mb-4 group-hover:text-fuchsia-400 transition-colors" />
<h3 className="text-2xl font-bold mb-2">{event.title}</h3>
<p className="text-cyan-400 mb-2">{formatDate(event.date)}</p>
{event.venue && <p className="text-gray-300 mb-1">{event.venue}</p>}
{event.location && <p className="text-gray-400 text-sm mb-3">{event.location}</p>}
{event.description && <p className="text-gray-400 text-sm mb-4">{event.description}</p>}
{event.ticketLink && (
<a 
                 href={event.ticketLink} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center text-cyan-400 text-sm hover:text-fuchsia-400 transition-colors"
               >
Get Tickets <ChevronRight className="w-4 h-4 ml-1" />
</a>
)}
</div>
)) : (
['January', 'February', 'March', 'April', 'May', 'June'].map((month) => (
<div key={month} className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
<Calendar className="w-12 h-12 text-cyan-400 mb-4 group-hover:text-fuchsia-400 transition-colors" />
<h3 className="text-2xl font-bold mb-4">{month} 2025</h3>
<p className="text-gray-400">Schedule coming soon</p>
<div className="mt-4 flex items-center text-cyan-400 text-sm">
View Details <ChevronRight className="w-4 h-4 ml-1" />
</div>
</div>
))
)}
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
      
      <ContactForm />

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
// Contact Form Component with Email Integration
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    console.log('Submitting form data:', formData); // DEBUG

    try {
      console.log('Sending request to /api/contact'); // DEBUG
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status); // DEBUG

      const data = await response.json();
      console.log('Response data:', data); // DEBUG

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ 
          type: 'error', 
          message: data.error || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Fetch error:', error); // DEBUG
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
return (
<div className="relative p-8 md:p-12 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-3xl">
<div className="space-y-6">
{status.message && (
<div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-300':'bg-red-500/20 border border-red-500/50 text-red-300'}`}>
{status.message}
</div>
)}
    <div>
      <input 
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full px-6 py-4 bg-black/50 border border-cyan-500/30 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-gray-500"
      />
    </div>
    <div>
      <input 
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        className="w-full px-6 py-4 bg-black/50 border border-cyan-500/30 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-gray-500"
      />
    </div>
    <div>
      <textarea 
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="5"
        placeholder="Your Message"
        required
        className="w-full px-6 py-4 bg-black/50 border border-cyan-500/30 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white placeholder-gray-500 resize-none"
      />
    </div>
    <button 
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="w-full py-5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Mail className="w-5 h-5" />
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </button>
  </div>
</div>
);
};
export default DuetsWebsite;