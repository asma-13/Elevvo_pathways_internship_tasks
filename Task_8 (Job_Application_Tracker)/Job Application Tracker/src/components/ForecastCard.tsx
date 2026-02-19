import { ForecastDay, getWeatherIconUrl } from '../lib/weatherApi';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">3-Day Forecast</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
          >
            <p className="text-sm font-semibold text-gray-900 mb-2">{day.date}</p>
            <img
              src={getWeatherIconUrl(day.icon)}
              alt={day.description}
              className="w-16 h-16 my-2"
            />
            <p className="text-xs text-gray-600 capitalize mb-3">{day.description}</p>
            
            <div className="flex gap-3 text-sm">
              <span className="font-semibold text-red-600">{Math.round(day.tempMax)}°</span>
              <span className="text-gray-400">/</span>
              <span className="font-semibold text-blue-600">{Math.round(day.tempMin)}°</span>
            </div>
            
            <p className="text-xs text-gray-500 mt-2">💧 {day.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
