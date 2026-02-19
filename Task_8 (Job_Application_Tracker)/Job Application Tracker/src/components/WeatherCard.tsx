import { Cloud, Droplets, Wind, Gauge, MapPin } from 'lucide-react';
import { WeatherData, getWeatherIconUrl } from '../lib/weatherApi';

interface WeatherCardProps {
  weather: WeatherData;
  onRemove?: () => void;
}

export function WeatherCard({ weather, onRemove }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{weather.city}</h3>
            <p className="text-sm text-gray-500">{weather.country}</p>
          </div>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 transition-colors text-sm"
          >
            Remove
          </button>
        )}
      </div>

      {/* Main Temperature */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-5xl font-bold text-gray-900">
            {Math.round(weather.temperature)}°C
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Feels like {Math.round(weather.feelsLike)}°C
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={getWeatherIconUrl(weather.icon)}
            alt={weather.description}
            className="w-20 h-20"
          />
          <p className="text-sm text-gray-600 capitalize">{weather.description}</p>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="flex flex-col items-center">
          <Droplets className="w-5 h-5 text-blue-500 mb-1" />
          <p className="text-xs text-gray-500">Humidity</p>
          <p className="text-sm font-semibold text-gray-900">{weather.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <Wind className="w-5 h-5 text-blue-500 mb-1" />
          <p className="text-xs text-gray-500">Wind</p>
          <p className="text-sm font-semibold text-gray-900">{weather.windSpeed} m/s</p>
        </div>
        <div className="flex flex-col items-center">
          <Gauge className="w-5 h-5 text-blue-500 mb-1" />
          <p className="text-xs text-gray-500">Pressure</p>
          <p className="text-sm font-semibold text-gray-900">{weather.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}
