import React from "react";
import { Podcast } from "../../../domain/entities";
import { Link } from "react-router-dom";

interface PosterProps {
    podcast: Podcast
}

const Poster: React.FC<PosterProps> = ({podcast}) => {
    return (
      <aside>
        <Link to={`/podcast/${podcast.id}`} >
          <img src={podcast.picture} alt='Podcast picture' />
          <hr />
          <div>
            <h2>{podcast.title}</h2>
            <h3>by Author {podcast.author}</h3>
          </div>
        </Link>
        <hr />
        <strong>Description:</strong>
        <br />
        <p>{podcast.description}</p>
      </aside>
  );
}

export default Poster;