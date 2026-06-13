import React from "react";

export default function IOSListGroup({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-8 px-4 ${className}`}>
      {title && <h2 className="mb-2 px-1 text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {children}
      </div>
    </div>
  );
}
