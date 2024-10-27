import React from 'react';

function StarRating({ rating }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div style={{ display: 'flex' }}>
      {/* Render full stars */}
      <span>Rating ({rating}) : </span>
      {Array(fullStars).fill().map((_, i) => (
        <span className='text-yellow-500 text-lg' key={`full-${i}`}>&#9733;</span> // Full star symbol
      ))}

      {/* Render half star if needed */}
      {halfStar && <span className='text-yellow-300 text-lg'>&#9734;</span>}

      {/* Render empty stars */}
      {Array(emptyStars).fill().map((_, i) => (
        <span className='text-gray-300 text-lg' key={`empty-${i}`}>&#9734;</span> // Empty star symbol
      ))}
     
    </div>
  );
}

export default StarRating;
