'use client';

import { GitHubCalendar } from 'react-github-calendar';

interface GitHubHeatmapProps {
  username?: string;
}

export function GitHubHeatmap({ username = 'trs-saurav' }: GitHubHeatmapProps) {
  return <GitHubCalendar username={username} />;
}
