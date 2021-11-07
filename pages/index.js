import { Layout } from '../components/templates/Layout';
import { PostCard } from '../components/organisms/PostCard';
import { PostWidget } from '../components/molecules/PostWidget';
import { Categories } from '../components/molecules/Categories';

const posts = [
  {
    title: 'React Interview',
    excerpt: 'features of react interview',
  },
  {
    title: 'Interview Questions',
    excerpt: 'of react interview',
  },
];
export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => {
            return <PostCard key={index} post={post} />;
          })}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </Layout>
  );
}
