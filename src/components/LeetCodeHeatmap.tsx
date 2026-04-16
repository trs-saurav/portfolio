'use client';

import React, { useMemo } from 'react';

interface CalendarDay {
  date: string;
  count: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface LeetCodeHeatmapProps {
  username: string;
  year?: number;
}

export function LeetCodeHeatmap({ username, year = new Date().getFullYear() }: LeetCodeHeatmapProps) {
  const [calendarData, setCalendarData] = React.useState<CalendarDay[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/leetcode?username=${username}&type=calendar`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch calendar data');
        }

        const result = await response.json();
        console.log('LeetCode calendar response:', result);
        console.log('Calendar items:', result.calendar?.length);
        setCalendarData(result.calendar || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error loading LeetCode calendar:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const weeks = useMemo(() => {
    if (!calendarData || calendarData.length === 0) {
      return [];
    }

    // Find the current year's first and last date
    const jan1 = new Date(year, 0, 1);
    const dec31 = new Date(year, 11, 31);
    
    // Start from the first day of the year, or the previous Sunday if needed
    const startDate = new Date(jan1);
    startDate.setDate(startDate.getDate() - jan1.getDay());

    const dataMap = new Map(calendarData.map(d => [d.date, d]));
    const weeks: (CalendarDay | null)[][] = [];
    let currentWeek: (CalendarDay | null)[] = [];

    let current = new Date(startDate);
    
    while (current <= dec31 || currentWeek.length > 0) {
      const dateStr = current.toISOString().split('T')[0];
      const day = dataMap.get(dateStr) || { date: dateStr, count: 0 };
      
      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }

      current.setDate(current.getDate() + 1);
      
      if (current > dec31 && currentWeek.length > 0) {
        weeks.push([...currentWeek]);
        break;
      }
    }

    return weeks;
  }, [year, calendarData]);

  const getColorForCount = (count: number): string => {
    if (count === 0) return 'rgba(0, 255, 65, 0.1)';
    if (count < 2) return 'rgba(0, 255, 65, 0.25)';
    if (count < 5) return 'rgba(0, 255, 65, 0.5)';
    if (count < 10) return 'rgba(0, 255, 65, 0.75)';
    return 'rgba(0, 255, 65, 1)';
  };

  if (loading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center bg-[#0d1117]/50 border border-white/10">
        <div className="font-mono text-[10px] text-[#849495]">LOADING_CALENDAR...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center bg-[#0d1117]/50 border border-white/10">
        <div className="font-mono text-[10px] text-[#ff6daf]">ERROR: {error}</div>
      </div>
    );
  }

  if (!calendarData || calendarData.length === 0) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center bg-[#0d1117]/50 border border-white/10">
        <div className="font-mono text-[10px] text-[#849495]">NO_ACTIVITY_DATA // LOADINGDEFAULT_VIEW</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide bg-[#0d1117]/50 border border-white/10 rounded p-4 min-h-[200px]">
      {loading && (
        <div className="h-full flex items-center justify-center">
          <div className="font-mono text-[10px] text-[#849495]">LOADING_HEATMAP...</div>
        </div>
      )}
      
      {!loading && error && (
        <div className="h-full flex items-center justify-center">
          <div className="font-mono text-[10px] text-[#ff6daf]">ERROR: {error}</div>
        </div>
      )}

      {!loading && !error && (!calendarData || calendarData.length === 0) && (
        <div className="h-full flex items-center justify-center">
          <div className="font-mono text-[10px] text-[#849495]">NO_SUBMISSION_DATA_AVAILABLE</div>
        </div>
      )}

      {!loading && !error && calendarData && calendarData.length > 0 && weeks.length > 0 && (
        <svg
          width="100%"
          height={200}
          viewBox={`0 0 ${Math.max(weeks.length * 16 + 60, 600)} 200`}
          preserveAspectRatio="xMinYMid meet"
          style={{ minWidth: '600px', display: 'block' }}
        >
          {/* Month labels - positioned based on weeks */}
          {MONTHS.map((month, monthIdx) => {
            const monthStart = new Date(year, monthIdx, 1);
            const weekOffset = monthIdx === 0 ? 0 : Math.floor((monthStart.getDay() + monthStart.getDate() - 1) / 7);
            return (
              <text
                key={`month-${month}`}
                x={weekOffset * 16 + 50}
                y={15}
                fontSize="11"
                fill="#849495"
                fontFamily="'Courier New', monospace"
                fontWeight="bold"
                textAnchor="start"
              >
                {month}
              </text>
            );
          })}

          {/* Day of week labels */}
          {DAYS.map((day, idx) => (
            <text
              key={`day-${day}`}
              x={40}
              y={50 + idx * 18}
              fontSize="10"
              fill="#849495"
              fontFamily="'Courier New', monospace"
              textAnchor="end"
            >
              {day.charAt(0)}
            </text>
          ))}

          {/* Calendar grid */}
          {weeks.map((week, weekIdx) =>
            week.map((day, dayIdx) =>
              day ? (
                <g key={`${weekIdx}-${dayIdx}`}>
                  <rect
                    x={50 + weekIdx * 16}
                    y={48 + dayIdx * 18}
                    width={14}
                    height={14}
                    fill={getColorForCount(day.count)}
                    stroke="rgba(0, 255, 65, 0.2)"
                    strokeWidth={0.5}
                    rx={2}
                  />
                  {day.count > 0 && (
                    <text
                      x={57 + weekIdx * 16}
                      y={58 + dayIdx * 18}
                      fontSize="7"
                      fill="#849495"
                      fontFamily="'Courier New', monospace"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {day.count > 9 ? '9+' : day.count}
                    </text>
                  )}
                </g>
              ) : null
            )
          )}
        </svg>
      )}
    </div>
  );
}
