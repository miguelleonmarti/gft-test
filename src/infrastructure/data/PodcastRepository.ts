import { Podcast } from '../../domain/entities/Podcast';
import { PodcastApi } from '../api/PodcastApi';

export class PodcastRepository {
  async getAllPodcasts(): Promise<Podcast[]> {
    const apiData = await PodcastApi.getAllPodcasts();
    // Convert API data to domain entities
    return apiData.map((podcast: any) => new Podcast(podcast.id, podcast.title, podcast.description, podcast.author, podcast.picture));
  }

  async getPodcastById(podcastId: string): Promise<Podcast | undefined> {
    const allPodcasts = await this.getAllPodcasts();
    return allPodcasts.find((podcast) => podcast.id === podcastId);
  }
}
