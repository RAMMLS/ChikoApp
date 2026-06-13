import React from "react";

export default function IOSListItem({
  icon,
  title,
  subtitle,
  right,
  onClick,
  hasChevron = true,
  className = "",
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  hasChevron?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 active:bg-gray-50 ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {right}
        {hasChevron && <ChevronRight className="w-5 h-5 text-gray-400" />}
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}
