import { NextResponse } from 'next/server';

interface LeetCodeStats {
  totalSolved: number;
  totalSubmissions: {
    submissions: number;
    accepted: number;
  };
  acceptanceRate: string;
}

interface CalendarDay {
  date: string;
  count: number;
}

async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  try {
    // Using GraphQL API
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({
        query: `query userData($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats {
              acSubmissionNum {
                count
              }
              totalSubmissionNum {
                count
              }
            }
          }
        }`,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      // Return fallback stats
      return {
        totalSolved: 0,
        totalSubmissions: { submissions: 0, accepted: 0 },
        acceptanceRate: '0%',
      };
    }

    const matchedUser = data.data?.matchedUser;
    if (!matchedUser) {
      console.error('User not found:', username);
      return {
        totalSolved: 0,
        totalSubmissions: { submissions: 0, accepted: 0 },
        acceptanceRate: '0%',
      };
    }

    const acCount = matchedUser.submitStats?.acSubmissionNum?.[0]?.count || 0;
    const totalCount = matchedUser.submitStats?.totalSubmissionNum?.[0]?.count || 0;

    const acceptanceRate =
      totalCount > 0 ? ((acCount / totalCount) * 100).toFixed(1) : '0.0';

    return {
      totalSolved: acCount,
      totalSubmissions: {
        submissions: acCount,
        accepted: totalCount,
      },
      acceptanceRate: `${acceptanceRate}%`,
    };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return {
      totalSolved: 0,
      totalSubmissions: { submissions: 0, accepted: 0 },
      acceptanceRate: '0%',
    };
  }
}

async function fetchLeetCodeCalendar(username: string): Promise<CalendarDay[]> {
  try {
    const currentYear = new Date().getFullYear();

    const calendarResponse = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({
        query: `query {
          matchedUser(username: "${username}") {
            username
            userCalendar {
              activeYears
              streak
              totalActiveDays
              submissionCalendar
            }
          }
        }`,
      }),
    });

    const data = await calendarResponse.json();

    console.log('Calendar API Response:', JSON.stringify(data, null, 2).substring(0, 500));

    if (data.errors) {
      console.error('GraphQL errors fetching calendar:', data.errors);
      return [];
    }

    const userCalendar = data.data?.matchedUser?.userCalendar;
    if (!userCalendar) {
      console.log('No userCalendar found in matchedUser response');
      return [];
    }

    const submissionCalendarStr = userCalendar.submissionCalendar;
    if (!submissionCalendarStr) {
      console.log('No submissionCalendar string found:', userCalendar);
      return [];
    }

    let submissionCalendar;
    try {
      submissionCalendar = JSON.parse(submissionCalendarStr);
    } catch (e) {
      console.error('Failed to parse submissionCalendar:', e);
      return [];
    }

    if (typeof submissionCalendar !== 'object' || submissionCalendar === null) {
      console.log('submissionCalendar is not a valid object:', submissionCalendar);
      return [];
    }

    console.log('Parsed calendar entries:', Object.keys(submissionCalendar).length);

    const calendarData: CalendarDay[] = Object.entries(submissionCalendar)
      .filter(([_, count]) => typeof count === 'number')
      .map(([timestamp, count]) => {
        const date = new Date(parseInt(timestamp) * 1000);
        return {
          date: date.toISOString().split('T')[0],
          count: count as number,
        };
      });

    console.log('Calendar data items returned:', calendarData.length);
    if (calendarData.length > 0) {
      console.log('Sample data:', calendarData.slice(0, 3));
    }

    return calendarData;
  } catch (error) {
    console.error('Error fetching LeetCode calendar:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'trs_saurav';
  const type = searchParams.get('type') || 'stats';

  try {
    if (type === 'calendar') {
      const calendar = await fetchLeetCodeCalendar(username);
      return NextResponse.json({ calendar, success: true });
    } else {
      const stats = await fetchLeetCodeStats(username);
      return NextResponse.json({ stats, success: true });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: 500 }
    );
  }
}
