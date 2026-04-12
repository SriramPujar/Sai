import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, MessageSquare, BookOpen, MapPin, User, 
  Bell, Heart, Calendar, Sparkles, Wind, 
  Play, Pause, ChevronRight, Search, Filter,
  Clock, Users, CheckCircle2, Info, Share2,
  Mic, Send, Save, ArrowLeft, Volume2, VolumeX,
  SkipBack, SkipForward, Repeat
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
        <div className="h-48 w-full relative">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/73/Sai_Baba_of_Shirdi_portrait.jpg" 
            alt="Sai Baba" 
            className="w-full h-full object-cover object-top"
          />
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
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/73/Sai_Baba_of_Shirdi_portrait.jpg" 
            alt="Sai Baba" 
            className="w-full h-full object-cover relative z-10"
          />
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

const ParayanScreen = () => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('');
  const [isReading, setIsReading] = useState(false);

  if (isReading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="px-0 flex items-center gap-2" onClick={() => setIsReading(false)}>
            <ArrowLeft size={16} /> Back to Plan
          </Button>
          <span className="text-xs font-bold text-primary bg-primary-fixed/20 px-3 py-1 rounded-full">Chapter 1</span>
        </div>

        <Card className="bg-surface-container-lowest border border-primary-fixed/20 p-8 space-y-6">
          <h3 className="text-2xl font-headline font-bold text-center text-primary">Obeisances to Shri Ganesh</h3>
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

        <Button className="w-full py-4 text-lg" onClick={() => { setIsReading(false); setStep(3); }}>
          Complete Today's Reading
        </Button>
      </motion.div>
    );
  }

  if (step === 3) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8 text-center py-12"
      >
        <div className="w-24 h-24 bg-primary-fixed/20 rounded-full flex items-center justify-center mx-auto text-primary">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-headline font-bold">Reading Completed!</h2>
          <p className="text-sm text-on-surface-variant/60">Baba's blessings are with you.</p>
        </div>
        <Button className="w-full py-4" onClick={() => setStep(0)}>Return to Dashboard</Button>
      </motion.div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-headline font-bold">Parayan Planner</h2>
        <span className="text-xs font-bold text-on-surface-variant/40 uppercase">Step {step + 1} of 3</span>
      </div>

      {step === 0 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-headline font-bold">What is your devotional goal?</h3>
          <div className="grid grid-cols-1 gap-3">
            {['Peace & Mental Calm', 'Healing & Health', 'Gratitude', 'Family Wellbeing', 'Career Success', 'Surrender'].map(g => (
              <button 
                key={g}
                onClick={() => { setGoal(g); setStep(1); }}
                className={cn(
                  "p-5 rounded-xl text-left border transition-all",
                  goal === g ? "bg-primary-fixed/20 border-primary" : "bg-surface-container-low border-outline-variant/20 hover:border-primary/40"
                )}
              >
                <p className="font-bold text-sm">{g}</p>
              </button>
            ))}
          </div>
        </div>
      ) : step === 1 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-headline font-bold">Choose Duration</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '1 Day', sub: 'Intense' },
              { label: '7 Days', sub: 'Traditional' },
              { label: '9 Days', sub: 'Navratri Style' },
              { label: 'Custom', sub: 'Your Pace' }
            ].map(d => (
              <button 
                key={d.label}
                onClick={() => setStep(2)}
                className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/40 text-center space-y-2 transition-all"
              >
                <p className="font-bold text-lg">{d.label}</p>
                <p className="text-[10px] text-on-surface-variant/60 uppercase font-bold">{d.sub}</p>
              </button>
            ))}
          </div>
          <Button variant="ghost" className="w-full" onClick={() => setStep(0)}>Back</Button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <Card className="bg-primary text-white space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Your Personalized Plan</p>
              <h3 className="text-2xl font-headline font-bold">7-Day Parayan for {goal}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold">
                <span>Today's Reading</span>
                <span>Chapters 1-7</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="w-[14%] h-full bg-white rounded-full" />
              </div>
            </div>
          </Card>
          
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant/60">Today's Intention</h4>
            <p className="text-sm italic text-on-surface-variant leading-relaxed">"Today, I read with the intention of finding inner stillness and surrendering my worries at Sai's feet."</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button className="w-full py-4" onClick={() => setIsReading(true)}>Start Reading</Button>
            <Button variant="outline" className="w-full py-4" onClick={() => setStep(0)}>Reset Plan</Button>
          </div>
        </motion.div>
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
          <img 
            src="https://picsum.photos/seed/map-placeholder/800/400"
            alt="Map Placeholder" 
            className="w-full h-full object-cover opacity-50 grayscale" 
            referrerPolicy="no-referrer"
          />
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
        <div className="w-24 h-24 rounded-full bg-primary-fixed p-1 border-4 border-white shadow-xl">
          <img src="https://picsum.photos/seed/user-avatar/200/200" alt="Profile" className="w-full h-full object-cover rounded-full" />
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
    const saiBabaPortrait = "https://commons.wikimedia.org/wiki/Special:FilePath/Sai_Baba_of_Shirdi_portrait.jpg?width=600";
    const saiBabaStatue = "https://commons.wikimedia.org/wiki/Special:FilePath/Sai_baba_statue.jpg?width=600";
    const shirdiTemple = "https://commons.wikimedia.org/wiki/Special:FilePath/Shri_Sai_Baba_Temple,_Shirdi.jpg?width=600";
    
    const steps = [
      { 
        title: "Daily Sai Guidance", 
        desc: "Receive personalized wisdom and teachings from Sai Baba every morning to start your day with peace.",
        img: saiBabaPortrait
      },
      { 
        title: "Ask Sai AI", 
        desc: "Your spiritual companion. Seek guidance, find comfort, and explore Sai's teachings through reverent AI conversation.",
        img: saiBabaStatue
      },
      { 
        title: "Plan Your Devotion", 
        desc: "Organize your Satcharitra Parayan and plan your sacred pilgrimage to Shirdi with ease.",
        img: shirdiTemple
      }
    ];

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
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img src={steps[onboardingStep].img} alt="Onboarding" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
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
          <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-primary-fixed/30 shadow-2xl">
            <img 
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Sai_Baba_of_Shirdi_portrait.jpg?width=300" 
              alt="Sai Baba" 
              className="w-full h-full object-cover object-top"
            />
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
          <div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden border-2 border-white shadow-sm">
            <img src="https://picsum.photos/seed/user-avatar/100/100" alt="Profile" className="w-full h-full object-cover" />
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
        <NavItem icon={MapPin} label="Temples" active={activeTab === 'temples'} onClick={() => setActiveTab('temples')} />
        <NavItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
      </nav>
    </div>
  );
}

