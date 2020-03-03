import React from 'react';
import PropTypes from 'prop-types';
import './_tags.scss';

const TagsMeta = ({
  tags, categories
}) => {
  let tagsList; 
  const category = categories;

  if (tags && tags.length > 0) {
    tagsList = tags.map((tag) => <a key={tag.node.id} src={`tags/${tag.node.slug}/page/1`}>{tag.node.name}</a>);
  }
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-sm-4">
          {category && (
            <p className="categories"> 
              Categories:
              {' '}
              <a href={`categories/${category.slug}/page/1`}>{category.name}</a>
            </p>
          )}
        </div>
        <div className="col-sm-8">
          {tagsList && (
            <p className="tags">
              Tags: #
              {tagsList}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}


TagsMeta.propTypes = {
  date: PropTypes.string,
  categories: PropTypes.object,
};

export default TagsMeta;