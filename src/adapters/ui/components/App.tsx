import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainView from './MainView';
import PodcastDetailView from './PodcastDetailView';
import EpisodeDetailView from './EpisodeDetailView';

import '../styles/styles.css'; 

import { EpisodeService, PodcastService } from '../../../application/services';
import { EpisodeRepository, PodcastRepository } from '../../../infrastructure';
import Header from './Header';

const podcastRepository = new PodcastRepository();
const episodeRepository = new EpisodeRepository(); 

const podcastService = new PodcastService(podcastRepository);
const episodeService = new EpisodeService(episodeRepository);

const App: React.FC = () => {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Switch>
          <Route path="/" exact component={() => <MainView podcastService={podcastService} />} />
          <Route path="/podcast/:podcastId" exact component={(props: any) => <PodcastDetailView {...props} podcastService={podcastService} episodeService={episodeService} />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" component={(props: any) => <EpisodeDetailView {...props} podcastService={podcastService} episodeService={episodeService} />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

