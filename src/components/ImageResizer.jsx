import React, { useState, useRef, useEffect } from 'react';
import { FaUpload, FaImage, FaDownload, FaUndo, FaLock, FaLockOpen } from 'react-icons/fa';
import SEO from './SEO';

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
        if (lockAspectRatio) {
            setHeight(Math.round(newWidth / originalAspectRatio));
        }
    };

    const handleHeightChange = (e) => {
        const newHeight = parseInt(e.target.value) || 0;
        setHeight(newHeight);
        if (lockAspectRatio) {
            setWidth(Math.round(newHeight * originalAspectRatio));
        }
    };

    const downloadImage = () => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        // High quality scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(image, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(format, quality / 100);

        // Trigger download
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <SEO
                title="Image Resizer"
                description="Free online image resizer - resize JPG, PNG, WEBP images locally in your browser. Resize by pixels or percentage, maintain aspect ratio, no upload to server. Privacy-first image resizing tool."
                keywords="image resizer, resize image, photo resizer, shrink image, compress image, online image editor, image compressor, photo editor, image size reducer, privacy image tool"
                url="https://platformtools.netlify.app/image-resizer"
            />
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-10 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                        Image <span className="text-gradient">Resizer</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
                        Resize your images instantly. 100% Privacy - Processing happens directly in your browser.
                    </p>
                </div>

                {!image ? (
                    <div
                        className={`
              relative border-2 border-dashed rounded-3xl p-12 sm:p-20 text-center transition-all duration-300
              ${dragActive
                                ? 'border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-[1.02] shadow-xl shadow-blue-500/10'
                                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50/80 dark:hover:bg-gray-800/80'
                            } glass-panel overflow-hidden
            `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        
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
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                                    Drag & Drop your image here
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">
                                    or
                                </p>
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30 w-full sm:w-auto"
                            >
                                Choose Image
                            </button>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium bg-gray-100/50 dark:bg-gray-800/50 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                                <span className="text-blue-500">ℹ️</span>  Supports: JPG, PNG, WEBP
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-panel rounded-3xl overflow-hidden shadow-xl relative animate-fade-in-up">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10 relative z-10">
                            {/* Preview Area */}
                            <div className="flex flex-col lg:border-r border-gray-200 dark:border-gray-700 lg:pr-8">
                                <div className="relative w-full aspect-square bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50 shadow-inner group">
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
                                        <span>📏</span> Original Size: {image.naturalWidth} × {image.naturalHeight}px
                                    </span>
                                </div>
                            </div>

                            {/* Controls Area */}
                            <div className="space-y-8 lg:pl-4 flex flex-col justify-between">
                                <div className="space-y-8">
                                    <div className="space-y-5">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
                                            <span className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg"><FaImage className="text-blue-600 dark:text-blue-400" /></span> Resize Dimensions
                                        </h3>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-inner">
                                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider text-center">
                                                    Width (px)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={width}
                                                    onChange={handleWidthChange}
                                                    className="w-full px-2 py-2 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 text-center text-2xl font-bold font-mono focus:ring-0 focus:border-blue-500 dark:text-white transition-colors"
                                                />
                                            </div>
                                            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-inner">
                                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider text-center">
                                                    Height (px)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={height}
                                                    onChange={handleHeightChange}
                                                    className="w-full px-2 py-2 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 text-center text-2xl font-bold font-mono focus:ring-0 focus:border-purple-500 dark:text-white transition-colors"
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
                                                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                                  }
                                                `}
                                            >
                                                {lockAspectRatio ? <FaLock className="mr-2.5" /> : <FaLockOpen className="mr-2.5" />}
                                                {lockAspectRatio ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-6"></div>

                                    <div className="space-y-5">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
                                            <span className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg"><span className="text-purple-600 dark:text-purple-400 font-serif font-black">⚙️</span></span> Output Settings
                                        </h3>

                                        <div className="bg-white/50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 space-y-5">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                                                    Target Format
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={format}
                                                        onChange={(e) => setFormat(e.target.value)}
                                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:text-white font-medium appearance-none shadow-sm cursor-pointer"
                                                    >
                                                        <option value="image/jpeg">JPEG Image (.jpg)</option>
                                                        <option value="image/png">PNG Image (.png)</option>
                                                        <option value="image/webp">WebP Image (.webp)</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {format !== 'image/png' && (
                                                <div className="pt-2 animate-fade-in">
                                                    <div className="flex justify-between items-end mb-3">
                                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                            Quality
                                                        </label>
                                                        <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold px-2.5 py-1 rounded-md text-sm border border-purple-200 dark:border-purple-800">
                                                            {quality}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="100"
                                                        value={quality}
                                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                                        className="w-full h-2.5 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-auto">
                                    <button
                                        onClick={resetImage}
                                        className="sm:w-1/3 px-6 py-4 bg-gray-100 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-900/30 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-800 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 shadow-sm"
                                    >
                                        <FaUndo /> Reset
                                    </button>
                                    <button
                                        onClick={downloadImage}
                                        className="sm:w-2/3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-3 text-lg"
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

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center relative z-10 glass-panel rounded-3xl p-8">
                    <div className="p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-500/20 transform -rotate-3 hover:rotate-0 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Secure & Private</h3>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">All processing happens directly in your browser. Your photos never leave your device.</p>
                    </div>
                    <div className="p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-purple-500/20 transform rotate-3 hover:rotate-0 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Lightning Fast</h3>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">No upload or download wait times. Instant resizing using WebAssembly technology.</p>
                    </div>
                    <div className="p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-emerald-500/20 transform -rotate-3 hover:rotate-0 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">High Quality</h3>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">Advanced resampling algorithms ensure your images stay crisp and incredibly clear.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageResizer;
