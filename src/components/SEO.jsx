import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false,
  structuredData,
  faqs,
  article
}) => {
  const siteTitle = 'Tools Platform';
  const siteUrl = 'https://platformtools.netlify.app';
  const defaultDescription = '50+ free, fast, and private online tools: calculators, converters, image resizer, QR generator, and developer utilities. 100% free with no sign-up.';
  const defaultKeywords = 'free online tools, web tools, calculators, unit converter, password generator, qr code generator, image resizer, developer utilities';
  const defaultImage = `${siteUrl}/logo.png`;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);

  // Keep title strictly <= 60 characters to satisfy Google & Ahrefs SEO requirements
  let fullTitle;
  if (!title) {
    fullTitle = `${siteTitle} | 50+ Free Online Web Tools & Utilities`;
  } else if (title.includes(siteTitle)) {
    fullTitle = title.length <= 60 ? title : title.slice(0, 57) + '...';
  } else if (title.length + siteTitle.length + 3 <= 60) {
    fullTitle = `${title} | ${siteTitle}`;
  } else {
    fullTitle = title.length <= 60 ? title : title.slice(0, 57) + '...';
  }

  // Keep meta description strictly <= 160 characters
  const rawDescription = (description || defaultDescription).trim();
  const metaDescription = rawDescription.length > 160
    ? rawDescription.slice(0, 157).replace(/\s+\S*$/, '') + '...'
    : rawDescription;

  const metaKeywords = keywords || defaultKeywords;
  const ogImage = image || defaultImage;

  // Build FAQ Schema if faqs array provided
  const faqSchema = (faqs && faqs.length > 0) ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Build Article Schema if article provided
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": article.author?.name || "Tools Platform Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteTitle,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": article.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  } : null;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Tools Platform" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#2563eb" />

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

      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Custom Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* FAQ Structured Data */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Article Structured Data */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
