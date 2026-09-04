import { useState } from 'react';
import { profile } from '@/data/content';
import { supabase } from '@/lib/supabase';
import { Send, Check, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      if (error) throw error;

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Signal lost — could not reach the neural network.',
      );
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center px-6 gap-6">
      <div className="w-full max-w-md animate-slide-in-right text-right text-readable">
        <p className="font-mono-tech text-amber-400 text-sm tracking-[0.3em] uppercase mb-4">
          [ Output Axon ]
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Contact</h2>
        <p className="text-white/75 text-sm mb-6">
          Transmit a signal. I will receive it.
        </p>
      </div>

      <div className="w-full max-w-md">
        {status === 'success' ? (
          <div className="content-backdrop rounded-xl border border-amber-400/40 p-8 text-center animate-float-in">
            <Check className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <p className="text-amber-200 font-semibold mb-1">Signal transmitted</p>
            <p className="text-white/70 text-xs">Your message has reached the network.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="content-backdrop rounded-xl border border-amber-500/30 p-5 space-y-4 animate-float-in"
          >
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'sending'}
                className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 focus:bg-white/12 transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'sending'}
                className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 focus:bg-white/12 transition-all"
              />
            </div>
            <div>
              <textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === 'sending'}
                rows={4}
                className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60 focus:bg-white/12 transition-all resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/50 text-amber-300 rounded-lg py-2.5 text-sm font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <span className="w-4 h-4 border-2 border-amber-300/40 border-t-amber-300 rounded-full animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Transmit Signal
                </>
              )}
            </button>
          </form>
        )}

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mt-6 text-readable">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-tech text-white/60 hover:text-amber-400 text-xs transition-colors cursor-pointer"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
