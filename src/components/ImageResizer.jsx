import React, { useState, useRef } from 'react';
import { FaUpload, FaImage, FaDownload, FaUndo, FaLock, FaLockOpen } from 'react-icons/fa';
import ToolLayout from './ToolLayout';

const ImageResizer = () => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [originalAspectRatio, setOriginalAspectRatio] = useState(1);
    const [lockAspectRatio, setLockAspectRatio] = useState(true);
    const [quality, setQuality] = useState(90);
    const [format, setFormat] = useState('image/jpeg');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (!file.type.match('image.*')) {
            alert("Please upload an image file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setImage(img);
                setWidth(img.width);
                setHeight(img.height);
                setOriginalAspectRatio(img.width / img.height);
                setPreviewUrl(img.src);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleWidthChange = (e) => {
        const newWidth = parseInt(e.target.value) || 0;
        setWidth(newWidth);
        if (lockAspectRatio && originalAspectRatio) {
            setHeight(Math.round(newWidth / originalAspectRatio));
        }
    };

    const handleHeightChange = (e) => {
        const newHeight = parseInt(e.target.value) || 0;
        setHeight(newHeight);
        if (lockAspectRatio && originalAspectRatio) {
            setWidth(Math.round(newHeight * originalAspectRatio));
        }
    };

    const handleResize = () => {
        if (!image) return;

        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(image, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(format, quality / 100);

        const link = document.createElement('a');
        link.download = `resized-image.${format.split('/')[1]}`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const resetImage = () => {
        setImage(null);
        setPreviewUrl(null);
        setWidth(0);
        setHeight(0);
    };

    const faqs = [
        {
            question: "How do I resize an image without losing quality?",
            answer: "Keep the 'Maintain Aspect Ratio' option enabled so the image is not stretched or distorted. Our tool uses bicubic canvas resampling to retain crispness and smooth gradients."
        },
        {
            question: "What image formats are supported?",
            answer: "This free image resizer supports all popular image formats including JPG (JPEG), PNG, and modern WebP."
        },
        {
            question: "Are my uploaded photos stored on any remote server?",
            answer: "No. Your photos never leave your device. All resizing and format conversions occur 100% locally inside your web browser."
        },
        {
            question: "Can I resize images for social media platforms?",
            answer: "Yes! You can specify exact pixel dimensions: 1080x1080 for Instagram square posts, 1280x720 for YouTube thumbnails, or 1500x500 for Twitter/X header banners."
        }
    ];

    const howToUse = [
        { title: "Upload Your Image", desc: "Drag & drop any JPG, PNG, or WebP photo or click Choose Image to select from your device." },
        { title: "Set New Dimensions", desc: "Enter your desired width or height. Proportions remain locked automatically." },
        { title: "Download Resized Image", desc: "Choose your output format and quality, then click Download Image." }
    ];

    const features = [
        { title: "Supported Formats", desc: "Compatible with JPG, PNG, and WebP with instant live preview." },
        { title: "100% Private", desc: "Processing happens locally on your computer or phone with zero server uploads." },
        { title: "Bicubic Smoothing", desc: "High-precision image resampling ensures clean lines and uncompromised detail." }
    ];

    return (
        <ToolLayout
            title="Free Image Resizer Online"
            subtitle="Resize JPG, PNG and WebP images online for free. Adjust dimensions, lock aspect ratio, and download instantly without software installation."
            category="media"
            categoryName="Media & Design"
            icon={FaImage}
            badge="Popular"
            seoDescription="Resize JPG, PNG and WebP images online for free. No installation required. Fast, privacy-first client-side image resizing with aspect ratio lock."
            seoKeywords="image resizer, resize image online, resize jpg, resize png, free image resize, photo resizer, shrink image, social media image resizer"
            howToUse={howToUse}
            features={features}
            faqs={faqs}
            relatedToolIds={['image-compressor', 'image-base64-converter', 'color-picker']}
            blogSlug="how-to-resize-image-without-losing-quality"
            blogTitle="How to Resize and Compress Images Without Losing Quality"
        >
            <div className="relative z-10">
                {!image ? (
                    <div
                        className={`
                            relative border-2 border-dashed rounded-3xl p-12 sm:p-20 text-center transition-all duration-300
                            ${dragActive
                                ? 'border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-[1.02] shadow-xl shadow-blue-500/10'
                                : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                            } overflow-hidden
                        `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleChange}
                            accept="image/*"
                            className="hidden"
                        />

                        <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
                            <div className="p-6 bg-blue-100 dark:bg-blue-900/40 rounded-full shadow-inner transform transition-transform group-hover:scale-110 duration-300">
                                <FaUpload className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                    Drag & Drop your image here
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">
                                    or
                                </p>
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 w-full sm:w-auto"
                            >
                                Choose Image
                            </button>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium bg-slate-100/80 dark:bg-slate-800/80 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                                <span className="text-blue-500">ℹ️</span> Supports: JPG, PNG, WEBP
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl overflow-hidden relative">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                            {/* Preview Area */}
                            <div className="flex flex-col lg:border-r border-slate-200 dark:border-slate-800 lg:pr-8">
                                <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800/60 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-inner group">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-full max-h-full object-contain p-4 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 border border-white/20 shadow-lg">
                                        Preview
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap justify-between items-center text-sm">
                                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl font-bold border border-blue-100 dark:border-blue-800 shadow-sm flex items-center gap-2">
                                        <span>📏</span> Original: {image.naturalWidth} × {image.naturalHeight}px
                                    </span>
                                </div>
                            </div>

                            {/* Controls Area */}
                            <div className="space-y-8 lg:pl-4 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
                                        <span className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg"><FaImage className="text-blue-600 dark:text-blue-400" /></span> Resize Dimensions
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider text-center">
                                                Width (px)
                                            </label>
                                            <input
                                                type="number"
                                                value={width}
                                                onChange={handleWidthChange}
                                                className="w-full px-2 py-2 bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-center text-2xl font-bold font-mono focus:ring-0 focus:border-blue-500 dark:text-white transition-colors"
                                            />
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider text-center">
                                                Height (px)
                                            </label>
                                            <input
                                                type="number"
                                                value={height}
                                                onChange={handleHeightChange}
                                                className="w-full px-2 py-2 bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-center text-2xl font-bold font-mono focus:ring-0 focus:border-purple-500 dark:text-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center -mt-2">
                                        <button
                                            onClick={() => setLockAspectRatio(!lockAspectRatio)}
                                            className={`
                                                flex items-center px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm
                                                ${lockAspectRatio
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800'
                                                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                                }
                                            `}
                                        >
                                            {lockAspectRatio ? <FaLock className="mr-2.5" /> : <FaLockOpen className="mr-2.5" />}
                                            {lockAspectRatio ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
                                        </button>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                            Output Format & Quality
                                        </h3>

                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                                                    Target Format
                                                </label>
                                                <select
                                                    value={format}
                                                    onChange={(e) => setFormat(e.target.value)}
                                                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-medium"
                                                >
                                                    <option value="image/jpeg">JPEG Image (.jpg)</option>
                                                    <option value="image/png">PNG Image (.png)</option>
                                                    <option value="image/webp">WebP Image (.webp)</option>
                                                </select>
                                            </div>

                                            {format !== 'image/png' && (
                                                <div>
                                                    <div className="flex justify-between items-end mb-2">
                                                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                            Quality
                                                        </label>
                                                        <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold px-2.5 py-0.5 rounded-md text-xs">
                                                            {quality}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="100"
                                                        value={quality}
                                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                                        className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-auto">
                                    <button
                                        onClick={resetImage}
                                        className="sm:w-1/3 px-6 py-4 bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/30 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <FaUndo /> Reset
                                    </button>
                                    <button
                                        onClick={handleResize}
                                        className="sm:w-2/3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-3 text-lg"
                                    >
                                        <FaDownload /> Download Image
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Hidden Canvas for Processing */}
                        <canvas ref={canvasRef} className="hidden"></canvas>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageResizer;
