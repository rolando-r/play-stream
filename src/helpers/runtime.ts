export const getRuntimeText = (tmdbData: any) => {
  if (tmdbData.runtime) return `${tmdbData.runtime} min`;

  if (Array.isArray(tmdbData.episode_run_time) && tmdbData.episode_run_time.length > 0) {
    const runtimes = tmdbData.episode_run_time;
    if (runtimes.length === 1) return `${runtimes[0]} min per episode`;
    return `${Math.min(...runtimes)}–${Math.max(...runtimes)} min per episode`;
  }

  return null;
};
