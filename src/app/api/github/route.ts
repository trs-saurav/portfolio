import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

async function fetchGitHubStats(username: string) {
  const query = `
    query {
      user(login: "${username}") {
        repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
          totalCount
        }
        followers {
          totalCount
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0]?.message}`);
  }

  const user = data.data?.user;
  if (!user) {
    throw new Error('User not found');
  }

  return {
    repos: user.repositories.totalCount,
    followers: user.followers.totalCount,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'trs-saurav';

    const stats = await fetchGitHubStats(username);

    return NextResponse.json({
      stats,
      success: true,
    });
  } catch (error: any) {
    console.error('GitHub stats fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch GitHub stats',
    }, { status: 500 });
  }
}
