import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultGalleryProps {
    images: {
        image_1: string | null;
        image_2: string | null;
    };
}

const ResultGallery: React.FC<ResultGalleryProps> = ({ images }) => {
    if (!images.image_1 && !images.image_2) return null;

    return (
        <div className="results-container">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="hero-title"
                style={{ fontSize: '2.5rem', marginBottom: '3rem' }}
            >
                Oluşturulan Tasarımlar
            </motion.h2>

            <div className="results-grid">
                {images.image_1 && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="result-card glass-panel"
                    >
                        <img src={images.image_1} alt="Ön Görünüm" className="result-image" />
                        <div className="result-footer">
                            <span className="result-label">Ön Görünüm</span>
                            <a href={images.image_1} download={`bridal_front_${Date.now()}.png`} className="download-link">
                                <Download size={18} />
                                İNDİR
                            </a>
                        </div>
                    </motion.div>
                )}

                {images.image_2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="result-card glass-panel"
                    >
                        <img src={images.image_2} alt="Arka Görünüm" className="result-image" />
                        <div className="result-footer">
                            <span className="result-label">Arka Görünüm</span>
                            <a href={images.image_2} download={`bridal_back_${Date.now()}.png`} className="download-link">
                                <Download size={18} />
                                İNDİR
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ResultGallery;
