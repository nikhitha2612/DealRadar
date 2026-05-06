import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, ArrowLeft, Mail, Lock, User, Sparkles, Star } from 'lucide-react';

const UnifiedAuthPage = ({ mode = 'login' }) => {
  const { user, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && !authLoading) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center p-4 font-outfit relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="fixed -top-10 -left-10 w-32 md:w-48 h-32 md:h-48 bg-[var(--neo-green)] border-4 border-black -z-10"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="fixed bottom-5 right-5 w-16 md:w-24 h-16 md:h-24 bg-[var(--neo-pink)] border-4 border-black z-[-5] rounded-full shadow-[6px_6px_0_0_black] md:shadow-[10px_10px_0_0_black]"
      ></motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md relative my-8"
      >
        <div className="bg-white border-[4px] md:border-[6px] border-black p-5 md:p-7 shadow-[8px_8px_0_0_black] md:shadow-[12px_12px_0_0_black] relative">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 font-bebas text-base md:text-lg hover:text-[var(--neo-pink)] transition-colors group font-black opacity-40 hover:opacity-100">
            <ArrowLeft size={14} /> Go Back Home
          </Link>

          <div className="flex items-center gap-3 mb-6 md:mb-4">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 bg-black border-[3px] border-black flex items-center justify-center -rotate-6 shadow-[3px_3px_0_0_var(--neo-yellow)] shrink-0"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="font-bebas text-3xl md:text-4xl tracking-normal uppercase leading-none pt-2 font-black">
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </h1>
          </div>

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full border-[3px] border-black bg-white font-bebas text-lg md:text-xl py-2.5 shadow-[4px_4px_0_0_black] md:shadow-[5px_5px_0_0_black] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_black] transition-all flex items-center justify-center gap-3 font-black"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 py-2">
              <div className="h-[2px] bg-black/10 flex-1"></div>
              <span className="font-space font-black text-[9px] text-black/30 uppercase tracking-widest">OR</span>
              <div className="h-[2px] bg-black/10 flex-1"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1 overflow-hidden"
                  >
                    <label className="font-space font-black text-[9px] tracking-widest flex items-center gap-2 uppercase text-black/40">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-[2.5px] md:border-[3px] border-black p-2.5 font-bold text-sm focus:bg-slate-50 outline-none transition-colors shadow-[3px_3px_0_0_black]"
                      placeholder="ENTER NAME"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="space-y-1">
                <label className="font-space font-black text-[9px] tracking-widest flex items-center gap-2 uppercase text-black/40">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-[2.5px] md:border-[3px] border-black p-2.5 font-bold text-sm focus:bg-slate-50 outline-none transition-colors shadow-[3px_3px_0_0_black]"
                  placeholder="YOU@EXAMPLE.COM"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space font-black text-[9px] tracking-widest flex items-center gap-2 uppercase text-black/40">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-[2.5px] md:border-[3px] border-black p-2.5 font-bold text-sm focus:bg-slate-50 outline-none transition-colors shadow-[3px_3px_0_0_black]"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="border-2 border-black bg-red-100 p-2 font-bold text-red-600 text-[10px] shadow-[2px_2px_0_0_black]">
                  Error: {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full border-[3px] border-black font-bebas text-2xl py-3.5 disabled:opacity-50 mt-1 transition-all font-black ${
                  isLogin ? 'bg-[var(--neo-pink)] shadow-[4px_4px_0_0_black] md:shadow-[5px_5px_0_0_black] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_black]' : 'bg-[var(--neo-yellow)] shadow-[4px_4px_0_0_black]'
                }`}
              >
                {loading ? 'Working...' : (isLogin ? 'Login Now' : 'Create Account')}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="font-space font-black text-[9px] uppercase tracking-widest mb-1 text-black/30">
              {isLogin ? "No account yet?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bebas text-xl text-black hover:text-[var(--neo-pink)] transition-colors underline decoration-2 underline-offset-4 font-black"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnifiedAuthPage;
