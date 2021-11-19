import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

// components
import { Author } from '../../components/molecules/Author';
import { Layout } from '../../components/templates/Layout';
import { Loader } from '../../components/molecules/Loader';
import { Comments } from '../../components/organisms/Comments';
import { PostDetail } from '../../components/organisms/PostDetail';
import { Categories } from '../../components/molecules/Categories';
import { PostWidget } from '../../components/molecules/PostWidget';
import { CommentForm } from '../../components/organisms/CommentForm';
import { AdjacentPosts } from '../../components/organisms/AdjacentPosts';

// services
import { PostData } from '../../types/data-types';
import { getPosts, getPostDetails } from '../../services/contentManagement';

interface Paths {
  node: { slug: string };
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  post: PostData;
}

const PostDetailsPage: NextPage<Props> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          <CommentForm slug={post.slug} />
          <Comments slug={post.slug} />
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const result = await getPostDetails(slug);

  return {
    props: { post: result },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsPath = await getPosts();
  return {
    paths: postsPath.map(({ node: { slug } }: Paths) => ({
      params: { slug },
    })),
    fallback: true,
  };
};
