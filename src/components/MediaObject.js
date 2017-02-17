import React from 'react';

export default ({ items, index }) => (
  <div className='media' key={index}>
    <div className='media-left'>
      <a href={`https://www.youtube.com/watch?v=`+items.id.videoId} target='_blank' alt={items.snippet.title}>
        <img className='media-object' src={items.snippet.thumbnails.default.url} alt={items.snippet.title}/>
      </a>
    </div>
    <div className='media-body'>
      <h4 className='media-heading'>
        <a href={`https://www.youtube.com/watch?v=`+items.id.videoId} target="_blank" alt={items.snippet.title}>{items.snippet.title}</a>
      </h4>
      <h5 className='text-muted'>by {items.snippet.channelTitle}</h5>
      <p>
        {items.snippet.description}
      </p>
    </div>
  </div>
)
