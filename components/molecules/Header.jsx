import React from 'react';
import Link from 'next/link';

import { Layout } from '../templates/Layout';

const categories = [
  {
    name: 'Web Development',
    slug: 'webdev',
  },
  {
    name: 'Ethical Hacking',
    slug: 'ethical-hacking',
  },
  {
    name: 'Travelling',
    slug: 'travelling',
  },
];

export const Header = () => {
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
          {categories.map((category, index) => (
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
