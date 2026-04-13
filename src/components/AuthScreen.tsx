import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from './BaseUI';
import { 
  User, Flame, ArrowLeft, Loader2, KeyRound
} from 'lucide-react';

const AuthScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState<'options' | 'signin' | 'signup'>('options');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signInWithCredentials, signUpWithCredentials, signInAsGuest, user } = useAuth();

  useEffect(() => {
    if (user) {
      onComplete();
    }
  }, [user]);

  useEffect(() => {
    // Reset fields when changing steps
    setError('');
    setUsername('');
    setPassword('');
  }, [step]);

  const validateInput = () => {
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (/\s/.test(username)) {
      setError('Username cannot contain spaces');
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInput()) return;
    setLoading(true);
    setError('');
    try {
      await signInWithCredentials(username.trim(), password);
      onComplete();
    } catch (err: any) {
      let msg = err.message || 'Failed to sign in';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        msg = 'Invalid username or password';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateInput()) return;
    setLoading(true);
    setError('');
    try {
      await signUpWithCredentials(username.trim(), password);
      onComplete();
    } catch (err: any) {
      let msg = err.message || 'Failed to create account';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'Username is already taken';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInAsGuest();
      onComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in as guest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/10 to-surface flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="w-full max-w-sm space-y-8"
        >
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary flex items-center justify-center">
              <Flame size={48} className="text-white" />
            </div>
            <h1 className="text-3xl font-headline font-bold">Sai Seva AI</h1>
            <p className="text-on-surface-variant/60">Sign in to track your spiritual journey</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {step === 'options' && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="space-y-4"
            >
              <Button 
                onClick={() => setStep('signin')}
                disabled={loading}
                className="w-full py-4 flex items-center justify-center gap-3 bg-primary text-white"
              >
                <User size={20} />
                Sign In
              </Button>

              <Button 
                onClick={() => setStep('signup')}
                disabled={loading}
                variant="outline"
                className="w-full py-4 flex items-center justify-center gap-3 border-2 border-primary/20 text-primary"
              >
                <KeyRound size={20} />
                Create Account
              </Button>

              <div className="relative pt-4 pb-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/40"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-surface px-4 text-xs text-on-surface-variant/60 tracking-widest uppercase font-bold">Or</span>
                </div>
              </div>

              <Button 
                onClick={handleGuestLogin}
                disabled={loading}
                variant="ghost"
                className="w-full py-4 flex items-center justify-center gap-3 text-on-surface-variant hover:text-primary hover:bg-primary/5"
              >
                <User size={20} />
                Continue as Guest
              </Button>
            </motion.div>
          )}

          {(step === 'signin' || step === 'signup') && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="space-y-4"
            >
              <button 
                onClick={() => setStep('options')}
                className="flex items-center gap-2 text-on-surface-variant/60 hover:text-primary"
              >
                <ArrowLeft size={18} /> Back
              </button>
              
              <Card className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-center">
                  {step === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h2>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-lg focus:outline-none focus:border-primary"
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <Button 
                  onClick={step === 'signin' ? handleSignIn : handleSignUp}
                  disabled={!username || !password || loading}
                  className="w-full py-3 mt-4"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : (
                    step === 'signin' ? 'Sign In' : 'Sign Up'
                  )}
                </Button>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;
