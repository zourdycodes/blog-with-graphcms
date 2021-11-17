import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import {
  getRecentPosts,
  getSimilarPosts,
} from '../../services/contentManagement';

interface Props {
  categories?: any;
  slug?: any;
}

interface PostData {
  title: string;
  featuredImage: {
    url: string;
  };
  slug: string;
  createdAt: string;
}

export const PostWidget: React.FC<Props> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Related Posts' : ' Recent Posts'}
      </h3>

      {relatedPosts.map((post: PostData, index) => {
        return (
          <div key={index} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <Image
                alt={post.title}
                height="60px"
                width="60px"
                unoptimized
                className="align-middle rounded-full"
                src={post.featuredImage.url}
              />
            </div>

            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} passHref key={index}>
                <span className="text-md">{post.title}</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
