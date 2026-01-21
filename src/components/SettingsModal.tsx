import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    webhookUrl: string;
    onSave: (url: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, webhookUrl, onSave }) => {
    const [url, setUrl] = useState(webhookUrl);

    const handleSave = () => {
        onSave(url);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="modal-content glass-panel"
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 className="modal-title" style={{ margin: 0 }}>Yapılandırma</h2>
                            <button onClick={onClose} className="icon-button">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="form-group">
                            <label className="form-label">n8n Webhook URL</label>
                            <input
                                type="text"
                                className="form-input"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                placeholder="https://n8n.example.com/webhook/..."
                            />
                            <p style={{ fontSize: '0.7rem', color: 'var(--soft-gray)', marginTop: '0.5rem' }}>
                                n8n workflow'unuzdaki webhook tetikleyici URL'sini buraya girin.
                            </p>
                        </div>

                        <button
                            className="primary-button"
                            style={{ width: '100%', marginTop: '1rem' }}
                            onClick={handleSave}
                        >
                            <Save size={20} />
                            AYARLARI KAYDET
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;
