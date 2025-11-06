import React from "react";

interface GroupedReviewStarsProps {
  ratings: number[]; // array of item ratings (can be decimals like 4.5)
  maxRating?: number; // default 5
  size?: number;
  color?: string;
  onRatingClick?: (rating: number) => void; // click callback
}

const SideBarRatings: React.FC<GroupedReviewStarsProps> = ({
  ratings,
  maxRating = 5,
  size = 24,
  color = "#FFA41C",
  onRatingClick,
}) => {
  // Round ratings to nearest 0.5 for grouping
  const roundedRatings = ratings.map((r) => Math.round(r * 2) / 2);

  // Count how many items per rating
  const ratingCounts = roundedRatings.reduce<Record<number, number>>(
    (acc, r) => {
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    },
    {}
  );

  // Sort ratings descending
  const sortedRatings = Object.keys(ratingCounts)
    .map(Number)
    .sort((a, b) => b - a);

  // Render stars for a given rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(fullStar(i));
      } else if (i - 0.5 === rating) {
        stars.push(halfStar(i));
      } else {
        stars.push(emptyStar(i));
      }
    }
    return <div style={{ display: "flex", alignItems: "center" }}>{stars}</div>;
  };

  function fullStar(key: number) {
    return (
      <svg
        key={key}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={color}
        width={size}
        height={size}
        style={{ marginRight: 2 }}
      >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.778 1.401 8.171L12 18.897l-7.335 3.862 1.401-8.171L.132 9.21l8.2-1.192L12 .587z" />
      </svg>
    );
  }

  function halfStar(key: number) {
    return (
      <svg
        key={key}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ marginRight: 2 }}
      >
        <defs>
          <linearGradient id={`halfGrad-${key}`}>
            <stop offset="50%" stopColor={color} />
            <stop offset="50%" stopColor="lightgray" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#halfGrad-${key})`}
          d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.778 1.401 8.171L12 18.897l-7.335 3.862 1.401-8.171L.132 9.21l8.2-1.192L12 .587z"
        />
      </svg>
    );
  }

  function emptyStar(key: number) {
    return (
      <svg
        key={key}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="lightgray"
        width={size}
        height={size}
        style={{ marginRight: 2 }}
      >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.778 1.401 8.171L12 18.897l-7.335 3.862 1.401-8.171L.132 9.21l8.2-1.192L12 .587z" />
      </svg>
    );
  }
  //////  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  return (
    <div className="sideBar-rating-stars">
      <h3
        className="font-semibold text-lg mb-4 border-b pb-2"
        id={`sbfm_h3_RatingStars`}
      >
        Filter by Ratings
      </h3>
      <div className="mb-6">
        {sortedRatings.map((rating) => (
          <div
            key={rating}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => onRatingClick && onRatingClick(rating)}
          >
            {renderStars(rating)}
            <span style={{ marginLeft: 8 }}>({ratingCounts[rating]})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarRatings;
