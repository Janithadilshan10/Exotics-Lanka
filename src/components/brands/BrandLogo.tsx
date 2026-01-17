interface BrandLogoProps {
  brand: string;
  className?: string;
}

export function BrandLogo({ brand, className = "w-20 h-20" }: BrandLogoProps) {
  // Using multiple CDN sources with fallback chain
  const getLogoUrls = (brandName: string): string[] => {
    const iconNames: Record<string, string> = {
      "Mercedes-Benz": "mercedes",
      "BMW": "bmw",
      "Porsche": "porsche",
      "Land Rover": "landrover",
      "Toyota": "toyota",
      "Honda": "honda",
      "Lexus": "lexus",
      "Audi": "audi",
      "Ferrari": "ferrari",
      "Lamborghini": "lamborghini",
      "Bentley": "bentley",
      "Rolls-Royce": "rollsroyce",
      "Maserati": "maserati",
      "Aston Martin": "astonmartin",
      "McLaren": "mclaren",
      "Nissan": "nissan",
    };

    const iconName = iconNames[brandName];
    if (!iconName) return [];

    return [
      // Try multiple CDNs in order
      `https://cdn.simpleicons.org/${iconName}`,
      `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${iconName}.svg`,
      `https://unpkg.com/simple-icons@latest/icons/${iconName}.svg`,
    ];
  };

  const logoUrls = getLogoUrls(brand);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const currentIndex = parseInt(img.dataset.urlIndex || "0");
    const nextIndex = currentIndex + 1;

    if (nextIndex < logoUrls.length) {
      img.dataset.urlIndex = nextIndex.toString();
      img.src = logoUrls[nextIndex];
    } else {
      // All URLs failed, hide image
      img.style.display = "none";
    }
  };

  if (logoUrls.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center text-4xl font-bold`}>
        {brand.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={logoUrls[0]}
      alt={`${brand} logo`}
      className={`${className} object-contain drop-shadow-lg`}
      data-url-index="0"
      onError={handleError}
      crossOrigin="anonymous"
      loading="lazy"
    />
  );
}
