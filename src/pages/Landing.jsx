import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, Menu, X, CheckCircle2, LayoutDashboard, Calculator, 
  Home, Image as ImageIcon, BarChart3, Sparkles,
  Sofa, ShieldCheck, Cloud, LayoutTemplate, Building, Palette, Brain, FileText, ArrowRight, Check,
  ChevronDown, ChevronUp, Star, MapPin, User, DownloadCloud, CheckCircle, MessageSquare, Plus, Minus
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans relative overflow-x-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      {/* Top Announcement Bar */}
      <div className="bg-[#2563EB] text-white hidden md:block text-sm z-50 relative">
        <div className="mx-auto flex h-11 max-w-[1280px] items-center justify-between gap-6 px-6 xl:px-0">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-blue-100 transition-colors">
              <Phone size={14} /> +91 98765 43210
            </a>
            <a href="mailto:support@buildwise.in" className="flex items-center gap-2 hover:text-blue-100 transition-colors">
              <Mail size={14} /> support@buildwise.in
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-80">Follow Us</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-blue-200 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              <a href="#" className="hover:text-blue-200 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="#" className="hover:text-blue-200 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#" className="hover:text-blue-200 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header / Navbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white/75 backdrop-blur-sm'}`}
      >
        <div className="mx-auto flex min-h-16 max-w-[1280px] items-center justify-between gap-4 px-6 xl:px-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">B</div>
            <span className="font-heading font-bold text-xl tracking-tight">BuildWise</span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {['Home', 'Features', 'How It Works', 'Projects', 'Pricing', 'Blog', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/register" className="px-4 py-2.5 rounded-[14px] border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all text-sm whitespace-nowrap">
              Affordable Estimates
            </Link>
            <Link to="/login" className="px-4 py-2.5 rounded-[14px] bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm shadow-sm whitespace-nowrap">
              Sign In
            </Link>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/register')}
              className="px-5 py-2.5 rounded-[14px] bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm whitespace-nowrap"
            >
              Get Started
            </motion.button>
          </div>

          <button className="lg:hidden text-gray-600" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-5 shadow-sm">
            <nav className="mx-auto flex max-w-[1280px] flex-col gap-4">
              {['Home', 'Features', 'How It Works', 'Projects', 'Pricing', 'Blog', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-semibold text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link to="/login" className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700">Sign In</Link>
                <Link to="/register" className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white">Get Started</Link>
              </div>
            </nav>
          </div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative z-10 mx-auto max-w-[1280px] px-6 pb-20 pt-12 md:pt-16 lg:pb-28 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)] gap-12 lg:gap-10 items-center">
          
          {/* Left Side Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex max-w-[680px] flex-col gap-7"
          >
            <div>
              <h1 className="font-heading text-[42px] leading-[1.08] font-bold tracking-tight text-gray-900 md:text-[56px] lg:text-[64px]">
                Plan Your Dream Home with AI
              </h1>
              <h2 className="mt-5 font-heading text-[24px] font-bold leading-[1.25] text-blue-600 md:text-[32px] lg:text-[36px]">
                Estimate Costs, Generate Floor Plans, Preview 3D Elevations & Design Beautiful Interiors
              </h2>
            </div>
            
            <p className="max-w-[620px] text-[17px] leading-[1.75] text-gray-600">
              BuildWise is an AI-powered construction planning platform that helps homeowners estimate construction costs, generate intelligent floor plans, preview stunning 3D front elevations, and choose interior styles before construction begins.
            </p>

            <div className="flex flex-col gap-3">
              {[
                "Instant Construction Cost Estimator",
                "Smart 2D Floor Plans",
                "Modern 3D Elevation Preview",
                "Interior Design Suggestions",
                "AI-Powered Recommendations",
                "Export Professional PDF Reports"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0" />
                  <span className="font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto px-8 py-4 rounded-[14px] bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all flex justify-center"
              >
                Start Free
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-[14px] bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all flex justify-center"
              >
                Watch Demo
              </motion.button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <p className="text-sm font-medium text-gray-600">Trusted by 1000+ Indian homeowners.</p>
            </div>
          </motion.div>

          {/* Right Side Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative mx-auto flex min-h-[420px] w-full max-w-[680px] items-center justify-center lg:min-h-[560px]"
          >
            {/* Main Dashboard Container */}
            <div className="relative z-10 mx-auto hidden w-[min(100%,560px)] rounded-[24px] border border-white bg-white/75 p-5 shadow-[0_24px_55px_-20px_rgba(15,23,42,0.25)] backdrop-blur-2xl md:block lg:p-6">
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100/80">
                <LayoutDashboard className="text-blue-500" />
                <div className="font-heading font-bold text-lg text-gray-900">Project Dashboard</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Cost Card */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 min-w-0"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wide"><Calculator size={14}/> Estimate</div>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold tracking-wider uppercase">Standard</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-3">₹18,45,000</div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full w-[45%]"></div></div>
                </motion.div>

                {/* Progress Card */}
                <motion.div 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 min-w-0"
                >
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-wide mb-3"><BarChart3 size={14}/> Analytics</div>
                  <div className="flex justify-between items-end mb-1">
                    <div>
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Progress</div>
                      <div className="text-xl font-bold text-gray-900">75%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">Timeline</div>
                      <div className="text-lg font-bold text-blue-600">45 Days</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floor Plan Card */}
                <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[130px] group cursor-pointer hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Home className="text-blue-500" size={20} />
                  </div>
                  <div className="text-xs font-bold text-gray-700">Floor Plan Preview</div>
                </div>

                {/* 3D Elevation Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[20px] p-5 shadow-md shadow-blue-500/20 text-white flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-blue-100 text-xs font-medium tracking-wide uppercase"><ImageIcon size={14}/> 3D Elevation</div>
                  <div className="mt-4 font-bold text-base leading-tight">Modern Minimalist<br/>Villa Style</div>
                </div>
              </div>
              
              {/* AI Recommendation */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-5 bg-gradient-to-r from-blue-50 to-[#F8FAFC] border border-blue-100/60 rounded-[16px] p-4 flex gap-4 items-start shadow-sm"
              >
                <div className="bg-white p-2 rounded-xl shadow-sm text-blue-500 flex-shrink-0"><Sparkles size={16} /></div>
                <div>
                  <div className="font-bold text-xs text-gray-900 mb-1 tracking-wide uppercase">AI Recommendation</div>
                  <p className="text-xs text-gray-600 leading-relaxed">Reduce flooring cost by 8% by switching to Standard Finish vitrified tiles in bedrooms.</p>
                </div>
              </motion.div>

            </div>

            {/* Floating Overlay Cards (visible on all sizes) */}
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-2 top-0 z-20 w-[220px] rounded-[20px] border border-white bg-white/90 p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] backdrop-blur-xl md:left-0 lg:top-10 xl:-left-3"
            >
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Today's Estimate</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-xs text-gray-500 font-medium">Area</span><span className="text-xs font-bold text-gray-900">1080 sqft</span></div>
                <div className="flex justify-between items-center"><span className="text-xs text-gray-500 font-medium">Location</span><span className="text-xs font-bold text-gray-900">Tamil Nadu</span></div>
                <div className="h-px bg-gray-100 w-full my-1"></div>
                <div className="flex justify-between items-center"><span className="text-xs text-gray-500 font-medium">Rate</span><span className="text-xs font-bold text-blue-600">₹1,750/sqft</span></div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-2 right-2 z-20 flex max-w-[260px] items-center gap-4 rounded-[20px] border border-white bg-white/90 p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] backdrop-blur-xl md:right-0 lg:bottom-12 xl:-right-3"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-[14px] flex items-center justify-center text-blue-600">
                <ImageIcon size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Interior Moodboard</div>
                <div className="text-xs text-gray-500 font-medium">Living Room • Kitchen</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Section 1: Why BuildWise */}
      <section className="py-24 lg:py-32 bg-white px-6 lg:px-12 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm tracking-wide mb-6">
              WHY BUILDWISE
            </div>
            <h2 className="font-heading text-3xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-6">
              Why Thousands of Homeowners Choose BuildWise
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              BuildWise simplifies every stage of home construction planning—from estimating costs to selecting floor plans, 3D elevations, and interior styles—all in one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Calculator size={28} strokeWidth={1.5} />, title: 'AI Construction Cost Estimation', desc: 'Instantly calculate construction costs using city-wise rates, quality levels, and built-up area with detailed cost breakdowns.' },
              { icon: <LayoutTemplate size={28} strokeWidth={1.5} />, title: 'Smart Floor Plan Generator', desc: 'Choose from professionally designed 2BHK and 3BHK layouts or customize your own floor plan according to your plot dimensions.' },
              { icon: <Home size={28} strokeWidth={1.5} />, title: '3D Elevation Preview', desc: 'Preview beautiful front elevation styles including Modern, Traditional, Contemporary, and Minimal designs before construction begins.' },
              { icon: <Sofa size={28} strokeWidth={1.5} />, title: 'Interior Design Suggestions', desc: 'Explore room-wise interior themes and furniture layouts to visualize your dream home before spending money.' },
              { icon: <ShieldCheck size={28} strokeWidth={1.5} />, title: 'Trusted & Accurate', desc: 'Estimate construction costs with transparent pricing, accurate calculations, and AI-powered recommendations.' },
              { icon: <Cloud size={28} strokeWidth={1.5} />, title: 'Cloud Project Management', desc: 'Save, edit, and manage unlimited construction projects securely from anywhere across web and mobile.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-blue-100 hover:shadow-[0_8px_40px_rgba(37,99,235,0.08)] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm border border-blue-50">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{feature.desc}</p>
                <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  Learn more <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Core Features */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC] px-6 lg:px-12 relative z-10 border-y border-gray-100/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm tracking-wide mb-6">
              FEATURES
            </div>
            <h2 className="font-heading text-3xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-6">
              Everything You Need Before Building Your Dream Home
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A complete AI-powered construction planning platform designed specifically for Indian homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calculator size={22} />, title: 'Construction Cost Estimator', desc: 'Detailed material and labor cost estimates based on city and quality tier.' },
              { icon: <LayoutTemplate size={22} />, title: '2D Floor Plans', desc: 'Generate intelligent layouts based on plot size and BHK selection.' },
              { icon: <Building size={22} />, title: '3D House Elevations', desc: 'Visualize modern front elevation designs before construction.' },
              { icon: <Palette size={22} />, title: 'Interior Design', desc: 'Choose beautiful room themes and furniture arrangements.' },
              { icon: <Brain size={22} />, title: 'AI Plan Analysis', desc: 'Upload existing plans and receive intelligent suggestions.' },
              { icon: <FileText size={22} />, title: 'PDF Reports', desc: 'Export professional reports for planning and consultation.' },
              { icon: <Cloud size={22} />, title: 'Cloud Sync', desc: 'Access projects anytime from web and mobile.' },
              { icon: <BarChart3 size={22} />, title: 'Project Dashboard', desc: 'Track project status, estimates, floor plans, and design progress.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(37,99,235,0.06)] transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-6 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Feature Showcase */}
      <section className="py-24 lg:py-32 bg-white px-6 lg:px-12 overflow-hidden relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-[550px] bg-gradient-to-br from-blue-50 via-white to-blue-50/30 rounded-[32px] border border-blue-100/50 p-8 flex items-center justify-center overflow-hidden shadow-sm"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white p-7 space-y-5">
                <div className="flex justify-between items-center pb-5 border-b border-gray-100">
                  <div className="font-heading font-bold text-gray-900 text-lg">Project Overview</div>
                  <div className="px-2.5 py-1 bg-green-50 text-green-600 rounded-md text-xs font-bold tracking-wide uppercase">Active</div>
                </div>
                
                <div className="space-y-3.5">
                  {[
                    { label: 'Construction Estimate', icon: <Calculator size={18} />, color: 'blue' },
                    { label: 'Floor Plan Layout', icon: <LayoutTemplate size={18} />, color: 'purple' },
                    { label: '3D Front Elevation', icon: <Building size={18} />, color: 'orange' },
                    { label: 'Interior Preview', icon: <Palette size={18} />, color: 'teal' }
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center gap-4 p-3.5 rounded-[16px] bg-white border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                      <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center ${
                        item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                        item.color === 'purple' ? 'bg-purple-50 text-purple-600' : 
                        item.color === 'orange' ? 'bg-orange-50 text-orange-600' : 
                        'bg-teal-50 text-teal-600'
                      }`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 font-semibold text-[15px] text-gray-800">{item.label}</div>
                      <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side Content */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="font-heading text-3xl lg:text-[46px] font-bold text-gray-900 leading-[1.15] mb-6">
                One Platform. Every Construction Decision.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 pr-4">
                Plan your complete home construction journey using a single intelligent platform—from cost estimation to final design selection.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 mb-10">
                {[
                  "AI Budget Prediction",
                  "Professional Floor Plans",
                  "Modern Elevations",
                  "Interior Inspiration",
                  "Export PDF Reports",
                  "Mobile & Web Access"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto px-8 py-4 rounded-[14px] bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all flex justify-center"
                >
                  Explore Features
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-[14px] bg-white border border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all flex justify-center"
                >
                  See Live Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-[#F8FAFC] px-6 lg:px-12 relative z-10 border-y border-gray-100/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm tracking-wide mb-6">
              HOW IT WORKS
            </div>
            <h2 className="font-heading text-3xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-6">
              Simple 6-Step Construction Planning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Create Account', desc: 'Sign up for free and access your personalized project dashboard.', icon: <User size={24} /> },
              { num: '2', title: 'Enter Plot Details', desc: 'Input your plot dimensions, city, and basic requirements.', icon: <MapPin size={24} /> },
              { num: '3', title: 'Get Cost Estimate', desc: 'Receive instant, highly accurate construction cost breakdowns.', icon: <Calculator size={24} /> },
              { num: '4', title: 'Generate Floor Plan', desc: 'Choose from smart presets or generate custom layouts.', icon: <LayoutTemplate size={24} /> },
              { num: '5', title: 'Select Elevation', desc: 'Visualize and select your favorite 3D modern front elevation.', icon: <Building size={24} /> },
              { num: '6', title: 'Download Project Report', desc: 'Export a professional PDF to share with your contractor.', icon: <DownloadCloud size={24} /> }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:border-blue-200 transition-colors cursor-pointer"
              >
                <div className="absolute -right-4 -top-4 text-[120px] font-black text-gray-50 leading-none group-hover:text-blue-50 transition-colors z-0 select-none">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm border border-blue-100/50 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 px-6 lg:px-12 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl lg:text-[46px] font-bold text-white leading-tight mb-6">
              Powered by Artificial Intelligence
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed">
              Experience the future of home construction planning with our advanced AI algorithms tailored for Indian homes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "AI Budget Prediction", "AI Floor Plan Suggestions", "AI Layout Analysis",
              "AI Interior Recommendation", "AI Cost Optimization", "AI Material Suggestions"
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-[20px] p-6 hover:bg-white/15 transition-all flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white shadow-inner">
                  <Brain size={24} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-white">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section id="projects" className="py-24 lg:py-32 bg-white px-6 lg:px-12 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-6">
              Project Showcase
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore stunning homes planned and estimated using BuildWise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: 'Modern House', area: '1200 sqft', cost: '₹21.5 Lakhs' },
              { type: 'Traditional House', area: '1800 sqft', cost: '₹32.0 Lakhs' },
              { type: 'Contemporary House', area: '1500 sqft', cost: '₹27.8 Lakhs' },
              { type: 'Minimal House', area: '1000 sqft', cost: '₹17.5 Lakhs' }
            ].map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors z-10" />
                  <img src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3`} alt="House" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{project.type}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                    <span className="flex items-center gap-1"><LayoutTemplate size={14} /> {project.area}</span>
                    <span className="font-semibold text-blue-600">{project.cost}</span>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-gray-50 text-gray-700 font-semibold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 lg:py-32 bg-[#F8FAFC] px-6 lg:px-12 relative z-10 border-y border-gray-100/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Start for free, upgrade when you need professional exports and unlimited projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Free */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">FREE</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">₹0<span className="text-lg text-gray-500 font-medium">/forever</span></div>
              <ul className="space-y-4 mb-8">
                {['1 Project', '1 Cost Estimate', 'Basic Floor Plan Presets', 'No PDF Export', 'Community Support'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-600"><CheckCircle size={18} className="text-blue-200" /> {item}</li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-colors">Start Free</button>
            </div>

            {/* Basic (Highlighted) */}
            <div className="bg-blue-600 rounded-[24px] p-8 shadow-xl shadow-blue-600/20 text-white relative transform lg:scale-105 z-10 border border-blue-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">Most Popular</div>
              <h3 className="text-xl font-bold text-blue-50 mb-2">BASIC</h3>
              <div className="text-4xl font-bold text-white mb-6">₹499<span className="text-lg text-blue-200 font-medium">/project</span></div>
              <ul className="space-y-4 mb-8">
                {['Unlimited Estimates', 'Unlimited Projects', 'Premium Floor Plans', '3D Elevations', 'PDF Report Export', 'Email Support'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-blue-50"><CheckCircle size={18} className="text-blue-300" /> {item}</li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-white text-blue-600 font-bold hover:bg-gray-50 shadow-md transition-colors">Upgrade Now</button>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">PREMIUM</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">₹999<span className="text-lg text-gray-500 font-medium">/project</span></div>
              <ul className="space-y-4 mb-8">
                {['Everything in Basic', 'AI Advanced Features', 'Custom Interior Designs', 'Material Vendor Suggestions', '1-on-1 Expert Call', 'Priority Support'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-600"><CheckCircle size={18} className="text-blue-200" /> {item}</li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors">Go Premium</button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32 bg-white px-6 lg:px-12 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-6">
              Loved by Homeowners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Sharma', city: 'Bangalore', review: 'BuildWise saved me weeks of planning. The cost estimator was incredibly accurate and the PDF report helped my contractor immensely.' },
              { name: 'Priya Patel', city: 'Ahmedabad', review: 'I loved the 3D elevation feature. It allowed me to visualize my dream home perfectly before breaking ground.' },
              { name: 'Anand Kumar', city: 'Chennai', review: 'The AI recommendations for interior layouts were a game-changer for our 2BHK. Highly recommend to anyone building a new house!' }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-[#F8FAFC] rounded-[24px] p-8 border border-gray-100 hover:border-blue-100 transition-colors cursor-pointer">
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" className="text-yellow-400" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 italic">"{testimonial.review}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC] px-6 lg:px-12 relative z-10 border-t border-gray-100/50">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {[
              "How accurate are the construction cost estimates?",
              "Can I export the floor plan and estimate as a PDF?",
              "Can I modify the generated floor plans?",
              "Can I upload my existing plan for AI analysis?",
              "Is this suitable for village or rural homes?"
            ].map((question, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-[16px] overflow-hidden group cursor-pointer hover:border-blue-200 transition-colors shadow-sm hover:shadow-md">
                <div className="px-6 py-5 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{question}</span>
                  <Plus size={20} className="text-gray-400 group-hover:text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 relative z-10">
        <div className="max-w-[1200px] mx-auto bg-blue-600 rounded-[32px] p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-600/30">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
            <h2 className="font-heading text-4xl lg:text-[56px] font-bold text-white leading-tight mb-8">
              Ready to Build Your Dream Home?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Start your first project today for free and experience the smartest way to plan home construction.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-5 rounded-[16px] bg-white text-blue-600 font-bold text-lg hover:bg-gray-50 shadow-xl transition-all">
                Create Free Account
              </button>
              <button className="w-full sm:w-auto px-10 py-5 rounded-[16px] bg-blue-700 text-white font-bold text-lg hover:bg-blue-800 border border-blue-500 shadow-md transition-all">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6 lg:px-12 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">B</div>
                <span className="font-heading font-bold text-xl tracking-tight text-gray-900">BuildWise</span>
              </div>
              <p className="text-gray-500 leading-relaxed mb-6">
                India's smartest AI-powered platform for home construction planning, estimating, and design.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">In</div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">Tw</div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">Fb</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Product</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Reviews</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Disclaimer</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div>&copy; {new Date().getFullYear()} BuildWise. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
