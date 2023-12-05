import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { EpisodeService, PodcastService } from '../../../application/services';
import { Episode, Podcast } from '../../../domain/entities';
import Poster from './Poster';

interface EpisodeDetailViewProps {
  podcastService: PodcastService;
  episodeService: EpisodeService;
}

const EpisodeDetailView: React.FC<EpisodeDetailViewProps & RouteComponentProps<{episodeId: string, podcastId: string}>> = ({match: {params: {episodeId,podcastId}}, podcastService, episodeService}) => {
  const [podcast, setPodcast] = useState<Podcast | undefined>();
  const [episode, setEpisode] = useState<Episode | undefined>();
  
  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const fetchedPodcast = await podcastService.getPodcastById(podcastId);
        setPodcast(fetchedPodcast);

        const fetchedEpisode = await episodeService.getEpisodeById(podcastId, episodeId);
        setEpisode(fetchedEpisode);
      } catch (error) {
        console.error('Error fetching episode details:', error);
      }
    };

    fetchPodcastDetails();
  }, [podcastId, podcastService]);

  if (!podcast) {
    return <div>Loading podcast...</div>;
  }

  if (!episode) {
    return <div>Loading episode...</div>;
  }

  return (
    <section className='episode-detail'>
      <Poster podcast={podcast} />
      <section>
        <h2>{episode.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: episode.description }} />
        <audio controls>
          <source src={episode.audio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </section>
    </section>
  );
};

export default EpisodeDetailView;
