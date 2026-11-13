import { useEffect } from 'react';

/**
 * Custom hook to manage SEO, AEO, and GEO metadata and schemas.
 * Updates standard meta tags, Open Graph, Twitter Cards, canonical links, and injects JSON-LD schemas.
 * 
 * @param {Object} seoOptions
 * @param {string} seoOptions.title Page title
 * @param {string} seoOptions.description Page description
 * @param {string} seoOptions.canonicalUrl Canonical URL of the page
 * @param {string} [seoOptions.ogType='website'] Open Graph type (e.g. 'website', 'product')
 * @param {string} [seoOptions.ogImage] Open Graph image URL
 * @param {Array<Object>} [seoOptions.schemas=[]] Array of JSON-LD schema objects
 */
export const useSeo = ({ title, description, canonicalUrl, ogType = 'website', ogImage, schemas = [] }) => {
    useEffect(() => {
        // 1. Update document title
        if (title) {
            document.title = title;
        }

        // 2. Update Meta Description
        let descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
            descMeta.setAttribute('content', description || '');
        } else {
            descMeta = document.createElement('meta');
            descMeta.setAttribute('name', 'description');
            descMeta.setAttribute('content', description || '');
            document.head.appendChild(descMeta);
        }

        // 3. Update Canonical Link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute('href', canonicalUrl || '');
        } else if (canonicalUrl) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            canonicalLink.setAttribute('href', canonicalUrl);
            document.head.appendChild(canonicalLink);
        }

        // 4. Update Open Graph Tags
        const updateOgTag = (property, value) => {
            if (!value) return;
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', value);
        };

        updateOgTag('og:title', title);
        updateOgTag('og:description', description);
        updateOgTag('og:url', canonicalUrl);
        updateOgTag('og:type', ogType);
        updateOgTag('og:site_name', 'E M E R Technical Services');
        updateOgTag('og:locale', 'en_AE');
        if (ogImage) {
            updateOgTag('og:image', ogImage);
            updateOgTag('og:image:type', 'image/png');
            updateOgTag('og:image:alt', 'E M E R Technical Services');
        }

        // 5. Update Twitter Card Tags
        const updateTwitterTag = (name, value) => {
            if (!value) return;
            let tag = document.querySelector(`meta[name="${name}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('name', name);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', value);
        };

        updateTwitterTag('twitter:card', 'summary_large_image');
        updateTwitterTag('twitter:title', title);
        updateTwitterTag('twitter:description', description);
        if (ogImage) {
            updateTwitterTag('twitter:image', ogImage);
            updateTwitterTag('twitter:image:alt', 'E M E R Technical Services');
        }

        // 6. Inject JSON-LD Schema Scripts
        // Remove any existing dynamic schemas first to prevent duplication
        const existingScripts = document.querySelectorAll('script[data-seo-schema]');
        existingScripts.forEach(script => script.remove());

        // Add new schemas
        const addedScripts = [];
        schemas.forEach((schema, index) => {
            if (schema) {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.setAttribute('data-seo-schema', `schema-${index}`);
                script.text = JSON.stringify(schema);
                document.head.appendChild(script);
                addedScripts.push(script);
            }
        });

        // Cleanup function: remove the injected scripts when component unmounts
        return () => {
            addedScripts.forEach(script => script.remove());
        };
    }, [title, description, canonicalUrl, ogType, ogImage, schemas]);
};

export default useSeo;
