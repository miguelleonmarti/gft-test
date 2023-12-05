import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Podcast } from '../../../domain/entities/Podcast';
import { PodcastService } from '../../../application/services/PodcastService';

interface MainViewProps {
  podcastService: PodcastService;
}

const MainView: React.FC<MainViewProps> = ({ podcastService }) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const fetchedPodcasts = await podcastService.getAllPodcasts();
        setPodcasts(fetchedPodcasts as Podcast[]);
        console.log(fetchPodcasts)
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, [podcastService]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div className='filter-container'>
        <p>{filteredPodcasts.length}</p>
        <input type="text" placeholder='Filter podcast...' value={searchQuery} onChange={handleSearchInputChange} />
      </div>
      <ul className='podcast-list'>
        {
          filteredPodcasts.map((podcast) => (
            <Link to={`/podcast/${podcast.id}`}>
              <li className='podcast-item' key={podcast.id}>
                <div className='podcast-item-picture' style={{backgroundImage: `url(${podcast.picture})`}} />
                <h2>{podcast.title}</h2>
                <h3>Author: {podcast.author}</h3>
              </li>
            </Link>
          ))
        }
      </ul>
    </section>
  );
};

export default MainView;
