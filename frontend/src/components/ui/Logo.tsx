import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  clickable?: boolean;
}

export function Logo({ size = 'md', showText = true, clickable = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const logoContent = (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} relative`}>
        <Image
          src="/logo.png"
          alt="MaqOn Logo"
          fill
          className="object-contain"
          sizes={sizeClasses[size]}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-display font-bold text-white leading-none`}>
            MaqOn
          </span>
          <span className={`${textSizes[size]} font-display font-normal text-[#f7b34b] leading-none text-base`}>
            Importaciones
          </span>
        </div>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link 
        href="/" 
        className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200 cursor-pointer"
        aria-label="Ir a la página de inicio"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
