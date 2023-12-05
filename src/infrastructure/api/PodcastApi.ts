export class PodcastApi {
    static async getAllPodcasts(): Promise<any[]> {
      try {
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        const podcasts = data.feed.entry.map((entry: any) => ({
          id: entry.id.attributes['im:id'],
          title: entry.title.label,
          description: entry.summary.label,
          author: entry["im:artist"].label,
          picture: entry["im:image"][2].label,
        }));
  
        return podcasts;
      } catch (error) {
        console.error('Error fetching podcasts:', error);
        return [];
      }
    }
  }
  