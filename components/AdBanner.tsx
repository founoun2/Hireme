import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
  isDesktopSidebar?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slot, 
  format = 'auto',
  className = '',
  style = {},
  isDesktopSidebar = false
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Desktop sidebar uses fixed 160x600 size
  const adStyle = isDesktopSidebar 
    ? { display: 'inline-block', width: '160px', height: '600px' }
    : { display: 'block', ...style };

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-2474444884447314"
        data-ad-slot={slot}
        data-ad-format={isDesktopSidebar ? undefined : format}
        data-full-width-responsive={isDesktopSidebar ? undefined : "true"}
      />
    </div>
  );
};

// Sidebar Ad Component (Desktop Left Side)
export const SidebarAd: React.FC = () => {
  return (
    <div className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-10">
      <div className="bg-white rounded-2xl border border-zinc-100 p-3 shadow-sm">
        <p className="text-[7px] uppercase tracking-wider text-zinc-400 font-bold mb-2 text-center">
          Publicité
        </p>
        <AdBanner 
          slot="6802637448"
          isDesktopSidebar={true}
        />
      </div>
    </div>
  );
};

// In-Feed Ad Component (Desktop & Mobile - Between Jobs)
export const InFeedAd: React.FC = () => {
  return (
    <div className="w-full my-4">
      <div className="bg-gradient-to-br from-zinc-50 to-white rounded-2xl border border-zinc-100 p-4 shadow-sm">
        <p className="text-[8px] uppercase tracking-wider text-zinc-400 font-bold mb-3 text-center flex items-center justify-center gap-1.5">
          <i className="fa fa-info-circle text-[7px]"></i>
          Publicité
        </p>
        <AdBanner 
          slot="7273410736"
          format="fluid"
          style={{ minHeight: '250px' }}
        />
      </div>
    </div>
  );
};
