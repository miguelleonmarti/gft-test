import { PodcastService } from '../services/PodcastService';
import { Podcast } from '../../domain/entities/Podcast';

export class GetPodcastUseCase {
  private podcastService: PodcastService;

  constructor(podcastService: PodcastService) {
    this.podcastService = podcastService;
  }

  async execute(podcastId: string): Promise<Podcast | undefined> {
    try {
      const podcast = await this.podcastService.getPodcastById(podcastId);
      return podcast; 
    } catch (error) {
      console.error('Error in GetPodcastUseCase:', error);
      return undefined;
    }
  }
}
