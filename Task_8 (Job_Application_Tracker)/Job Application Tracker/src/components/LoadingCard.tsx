import { Loader2 } from 'lucide-react';

export function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center min-h-[300px]">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Loading weather data...</p>
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-12 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-5 h-5 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
