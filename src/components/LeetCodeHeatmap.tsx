'use client';

import React, { useMemo } from 'react';

interface CalendarDay {
  date: string;
  count: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface LeetCodeHeatmapProps {
  username: string;
  year?: number;
}

interface MonthCalendar {
  month: number;
  weeks: (CalendarDay | null)[][];
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

  const monthCalendars = useMemo(() => {
    if (!calendarData || calendarData.length === 0) {
      return [];
    }

    const dataMap = new Map(calendarData.map(d => [d.date, d]));
    const calendars: MonthCalendar[] = [];

    // Build calendar for each month
    for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
      const firstDay = new Date(year, monthIdx, 1);
      const lastDay = new Date(year, monthIdx + 1, 0);
      
      // Start from the Sunday of the first week
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());

      const weeks: (CalendarDay | null)[][] = [];
      let currentWeek: (CalendarDay | null)[] = [];
      let current = new Date(startDate);

      while (current <= lastDay || currentWeek.length > 0) {
        const dateStr = current.toISOString().split('T')[0];
        const day = dataMap.get(dateStr) || { date: dateStr, count: 0 };
        
        // Only include dates in the current month
        const isInMonth = current.getMonth() === monthIdx && current.getFullYear() === year;
        currentWeek.push(isInMonth ? day : null);

        if (currentWeek.length === 7) {
          weeks.push([...currentWeek]);
          currentWeek = [];
        }

        current.setDate(current.getDate() + 1);
        
        if (current > lastDay && currentWeek.length > 0) {
          weeks.push([...currentWeek]);
          break;
        }
      }

      calendars.push({
        month: monthIdx,
        weeks,
      });
    }

    return calendars;
  }, [year, calendarData]);

  const getColorForCount = (count: number): string => {
    if (count === 0) return '#161b22';
    if (count < 2) return 'rgba(0, 255, 65, 0.2)';
    if (count < 5) return 'rgba(0, 255, 65, 0.4)';
    if (count < 10) return 'rgba(0, 255, 65, 0.65)';
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
        <div className="font-mono text-[10px] text-[#849495]">NO_ACTIVITY_DATA</div>
      </div>
    );
  }

  const cellSize = 11;
  const cellPadding = 1;
  const cellSpacing = cellSize + cellPadding;
  const dayLabelWidth = 16;

  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#0d1117]/50 rounded px-1 py-2">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2" style={{ minWidth: 'min-content' }}>
          {monthCalendars.map((calendar, calendarIdx) => {
            const monthSvgWidth = (calendarIdx === 0 ? dayLabelWidth : 0) + 7 * cellSpacing + 2;
            const monthSvgHeight = 16 + calendar.weeks.length * cellSpacing + 2;
            
            return (
              <div key={`month-${calendar.month}`} className="flex flex-col items-center flex-shrink-0">
                <h3 className="text-[10px] font-mono font-bold text-[#849495] mb-0.5">
                  {MONTHS[calendar.month]}
                </h3>
                <svg
                  width={monthSvgWidth}
                  height={monthSvgHeight}
                  style={{ display: 'block' }}
                >
                  {/* Day labels only on first month - show all 7 weekdays */}
                  {calendarIdx === 0 && DAYS.map((day, dayIdx) => (
                    <text
                      key={`day-${dayIdx}`}
                      x={4}
                      y={16 + dayIdx * cellSpacing + cellSize / 2}
                      fontSize="7"
                      fill="#849495"
                      fontFamily="'Courier New', monospace"
                      textAnchor="end"
                      alignmentBaseline="middle"
                    >
                      {day}
                    </text>
                  ))}

                  {/* Calendar grid - show all weeks and all 7 weekdays */}
                  {calendar.weeks.map((week, weekIdx) =>
                    week.map((day, dayIdx) =>
                      day && day.count !== undefined ? (
                        <g key={`${weekIdx}-${dayIdx}`}>
                          <rect
                            x={(calendarIdx === 0 ? dayLabelWidth : 0) + weekIdx * cellSpacing}
                            y={16 + dayIdx * cellSpacing}
                            width={cellSize}
                            height={cellSize}
                            fill={getColorForCount(day.count)}
                            stroke="rgba(0, 255, 65, 0.15)"
                            strokeWidth={0.5}
                            rx={2}
                          />
                          {day.count > 0 && (
                            <text
                              x={(calendarIdx === 0 ? dayLabelWidth : 0) + weekIdx * cellSpacing + cellSize / 2}
                              y={16 + dayIdx * cellSpacing + cellSize / 2}
                              fontSize="4"
                              fill="#849495"
                              fontFamily="'Courier New', monospace"
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              fontWeight="bold"
                            >
                              {day.count > 99 ? '99+' : day.count}
                            </text>
                          )}
                        </g>
                      ) : null
                    )
                  )}
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
