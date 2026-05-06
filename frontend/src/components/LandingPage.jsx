import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Bell, TrendingDown, ShieldCheck, Zap, ArrowRight, Star, CheckCircle2, Globe, Search, BarChart3 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Marquee = ({ text, color = "bg-black", textColor = "text-white" }) => (
  <div className={`overflow-hidden py-3 ${color} border-b-[4px] border-black whitespace-nowrap flex relative items-center`}>
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      className={`flex gap-20 items-center ${textColor} font-space font-black text-xs uppercase tracking-[0.2em]`}
    >
      {[...Array(15)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-4">
            {text} <div className="w-1.5 h-1.5 bg-[var(--neo-pink)] rounded-full" />
          </span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

const LandingPage = () => {
  return (
    <div className="h-screen bg-[#FDFCF0] bg-dot-grid text-black font-outfit selection:bg-[var(--neo-pink)] selection:text-white overflow-y-scroll scroll-smooth">
      
      {/* Top Banner Ticker */}
      <section className="relative z-[60]">
        <Marquee text="SMART DEAL NOTIFIER" color="bg-black" textColor="text-white" />
      </section>

      {/* Navigation & Hero Section */}
      <section className="min-h-screen flex flex-col relative overflow-hidden px-4 md:px-8">
        {/* Aesthetic separation line */}
        <div className="absolute top-0 right-[40%] w-[1px] h-full bg-black/5 -z-10 hidden md:block" />

        <div className="pt-4 md:pt-6 w-full max-w-[1550px] mx-auto z-50">
          <nav className="bg-white border-[3px] md:border-[4px] border-black p-3 md:p-4 flex justify-between items-center w-full shadow-[6px_6px_0_0_black] md:shadow-[8px_8px_0_0_black] hover:shadow-[12px_12px_0_0_#FF6AC1] transition-all">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 md:gap-4 group cursor-pointer pl-2 md:pl-4"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-black flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="font-bebas text-3xl md:text-4xl tracking-tighter pt-1 uppercase">DealRadar</span>
            </motion.div>
            
            <div className="flex gap-4 md:gap-8 items-center pr-2 md:pr-4">
              <Link to="/login" className="font-space font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:text-[var(--neo-pink)] transition-colors hidden sm:block border-b-2 border-transparent hover:border-black pb-1">Login</Link>
              <Link to="/signup">
                <motion.button 
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[var(--neo-yellow)] text-black font-bebas text-xl md:text-2xl px-6 md:px-12 py-2 md:py-3 border-[2.5px] md:border-[3px] border-black shadow-[3px_3px_0_0_black] md:shadow-[4px_4px_0_0_black]"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="relative pt-16 pb-12 px-2 max-w-[1500px] mx-auto grid lg:grid-cols-12 gap-10 items-center flex-1">
          <motion.div 
            variants={stagger}
            initial="initial"
            animate="animate"
            className="lg:col-span-7"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 border-[3px] border-black bg-[var(--neo-yellow)] font-space font-black text-xs tracking-widest uppercase mb-8 shadow-[4px_4px_0_0_black]">
              <Zap size={14} className="fill-black" /> #1 PRICE TRACKER
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4 mb-3 px-2 md:px-0">
              <h1 className="font-bebas text-6xl md:text-[7.2rem] leading-[0.9] md:leading-none tracking-tighter uppercase flex items-center flex-wrap gap-x-2">
                <span>STOP</span>
                <span className="bg-[var(--neo-pink)] text-white px-3 py-1 border-[3.5px] border-black shadow-[5px_5px_0_0_black]">OVER-</span>
                <span className="bg-[var(--neo-orange)] px-4 py-1.5 md:py-2 border-[3.5px] md:border-[4px] border-black inline-block shadow-[5px_5px_0_0_black] md:shadow-[6px_6px_0_0_black] translate-y-1">PAYING.</span>
              </h1>
            </motion.div>

            <motion.p variants={fadeInUp} className="font-playfair italic text-xl md:text-3xl text-slate-700 max-w-2xl leading-relaxed mb-10 px-2 md:px-0">
              "We track product prices automagically so you can save real money on every purchase. Simple and efficient."
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-14 px-2 md:px-0">
              <Link to="/signup" className="w-full md:w-auto bg-black text-white border-[4px] border-black font-bebas text-2xl md:text-3xl px-8 md:px-12 py-4 md:py-5 shadow-[6px_6px_0_0_#FF6AC1] md:shadow-[8px_8px_0_0_#FF6AC1] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center">
                Get Started Now
              </Link>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[2.5px] md:border-[3px] border-black bg-white overflow-hidden shadow-[2px_2px_0_0_black]">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 124}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="font-space">
                  <p className="font-black text-lg md:text-xl leading-none">15,000+</p>
                  <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1 whitespace-nowrap">Students & Shoppers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Interactive Element */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="bg-white border-[4px] md:border-[5px] border-black p-6 md:p-8 relative z-20 shadow-[10px_10px_0_0_black] md:shadow-[14px_14px_0_0_black] max-w-[340px] md:max-w-sm w-full"
            >
              <div className="bg-[#f8f8f8] border-[2px] md:border-[3px] border-black p-4 md:p-5 mb-6 md:p-8 flex gap-4 md:gap-5 items-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-1 bg-black text-white font-space text-[7px] md:text-[8px] tracking-widest uppercase px-2">ID: 9942</div>
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-[var(--neo-yellow)] border-[2.5px] md:border-[3px] border-black flex items-center justify-center p-2 group-hover:rotate-12 transition-transform shrink-0"><TrendingDown size={24} /></div>
                 <div>
                   <div className="font-space font-black text-[9px] md:text-[10px] leading-none text-slate-400 mb-2 uppercase tracking-widest whitespace-nowrap">Current Product</div>
                   <div className="font-space font-black text-2xl md:text-3xl leading-none tracking-tighter whitespace-nowrap">₹1,14,990</div>
                 </div>
              </div>

              <div className="bg-black text-white p-5 md:p-7 border-[3px] md:border-[4px] border-black relative group">
                 <div className="absolute top-4 right-4 flex items-center gap-2">
                   <div className="w-2 h-2 bg-[var(--neo-green)] rounded-full animate-ping" />
                   <div className="w-2 h-2 bg-[var(--neo-green)] rounded-full absolute" />
                 </div>
                 <div className="font-bebas text-xl md:text-2xl uppercase mb-4 md:mb-6 tracking-widest flex items-center gap-3">
                   <Bell size={16} className="text-[var(--neo-yellow)]" /> DEAL ALERT
                 </div>
                 <p className="font-outfit font-bold text-sm md:text-base mb-8 md:mb-10 text-slate-400 leading-relaxed">
                   Smart drop detected! Get this for <span className="text-[var(--neo-green)]">₹12k less</span> right now.
                 </p>
                 <motion.button 
                   whileHover={{ scale: 1.02, x: 2, y: -2 }}
                   className="w-full bg-[var(--neo-pink)] text-black font-bebas text-2xl md:text-3xl py-3 md:py-4 border-[2.5px] md:border-[3px] border-black shadow-[4px_4px_0_0_white] hover:shadow-[6px_6px_0_1px_white] transition-all"
                 >
                   Buy Now
                 </motion.button>
              </div>
            </motion.div>
            
            {/* Minimalist abstract shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-[1px] border-black/5 -z-20 rounded-full hidden md:block" />
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[var(--neo-purple)] border-[3px] md:border-4 border-black -rotate-12 -z-10 translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>


      {/* Social Proof Marquee */}
      <section className="my-16">
        <Marquee text="TRUSTED BY 50,000+ SHOPPERS" color="bg-black" textColor="text-white" />
      </section>

      {/* How it works with Neobrutalism Bento Grid */}
      <section className="min-h-[80vh] flex flex-col justify-center py-20 px-4 md:px-10 max-w-[1500px] mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-8 border-black pl-5 md:pl-8">
           <h2 className="font-bebas text-6xl md:text-8xl leading-[0.9] md:leading-none uppercase">THE ENGINE <br /> <span className="text-[var(--neo-green)]">UNDER THE HOOD</span></h2>
           <p className="font-playfair italic text-lg md:text-xl max-w-sm text-slate-500">A clean, automated pipeline designed to save you time and money.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
          {[
            { title: 'RESEARCH', icon: <Search />, color: 'bg-white', text: 'Our crawlers scan 500+ stores instantly to find the best current price.', col: 'sm:col-span-2' },
            { title: 'TRACK', icon: <TrendingDown />, color: 'bg-[var(--neo-yellow)]', text: 'Set your threshold once. We monitor it 24/7.', col: 'sm:col-span-1' },
            { title: 'VALIDATE', icon: <ShieldCheck />, color: 'bg-[var(--neo-pink)]', text: 'AI filters out fake deals and marketing traps.', col: 'sm:col-span-1' },
            { title: 'NOTIFY', icon: <Zap />, color: 'bg-[var(--neo-orange)]', text: 'Get instant alerts the moment a price hits your target.', col: 'sm:col-span-2' },
            { title: 'ANALYZE', icon: <BarChart3 />, color: 'bg-[var(--neo-purple)]', text: 'Visual price history shows you the best time to buy.', col: 'sm:col-span-2', textColor: 'text-white' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -4 }}
              className={`${item.color} ${item.col} p-6 md:p-8 border-[3px] md:border-[4px] border-black shadow-[4px_4px_0_0_black] md:shadow-[6px_6px_0_0_black] group flex flex-col justify-between`}
            >
              <div className={`${item.textColor || 'text-black'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 border-[2.5px] md:border-[3px] border-black bg-white flex items-center justify-center mb-5 md:mb-6 shadow-[3px_3px_0_0_black] text-black">
                  {React.cloneElement(item.icon, { size: 20 })}
                </div>
                <h3 className="font-bebas text-3xl md:text-4xl mb-2 md:mb-3 tracking-tight">{item.title}</h3>
                <p className="font-outfit font-bold text-base md:text-lg leading-snug">{item.text}</p>
              </div>
              <div className="mt-6 flex justify-end">
                <ArrowRight className={`group-hover:translate-x-2 transition-transform ${item.textColor || 'text-black'}`} size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Stores Section - Sophisticated Logo Gallery */}
      <section className="py-24 px-10 max-w-[1500px] mx-auto overflow-hidden">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-[var(--neo-green)] border-2 border-black font-space font-black text-xs uppercase tracking-widest shadow-[4px_4px_0_0_black]">Verified Partners</div>
              <h2 className="font-bebas text-7xl md:text-8xl leading-none">SHOP ANYWHERE. <br /><span className="text-slate-400">GLOBAL COVERAGE.</span></h2>
            </div>
            <p className="font-outfit font-bold text-xl text-black/60 max-w-sm leading-relaxed">
              Real-time monitoring across your favorite global stores and local marketplaces. Sharp and fast.
            </p>
         </div>

         <div className="relative">
            {/* Logo Cloud - Row 1 (Higher Speed) */}
            <div className="flex gap-4 mb-6 md:mb-8 overflow-hidden">
              <motion.div 
                animate={{ x: [0, -1200] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="flex gap-4 md:gap-8 whitespace-nowrap will-change-transform"
              >
                {[
                  { name: 'Amazon', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
                  { name: 'Flipkart', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg' },
                  { name: 'Walmart', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg' },
                  { name: 'eBay', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg' },
                  { name: 'Best Buy', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_logo.svg' },
                  { name: 'Target', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_vector.svg' },
                  { name: 'Myntra', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_logo.png' },
                  { name: 'Reliance', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Reliance_Digital_logo.png' }
                ].map((shop, i) => (
                  <div key={i} className="px-8 md:px-12 py-5 md:py-7 border-[2px] md:border-[3px] border-black bg-white shadow-[4px_4px_0_0_black] md:shadow-[6px_6px_0_0_black] flex items-center gap-4 md:gap-6 min-w-[240px] md:min-w-[320px]">
                    <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                      <ShoppingBag className="text-black" size={24} />
                    </div>
                    <span className="font-bebas text-2xl md:text-4xl pt-1 text-black tracking-tight uppercase">{shop.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Logo Cloud - Row 2 (Lower Speed, Reverse) */}
            <div className="flex gap-6 overflow-hidden">
              <motion.div 
                animate={{ x: [-1200, 0] }}
                transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                className="flex gap-8 whitespace-nowrap will-change-transform"
              >
                {[
                  { name: 'Apple', icon: 'https://cdn.simpleicons.org/apple' },
                  { name: 'Samsung', icon: 'https://cdn.simpleicons.org/samsung' },
                  { name: 'Nike', icon: 'https://cdn.simpleicons.org/nike' },
                  { name: 'Adidas', icon: 'https://cdn.simpleicons.org/adidas' },
                  { name: 'Dell', icon: 'https://cdn.simpleicons.org/dell' },
                  { name: 'Lenovo', icon: 'https://cdn.simpleicons.org/lenovo' },
                  { name: 'Zara', icon: 'https://cdn.simpleicons.org/zara' },
                  { name: 'H&M', icon: 'https://cdn.simpleicons.org/handm' },
                  { name: 'Apple', icon: 'https://cdn.simpleicons.org/apple' },
                  { name: 'Nike', icon: 'https://cdn.simpleicons.org/nike' },
                  { name: 'Adidas', icon: 'https://cdn.simpleicons.org/adidas' }
                ].map((shop, i) => (
                  <div key={i} className="px-12 py-7 border-[3px] border-black bg-white shadow-[6px_6px_0_0_black] flex items-center gap-6 min-w-[320px]">
                    <div className="w-12 h-12 flex items-center justify-center shrink-0">
                      <img 
                        src={shop.icon} 
                        alt="" 
                        className="w-full h-full object-contain" 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <ShoppingBag className="hidden text-black" size={40} />
                    </div>
                    <span className="font-bebas text-4xl pt-1 text-black tracking-tight uppercase">{shop.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
         </div>
      </section>

      {/* Stats Dashboard - Creative Light Theme */}
      <section className="py-12 px-4 md:px-10 max-w-[1500px] mx-auto relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[dotted-grid]" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { value: '4.2B+', label: 'Scraped Yearly', color: 'text-[var(--neo-pink)]', bg: 'bg-white', icon: <Globe size={24} /> },
            { value: '₹140M+', label: 'User Savings', color: 'text-[var(--neo-green)]', bg: 'bg-white', icon: <TrendingDown size={24} /> },
            { value: '800+', label: 'AI Verifications', color: 'text-[var(--neo-orange)]', bg: 'bg-white', icon: <Zap size={24} /> }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, shadow: "12px 12px 0 0 #000" }}
              className={`${stat.bg} border-[3px] md:border-[4px] border-black p-6 md:p-8 shadow-[6px_6px_0_0_black] md:shadow-[8px_8px_0_0_black] relative group overflow-hidden`}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 md:w-16 md:h-16 bg-black/5 rounded-full group-hover:scale-150 transition-transform" />
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-black flex items-center justify-center text-white -rotate-6 group-hover:rotate-0 transition-transform shrink-0">
                  {React.cloneElement(stat.icon, { size: 18 })}
                </div>
                <div className="w-full h-[1.5px] bg-black/10" />
              </div>
              <div className={`font-bebas text-6xl md:text-8xl leading-none mb-2 md:mb-3 tracking-tighter ${stat.color}`}>{stat.value}</div>
              <div className="font-space font-black text-[9px] md:text-xs uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA - Clean & High Impact Dark Theme */}
      <section className="min-h-[70vh] md:min-h-[90vh] flex flex-col justify-center py-20 px-4 md:px-10 bg-[#151515] border-t-[6px] border-black relative overflow-hidden text-white">
        {/* Abstract background element - cleaner placement */}
        <div className="absolute -top-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-12 md:space-y-16">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="inline-block px-4 md:px-6 py-1.5 md:py-2 bg-[var(--neo-yellow)] text-black font-space font-black text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] transform -rotate-2">
              Final Call to Action
            </div>
            
            <h2 className="font-bebas text-6xl md:text-[9.5rem] leading-[0.85] md:leading-[0.8] tracking-tighter uppercase px-2">
              STOP GIVING YOUR <br />
              <span className="bg-white text-black px-4 md:px-8 py-2 md:py-3 border-[4px] md:border-[6px] border-black inline-block shadow-[8px_8px_0_0_#FF6AC1] md:shadow-[12px_12px_0_0_#FF6AC1] mt-4">MONEY AWAY.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <Link to="/signup">
              <motion.button 
                whileHover={{ scale: 1.05, rotate: 1, shadow: "12px 12px 0 0 white" }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto bg-[var(--neo-pink)] text-black border-[3.5px] md:border-[5px] border-black font-bebas text-2xl md:text-4xl px-8 md:px-16 py-3.5 md:py-6 shadow-[6px_6px_0_0_white] md:shadow-[10px_10px_0_0_white] transition-all"
              >
                Create Account Now
              </motion.button>
            </Link>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="bg-white text-black border-[4px] border-black p-6 shadow-[8px_8px_0_0_#FF6AC1] text-left max-w-xs rotate-2"
            >
              <div className="flex gap-1 mb-3 text-[var(--neo-yellow)]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="font-outfit font-bold text-sm text-slate-800 leading-snug">
                "Saved enough for a flight ticket using the price alerts. Absolute game changer for my budget."
              </p>
              <p className="font-space font-black text-[10px] uppercase tracking-widest text-slate-400 mt-4">@NikkTheShopper</p>
            </motion.div>
          </div>
        </div>

        {/* Bottom abstract accent */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-white/5 -z-10 translate-x-1/4 translate-y-1/4 rounded-full" />
      </section>

      {/* Footer - Simple & Clean Pro */}
      <footer className="bg-white border-t-2 border-black py-10 px-10 relative bg-dot-grid">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo & Concept */}
          <div className="space-y-4 max-w-xs">
            <h2 className="font-bebas text-5xl tracking-tight">DealRadar</h2>
            <p className="font-outfit font-bold text-sm text-black/70 leading-relaxed">
              Precision price tracking and real-time alerts. Built for smart shoppers who value their time and budget.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            <div className="space-y-3">
              <h3 className="font-space font-black text-[11px] uppercase tracking-widest text-black">Platform</h3>
              <ul className="space-y-1 font-outfit font-bold text-sm text-black/80">
                <li className="hover:underline cursor-pointer transition-all">Live Scraper</li>
                <li className="hover:underline cursor-pointer transition-all">Price History</li>
                <li className="hover:underline cursor-pointer transition-all">Stock Alerts</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-space font-black text-[11px] uppercase tracking-widest text-black">Support</h3>
              <ul className="space-y-1 font-outfit font-bold text-sm text-black/80">
                <li className="hover:underline cursor-pointer transition-all">Documentation</li>
                <li className="hover:underline cursor-pointer transition-all">Security</li>
                <li className="hover:underline cursor-pointer transition-all">Contact</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-space font-black text-[11px] uppercase tracking-widest text-black">Social</h3>
              <ul className="space-y-1 font-outfit font-bold text-sm text-black/80">
                <li className="hover:underline cursor-pointer transition-all">Twitter</li>
                <li className="hover:underline cursor-pointer transition-all">Github</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-4 font-space font-black text-[11px] uppercase tracking-[0.2em] text-black">
          <div>© 2026 DealRadar. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
