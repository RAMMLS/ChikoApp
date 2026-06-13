"use client";

type BrandLogoProps = {
  compact?: boolean;
};

export default function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "sm:gap-4"}`}>
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[18px] bg-[#ff4d8d] shadow-card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_48%)]" />
        <span className="relative text-xl font-black text-white">C</span>
      </div>
      <div className="leading-none">
        <div className={`${compact ? "text-lg" : "text-[1.9rem]"} font-black tracking-[0.22em] text-chiko-ink`}>
          CHIKO
        </div>
        <div className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-chiko-berry/80">
          Korean Street Food
        </div>
      </div>
    </div>
  );
}
