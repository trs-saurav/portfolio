'use client';

import React, { useEffect, useState } from 'react';

interface LeetCodeHeatmapWrapperProps {
  username: string;
}

export function LeetCodeHeatmapWrapper({ username }: LeetCodeHeatmapWrapperProps) {
  const [heatmap, setHeatmap] = useState<number[]>(new Array(364).fill(0));
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState(0);

  useEffect(() => {
    const fetchLeetCodeHeatmap = async () => {
      try {
        setLoading(true);
        
        // Fetch LeetCode stats to get submission count
        const statsRes = await fetch('https://leetcode-stats-api.herokuapp.com/trs_saurav');
        const statsData = await statsRes.json();
        
        if (statsData.status === 'success') {
          setSubmissions(statsData.totalSolved || 0);
          
          // Fetch recent submissions from backend API (no CORS issues)
          const heatRes = await fetch('/api/leetcode-submissions?username=trs_saurav');
          const heatData = await heatRes.json();
          setHeatmap(heatData.heatmap);
        }
      } catch (err) {
        console.error('Failed to fetch LeetCode data:', err);
        setHeatmap(new Array(364).fill(0)); // Show empty heatmap on error
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeHeatmap();
  }, []);



  if (loading) {
    return (
      <div className="flex items-center justify-center py-6 text-[#849495] font-mono text-sm">
        Loading LeetCode activity...
      </div>
    );
  }

  const getMonthForWeek = (weekIndex: number): string => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (364 - weekIndex * 7));
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[startDate.getMonth()];
  };

  const monthChangeIndices = (): number[] => {
    const indices = [0];
    for (let week = 1; week < 52; week++) {
      if (getMonthForWeek(week) !== getMonthForWeek(week - 1)) {
        indices.push(week);
      }
    }
    return indices;
  };

  return (
    <div className="w-full lg:w-[80vw] mx-auto">
      {/* Month labels row */}
      <div className="flex gap-0 overflow-x-auto scrollbar-hide mb-4">
        {Array.from({ length: 52 }).map((_, week) => {
          const isMonthStart = week === 0 || getMonthForWeek(week) !== getMonthForWeek(week - 1);
          return (
            <div 
              key={week} 
              className="flex flex-col"
              style={{ 
                marginLeft: isMonthStart && week !== 0 ? '1rem' : '0',
                minWidth: '1.5rem'
              }}
            >
              {isMonthStart && (
                <div className="text-[10px] sm:text-xs font-mono text-[#849495] h-4 flex items-center">
                  {getMonthForWeek(week)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Heatmap grid */}
      <div className="flex gap-0 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 52 }).map((_, week) => {
          const isMonthStart = week === 0 || getMonthForWeek(week) !== getMonthForWeek(week - 1);
          return (
            <div 
              key={week} 
              className="flex flex-col gap-1 sm:gap-1.5"
              style={{ 
                marginLeft: isMonthStart && week !== 0 ? '1rem' : '0.375rem'
              }}
            >
              {Array.from({ length: 7 }).map((_, day) => {
                const val = heatmap[week * 7 + day] || 0;
                let opacity = 0.08;
                if (val === 1) opacity = 0.3;
                else if (val === 2) opacity = 0.55;
                else if (val === 3) opacity = 0.8;
                else if (val >= 4) opacity = 1;
                
                return (
                  <div 
                    key={day} 
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-[1px] transition-all duration-300 hover:ring-2 hover:ring-[#ffb86c] cursor-default" 
                    title={`Level ${val}`}
                    style={{ 
                      background: `rgba(255, 184, 108, ${opacity})`,
                      boxShadow: val > 2 ? `0 0 6px rgba(255, 184, 108, ${Math.min(opacity, 0.6)})` : 'none'
                    }} 
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
