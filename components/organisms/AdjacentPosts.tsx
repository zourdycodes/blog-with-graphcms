import React, { useState, useEffect } from 'react';

import { AdjacentPostCard } from '../atoms/AdjacentPostCard';
import { getAdjacentPosts } from '../../services/contentManagement';

interface Props {
  createdAt: string;
  slug: string;
}

interface AdjacentData {
  title: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
  slug: string;
}

interface AdjacentPostData {
  next: Array<AdjacentData>;
  previous: Array<AdjacentData>;
}

export const AdjacentPosts: React.FC<Props> = ({ createdAt, slug }) => {
  const [adjacentPost, setAdjacentPost] = useState<AdjacentPostData>({
    next: [],
    previous: [],
  });
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    getAdjacentPosts(createdAt, slug).then((result) => {
      setAdjacentPost(result);
      setDataLoaded(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
      {dataLoaded && (
        <>
          {adjacentPost.previous && (
            <div
              className={`${
                adjacentPost.next
                  ? 'col-span-1 lg:col-span-4'
                  : 'col-span-1 lg:col-span-8'
              } adjacent-post rounded-lg relative h-72`}
            >
              <AdjacentPostCard post={adjacentPost.previous} position="LEFT" />
            </div>
          )}
          {adjacentPost.next && (
            <div
              className={`${
                adjacentPost.previous
                  ? 'col-span-1 lg:col-span-4'
                  : 'col-span-1 lg:col-span-8'
              } adjacent-post rounded-lg relative h-72`}
            >
              <AdjacentPostCard post={adjacentPost.next} position="RIGHT" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
