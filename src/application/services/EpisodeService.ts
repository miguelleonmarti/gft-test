import { Episode } from '../../domain/entities/Episode';
import { EpisodeRepository } from '../../infrastructure/data/EpisodeRepository';

export class EpisodeService {
  private episodeRepository: EpisodeRepository;

  constructor(episodeRepository: EpisodeRepository) {
    this.episodeRepository = episodeRepository;
  }

  async getAllEpisodes(podcastId: string): Promise<Episode[]> {
    try {
      const episodes = await this.episodeRepository.getAllEpisodes(podcastId);
      return episodes;
    } catch (error) {
      console.error('Error fetching episodes:', error);
      return [];
    }
  }

  async getEpisodeById(podcastId: string, episodeId: string): Promise<Episode | undefined> {
    try {
      const episode = await this.episodeRepository.getEpisodeById(podcastId, episodeId);
      return episode;
    } catch (error) {
      console.error('Error fetching episode by ID:', error);
      return undefined;
    }
  }
}
