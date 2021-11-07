import React from 'react';

export const PostCard = ({ post }) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};
