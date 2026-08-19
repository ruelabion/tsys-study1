import { ImageOff } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';

const ICON_SIZES: Record<Size, number> = { sm: 16, md: 28, lg: 40 };

export default function ProductImage({
  src,
  alt,
  className = '',
  size = 'md',
}: {
  src?: string;
  alt: string;
  className?: string;
  size?: Size;
}) {
  if (!src) {
    return (
      <div className={`flex flex-col items-center justify-center gap-1.5 bg-surface-container-low text-secondary/50 ${className}`}>
        <ImageOff size={ICON_SIZES[size]} strokeWidth={1.5} />
        {size !== 'sm' && (
          <span className="label-caps text-[9px] tracking-wide text-center px-2">Image Coming Soon</span>
        )}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} />;
}
