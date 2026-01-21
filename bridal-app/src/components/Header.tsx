import React from 'react';
import { Sparkles, Settings } from 'lucide-react';

interface HeaderProps {
    onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
    return (
        <header className="header-container glass-panel">
            <div className="logo-container">
                <div className="logo-icon">
                    <Sparkles size={24} color="#C9A962" />
                </div>
                <div className="logo-text">
                    BRIDAL <span className="logo-accent">AI</span> STUDIO
                </div>
            </div>

            <div className="header-actions">
                <button
                    onClick={onOpenSettings}
                    className="icon-button"
                    title="Ayarlar"
                >
                    <Settings size={24} strokeWidth={1.5} />
                </button>
                <div className="status-badge">
                    <div className="status-dot"></div>
                    <span className="status-text">Sistem Aktif</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
