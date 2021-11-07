import { Layout } from '../components/templates/Layout';

const posts = [
  {
    title: 'React Interview',
    excerpt: 'Understand the core features of react interview',
  },
  {
    title: 'React Interview Questions',
    excerpt: 'Understand the core features of react interview',
  },
];
export default function Home() {
  return (
    <Layout>
      {posts.map((post, index) => {
        return (
          <div key={index} className="p-10">
            {post.title}
            {post.excerpt}
          </div>
        );
      })}
    </Layout>
  );
}
