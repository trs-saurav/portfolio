import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username') || 'trs_saurav';

    // Fetch submission data from LeetCode GraphQL API (server-to-server, no CORS issues)
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://leetcode.com/',
      },
      body: JSON.stringify({
        query: `{
          matchedUser(username: "${username}") {
            userCalendar {
              submissionCalendar
            }
          }
        }`,
      }),
    });

    const data = await response.json();
    console.log('LeetCode GraphQL Response:', JSON.stringify(data, null, 2));

    // Check for GraphQL errors first
    if (data?.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(`GraphQL Error: ${data.errors.map((e: any) => e.message).join(', ')}`);
    }

    if (data?.data?.matchedUser?.userCalendar?.submissionCalendar) {
      // Parse the submission calendar (JSON string)
      const calendarStr = data.data.matchedUser.userCalendar.submissionCalendar;
      const calendar = JSON.parse(calendarStr);

      // Create heatmap from submission counts
      const heatmap = new Array(364).fill(0);
      const today = new Date();

      // Map submission counts to contribution levels
      for (let i = 0; i < 364; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // LeetCode uses midnight UTC timestamps, so we need to create a UTC date at midnight
        const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
        const timestamp = Math.floor(utcDate.getTime() / 1000);

        const count = calendar[timestamp] || 0;
        // Map submission count to level: 1-2 submissions = level 1, 3-5 = level 2, etc.
        if (count > 0) {
          heatmap[363 - i] = Math.min(Math.ceil(count / 3), 4);
        }
      }

      console.log('LeetCode heatmap loaded: active days =', heatmap.filter(l => l > 0).length);
      return NextResponse.json({ heatmap, success: true });
    }

    throw new Error(`No submission calendar found. Response structure: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error('Backend: Failed to fetch LeetCode submissions:', error);
    // Return fallback sparse heatmap
    return NextResponse.json({ heatmap: createSparseLeetCodeHeatmap(), success: false });
  }
}

function createSparseLeetCodeHeatmap(): number[] {
  const heatmap = new Array(364).fill(0);
  const activityDays = Math.floor(364 * 0.27); // ~98 days with activity

  for (let i = 0; i < activityDays; i++) {
    let dayIndex = Math.floor(Math.random() * 364);

    let attempts = 0;
    while (heatmap[dayIndex] > 0 && attempts < 5) {
      dayIndex = Math.floor(Math.random() * 364);
      attempts++;
    }

    const dayOfWeek = dayIndex % 7;
    const isWeekday = dayOfWeek !== 0 && dayOfWeek !== 6;

    if (!isWeekday && Math.random() > 0.3) {
      continue;
    }

    const levelRand = Math.random();
    if (levelRand > 0.9) {
      heatmap[dayIndex] = 4;
    } else if (levelRand > 0.75) {
      heatmap[dayIndex] = 3;
    } else if (levelRand > 0.4) {
      heatmap[dayIndex] = 2;
    } else {
      heatmap[dayIndex] = 1;
    }
  }

  return heatmap;
}
