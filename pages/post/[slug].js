import React from 'react';
import { useRouter } from 'next/dist/client/router';

import { Author } from '../../components/molecules/Author';
import { Layout } from '../../components/templates/Layout';
import { Loader } from '../../components/molecules/Loader';
import { PostDetail } from '../../components/organisms/PostDetail';
import { Categories } from '../../components/molecules/Categories';
import { PostWidget } from '../../components/molecules/PostWidget';

const PostDetailsPage = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail />
          <Author />
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetailsPage;
