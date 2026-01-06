import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEO({
  title = 'Exotics.lk - Sri Lanka\'s Premier Luxury Car Marketplace',
  description = 'Discover Sri Lanka\'s finest selection of luxury and exotic vehicles. Buy and sell premium cars with confidence on Exotics.lk.',
  keywords = 'luxury cars sri lanka, exotic cars colombo, premium vehicles, car marketplace, buy luxury cars, sell exotic cars',
  image = '/og-image.jpg',
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const siteTitle = 'Exotics.lk';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {author && <meta name="author" content={author} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO */}
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
}

// Pre-configured SEO for common pages
export function HomeSEO() {
  return (
    <SEO
      title="Home"
      description="Sri Lanka's premier marketplace for luxury and exotic vehicles. Browse verified listings from trusted dealers and private sellers."
      keywords="luxury cars sri lanka, exotic cars, premium vehicles, car marketplace colombo"
    />
  );
}

export function CollectionSEO() {
  return (
    <SEO
      title="Collection"
      description="Browse our curated collection of luxury and exotic vehicles. Find your dream car from verified sellers across Sri Lanka."
      keywords="buy luxury cars, exotic car collection, premium vehicles sri lanka"
    />
  );
}

export function ListingSEO({
  title,
  description,
  price,
  year,
  image,
}: {
  title: string;
  description: string;
  price: number;
  year: number;
  image: string;
}) {
  return (
    <SEO
      title={title}
      description={`${year} ${title} - LKR ${(price / 1000000).toFixed(1)}M. ${description}`}
      image={image}
      type="product"
      keywords={`${title}, luxury car sri lanka, ${year} ${title}`}
    />
  );
}

export function SellerSEO({
  name,
  rating,
  reviewCount,
}: {
  name: string;
  rating: number;
  reviewCount: number;
}) {
  return (
    <SEO
      title={`${name} - Seller Profile`}
      description={`${name} has ${rating} star rating with ${reviewCount} reviews. Browse their collection of luxury vehicles on Exotics.lk.`}
      keywords={`${name}, car dealer sri lanka, luxury car seller`}
    />
  );
}

