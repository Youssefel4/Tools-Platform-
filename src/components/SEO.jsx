import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website', noindex = false, structuredData }) => {
    const siteTitle = 'Tools Platform';
    const siteUrl = 'https://platformtools.netlify.app';
    const defaultDescription = 'A collection of useful online tools including calculator, color picker, unit converter, and more.';
    const defaultKeywords = 'tools, calculator, color picker, converter, utilities, web tools';
    const defaultImage = `${siteUrl}/favicon.png`;
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} | Free Online Tools & Utilities`;
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || defaultKeywords;
    const ogImage = image || defaultImage;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="author" content="Tools Platform" />
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="theme-color" content="#3b82f6" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title || siteTitle} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={title || siteTitle} />

            {/* Canonical */}
            <link rel="canonical" href={currentUrl} />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
