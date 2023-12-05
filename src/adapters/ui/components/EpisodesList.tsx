import React from "react";
import { Episode } from "../../../domain/entities";
import { Link } from "react-router-dom";

interface EpisodesListProps {
    podcastId: string;
    episodes: Episode[];
}

const EpisodesList: React.FC<EpisodesListProps> = ({podcastId, episodes}) => {
    return (
    <section>
      <h2>Episodes: {episodes.length}</h2>
      <table>
        <thead>
            <tr>
                <td>Title</td>
                <td>Date</td>
                <td>Duration</td>
            </tr>
        </thead>
        <tbody>
          {episodes.map(({id, title, date, duration}) => (
            <tr key={id}>
              <Link to={`/podcast/${podcastId}/episode/${id}`} key={id}>
                <td>{title}</td>
              </Link>
              <td>{date}</td>
              <td>{duration}</td>
            </tr>
          ))}              
        </tbody>
      </table>
    </section>)
}

export default EpisodesList;