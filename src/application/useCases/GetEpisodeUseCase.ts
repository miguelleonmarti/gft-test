import { EpisodeService } from '../services/EpisodeService';
import { Episode } from '../../domain/entities/Episode';

export class GetEpisodeUseCase {
  private episodeService: EpisodeService;

  constructor(episodeService: EpisodeService) {
    this.episodeService = episodeService;
  }

  async execute(podcastId: string, episodeId: string): Promise<Episode | undefined> {
    try {
      const episode = await this.episodeService.getEpisodeById(podcastId, episodeId);
      return episode; 
    } catch (error) {
      console.error('Error in GetEpisodeUseCase:', error);
      return undefined;
    }
  }
}
