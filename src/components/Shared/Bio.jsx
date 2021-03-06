import React from 'react';
import { Link } from 'gatsby';

const Bio = ({
  authorBio, avatar, name, authorSlug,
}) => (
  <div className="row bio">
    <div className="col-2">
      <img className="bio-img" src={avatar} alt={name} />
    </div>
    <div className="col-10">
      <div className="row">
        <div className="col-12 bio-author">
          {name}
        </div>
        <div className="col-12 more-link-wrap">
          <p>
            {authorBio}
            <Link to={`/author/${authorSlug}/page/1`}>
              {' '}
              See more posts by
              {' '}
              {name}
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Bio;
