import React from "react";
import { ActiveFilters } from "../../types";

interface GroupedReviewStarsProps {
  activeFilters: ActiveFilters;
  maxRating?: number; // default 5
  size?: number;
  color?: string;
  onRatingClick?: (rating: number) => void; // click callback
}

const SideBarRatings: React.FC<GroupedReviewStarsProps> = ({
  activeFilters,
  maxRating = 5,
  size = 24,
  color = "#FFA41C",
  onRatingClick,
}) => {
  const ratings = activeFilters.filtered_ratings; // array of item ratings (can be decimals like 4.5)

  // Round ratings to nearest 0.5 for grouping
  const roundedRatings = ratings.map((r) => Math.round(r * 2) / 2);

  // Count how many items per rating
  const ratingCounts = roundedRatings.reduce<Record<number, number>>(
    (acc, r) => {
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    },
    {},
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
  return (
    <div className="sideBar-rating-stars">
      <h3 className=" font-bold text-sm uppercase tracking-[0.2em] mb-4">
        Filter by Ratings
      </h3>

      <div className="space-y-1">
        {sortedRatings.map((rating) => (
          <div
            key={rating}
            className="group flex items-center p-2 -ml-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-orange-100/40"
            onClick={() => onRatingClick && onRatingClick(rating)}
          >
            {/* The Stars Container */}
            <div className="transition-transform duration-200 group-hover:scale-110">
              {renderStars(rating)}
            </div>
            <span className="ml-3 text-smfont-medium">
              ({ratingCounts[rating]})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarRatings;
