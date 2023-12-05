import { Podcast } from '../../domain/entities/Podcast';
import { PodcastRepository } from '../../infrastructure/data/PodcastRepository';

const CACHE_KEY_PODCASTS = 'cachedPodcasts';
const CACHE_TIMESTAMP_KEY_PODCASTS = 'cachedPodcastsTimestamp';

const CACHE_BASE_KEY_PODCAST = 'cachedPodcast-';
const CACHE_BASE_TIMESTAMP_KEY_PODCAST = 'cachedPodcastTimestamp-';

export class PodcastService {
  private podcastRepository: PodcastRepository;

  constructor(podcastRepository: PodcastRepository) {
    this.podcastRepository = podcastRepository;
  }

  async getAllPodcasts(): Promise<Podcast[]> {
    const cachedPodcasts = this.getCachedPodcasts();
    const lastTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY_PODCASTS);

    if (cachedPodcasts && lastTimestamp && !this.hasOneDayPassed(lastTimestamp)) {
      return cachedPodcasts;
    } else {
      const freshPodcasts = await this.fetchPodcastsFromApi();
      this.cachePodcasts(freshPodcasts);
      return freshPodcasts;
    }
  }

  async getPodcastById(podcastId: string): Promise<Podcast | undefined> {
    const cachedPodcast = this.getCachedPodcast(podcastId);
    const lastTimestamp = localStorage.getItem(CACHE_BASE_TIMESTAMP_KEY_PODCAST + podcastId);

    if (cachedPodcast && lastTimestamp && !this.hasOneDayPassed(lastTimestamp)) {
      return cachedPodcast;
    } else {
      const freshPodcast = await this.fetchPodcastFromApi(podcastId);
      if (freshPodcast) {
        this.cachePodcast(freshPodcast);
      }
      return freshPodcast;
    }
  }

  private getCachedPodcasts(): Podcast[] | null {
    const cachedPodcastsString = localStorage.getItem(CACHE_KEY_PODCASTS);
    if (cachedPodcastsString) {
      return JSON.parse(cachedPodcastsString) as Podcast[];
    }
    return null;
  }

  private getCachedPodcast(podcastId: string): Podcast | null {
    const cachedPodcastString = localStorage.getItem(CACHE_BASE_KEY_PODCAST + podcastId);
    if (cachedPodcastString) {
      return JSON.parse(cachedPodcastString) as Podcast;
    }
    return null;
  }

  private async fetchPodcastsFromApi(): Promise<Podcast[]> {
    try {
      return this.podcastRepository.getAllPodcasts();
    } catch (error) {
      console.log("Error fetching podcasts:", error)
      return [];
    }  
  }

  private async fetchPodcastFromApi(podcastId: string): Promise<Podcast | undefined> {
    try {
      return this.podcastRepository.getPodcastById(podcastId);
    } catch (error) {
      console.log("Error fetching podcasts:", error)
      return undefined;
    }  
  }

  private cachePodcasts(podcasts: Podcast[]): void {
    localStorage.setItem(CACHE_KEY_PODCASTS, JSON.stringify(podcasts));
    localStorage.setItem(CACHE_TIMESTAMP_KEY_PODCASTS, new Date().toISOString());
  }
  
  private cachePodcast(podcast: Podcast): void {
    localStorage.setItem(CACHE_BASE_KEY_PODCAST + podcast.id, JSON.stringify(podcast));
    localStorage.setItem(CACHE_BASE_TIMESTAMP_KEY_PODCAST + podcast.id, new Date().toISOString());
  }
  
  private hasOneDayPassed(lastTimestamp: string): boolean {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
    const lastTimestampDate = new Date(lastTimestamp).getTime();
    const currentTimestampDate = new Date().getTime();
    return currentTimestampDate - lastTimestampDate > oneDayInMilliseconds;
  }
}
