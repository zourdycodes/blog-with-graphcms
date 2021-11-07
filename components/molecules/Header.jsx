import React from 'react';
import Link from 'next/link';

import { Layout } from '../templates/Layout';

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
      </div>
    </Layout>
  );
};
