import { useSEO } from '../lib/seo';

export default function NotFound({ onNavigateHome }: { onNavigateHome: () => void }) {
  useSEO({
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist. Browse T'sys Industrial Controls Inc.'s product catalog or return to the homepage.",
    path: window.location.pathname,
    noindex: true,
  });

  return (
    <div className="pt-[100px] pb-32 flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <span className="label-caps text-primary block mb-3 tracking-widest">404</span>
        <p className="font-headline font-bold text-2xl mb-3">Page Not Found</p>
        <p className="text-secondary text-sm mb-6 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <button onClick={onNavigateHome} className="text-primary label-caps text-sm hover:underline">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
