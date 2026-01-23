import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabaseHelpers } from '../config/supabase';

const RedirectHandler = () => {
    const { code } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        const redirect = async () => {
            if (!code) return;

            try {
                const data = await supabaseHelpers.getOriginalUrl(code);

                if (data && data.original_url) {
                    // Increment clicks asynchronously
                    supabaseHelpers.incrementUrlClicks(code);

                    // Redirect
                    window.location.href = data.original_url.startsWith('http') ? data.original_url : `https://${data.original_url}`;
                } else {
                    setError('URL not found');
                }
            } catch (err) {
                console.error("Redirect error:", err);
                setError('Error resolving URL');
            }
        };

        redirect();
    }, [code]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
                    <p className="text-gray-600 dark:text-gray-300">{error}</p>
                    <a href="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Go Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
            </div>
        </div>
    );
};

export default RedirectHandler;
