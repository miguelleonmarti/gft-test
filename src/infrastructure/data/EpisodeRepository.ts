import { Episode } from '../../domain/entities/Episode';
import { EpisodeApi } from '../api/EpisodeApi';

export class EpisodeRepository {
  async getAllEpisodes(podcastId: string): Promise<Episode[]> {
    const apiData = await EpisodeApi.getAllEpisodes(podcastId);
    return apiData.map((episode: any) => new Episode(episode.id, episode.title, episode.description, episode.date, episode.duration, episode.audio));
  }

  async getEpisodeById(podcastId: string, episodeId: string): Promise<Episode | undefined> {
    const allEpisodes = await this.getAllEpisodes(podcastId);
    return allEpisodes.find((episode) => episode.id === episodeId);
  }
}
