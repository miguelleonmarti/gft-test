import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Episode, Podcast } from '../../../domain/entities';
import { EpisodeService, PodcastService } from '../../../application/services';
import Poster from './Poster';
import EpisodesList from './EpisodesList';

interface PodcastDetailViewProps {
  podcastService: PodcastService;
  episodeService: EpisodeService;
}

const PodcastDetailView: React.FC<PodcastDetailViewProps & RouteComponentProps<{ podcastId: string }>> = ({match: {params: {podcastId}}, podcastService, episodeService}) => {
  const [podcast, setPodcast] = useState<Podcast | undefined>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const fetchedPodcast = await podcastService.getPodcastById(podcastId);
        setPodcast(fetchedPodcast);

        const fetchedEpisodes = await episodeService.getAllEpisodes(podcastId);
        fetchedEpisodes.shift(); // the first item is not an episode
        setEpisodes(fetchedEpisodes);
      } catch (error) {
        console.error('Error fetching podcast details:', error);
      }
    };

    fetchPodcastDetails();
  }, [podcastId, podcastService]);

  if (!podcast) {
    return <div>Loading...</div>;
  }

  return (
    <section className='podcast-detail'>
      <Poster podcast={podcast} />
      <EpisodesList podcastId={podcastId} episodes={episodes} />
    </section>
  );
};

export default PodcastDetailView;

