export const SkeletonInfo = () => (
  <div className="space-y-3 pl-6 min-h-[500px]">
    {[...Array(7)].map((_, i) => (
      <div key={i} className="space-y-1">
        <div className="w-28 h-3 bg-gray-700 rounded animate-pulse" />
        <div className="w-56 h-4 bg-gray-800 rounded animate-pulse" />
      </div>
    ))}
  </div>
);