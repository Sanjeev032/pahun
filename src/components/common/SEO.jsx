import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
    const siteName = 'Pahunn';
    const fullTitle = `${title} | ${siteName}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            {image && <meta property="twitter:image" content={image} />}
        </Helmet>
    );
};

export default SEO;
