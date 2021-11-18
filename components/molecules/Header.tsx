import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Layout } from '../templates/Layout';

import { getCategories } from '../../services/contentManagement';

interface CategoriesData {
  name: string;
  slug: string;
}

export const Header: React.FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <Layout header>
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/" passHref>
            <span className="cursor-pointer font-bold text-4xl text-white">
              Muhammad Zourdy
            </span>
          </Link>
        </div>

        <div className="hidden md:float-left md:contents">
          {categories.map((category: CategoriesData, index: number) => (
            <Link key={index} href={`/category/${category.slug}`} passHref>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};
