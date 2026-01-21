import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Mail, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-100 glass-panel p-8 rounded-3xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center border-2 border-gold mx-auto mb-4">
                        <Sparkles className="text-gold w-8 h-8" />
                    </div>
                    <h1 className="logo text-3xl tracking-widest text-charcoal">
                        BRIDAL <span className="font-semibold text-gold">AI</span>
                    </h1>
                    <p className="text-soft-gray text-xs uppercase tracking-[0.2em] mt-2">Yönetici Girişi</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="form-group">
                        <label className="form-label">E-Posta</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold w-5 h-5" />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: '3.5rem' }}
                                placeholder="admin@studio.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Parola</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold w-5 h-5" />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: '3.5rem' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="primary-button w-full justify-center"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'GİRİŞ YAP'}
                    </button>
                </form>

                <p className="text-center text-[10px] text-soft-gray mt-8 tracking-widest uppercase">
                    &copy; 2026 BRIDAL AI STUDIO PREMIUM
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
