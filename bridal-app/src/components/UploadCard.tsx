import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadCardProps {
    number: number;
    title: string;
    subtitle: string;
    optional?: boolean;
    value: string | null;
    onFileSelect: (base64: string | null) => void;
    icon: React.ReactNode;
}

const UploadCard: React.FC<UploadCardProps> = ({
    number, title, subtitle, optional, value, onFileSelect, icon
}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onFileSelect(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="upload-card glass-panel"
        >
            <div className="card-header">
                <div className="card-number">{number}</div>
                <div className="card-title-group">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </div>
                {optional && <span className="optional-badge">İsteğe Bağlı</span>}
            </div>

            <AnimatePresence mode="wait">
                {value ? (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="preview-container"
                    >
                        <img src={value} alt={title} className="preview-image" />
                        <button
                            className="remove-button"
                            onClick={() => onFileSelect(null)}
                        >
                            <X size={18} />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`drop-zone ${isDragActive ? 'drop-zone-active' : ''}`}
                    >
                        <div {...getRootProps()} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <input {...getInputProps()} />
                            <div className="drop-icon">
                                {icon}
                            </div>
                            <div className="drop-text">
                                {isDragActive ? 'Görseli Buraya Bırakın' : 'Görseli Sürükleyin veya Tıklayın'}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default UploadCard;
