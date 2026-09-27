import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse" aria-label="Loading weather intelligence data">
      {/* 3. Hero Skeleton */}
      <div className="h-56 sm:h-64 w-full rounded-3xl bg-[#f0f3f1] border border-[#e2e8e3] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-3 flex-1 w-full">
          <div className="h-14 w-44 bg-[#cad4cb] rounded-2xl" />
          <div className="h-7 w-56 bg-[#cad4cb] rounded-xl" />
          <div className="h-4 w-36 bg-[#e2e8e3] rounded-lg" />
        </div>
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-[#cad4cb]/70 shrink-0" />
      </div>

      {/* Weather Summary Pill Skeleton */}
      <div className="h-16 w-full rounded-2xl bg-[#f4f6f4] border border-[#e2e8e3] p-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[#cad4cb]" />
        <div className="h-4 w-3/4 bg-[#cad4cb] rounded" />
      </div>

      {/* 4. Metrics Grid Skeleton (9 cards) */}
      <div className="space-y-3">
        <div className="h-5 w-40 bg-[#cad4cb] rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-[#f4f6f4] border border-[#e2e8e3] p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-4 w-20 bg-[#cad4cb] rounded" />
                <div className="h-4 w-12 bg-[#e2e8e3] rounded-full" />
              </div>
              <div className="h-7 w-16 bg-[#cad4cb] rounded" />
              <div className="h-3 w-28 bg-[#e2e8e3] rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* 5. 24-Hour Weather Skeleton */}
      <div className="h-72 w-full rounded-3xl bg-[#f4f6f4] border border-[#e2e8e3] p-6 space-y-4">
        <div className="h-5 w-48 bg-[#cad4cb] rounded" />
        <div className="h-48 w-full bg-[#e2e8e3]/60 rounded-xl" />
      </div>

      {/* 6. Weather Windows Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-[#f4f6f4] border border-[#e2e8e3] p-4 space-y-2.5">
            <div className="h-5 w-24 bg-[#cad4cb] rounded" />
            <div className="h-3 w-20 bg-[#e2e8e3] rounded" />
            <div className="h-10 w-full bg-[#e2e8e3]/70 rounded" />
          </div>
        ))}
      </div>

      {/* 7. 7-Day Forecast Strip Skeleton */}
      <div className="h-48 w-full rounded-3xl bg-[#f4f6f4] border border-[#e2e8e3] p-4 flex gap-3 overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex-1 h-full rounded-2xl bg-[#e2e8e3]/70" />
        ))}
      </div>

      {/* 8. Weather Alerts Skeleton */}
      <div className="h-40 w-full rounded-3xl bg-[#f4f6f4] border border-[#e2e8e3] p-6 space-y-3">
        <div className="h-5 w-36 bg-[#cad4cb] rounded" />
        <div className="h-20 w-full bg-[#e2e8e3]/60 rounded-2xl" />
      </div>
    </div>
  );
};
