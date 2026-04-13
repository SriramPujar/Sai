import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, MessageSquare, BookOpen, MapPin, User, 
  Bell, Heart, Calendar, Sparkles, Wind, 
  Play, Pause, ChevronRight, Search, Filter,
  Clock, Users, CheckCircle2, Info, Share2,
  Mic, Send, Save, ArrowLeft, Volume2, VolumeX,
  SkipBack, SkipForward, Repeat, Music
} from 'lucide-react';
import { cn } from './lib/utils';
import { NavItem, Card, Button, Toast } from './components/BaseUI';
import { Mood, ChatMessage, Aarti, SevaSuggestion, Temple, SaiAnswer, JournalEntry } from './types';
import { AARTIS, SEVA_SUGGESTIONS, TEMPLES, SAI_TEACHINGS } from './data';
import { askSai, getMoodGuidance, getDailyGuidance, interpretSaiAnswer } from './services/geminiService';
import { getSaiAnswer } from './data/saiAnswers';

// --- Sub-components for Screens ---

const HomeScreen = ({ onNavigate }: { onNavigate: (s: string) => void }) => {
  const isThursday = new Date().getDay() === 4;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a reliable MP3 source instead of OGG to ensure cross-browser compatibility
    audioRef.current = new Audio('https://cdn.freesound.org/previews/118/118237_1662148-lq.mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Streak Widget */}
      <section className="bg-surface-container-low p-4 rounded-lg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Active Streak</p>
            <p className="text-base font-bold text-primary">12 Days</p>
          </div>
        </div>
        <div className="flex -space-x-1">
          {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
            <div key={i} className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-surface",
              i < 4 ? "bg-primary-container text-on-primary-container" : "bg-surface-container-highest text-on-surface-variant/40"
            )}>
              {d}
            </div>
          ))}
        </div>
      </section>

      {/* Sai Baba Answers Premium Card */}
      <Card className="bg-on-background p-0 overflow-hidden relative group cursor-pointer" onClick={() => onNavigate('sai-answers')}>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary-fixed/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        <div className="p-6 flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center text-primary-fixed">
            <Sparkles size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-headline font-bold text-lg">Sai Baba Answers</h3>
            <p className="text-primary-fixed/60 text-xs">Choose a number (1-720) for guidance.</p>
          </div>
          <ChevronRight className="text-primary-fixed/40" />
        </div>
      </Card>

      {/* Daily Guidance */}
      <Card className="relative overflow-hidden group p-0">
        <div className="h-48 w-full relative bg-gradient-to-br from-primary-fixed/30 via-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary-fixed/20 flex items-center justify-center">
            <Sparkles size={48} className="text-primary" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent" />
        </div>
        <div className="relative z-10 p-6 pt-0 space-y-4">
          <div className="text-primary opacity-40 -mt-6">
            <span className="text-4xl font-serif">"</span>
          </div>
          <h2 className="text-xl font-headline font-bold text-on-background leading-relaxed">
            "Why fear when I am here? Cast your entire burden on Me and I will surely bear it."
          </h2>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-medium text-on-surface-variant italic">— Shri Shirdi Sai Baba</span>
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const shareText = `"Why fear when I am here? Cast your entire burden on Me and I will surely bear it." — Shri Shirdi Sai Baba\n\nShared via Sai Seva AI`;
                  if (navigator.share) {
                    navigator.share({ title: 'Sai Baba Guidance', text: shareText });
                  } else {
                    navigator.clipboard.writeText(shareText);
                    alert('Copied to clipboard!');
                  }
                }}
                className="p-2 bg-surface-container-high rounded-full text-primary hover:bg-primary-fixed/20 transition-all"
              >
                <Share2 size={16} />
              </button>
              <Button variant="primary" className="px-6 py-2 text-xs" onClick={() => onNavigate('ask-sai')}>Reflect</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Thursday Banner */}
      {isThursday && (
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          onClick={() => onNavigate('thursday')}
          className="bg-primary-fixed/30 border border-primary-fixed-dim rounded-lg px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-primary-fixed/40 transition-all"
        >
          <div className="flex items-center gap-3 text-primary">
            <Calendar size={20} />
            <span className="font-bold text-sm">Today is Guruwar (Thursday)</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">Special Aarti</span>
        </motion.div>
      )}

      {/* Mood Check-in */}
      <section>
        <h3 className="text-lg font-headline font-bold mb-4">How are you feeling today?</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {['Peaceful', 'Seeking', 'Anxious', 'Grateful', 'Overwhelmed'].map((m) => (
            <button 
              key={m}
              onClick={() => onNavigate('comfort')}
              className="flex-shrink-0 px-6 py-3 rounded-full bg-surface-container-low text-on-surface font-medium hover:bg-primary-container hover:text-on-primary-container transition-all"
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-2 gap-4">
        {[
          { id: 'ask-sai', label: 'Ask Sai', sub: 'Divine Guidance', icon: MessageSquare, color: 'bg-primary-container/10', iconColor: 'text-primary' },
          { id: 'parayan', label: 'Parayan', sub: 'Reading Plan', icon: BookOpen, color: 'bg-secondary-container/10', iconColor: 'text-secondary' },
          { id: 'bhajans', label: 'Bhajans', sub: 'Devotional Songs', icon: Music, color: 'bg-tertiary-container/10', iconColor: 'text-tertiary' },
          { id: 'aarti', label: 'Aarti', sub: 'Live & Recorded', icon: Wind, color: 'bg-tertiary-container/10', iconColor: 'text-tertiary' },
          { id: 'temples', label: 'Temples', sub: 'Find Nearby', icon: MapPin, color: 'bg-secondary-container/10', iconColor: 'text-secondary' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn("p-5 rounded-xl flex flex-col justify-between h-36 text-left transition-all hover:shadow-md", item.color)}
          >
            <item.icon className={item.iconColor} size={28} />
            <div>
              <h4 className="font-headline font-bold text-on-background">{item.label}</h4>
              <p className="text-[10px] text-on-surface-variant/60">{item.sub}</p>
            </div>
          </button>
        ))}
      </section>


      {/* Daily Mantra */}
      <section className="bg-on-background rounded-xl p-8 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-5 flex items-center justify-center">
          <Sparkles size={160} />
        </div>
        <div className="relative z-10 space-y-4">
          <p className="text-primary-fixed uppercase tracking-[0.3em] text-[10px] font-bold">Daily Mantra</p>
          <h3 className="text-2xl font-headline font-extrabold text-white">Om Shri Sai Nathaya Namah</h3>
          <p className="text-sm text-primary-fixed/80 italic">"I bow to Lord Sai Nath"</p>
          <div className="flex justify-center">
            <button 
              onClick={toggleAudio}
              className="w-14 h-14 rounded-full bg-primary-fixed/10 border border-primary-fixed/30 flex items-center justify-center text-primary-fixed hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const SaiBabaAnswersScreen = () => {
  const [step, setStep] = useState<'intro' | 'input' | 'loading' | 'result'>('intro');
  const [number, setNumber] = useState('');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<SaiAnswer | null>(null);
  const [aiReflection, setAiReflection] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `Sai Baba's Answer #${result.id}: ${result.title}\n\n"${result.main_message}"\n\nPractical Action: ${result.practical_action}\n\nReceived via Sai Seva AI`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sai Baba Answers',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast('Copied to clipboard!');
      } catch (err) {
        console.error('Error copying:', err);
      }
    }
  };

  const handleSave = () => {
    if (!result) return;
    const savedItems = JSON.parse(localStorage.getItem('saved_answers') || '[]');
    const newItem = {
      ...result,
      date: new Date().toLocaleDateString(),
      aiReflection
    };
    localStorage.setItem('saved_answers', JSON.stringify([newItem, ...savedItems]));
    showToast('Saved to your profile!');
  };

  const handleBegin = () => setStep('input');

  const handleReceiveGuidance = async () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 1 || num > 720) return;

    setStep('loading');
    
    // Artificial delay for sacred feel
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const answer = getSaiAnswer(num);
    setResult(answer);
    setStep('result');

    if (question.trim()) {
      setIsAiLoading(true);
      const reflection = await interpretSaiAnswer(answer, question);
      setAiReflection(reflection);
      setIsAiLoading(false);
    }
  };

  const handleShuffle = () => {
    const randomNum = Math.floor(Math.random() * 720) + 1;
    setNumber(randomNum.toString());
  };

  if (step === 'intro') {
    return (
      <div className="space-y-12 py-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-headline font-extrabold text-primary">Sai Baba Answers</h2>
          <p className="text-on-surface-variant italic">“Think with faith. Ask with sincerity. Receive with patience.”</p>
        </div>

        <div className="w-48 h-48 bg-primary-fixed/20 rounded-full flex items-center justify-center mx-auto relative overflow-hidden shadow-2xl border-4 border-primary/20">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute inset-0 bg-primary-fixed/30 rounded-full blur-2xl"
          />
          <div className="w-full h-full flex items-center justify-center bg-primary-fixed/10 relative z-10">
            <Sparkles size={64} className="text-primary" />
          </div>
        </div>

        <div className="space-y-6 max-w-xs mx-auto text-sm text-on-surface-variant leading-relaxed">
          <p>Sit calmly. Think of Sai Baba. Hold your question in your heart. Enter a number between 1 and 720.</p>
          <Button className="w-full py-4 text-lg" onClick={handleBegin}>Begin</Button>
        </div>
      </div>
    );
  }

  if (step === 'input') {
    return (
      <div className="space-y-12 py-8">
        <Button variant="ghost" className="px-0 flex items-center gap-2" onClick={() => setStep('intro')}>
          <ArrowLeft size={16} /> Back
        </Button>

        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl font-headline font-bold">Your Sacred Number</h3>
            <p className="text-xs text-on-surface-variant/60">Enter a number between 1 and 720 with faith and focus.</p>
          </div>

          <div className="space-y-6">
            <input 
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="1-720"
              className="w-full text-center text-6xl font-headline font-extrabold bg-transparent border-b-4 border-primary-fixed py-4 focus:outline-none focus:border-primary transition-all placeholder:text-surface-container-highest"
            />
            
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40">Optional: Share your question</p>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What is in your heart today?"
                className="w-full bg-surface-container-low rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 min-h-[100px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full py-5 text-lg" 
              disabled={!number || parseInt(number) < 1 || parseInt(number) > 720}
              onClick={handleReceiveGuidance}
            >
              Receive Sai’s Guidance
            </Button>
            <button 
              onClick={handleShuffle}
              className="text-primary font-bold text-sm flex items-center justify-center gap-2 mx-auto hover:opacity-80"
            >
              <Sparkles size={16} /> Let Sai Choose for Me
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-12">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="w-32 h-32 border-4 border-primary-fixed/20 border-t-primary rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-primary">
            <Sparkles size={32} className="animate-pulse" />
          </div>
        </div>
        <div className="space-y-3">
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-lg font-headline font-bold text-primary"
          >
            Reflecting with Shraddha and Saburi...
          </motion.p>
          <p className="text-xs text-on-surface-variant/60">Opening today’s spiritual answer</p>
        </div>
      </div>
    );
  }

  if (step === 'result' && result) {
    return (
      <div className="space-y-8 pb-12">
        <div className="flex justify-between items-center">
          <Button variant="ghost" className="px-0 flex items-center gap-2" onClick={() => setStep('input')}>
            <ArrowLeft size={16} /> Ask Again
          </Button>
          <span className="text-xs font-bold text-primary bg-primary-fixed/20 px-3 py-1 rounded-full">Answer #{result.id}</span>
        </div>

        <Card className="bg-surface-container-lowest border border-primary-fixed/20 p-8 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary-fixed/10 rounded-full blur-2xl" />
          
          <div className="text-center space-y-4 relative z-10">
            <h3 className="text-2xl font-headline font-extrabold text-on-background leading-tight">{result.title}</h3>
            <div className="w-12 h-1 bg-primary-fixed mx-auto rounded-full" />
          </div>

          <div className="space-y-6 relative z-10">
            <p className="text-base text-on-surface leading-relaxed text-center font-medium">
              {result.main_message}
            </p>

            {aiReflection && (
              <div className="p-5 bg-primary-fixed/10 rounded-2xl border border-primary-fixed/20 space-y-2">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Personalized Reflection</p>
                <p className="text-sm italic text-on-primary-fixed leading-relaxed">{aiReflection}</p>
              </div>
            )}
            {isAiLoading && (
              <div className="p-5 bg-primary-fixed/5 rounded-2xl animate-pulse flex items-center gap-3">
                <div className="w-2 h-2 bg-primary/40 rounded-full" />
                <p className="text-[10px] font-bold text-primary/40 uppercase">Personalizing reflection...</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Practical Action</p>
                  <p className="text-sm font-medium">{result.practical_action}</p>
                </div>
              </div>
              
              {result.mantra && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Mantra</p>
                    <p className="text-sm font-medium">{result.mantra}</p>
                  </div>
                </div>
              )}

              {result.chapter_recommendation && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Satcharitra Reading</p>
                    <p className="text-sm font-medium">{result.chapter_recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-[10px] text-center text-on-surface-variant/40 pt-8 italic">
            This is a spiritually inspired reflection for faith and contemplation.
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button className="flex items-center justify-center gap-2 py-4" onClick={handleSave}>
            <Save size={18} /> Save
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2 py-4" onClick={handleShare}>
            <Share2 size={18} /> Share
          </Button>
          <Button variant="ghost" className="col-span-2 flex items-center justify-center gap-2 py-4 text-secondary" onClick={() => showToast('Baba is always with you!')}>
            <Heart size={18} /> This Helped Me
          </Button>
        </div>

        <Toast visible={toast.visible} message={toast.message} onClose={() => setToast({ ...toast, visible: false })} />
      </div>
    );
  }

  return null;
};

const AskSaiScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleShare = async (content: string) => {
    const shareText = `Spiritual Guidance from Sai Seva AI:\n\n"${content}"`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sai Seva Guidance',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast('Copied to clipboard!');
      } catch (err) {
        console.error('Error copying:', err);
      }
    }
  };

  const handleSave = (message: ChatMessage) => {
    const savedItems = JSON.parse(localStorage.getItem('saved_guidance') || '[]');
    const newItem = {
      ...message,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem('saved_guidance', JSON.stringify([newItem, ...savedItems]));
    showToast('Saved to your profile!');
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await askSai(input, messages);
    setMessages(prev => [...prev, response]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-6">
        {messages.length === 0 && (
          <div className="text-center space-y-8 py-12">
            <div className="w-20 h-20 bg-primary-fixed/20 rounded-full flex items-center justify-center mx-auto text-primary">
              <MessageSquare size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-headline font-bold">Seek Divine Guidance</h3>
              <p className="text-sm text-on-surface-variant/60 px-8">Ask questions about spiritual life, Sai teachings, or seek comfort in difficult times.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 px-4">
              {[
                "How to practice Saburi in daily life?",
                "What did Baba say about serving others?",
                "I am feeling lost, please guide me.",
                "Tell me a story from Sai Satcharitra."
              ].map(q => (
                <button 
                  key={q}
                  onClick={() => setInput(q)}
                  className="p-4 bg-surface-container-low rounded-xl text-left text-sm font-medium text-primary hover:bg-primary-fixed/20 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed",
              m.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-surface-container-lowest shadow-sm rounded-tl-none border border-outline-variant/10"
            )}>
              {m.content}
            </div>
            {m.role === 'model' && (
              <div className="mt-3 space-y-3 w-full">
                {m.teaching && (
                  <div className="p-3 bg-primary-fixed/20 rounded-lg border-l-4 border-primary text-[11px] italic text-on-primary-fixed">
                    "{m.teaching}"
                  </div>
                )}
                {m.action && (
                  <div className="flex items-center gap-2 text-[11px] font-bold text-secondary">
                    <CheckCircle2 size={14} />
                    Action: {m.action}
                  </div>
                )}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare(m.content)}
                    className="p-2 bg-surface-container-low rounded-full text-on-surface-variant/60 hover:text-primary transition-all"
                  >
                    <Share2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleSave(m)}
                    className="p-2 bg-surface-container-low rounded-full text-on-surface-variant/60 hover:text-primary transition-all"
                  >
                    <Save size={14} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-2 p-4 bg-surface-container-low rounded-2xl w-20 animate-pulse">
            <div className="w-2 h-2 bg-primary/40 rounded-full" />
            <div className="w-2 h-2 bg-primary/40 rounded-full" />
            <div className="w-2 h-2 bg-primary/40 rounded-full" />
          </div>
        )}
      </div>

      <div className="relative mt-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Sai..."
          className="w-full bg-surface-container-low border-none rounded-full py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-primary/20"
        />
        <button 
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all"
        >
          <Send size={18} />
        </button>
      </div>

      <Toast visible={toast.visible} message={toast.message} onClose={() => setToast({ ...toast, visible: false })} />
    </div>
  );
};

const AartiScreen = ({ 
  currentAudio, 
  isPlaying, 
  currentTime, 
  duration, 
  togglePlay, 
  seek, 
  setCurrentAudio,
  setIsPlaying,
  isBackground,
  setIsBackground
}: { 
  currentAudio: Aarti | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  seek: (t: number) => void;
  setCurrentAudio: (a: Aarti) => void;
  setIsPlaying: (b: boolean) => void;
  isBackground: boolean;
  setIsBackground: (b: boolean) => void;
}) => {
  const [activeAarti, setActiveAarti] = useState(AARTIS[0]);
  const [activeSectionId, setActiveSectionId] = useState(AARTIS[0].sections[0].id);
  const [mode, setMode] = useState<'lyrics' | 'translit' | 'trans' | 'video'>('lyrics');
  const [toast, setToast] = useState({ visible: false, message: '' });
  const lyricsRef = useRef<HTMLDivElement>(null);

  const activeSection = activeAarti.sections.find(s => s.id === activeSectionId) || activeAarti.sections[0];

  useEffect(() => {
    setActiveSectionId(activeAarti.sections[0].id);
  }, [activeAarti]);

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 3000);
  };

  const handleShare = async () => {
    const content = mode === 'lyrics' ? activeSection.lyrics : mode === 'translit' ? activeSection.transliteration : activeSection.translation;
    const shareText = `${activeAarti.name} - ${activeSection.title}\n\n${content}\n\nShared via Sai Seva AI`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${activeAarti.name} - ${activeSection.title}`,
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast('Lyrics copied to clipboard!');
      } catch (err) {
        console.error('Error copying:', err);
      }
    }
  };

  const isCurrentAartiActive = currentAudio?.id === activeAarti.id;

  const handlePlayAarti = () => {
    if (isCurrentAartiActive) {
      togglePlay();
    } else {
      setCurrentAudio(activeAarti);
      setIsPlaying(true);
    }
  };

  // Find current line for sync across all sections
  const currentSyncLine = activeAarti.sections.flatMap(s => s.syncData || []).find((line, index, all) => {
    const nextLine = all[index + 1];
    return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
  });

  // Auto-switch section based on audio time
  useEffect(() => {
    if (isCurrentAartiActive && currentSyncLine) {
      const sectionWithLine = activeAarti.sections.find(s => s.syncData?.some(l => l.time === currentSyncLine.time));
      if (sectionWithLine && sectionWithLine.id !== activeSectionId) {
        setActiveSectionId(sectionWithLine.id);
      }
    }
  }, [currentTime, isCurrentAartiActive]);

  const currentLineIndex = activeSection.syncData?.findIndex(l => l.time === currentSyncLine?.time) ?? -1;

  useEffect(() => {
    if (currentLineIndex !== -1 && lyricsRef.current) {
      const activeLine = lyricsRef.current.children[currentLineIndex] as HTMLElement;
      if (activeLine) {
        activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentLineIndex, activeSectionId]);

  return (
    <div className="space-y-8 pb-40">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-headline font-bold">Aarti & Prayer Hub</h2>
        <div className="flex gap-2 items-center">
          <button 
            onClick={handleShare}
            className="p-2 bg-surface-container-high rounded-full text-primary hover:bg-primary-fixed/20 transition-all"
          >
            <Share2 size={18} />
          </button>
          <div className="flex gap-1 bg-surface-container-high p-1 rounded-full text-[10px] font-bold uppercase">
            {(['lyrics', 'translit', 'trans', 'video'] as const).map(m => (
              <button 
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "px-3 py-1 rounded-full transition-all",
                  mode === m ? "bg-white shadow-sm" : "text-on-surface-variant/40"
                )}
              >
                {m === 'lyrics' ? 'Lyrics' : m === 'translit' ? 'Translit' : m === 'trans' ? 'Trans' : 'Video'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Toast visible={toast.visible} message={toast.message} onClose={() => setToast({ ...toast, visible: false })} />

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {AARTIS.map(a => (
          <button 
            key={a.id}
            onClick={() => setActiveAarti(a)}
            className={cn(
              "flex-shrink-0 px-6 py-2 rounded-full font-bold transition-all",
              activeAarti.id === a.id ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant"
            )}
          >
            {a.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {activeAarti.sections.map(s => (
          <button 
            key={s.id}
            onClick={() => setActiveSectionId(s.id)}
            className={cn(
              "flex-shrink-0 px-4 py-1.5 rounded-xl text-xs font-bold transition-all border",
              activeSectionId === s.id 
                ? "bg-secondary/10 border-secondary text-secondary" 
                : "border-outline-variant text-on-surface-variant/60"
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      {mode === 'video' ? (
        <Card className="overflow-hidden p-0 bg-black">
          <div className="aspect-video w-full">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${activeAarti.videoId}?autoplay=1`} 
              title={activeAarti.name} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </Card>
      ) : (
        <Card className="min-h-[400px] flex flex-col items-center py-12 px-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-headline font-bold text-secondary">{activeAarti.name}</h3>
            <p className="text-sm font-bold text-primary mt-1">{activeSection.title}</p>
          </div>
          
          {mode === 'lyrics' && activeSection.syncData ? (
            <div ref={lyricsRef} className="space-y-6 w-full">
              {activeSection.syncData.map((line, i) => (
                <motion.p
                  key={i}
                  animate={{ 
                    opacity: isCurrentAartiActive && currentLineIndex === i ? 1 : 0.4,
                    scale: isCurrentAartiActive && currentLineIndex === i ? 1.1 : 1,
                    color: isCurrentAartiActive && currentLineIndex === i ? 'var(--primary)' : 'var(--on-surface-variant)'
                  }}
                  className={cn(
                    "text-lg leading-loose font-medium text-center transition-all cursor-pointer hover:opacity-100",
                    isCurrentAartiActive && currentLineIndex === i ? "font-bold" : ""
                  )}
                  onClick={() => isCurrentAartiActive && seek(line.time)}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
          ) : (
            <div className="space-y-6 text-lg leading-loose text-on-surface-variant font-medium whitespace-pre-line text-center">
              {mode === 'lyrics' ? activeSection.lyrics : mode === 'translit' ? activeSection.transliteration : activeSection.translation}
            </div>
          )}
        </Card>
      )}

      {/* Playback Controls Overlay */}
      {mode !== 'video' && activeAarti.audioUrl && (
        <div className="fixed bottom-28 left-6 right-6 bg-background/80 backdrop-blur-xl border border-primary/10 rounded-3xl p-6 shadow-2xl z-40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center text-primary">
                  <Wind size={24} className={cn(isPlaying && isCurrentAartiActive ? "animate-spin-slow" : "")} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{activeAarti.name}</h4>
                  <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest">{activeAarti.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsBackground(!isBackground)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all",
                    isBackground ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant/60"
                  )}
                >
                  <Repeat size={12} /> {isBackground ? 'BG ON' : 'BG OFF'}
                </button>
                <button className="p-2 text-on-surface-variant/60 hover:text-primary transition-all">
                  <Repeat size={18} />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div 
                className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const pct = x / rect.width;
                  if (isCurrentAartiActive) seek(pct * duration);
                }}
              >
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-primary"
                  style={{ width: isCurrentAartiActive ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant/40">
                <span>{isCurrentAartiActive ? formatTime(currentTime) : '0:00'}</span>
                <span>{isCurrentAartiActive ? formatTime(duration) : '0:00'}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8">
              <button className="text-on-surface-variant/60 hover:text-primary transition-all">
                <SkipBack size={24} />
              </button>
              <button 
                onClick={handlePlayAarti}
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-all"
              >
                {isPlaying && isCurrentAartiActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
              </button>
              <button className="text-on-surface-variant/60 hover:text-primary transition-all">
                <SkipForward size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const PARAYAN_CHAPTERS = [
  { id: 1, title: 'Chapter 1', url: 'https://shirdibooks.com/sai-satcharitra-chapter-1/' },
  { id: 2, title: 'Chapter 2', url: 'https://shirdibooks.com/sai-satcharitra-chapter-2/' },
  { id: 3, title: 'Chapter 3', url: 'https://shirdibooks.com/sai-satcharitra-chapter-3/' },
  { id: 4, title: 'Chapter 4', url: 'https://shirdibooks.com/sai-satcharitra-chapter-4/' },
  { id: 5, title: 'Chapter 5', url: 'https://shirdibooks.com/sai-satcharitra-chapter-5/' },
  { id: 6, title: 'Chapter 6', url: 'https://shirdibooks.com/sai-satcharitra-chapter-6/' },
  { id: 7, title: 'Chapter 7', url: 'https://shirdibooks.com/sai-satcharitra-chapter-7/' },
  { id: 8, title: 'Chapter 8', url: 'https://shirdibooks.com/sai-satcharitra-chapter-8/' },
  { id: 9, title: 'Chapter 9', url: 'https://shirdibooks.com/sai-satcharitra-chapter-9/' },
  { id: 10, title: 'Chapter 10', url: 'https://shirdibooks.com/sai-satcharitra-chapter-10/' },
  { id: 11, title: 'Chapter 11', url: 'https://shirdibooks.com/sai-satcharitra-chapter-11/' },
  { id: 12, title: 'Chapter 12', url: 'https://shirdibooks.com/sai-satcharitra-chapter-12/' },
  { id: 13, title: 'Chapter 13', url: 'https://shirdibooks.com/sai-satcharitra-chapter-13/' },
  { id: 14, title: 'Chapter 14', url: 'https://shirdibooks.com/sai-satcharitra-chapter-14/' },
  { id: 15, title: 'Chapter 15', url: 'https://shirdibooks.com/sai-satcharitra-chapter-15/' },
  { id: 16, title: 'Chapter 16 & 17', url: 'https://shirdibooks.com/sai-satcharitra-chapter-16-and-17/' },
  { id: 17, title: 'Chapter 18 & 19', url: 'https://shirdibooks.com/sai-satcharitra-chapter-18-and-19/' },
  { id: 18, title: 'Chapter 20', url: 'https://shirdibooks.com/sai-satcharitra-chapter-20/' },
  { id: 19, title: 'Chapter 21', url: 'https://shirdibooks.com/sai-satcharitra-chapter-21/' },
  { id: 20, title: 'Chapter 22', url: 'https://shirdibooks.com/sai-satcharitra-chapter-22/' },
  { id: 21, title: 'Chapter 23', url: 'https://shirdibooks.com/sai-satcharitra-chapter-23/' },
  { id: 22, title: 'Chapter 24', url: 'https://shirdibooks.com/sai-satcharitra-chapter-24/' },
  { id: 23, title: 'Chapter 25', url: 'https://shirdibooks.com/sai-satcharitra-chapter-25/' },
  { id: 24, title: 'Chapter 26', url: 'https://shirdibooks.com/sai-satcharitra-chapter-26/' },
  { id: 25, title: 'Chapter 27', url: 'https://shirdibooks.com/sai-satcharitra-chapter-27/' },
  { id: 26, title: 'Chapter 28', url: 'https://shirdibooks.com/sai-satcharitra-chapter-28/' },
  { id: 27, title: 'Chapter 29', url: 'https://shirdibooks.com/sai-satcharitra-chapter-29/' },
  { id: 28, title: 'Chapter 30', url: 'https://shirdibooks.com/sai-satcharitra-chapter-30/' },
  { id: 29, title: 'Chapter 31', url: 'https://shirdibooks.com/sai-satcharitra-chapter-31/' },
  { id: 30, title: 'Chapter 32', url: 'https://shirdibooks.com/sai-satcharitra-chapter-32/' },
  { id: 31, title: 'Chapter 33', url: 'https://shirdibooks.com/sai-satcharitra-chapter-33/' },
  { id: 32, title: 'Chapter 34', url: 'https://shirdibooks.com/sai-satcharitra-chapter-34/' },
  { id: 33, title: 'Chapter 35', url: 'https://shirdibooks.com/sai-satcharitra-chapter-35/' },
  { id: 34, title: 'Chapter 36', url: 'https://shirdibooks.com/sai-satcharitra-chapter-36/' },
  { id: 35, title: 'Chapter 37', url: 'https://shirdibooks.com/sai-satcharitra-chapter-37/' },
  { id: 36, title: 'Chapter 38', url: 'https://shirdibooks.com/sai-satcharitra-chapter-38/' },
  { id: 37, title: 'Chapter 39', url: 'https://shirdibooks.com/sai-satcharitra-chapter-39/' },
  { id: 38, title: 'Chapter 40', url: 'https://shirdibooks.com/sai-satcharitra-chapter-40/' },
  { id: 39, title: 'Chapter 41', url: 'https://shirdibooks.com/sai-satcharitra-chapter-41/' },
  { id: 40, title: 'Chapter 42', url: 'https://shirdibooks.com/sai-satcharitra-chapter-42/' },
  { id: 41, title: 'Chapter 43 & 44', url: 'https://shirdibooks.com/sai-satcharitra-chapter-43-and-44/' },
  { id: 42, title: 'Chapter 45', url: 'https://shirdibooks.com/sai-satcharitra-chapter-45/' },
  { id: 43, title: 'Chapter 46', url: 'https://shirdibooks.com/sai-satcharitra-chapter-46/' },
  { id: 44, title: 'Chapter 47', url: 'https://shirdibooks.com/sai-satcharitra-chapter-47/' },
  { id: 45, title: 'Chapter 48', url: 'https://shirdibooks.com/sai-satcharitra-chapter-48/' },
  { id: 46, title: 'Chapter 49', url: 'https://shirdibooks.com/sai-satcharitra-chapter-49/' },
  { id: 47, title: 'Chapter 50', url: 'https://shirdibooks.com/sai-satcharitra-chapter-50/' },
  { id: 48, title: 'Chapter 51 (Epilogue & Arati)', url: 'https://shirdibooks.com/chapter-51-epilogue/' },
];

const ParayanScreen = () => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [isReading, setIsReading] = useState(false);

  if (selectedChapter !== null) {
    const chapter = PARAYAN_CHAPTERS.find(c => c.id === selectedChapter);
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="px-0 flex items-center gap-2" onClick={() => setSelectedChapter(null)}>
            <ArrowLeft size={16} /> Back to Chapters
          </Button>
          <span className="text-xs font-bold text-primary bg-primary-fixed/20 px-3 py-1 rounded-full">{chapter?.title}</span>
        </div>

        <Card className="bg-surface-container-lowest border border-primary-fixed/20 p-8 space-y-6">
          <h3 className="text-2xl font-headline font-bold text-center text-primary">{chapter?.title}</h3>
          <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed font-medium">
            <p>
              Let us bow down to Shri Ganesh, to whom the Lord of the Universe (Shiva) pays His respects. He is the remover of all obstacles and the giver of success.
            </p>
            <p>
              Then, let us bow down to Goddess Saraswati, the Goddess of Learning, who inspires us to sing the glory of the Lord.
            </p>
            <p>
              Next, we bow down to the Family Deity (Kuladevata) and the local Deity (Grama Devata), who protect us always.
            </p>
            <p>
              Finally, we bow down to our Sadguru, Shri Sainath, who is the embodiment of all Gods and who leads us on the path of self-realization.
            </p>
            <div className="p-4 bg-primary-fixed/10 rounded-xl italic text-center text-primary mt-6">
              "He who reads this Satcharitra with faith and devotion will be freed from the cycle of birth and death."
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button 
            variant={completedChapters.includes(selectedChapter) ? "outline" : "default"}
            className="flex-1 py-4" 
            onClick={() => {
              if (!completedChapters.includes(selectedChapter)) {
                setCompletedChapters([...completedChapters, selectedChapter]);
              }
              setSelectedChapter(null);
            }}
          >
            {completedChapters.includes(selectedChapter) ? 'Completed ✓' : 'Mark as Complete'}
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-headline font-bold">Parayan</h2>
        <span className="text-xs font-bold text-on-surface-variant/40 uppercase">{completedChapters.length}/{PARAYAN_CHAPTERS.length} Chapters</span>
      </div>

      {goal ? null : (
        <div className="space-y-4">
          <h3 className="text-lg font-headline font-bold">Select Your Intention</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Peace & Mental Calm', 'Healing & Health', 'Gratitude', 'Family Wellbeing', 'Career Success', 'Surrender'].map(g => (
              <button 
                key={g}
                onClick={() => setGoal(g)}
                className={cn(
                  "p-4 rounded-xl text-center border transition-all",
                  goal === g ? "bg-primary-fixed/20 border-primary" : "bg-surface-container-low border-outline-variant/20 hover:border-primary/40"
                )}
              >
                <p className="font-bold text-sm">{g}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {goal && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <Card className="bg-primary text-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">Intention</p>
            <p className="font-bold">{goal}</p>
          </Card>

          <div className="space-y-2">
            <h4 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant/60">Sai Satcharitra Chapters</h4>
            <div className="grid grid-cols-2 gap-2">
              {PARAYAN_CHAPTERS.map(ch => (
                <button 
                  key={ch.id}
                  onClick={() => setSelectedChapter(ch.id)}
                  className={cn(
                    "p-3 rounded-lg text-left text-sm transition-all flex items-center justify-between",
                    completedChapters.includes(ch.id) 
                      ? "bg-primary/20 border-primary text-primary" 
                      : "bg-surface-container-low border border-outline-variant/20 hover:border-primary/40"
                  )}
                >
                  <span className="font-medium">{ch.title}</span>
                  {completedChapters.includes(ch.id) && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>

          <Button variant="ghost" className="w-full" onClick={() => setGoal('')}>Change Intention</Button>
        </motion.div>
      )}
    </div>
  );
};

const BHAJANS = [
  {
    id: 1,
    title: "Om Sai Ram Om Sai Shyam",
    category: "Sai Baba",
    lyrics: `Om Sai Ram Om Sai Shyam
Sadda kashat mitane wale tum
Roto ko hasane wale tum

Deen dukhi ko jag mein sai
Gale lagane wale tum
Shirdi apka paawan dhaam

Om Sai ram ram
Om sai shyam shyam

Has Kar ungli sadda tum uthate
Shradha saburi ke mantra batate
Chote bade sabhi ke baba
Cchan mein sare Dukh bhagate

Ek maalik ka japte naam
Om Sai ram ram
Om sai shyam shyam`
  },
  {
    id: 2,
    title: "Om Sai Mangalam",
    category: "Sai Baba",
    lyrics: `Jai Jai Jai Sai Ram
Jai Jai Jai Sai Ram

Om sai mangalam sai naam mangalam
Pavan bhoomi shirdi sai dhaam mangalam

Sadguru sant swaroop sainath mangalam
Param pita ka roop dinanath mangalam

Patit pavan dhaam shubsthaan mangalam
Prani prani ka hota hai kalyan mangalam

Sai mangalam sai naam mangalam`
  },
  {
    id: 3,
    title: "Charana Kamala Bando",
    category: "Sai Baba",
    lyrics: `Charana Kamala Bando
Sai Nath Ke Charana Kamala Bando

Jo Trishavanto Piyo Charanamrutha
Jeevan Mey Paavey Anando

Surrender To The Feet Of The Lord
Sai Baba Surrender To The Feet Of The Lord

Surrender To The One We Adore Sai Baba
And With Devotion We Can Cross This Ocean`
  },
  {
    id: 4,
    title: "Jaya Jaya Hey Matha No. 1",
    category: "Sai Baba",
    lyrics: `Jaya Jaya Hey Matha No. 1
Maa Sharda Maiya
Maa Sharda Maiya

Hey Matha No. 1
Hey Sai Baba Hey

Sharanu Shirdi Wale Ki
Sharanu Shirdi Wale Ki

Jo Bhi Hari Ka Bhajan Karey
Woh Hi Brahma Hari Pad Paavey

Sai Nath Jo Bhajana Karey
Bhava Sagar Se Paar Karey`
  },
  {
    id: 5,
    title: "Ram Ram Bhajo Mana Harey",
    category: "Rama",
    lyrics: `Ram Ram Bhajo Mana Harey
Ram Ram Bhajo Mana Harey

Sai Ram Bhajo Mana Harey Harey

Raghupathi Raja Rama Ram
Patitha Pavana Sita Ram

Sai Ram Bhajo Mana Harey Harey

O Mind, worship Lord Rama of the Raghu Dynasty
The Lord of Sita, Lord Rama
Destroys sins and evil, uplifts and liberates the penitent
Chant the name of Lord Sai who is verily Lord Rama`
  },
  {
    id: 6,
    title: "Bhajorey Manuva Sadguru Deva",
    category: "Sai Baba",
    lyrics: `Bhajorey Manuva Sadguru Deva
Bhajorey Manuva Sadguru Deva

Parama Krupalu Sai Mahadeva
Bhajorey Manuva Sadguru Deva

Nis Din Dhyan Karoon Mein Tera
Janam Janam Ka Mitey Andhera

Parabrahma Parameshwara Roopa (Deva)
Parama Krupalu Sai Mahadeva

Best of all, make our minds focus on Guru Sai
Our Supreme Great Teacher, Sai Guru Divine`
  },
  {
    id: 7,
    title: "Govindam Bhaja Mooda Mathey",
    category: "Krishna",
    lyrics: `Govindam Bhaja Mooda Mathey
Govindam Bhaja Mooda Mathey

Samprapte Sannihite Kaale
Nahi Nahi Rakshati Dukrin Karane

Govindam Bhaja Mooda Mathey

Punarapi Jananam Punarapi Maranam
Punarapi Janani Jathare Shayanam

O mind pray to Govinda (Krishna), the protector of cows
O mind, when the time comes, grammar will not help
Again and again we have to take births in the mother's womb
So please remember the name of the Lord Govinda`
  },
  {
    id: 8,
    title: "Sadguru Dev Raaha Dikhao",
    category: "Sai Baba",
    lyrics: `Sadguru Dev Raaha Dikhao
Sadguru Dev Raaha Dikhao Prabhu

Raaha Dikhao Sai Deva
Sadguru Dev Raaha Dikhao

Tum Ho Merey Prana Daata
Tum Ho Merey Bhagya Daata
Sadguru Dev Raaha Dikhao

Sathya Guru Dev Raaha Dikhao Prabhu
O Lord Sai, our Divine Preceptor
Show us the path to liberation
You are our Life Giver and Bestower of all prosperity`
  },
  {
    id: 9,
    title: "Jo Bhi Hari Ka Bhajan",
    category: "Sai Baba",
    lyrics: `Jo Bhi Hari Ka Bhajan Karey
Woh Hi Brahma Hari Pad Paavey

Sai Nath Jo Bhajana Karey
Bhava Sagar Se Paar Karey

Those who chant the name of Hari alone
Reach the position of Brahman
Those who chant the name of Sai
Is sure to cross the cycle of birth and death`
  },
  {
    id: 10,
    title: "Hey Sai Jagannatha",
    category: "Sai Baba",
    lyrics: `Hey Sai Jagannatha Hey Sai
Hey Sai Jagannatha Hey Sai

Jagannatha Hey Sai Jagannatha

Deena Bandhu Sai Natha
Karuna Sindhu Jagannatha
Hey Sai Jagannatha

Hey Shirdi Jagannatha
Hey Parthi Jagannatha
Hey Sai Jagannatha

O Sai, my Lord of Universe
Walk beside me everyday, Lord of Compassion
Satya Sai my Lord of Truth
Prema Sai my Lord of Love
O Sai my Lord of Peace`
  },
  {
    id: 11,
    title: "Sathya Dharma Shanti Prema Swaroopa",
    category: "Sai Baba",
    lyrics: `Sathya Dharma Shanti Prema Swaroopa
Sathya Dharma Shanti Prema Swaroop Ap Hai
Sathya Dharma Shaanthi Prema Sabko Deejo

Gurudev Gurudev Gurudev Gurudev
Sathya Dharma Santi Prema
Jeevan Ka Marma Hai
Sathya Dharma Shaanthi Prema

O Lord (Sai) give us Truth, Righteousness, Peace and Love
You are, in fact, the embodiment of these
These are the pillars of life itself, O Guru!`
  },
  {
    id: 12,
    title: "Sai Hai Jeevan",
    category: "Sai Baba",
    lyrics: `Sai Hai Jeevan, Jeevan Sathya Sai
Sai Mera Jeevan Sahaara

Therey Bina Sai Sabh Hai Andhera
Sai Hai Jeevan, Jeevan Sathya Sai

Charana Lagalo Mujhey Sai Kanhaiya
Paara Karo Merey Jeevana Naiya

Sai Hai Jeevan, Jeevan Sathya Sai
Sai Mera Jeevan Sahaara

Sai is the essence of life, life itself is Sai
Sai is the support and sustenance of my life
Without you, Sai, all is darkness
Guide the boat of my life across the ocean`
  },
  {
    id: 13,
    title: "Bolo Jai Jai Kar",
    category: "Sai Baba",
    lyrics: `Sai Ram Sai Ram (2X)
Prema Bhagavaan Sathya Sai Bhagavaan
Prema Bhagavaan Sai Bhagavaan

Sai Gopala Hey Ghanashyama
Patheetha Pavana Hey Ghanashyama
Bolo Jai Jaikaar Sai Baba Ki
Bolo Jai Jaikaar Bolo Jai Jaikaar

Let us cheer Sai Baba
O Sai Krishna, Saviour of the fallen
Embodiment of divine love, Sai Ram
May You be victorious`
  },
  {
    id: 14,
    title: "Darshan Do Prabhu",
    category: "Sai Baba",
    lyrics: `Darshana Do Prabhu Darshana Do
Darshana Do Mujhey Sai Bhagwan

Vinati Karoon Mein Bar Bar
Darshana Do Prabhu Darshana Do

Hrdaya Mey Aao Sai Bhagawan
Bhajan Mey Aao Sai Bhagawan

Parthipuri Ke Sai Bhagawan

Lord Sai, grant us Your divine vision
Please come in our hearts
Please come in our bhajans`
  },
  {
    id: 15,
    title: "Hari Bhajana Bina",
    category: "Sai Baba",
    lyrics: `Hari Bhajana Bina Sukha Shanti Nahin
Hari Naam Bina Ananda Nahin

Prema Bhakti Bina Uddhar Nahin
Guru Seva Bina Nirvana Nahin

Japa Dhyana Bina Samyoga Nahin
Prabhu Darshana Bina Pragnana Nahin
Daya Dharma Bina Satkarma Nahin
Bhagawan Bina Koi Apna Nahin

Hari Nama Bina Paramatma Nahin
Sai Bhajana Bina Sukha Shanti Nahin

Without Hari Bhajan there is no happiness or peace
Without divine Love there is no liberation
Without Guru's service there is no Nirvana
Without Sai's Bhajan there is no peace`
  },
  {
    id: 16,
    title: "Sai Avatara Yuga Avatara",
    category: "Sai Baba",
    lyrics: `Sai Avatara Yuga Avatara
Yuga Avatara Tumhi Ho

Eshwaramba Priya Tanaya-ta
Sai Parameshwara

Sab Dharmon Ke Baba Sai
Sathya Sai Prema Sai
Sai Avatara Yuga Avatara

Deena Dayala Sankata Hara
Sai Brahma Sai Vishnu
Sai Maheshwara

Oh Supreme Lord Sai!
You are the Incarnation of this Kali Age!
You are the protector of the meek, the remover of danger
You are Brahma, Vishnu and Maheshwara
Chant the name of Lord Sathya Sai!`
  },
  {
    id: 17,
    title: "Namah Shivaya",
    category: "Shiva",
    lyrics: `Namah Shivaya Namah Shivaya (8)
Hara Hara Hara Hara Mahadeva

Terey Dhyan Mey Khoyen Hum
Sab Nis Din Tera Bhajan Karoon

Hara Hara Hara Hara Mahadeva
Tum Hi Badey Dayalu Ho
Tum Hi Badey Krupalu
Sathya Sai Hai Naam Tumhara

Namah Shivaya Namah Shivaya
We bow to Shiva, the great Lord
We contemplate on You always
You are the most compassionate
Sathya Sai is Your name`
  },
  {
    id: 18,
    title: "Bhajare Rama Charan",
    category: "Rama",
    lyrics: `Bhajare Rama Charan
Sri Rama Sri Rama

Mane Mana Vaasamurai
Sri Rama Sri Rama

Evo Ksheemai
Parathipuri Sri Rama

Ram Ram Bhajo Mana Harey
Sri Rama Sri Rama

Chant the name of Lord Rama
Meditate on Him in the mind
He is the Lord of Puttaparthi
He protects all devotees`
  },
  {
    id: 19,
    title: "Madhava Mohana",
    category: "Krishna",
    lyrics: `Madhava Mohana Gopala
Sri Krishna Chaitanya Prabhu

Madhava Mohana Muralidhara
Vrindavana Vilashee

Madhava Mohana Hey Nandalala
Kaisi Yeh Preet Lagi

Madhava Mohana
You are the enchanter of the mind
Krishna, the holder of the flute
The one who plays in Vrindavan
The son of Nanda`
  },
  {
    id: 20,
    title: "Sri Ram Jaya Ram",
    category: "Rama",
    lyrics: `Sri Ram Jaya Ram Jaya Jaya Ram
Janaki Jeevana Ram

Ayodhya Raghunatha Ram
Dasharatha Nandhana Ram

Sita Rama Radhe Shyam
Raghupathi Raghava Raja Ram

Glory to Lord Rama
The life of Janaki (Sita)
The Lord of Ayodhya
Son of Dasharatha`
  },
  {
    id: 21,
    title: "Radhe Govinda",
    category: "Krishna",
    lyrics: `Radhe Govinda Gopala
Jaya Govinda Radhe Gopala

Radhe Shyama Hey Ghana Shyama
Radha Madhava Radhe Shyama

Giridhari Gopala
Madhava Govinda

Radhe Govinda Radhe Gopala
Sairam

Radha and Govinda are united
Glory to Krishna, the dark-complexioned one
The holder of the mountain
The lover of Radha`
  },
  {
    id: 22,
    title: "Narayana Hari",
    category: "Narayana",
    lyrics: `Narayana Hari Nam
Narayana Hari Nam

Narayana Hari Bolo
Narayana Hari Nam

Narayana Narayana
Hari Bolo Hare Ram

We chant the name of Narayana (Lord Vishnu)
He is the remover of sins
Chant His name always`
  },
  {
    id: 23,
    title: "Vittala Vittala",
    category: "Vittala",
    lyrics: `Vittala Vittala Hari Vittala
Panduranga Vitthala

Hey Pandharinatha
Vrittartti Golla Sree

Vittala Vittala
Murali Manohara

Viththa (Lord Vittala) is Lord Vishnu
He is the Lord of Pandharpur
The one who holds the flute`
  },
  {
    id: 24,
    title: "Om Namah Shivaya",
    category: "Shiva",
    lyrics: `Om Namah Shivaya Shivaya Namah Om
Om Namah Shivaya

Hara Mahadeva
Namah Shivaya

Om Namah Shivaya Shivaya Namah Om
Om Namah Shivaya

We bow to Lord Shiva
The great destroyer of evil
The auspicious one`
  },
  {
    id: 25,
    title: "Ganesha Sharanam",
    category: "Ganesha",
    lyrics: `Ganesha Sharanam Parama Pavanam
Ganesha Sharanam

Vighna Nivara Kara
Sarva Papa Vidhavera

Lambodara Gajanana
Gajavadhana Gananatha

We seek refuge in Lord Ganesha
The remover of obstacles
The elephant-faced one
The son of Parvati`
  }
];

const BhajansScreen = () => {
  const [selectedBhajan, setSelectedBhajan] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allCategories = BHAJANS.map(b => b.category);
  const categories = ['All', ...new Set(allCategories)];

  const filteredBhajans = BHAJANS.filter(bhajan => {
    const matchesSearch = bhajan.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || bhajan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedBhajan !== null) {
    const bhajan = BHAJANS.find(b => b.id === selectedBhajan);
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="px-0 flex items-center gap-2" onClick={() => setSelectedBhajan(null)}>
            <ArrowLeft size={16} /> Back to Bhajans
          </Button>
        </div>

        <Card className="bg-surface-container-lowest border border-primary-fixed/20 p-6 space-y-4">
          <h3 className="text-xl font-headline font-bold text-center text-primary">{bhajan?.title}</h3>
          <p className="text-xs text-center text-primary-fixed/60 uppercase">{bhajan?.category}</p>
          <div className="space-y-3 text-sm text-on-surface-variant leading-relaxed font-medium whitespace-pre-line">
            {bhajan?.lyrics}
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-headline font-bold">Bhajans</h2>
      
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40" />
        <input
          type="text"
          placeholder="Search bhajans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all",
              selectedCategory === cat 
                ? "bg-primary text-white" 
                : "bg-surface-container-low border border-outline-variant/20"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filteredBhajans.map(bhajan => (
          <button 
            key={bhajan.id}
            onClick={() => setSelectedBhajan(bhajan.id)}
            className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/40 text-left transition-all"
          >
            <p className="font-bold text-sm">{bhajan.title}</p>
            <p className="text-xs text-primary-fixed/60 mt-1">{bhajan.category}</p>
          </button>
        ))}
      </div>

      {filteredBhajans.length === 0 && (
        <p className="text-center text-on-surface-variant/60 py-8">No bhajans found</p>
      )}
    </div>
  );
};

const TemplesScreen = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [temples, setTemples] = useState(TEMPLES);

  const handleLocate = () => {
    setLocating(true);
    setErrorMsg(null);
    
    const mockSuccess = () => {
      setLocation(`19.76, 74.47`); // Shirdi coordinates
      setLocating(false);
      setTemples([
        {
          id: 'mock-1',
          name: 'Shri Saibaba Sansthan Temple',
          address: 'Shirdi, Maharashtra',
          distance: '0.1 km',
          nextAarti: '12:00 PM',
          annadanamTime: '1:00 PM',
          isOpen: true,
          crowdLevel: 'high'
        },
        {
          id: 'mock-2',
          name: 'Dwarkamai',
          address: 'Shirdi, Maharashtra',
          distance: '0.2 km',
          nextAarti: 'Open All Day',
          isOpen: true,
          crowdLevel: 'medium'
        }
      ]);
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`);
          setLocating(false);
          setTemples([
            {
              id: 'local-1',
              name: 'Local Sai Baba Temple',
              address: 'Near your location',
              distance: `${(Math.random() * 5 + 0.5).toFixed(1)} km`,
              nextAarti: '6:00 PM',
              isOpen: true,
              crowdLevel: 'low'
            }
          ]);
        },
        (err) => {
          console.warn("Geolocation failed, falling back to mock location.", err);
          mockSuccess();
        },
        { timeout: 5000 }
      );
    } else {
      mockSuccess();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-headline font-bold">Nearby Sai Temples</h2>
        <button className="p-2 bg-surface-container-low rounded-full text-primary">
          <Filter size={20} />
        </button>
      </div>

      <div className="relative h-64 rounded-2xl overflow-hidden shadow-inner bg-surface-container-highest">
        {location ? (
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            title="Temple Location Map"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-container-highest">
            <div className="text-center space-y-4">
              <MapPin size={64} className="mx-auto text-on-surface-variant/30" />
              <p className="text-sm text-on-surface-variant/40">Tap to find temples near you</p>
            </div>
          </div>
        )}
        {!location && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button 
              onClick={handleLocate}
              disabled={locating}
              animate={locating ? { scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] } : { y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl disabled:opacity-50"
            >
              <MapPin size={24} fill="currentColor" />
            </motion.button>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-center pointer-events-none">
          {locating ? 'Finding your location...' : errorMsg ? <span className="text-red-500">{errorMsg}</span> : location ? `Showing temples near ${location}` : 'Tap the pin to find temples near you'}
        </div>
      </div>

      <div className="space-y-4">
        {temples.length > 0 ? temples.map(t => (
          <Card key={t.id} className="flex gap-4 p-4 hover:bg-primary-fixed/10 transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-xl bg-primary-fixed/30 flex-shrink-0 flex items-center justify-center text-primary">
              <MapPin size={28} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-base">{t.name}</h4>
                <span className="text-[10px] font-bold text-secondary uppercase">{t.distance}</span>
              </div>
              <p className="text-xs text-on-surface-variant/60">{t.address}</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-surface-container-high rounded text-[9px] font-bold uppercase">Next Aarti: {t.nextAarti}</span>
                {t.annadanamTime && (
                  <span className="px-2 py-1 bg-tertiary/10 text-tertiary rounded text-[9px] font-bold uppercase">Prasad @ {t.annadanamTime}</span>
                )}
              </div>
            </div>
          </Card>
        )) : (
          <div className="text-center py-8 text-on-surface-variant/60">
            <MapPin size={48} className="mx-auto mb-4 opacity-20" />
            <p>Tap the pin above to find temples near you.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ComfortScreen = () => {
  const [mood, setMood] = useState<Mood | null>(null);
  const [guidance, setGuidance] = useState<ChatMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMoodSelect = async (m: Mood) => {
    setMood(m);
    setLoading(true);
    const res = await getMoodGuidance(m);
    setGuidance(res);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-headline font-bold">Emotional Comfort</h2>
        <p className="text-sm text-on-surface-variant/60">Find peace in Sai's embrace during difficult moments.</p>
      </div>

      {!mood ? (
        <div className="grid grid-cols-2 gap-4">
          {(['anxious', 'sad', 'stressed', 'confused', 'overwhelmed', 'grateful'] as Mood[]).map(m => (
            <button 
              key={m}
              onClick={() => handleMoodSelect(m)}
              className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/40 transition-all text-center space-y-3"
            >
              <Heart size={32} className={cn(m === 'grateful' ? "text-primary" : "text-secondary")} />
              <p className="font-bold text-sm capitalize">{m}</p>
            </button>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Button variant="ghost" className="px-0 flex items-center gap-2" onClick={() => { setMood(null); setGuidance(null); }}>
            <ArrowLeft size={16} /> Change Mood
          </Button>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-32 bg-surface-container-low rounded-2xl" />
              <div className="h-20 bg-surface-container-low rounded-2xl" />
              <div className="h-20 bg-surface-container-low rounded-2xl" />
            </div>
          ) : guidance && (
            <div className="space-y-6">
              <Card className="bg-primary-fixed/20 border-l-8 border-primary p-8">
                <p className="text-lg italic font-headline text-on-primary-fixed leading-relaxed">
                  {guidance.content}
                </p>
              </Card>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-5 bg-surface-container-low rounded-xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary">
                    <Wind size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Grounding Exercise</p>
                    <p className="text-sm font-bold">5-Min Deep Breathing</p>
                  </div>
                </div>
                
                {guidance.mantra && (
                  <div className="p-5 bg-surface-container-low rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Recommended Mantra</p>
                      <p className="text-sm font-bold">{guidance.mantra}</p>
                    </div>
                  </div>
                )}

                {guidance.chapter && (
                  <div className="p-5 bg-surface-container-low rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Suggested Reading</p>
                      <p className="text-sm font-bold">{guidance.chapter}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-secondary/5 border border-secondary/10 rounded-xl space-y-3">
                <h4 className="font-bold text-secondary text-sm flex items-center gap-2">
                  <Heart size={16} /> Tiny Seva Suggestion
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  "Feed a stray animal or offer a glass of water to someone working in the heat. Small acts of kindness heal the soul."
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const ThursdayScreen = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-headline font-bold text-primary">Thursday Special</h2>
        <p className="text-sm text-on-surface-variant/60">Guruwar: The most sacred day for Sai devotees.</p>
      </div>

      <Card className="bg-primary-fixed/30 border border-primary-fixed-dim p-8 space-y-6">
        <h3 className="text-xl font-headline font-bold text-primary">Thursday Puja Checklist</h3>
        <div className="space-y-4">
          {[
            "Clean the altar and Sai Baba's photo",
            "Offer yellow flowers (Marigold/Rose)",
            "Light a Diya with Ghee",
            "Prepare Naivedyam (Khichdi or Halwa)",
            "Apply Sandalwood paste to Baba's forehead",
            "Read Chapter 51 of Sai Satcharitra"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border-2 border-primary/30 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-sm opacity-0 hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-medium text-on-primary-fixed">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-6 bg-surface-container-low rounded-xl space-y-3">
          <h4 className="font-bold text-primary text-sm">Vrat Guidance</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Sai Baba Vrat can be observed for 9 Thursdays. It involves taking a bath, lighting a lamp, and offering prayers with full faith. You can consume fruits, milk, or one meal a day.
          </p>
        </div>
        <div className="p-6 bg-surface-container-low rounded-xl space-y-3">
          <h4 className="font-bold text-primary text-sm">Thursday Blessings</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            "I shall be ever active and vigorous even after leaving this earthly body. My tomb shall bless and speak to my devotees."
          </p>
        </div>
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  const [savedAnswers, setSavedAnswers] = useState<any[]>([]);
  const [savedGuidance, setSavedGuidance] = useState<any[]>([]);

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem('saved_answers') || '[]');
    const guidance = JSON.parse(localStorage.getItem('saved_guidance') || '[]');
    setSavedAnswers(answers);
    setSavedGuidance(guidance);
  }, []);

  const allSaved = [
    ...savedAnswers.map(a => ({ id: a.id, title: a.title, content: a.main_message, date: a.date, type: 'Answer' })),
    ...savedGuidance.map(g => ({ id: g.id, title: 'AI Guidance', content: g.content, date: g.date, type: 'AI' }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-primary-fixed p-1 border-4 border-white shadow-xl flex items-center justify-center">
          <User size={48} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-headline font-bold">Sai Devotee</h2>
          <p className="text-sm text-on-surface-variant/60">srirampujar@gmail.com</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center p-6 space-y-2">
          <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Total Parayans</p>
          <p className="text-2xl font-headline font-bold text-primary">04</p>
        </Card>
        <Card className="text-center p-6 space-y-2">
          <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase">Seva Streak</p>
          <p className="text-2xl font-headline font-bold text-secondary">12</p>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-on-surface-variant/60 uppercase tracking-widest px-2">Saved Guidance</h3>
        <div className="space-y-3">
          {allSaved.length > 0 ? allSaved.map((entry, i) => (
            <Card key={i} className="p-4 flex justify-between items-center hover:bg-primary-fixed/5 transition-all cursor-pointer">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-primary uppercase">{entry.type}</span>
                  <h4 className="font-bold text-sm">{entry.title}</h4>
                </div>
                <p className="text-xs text-on-surface-variant/60 line-clamp-1">{entry.content}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-on-surface-variant/40">{entry.date}</p>
                <ChevronRight size={14} className="ml-auto text-on-surface-variant/20" />
              </div>
            </Card>
          )) : (
            <div className="text-center py-8 bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant/20">
              <p className="text-sm text-on-surface-variant/40">No saved guidance yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-on-surface-variant/60 uppercase tracking-widest px-2">Settings</h3>
        <div className="bg-surface-container-low rounded-xl overflow-hidden">
          {[
            { label: 'Notifications', icon: Bell },
            { label: 'Language (Hindi/English)', icon: Sparkles },
            { label: 'Prayer Reminders', icon: Clock },
            { label: 'Saved Guidance', icon: Save },
            { label: 'Help & Support', icon: Info },
          ].map((item, i) => (
            <button key={i} className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary-fixed/10 transition-all border-b border-outline-variant/10 last:border-none">
              <div className="flex items-center gap-4">
                <item.icon size={18} className="text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-on-surface-variant/40" />
            </button>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full text-secondary border-secondary/20 hover:bg-secondary/5">Sign Out</Button>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  
  // Global Audio State
  const [currentAudio, setCurrentAudio] = useState<Aarti | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBackground, setIsBackground] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentAudio]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  useEffect(() => {
    if (!isBackground && activeTab !== 'aarti' && isPlaying) {
      setIsPlaying(false);
    }
  }, [activeTab, isBackground]);

  if (onboardingStep < 3) {
    const steps = [
      { 
        title: "Daily Sai Guidance", 
        desc: "Receive personalized wisdom and teachings from Sai Baba every morning to start your day with peace.",
        icon: Sparkles
      },
      { 
        title: "Ask Sai AI", 
        desc: "Your spiritual companion. Seek guidance, find comfort, and explore Sai's teachings through reverent AI conversation.",
        icon: MessageSquare
      },
      { 
        title: "Plan Your Devotion", 
        desc: "Organize your Satcharitra Parayan and plan your sacred pilgrimage to Shirdi with ease.",
        icon: BookOpen
      }
    ];

    const Icon = steps[onboardingStep].icon;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 p-8 flex flex-col justify-center max-w-md mx-auto w-full">
          <motion.div 
            key={onboardingStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-12"
          >
            <div className="w-64 h-64 mx-auto rounded-full bg-primary-fixed/20 flex items-center justify-center shadow-2xl">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-48 h-48 rounded-full bg-primary-fixed/30 flex items-center justify-center"
              >
                <Icon size={80} className="text-primary" />
              </motion.div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className={cn("h-1 rounded-full transition-all", i === onboardingStep ? "w-12 bg-primary" : "w-4 bg-surface-container-highest")} />
                ))}
              </div>
              <h1 className="text-4xl font-headline font-extrabold text-on-background leading-tight">{steps[onboardingStep].title}</h1>
              <p className="text-on-surface-variant leading-relaxed">{steps[onboardingStep].desc}</p>
            </div>
          </motion.div>
        </div>
        <div className="p-8 max-w-md mx-auto w-full">
          <Button 
            className="w-full py-5 text-lg" 
            onClick={() => setOnboardingStep(prev => prev + 1)}
          >
            {onboardingStep === 2 ? "Get Started" : "Continue"}
          </Button>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 sacred-glow">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/40 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center text-center"
        >
          <div className="w-32 h-32 rounded-full bg-primary-fixed/20 flex items-center justify-center mb-8 border-4 border-primary-fixed/30 shadow-2xl">
            <Sparkles size={48} className="text-primary" />
          </div>
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tight">Step into the Sacred Presence</h2>
            <p className="text-on-surface-variant italic">"Why fear when I am here?"</p>
          </div>
          <div className="w-full space-y-4">
            <Button variant="outline" className="w-full py-4 flex items-center justify-center gap-3" onClick={() => setIsAuth(true)}>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </Button>
            <Button className="w-full py-4" onClick={() => setIsAuth(true)}>Phone Number</Button>
            <button className="text-primary font-bold text-sm mt-4 hover:underline" onClick={() => setIsAuth(true)}>Continue as Guest</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <audio 
        ref={audioRef}
        src={currentAudio?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnd}
      />

      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 glass-header px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed border-2 border-white shadow-sm flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <h1 className="font-headline font-bold text-primary text-lg">Om Sai Ram</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary-fixed/20 transition-all">
          <Bell size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && <HomeScreen onNavigate={setActiveTab} />}
            {activeTab === 'ask-sai' && <AskSaiScreen />}
            {activeTab === 'aarti' && (
              <AartiScreen 
                currentAudio={currentAudio}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                togglePlay={togglePlay}
                seek={seek}
                setCurrentAudio={setCurrentAudio}
                setIsPlaying={setIsPlaying}
                isBackground={isBackground}
                setIsBackground={setIsBackground}
              />
            )}
            {activeTab === 'parayan' && <ParayanScreen />}
            {activeTab === 'bhajans' && <BhajansScreen />}
            {activeTab === 'temples' && <TemplesScreen />}
            {activeTab === 'comfort' && <ComfortScreen />}
            {activeTab === 'sai-answers' && <SaiBabaAnswersScreen />}
            {activeTab === 'thursday' && <ThursdayScreen />}
            {activeTab === 'profile' && <ProfileScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Player Bar (Visible when not on Aarti screen) */}
      <AnimatePresence>
        {currentAudio && activeTab !== 'aarti' && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-28 left-4 right-4 z-40"
          >
            <div className="bg-primary text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl shadow-primary/40">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Wind size={20} className={cn(isPlaying ? "animate-spin-slow" : "")} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Now Playing</p>
                  <p className="text-sm font-bold truncate">{currentAudio.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center">
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={() => setActiveTab('aarti')} className="p-2 hover:bg-white/10 rounded-full">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full rounded-t-[40px] z-50 bg-background/80 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(62,39,35,0.08)] flex justify-around items-center pt-3 pb-8 px-4">
        <NavItem icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavItem icon={MessageSquare} label="Ask Sai" active={activeTab === 'ask-sai'} onClick={() => setActiveTab('ask-sai')} />
        <NavItem icon={BookOpen} label="Parayan" active={activeTab === 'parayan'} onClick={() => setActiveTab('parayan')} />
        <NavItem icon={Music} label="Bhajans" active={activeTab === 'bhajans'} onClick={() => setActiveTab('bhajans')} />
        <NavItem icon={MapPin} label="Temples" active={activeTab === 'temples'} onClick={() => setActiveTab('temples')} />
        <NavItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </nav>
    </div>
  );
}

