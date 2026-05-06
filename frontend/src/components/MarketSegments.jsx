import React, { useState } from 'react';
import { Smartphone, Laptop, Headphones, Watch, Shirt, Home, X, TrendingUp, IndianRupee, ArrowRight, Zap } from 'lucide-react';

const segments = [
  { name: 'Phones', icon: Smartphone, color: 'bg-[var(--neo-green)]' },
  { name: 'Laptops', icon: Laptop, color: 'bg-[var(--neo-yellow)]' },
  { name: 'Audio', icon: Headphones, color: 'bg-[var(--neo-pink)]' },
  { name: 'Watches', icon: Watch, color: 'bg-[var(--neo-orange)]' },
  { name: 'Fashion', icon: Shirt, color: 'bg-indigo-400' },
  { name: 'Home', icon: Home, color: 'bg-emerald-400' },
];

const dummyProducts = {
  'Phones': [
    { name: 'iPhone 15 Pro Max', original: 159900, current: 142000, drop: '11%' },
    { name: 'Samsung Galaxy S24 Ultra', original: 129999, current: 114990, drop: '12%' },
    { name: 'Google Pixel 8 Pro', original: 106999, current: 98999, drop: '7%' },
  ],
  'Laptops': [
    { name: 'MacBook Air M3', original: 114900, current: 104900, drop: '9%' },
    { name: 'Dell XPS 13 Plus', original: 149990, current: 129990, drop: '13%' },
    { name: 'ASUS ROG Zephyrus G14', original: 169990, current: 145990, drop: '14%' },
  ],
  'Audio': [
    { name: 'Sony WH-1000XM5', original: 29990, current: 24990, drop: '17%' },
    { name: 'Apple AirPods Pro 2', original: 24900, current: 21999, drop: '12%' },
    { name: 'Sennheiser Momentum 4', original: 34990, current: 27990, drop: '20%' },
  ],
  'Watches': [
    { name: 'Apple Watch Series 9', original: 41900, current: 36900, drop: '12%' },
    { name: 'Samsung Galaxy Watch 6', original: 29999, current: 24999, drop: '16%' },
    { name: 'Garmin Fenix 7 Pro', original: 89990, current: 79990, drop: '11%' },
  ],
  'Fashion': [
    { name: 'Nike Air Force 1', original: 8495, current: 6795, drop: '20%' },
    { name: "Levi's 501 Original Jeans", original: 3999, current: 2799, drop: '30%' },
    { name: 'Daniel Wellington Classic', original: 12999, current: 9999, drop: '23%' },
  ],
  'Home': [
    { name: 'Dyson V15 Detect', original: 59900, current: 52900, drop: '12%' },
    { name: 'Philips Hue Starter Kit', original: 14999, current: 11999, drop: '20%' },
    { name: 'iRobot Roomba j7+', original: 64900, current: 54900, drop: '15%' },
  ]
};

const MarketSegments = ({ onAction }) => {
  const [activeSegment, setActiveSegment] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
        {segments.map((s, i) => (
          <div 
            key={i} 
            onClick={() => setActiveSegment(s)}
            className="group cursor-pointer border-[2px] border-[var(--neo-border)] bg-white shadow-[4px_4px_0_0_var(--neo-shadow)] py-6 px-3 flex flex-col items-center justify-center gap-3 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all active:translate-x-px active:translate-y-px active:shadow-none min-h-[120px]"
          >
            <div className={`p-2.5 border-[2px] border-[var(--neo-border)] ${s.color} shadow-[3px_3px_0_0_var(--neo-shadow)] group-hover:bg-[var(--neo-border)] group-hover:text-white transition-colors`}>
              <s.icon size={20} />
            </div>
            <span className="font-bebas text-xl tracking-tight uppercase text-[#1A1A1A]">{s.name}</span>
          </div>
        ))}
      </div>

      {/* Segment Detail Modal */}
      {activeSegment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setActiveSegment(null)}
          />
          <div className="relative w-full max-w-4xl bg-white border-[4px] border-[var(--neo-border)] shadow-[12px_12px_0_0_var(--neo-shadow)] overflow-hidden sm:flex animate-in zoom-in-95 duration-200">
            {/* Modal Header/Sidebar */}
            <div className={`sm:w-1/4 p-8 flex flex-col justify-between border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-[var(--neo-border)] ${activeSegment.color}`}>
              <div>
                <div className="w-16 h-16 border-[2px] border-[var(--neo-border)] bg-white flex items-center justify-center mb-6 shadow-[3px_3px_0_0_var(--neo-shadow)]">
                  <activeSegment.icon size={32} />
                </div>
                <h3 className="text-3xl font-bebas tracking-tighter uppercase mb-4 leading-none text-[#1A1A1A]">
                  {activeSegment.name} <br/> Trends
                </h3>
                <p className="font-bold text-[10px] leading-tight text-[#1A1A1A]/60 uppercase">
                  Real-time price tracking for global trending {activeSegment.name.toLowerCase()}.
                </p>
              </div>
              <button 
                onClick={() => {
                  const name = activeSegment.name;
                  setActiveSegment(null);
                  if (onAction) onAction(name);
                }}
                className="mt-12 flex items-center gap-2 font-bebas text-2xl hover:translate-x-2 transition-transform uppercase text-[#1A1A1A]"
              >
                Track All Deals <ArrowRight size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="sm:w-2/3 p-10 bg-[#FDFCF0] relative">
              <button 
                onClick={() => setActiveSegment(null)}
                className="absolute top-6 right-6 p-2 border-[2px] border-[var(--neo-border)] bg-white hover:bg-[var(--neo-border)] hover:text-white transition-all shadow-[3px_3px_0_0_var(--neo-shadow)] active:shadow-none active:translate-x-px active:translate-y-px"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-[var(--neo-border)] text-white p-2">
                   <TrendingUp size={20} />
                </div>
                <h4 className="font-bebas text-3xl tracking-tight uppercase text-[#1A1A1A]">Trending Opportunities</h4>
              </div>

              <div className="space-y-4">
                {(dummyProducts[activeSegment.name] || dummyProducts['Smartphones']).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex w-full items-center justify-between p-6 border-[3px] border-[var(--neo-border)] bg-white shadow-[4px_4px_0_0_var(--neo-shadow)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_var(--neo-shadow)] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 border-[2px] border-[var(--neo-border)] bg-slate-50 flex items-center justify-center shadow-[3px_3px_0_0_var(--neo-shadow)] group-hover:bg-[var(--neo-green)] transition-colors">
                        <IndianRupee size={24} />
                      </div>
                      <div className="text-[#1A1A1A]">
                        <div className="font-bebas text-2xl uppercase tracking-tight">{item.name}</div>
                        <div className="text-[10px] font-black uppercase text-red-500 tracking-widest">{item.drop} PRICE DROP</div>
                      </div>
                    </div>
                    <div className="text-right text-[#1A1A1A]">
                      <div className="font-bebas text-3xl leading-none">₹{item.current.toLocaleString('en-IN')}</div>
                      <div className="text-[12px] font-medium text-[#1A1A1A]/40 line-through">₹{item.original.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketSegments;
