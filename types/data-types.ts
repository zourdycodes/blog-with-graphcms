export interface ContentData {
  type: string;
  children: [
    {
      text: string;
    }
  ];
}

export interface CategoryData {
  name: string;
  slug: string;
}

export interface PostData {
  author: {
    name: string;
    bio: string;
    id: string;
    photo: {
      url: string;
    };
  };
  slug: string;
  createdAt: string;
  title: string;
  excerpt: string;
  content: {
    raw: {
      children: Array<ContentData>;
    };
  };
  categories: CategoryData[];
  featuredImage: {
    url: string;
  };
}

export interface PostsData {
  cursor: string;
  node: {
    author: {
      bio: string;
      name: string;
      id: string;
      photo: {
        url: string;
      };
    };
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
      url: string;
    };
    categories: Array<CategoryData>;
    content: {
      raw: {
        children: Array<ContentData>;
      };
    };
  };
}

// Post Fragments
export interface ObjectType {
  bold: string;
}
