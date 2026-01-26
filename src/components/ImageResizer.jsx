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
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                        Image Resizer
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Resize your images instantly. 100% Privacy - Processing happens in your browser.
                    </p>
                </div>

                {!image ? (
                    <div
                        className={`
              relative border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-300
              ${dragActive
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                                : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-gray-800'
                            }
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

                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                                <FaUpload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Drag & Drop your image here
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                or
                            </p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                            >
                                Choose Image
                            </button>
                            <p className="text-sm text-gray-400 mt-2">
                                Supports: JPG, PNG, WEBP
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                            {/* Preview Area */}
                            <div className="flex flex-col items-center">
                                <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-600">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                        Original: {image.naturalWidth} x {image.naturalHeight}
                                    </span>
                                </div>
                            </div>

                            {/* Controls Area */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                                        <FaImage className="mr-2 text-blue-500" /> Resize Settings
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Width (px)
                                            </label>
                                            <input
                                                type="number"
                                                value={width}
                                                onChange={handleWidthChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Height (px)
                                            </label>
                                            <input
                                                type="number"
                                                value={height}
                                                onChange={handleHeightChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setLockAspectRatio(!lockAspectRatio)}
                                            className={`
                          flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
                          ${lockAspectRatio
                                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                                }
                        `}
                                        >
                                            {lockAspectRatio ? <FaLock className="mr-2" /> : <FaLockOpen className="mr-2" />}
                                            {lockAspectRatio ? 'Locked Aspect Ratio' : 'Unlocked Aspect Ratio'}
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Output Settings</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Format
                                        </label>
                                        <select
                                            value={format}
                                            onChange={(e) => setFormat(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="image/jpeg">JPEG</option>
                                            <option value="image/png">PNG</option>
                                            <option value="image/webp">WEBP</option>
                                        </select>
                                    </div>

                                    {format !== 'image/png' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Quality ({quality}%)
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={quality}
                                                onChange={(e) => setQuality(parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={resetImage}
                                        className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-lg transition-colors flex items-center justify-center"
                                    >
                                        <FaUndo className="mr-2" /> Reset
                                    </button>
                                    <button
                                        onClick={downloadImage}
                                        className="flex-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
                                    >
                                        <FaDownload className="mr-2" /> Download
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Hidden Canvas for Processing */}
                        <canvas ref={canvasRef} className="hidden"></canvas>
                    </div>
                )}

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
                        <p className="text-gray-600 dark:text-gray-400">All processing happens directly in your browser. Your photos never leave your device.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                        <p className="text-gray-600 dark:text-gray-400">No upload or download wait times. Instant resizing using WebAssembly technology.</p>
                    </div>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">High Quality</h3>
                        <p className="text-gray-600 dark:text-gray-400">Advanced resampling algorithms ensure your images stay crisp and clear.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageResizer;
