function formatDuration(millisecondsString: string): string {
  const milliseconds = parseInt(millisecondsString, 10);

  if (isNaN(milliseconds)) {
    return '-'
    throw new Error('Invalid input. Please provide a valid string representing milliseconds.');
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const formattedMinutes = `${minutes.toString().padStart(2, '0')}`;
  const formattedSeconds = `:${seconds.toString().padStart(2, '0')}`;

  return formattedHours + formattedMinutes + formattedSeconds;
}

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  
  const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  };

  const formattedDate = date.toLocaleDateString('en-GB', options);

  return formattedDate;
}


export class EpisodeApi {
  static async getAllEpisodes(podcastId: string): Promise<any[]> {
    try {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast%20&entity=podcastEpisode&limit=20/json`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const episodes = data.results.map((result: any) => ({
        id: result.trackId.toString(),
        title: result.trackName,
        description: result.description,
        date: formatDate(result.releaseDate),
        duration: formatDuration(result.trackTimeMillis),
        audio: result.previewUrl
      }));

      return episodes;
    } catch (error) {
      console.error('Error fetching episodes:', error);
      return [];
    }
  }
}
