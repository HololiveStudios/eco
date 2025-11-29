// src/components/admin/StatsCard.tsx
interface Props {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard(props: Props) {
  return (
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-gray-600 text-sm font-medium">{props.title}</h3>
        <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={props.icon} />
          </svg>
        </div>
      </div>
      <p class="text-3xl font-bold mb-2">{props.value}</p>
      {props.trend && (
        <span class={`text-sm ${props.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {props.trend.isPositive ? '↑' : '↓'} {props.trend.value}%
        </span>
      )}
    </div>
  );
}