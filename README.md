# @livelix/strapi-client
Strapi HTTP Client

# Do not use it in production
It is not ready for production

# Installation
npm: `npm install @livelix/strapi-client`  
yarn: `yarn add @livelix/strapi-client`

# Initialization
```typescript
import StrapiClient from '@livelix/strapi-client';

// Define a blog post content type
type BlogPost = {
  title: string;
  slug: string;
};

// Define the config - content type name and content type definition
type StrapiContentTypeConfig = {
  'blog-posts': BlogPost;
};

// API URL
const apiUrl = 'http://localhost:1337/api';

// Initialize the client
const strapi = new StrapiClient<StrapiContentTypeConfig>(apiUrl);

const test = async () => {
  const response = await strapi.create(
    'blog-posts',
    { title: 'Hello World', slug: 'hello-world', },
  );

  let blogPost = await strapi.get<'blog-posts'>('blog-posts', response.data.id);
  await strapi.update<'blog-posts'>('blog-posts', blogPost.data.id, { slug: 'hello' });

  await strapi.find<'blog-posts', BlogPost>('blog-posts', {
    sort: ['title:desc'],
    fields: ['title', 'slug'],
    filters: {
      title: {
        $containsi: 'hello',
      },
    },
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });

  await strapi.delete('blog-posts', blogPost.data.id);
};

test().then();
```

### StrapiClient
Please check the [REST API Section](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html) for the list of possible responses.

### StrapiClientFlat
This is the same as `StrapiClient` except that this client flattens the response.

It has the same API, and it is initialized in the same way:
```typescript
import { StrapiClientFlat } from '@livelix/strapi-client';

// Define a blog post content type
type BlogPost = {
  title: string;
  slug: string;
};

// Define the config - content type name and content type definition
type StrapiContentTypeConfig = {
  'blog-posts': BlogPost;
};

// API URL
const apiUrl = 'http://localhost:1337/api';

const strapi = new StrapiClientFlat<StrapiContentTypeConfig>(apiUrl);
```

For single responses (create, get, update, and remove), `data` property is removed completely and the entry is returned directly. The `attributes` field is removed and all the fields are added directly to the entry.

Example: a `get` response like this:
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Hello World!",
      "content": "Hello World, and welcome to our blog!",
      "createdAt": "2022-01-27T02:02:34.249Z",
      "updatedAt": "2022-01-27T02:02:35.032Z",
      "publishedAt": "2022-01-27T02:02:35.030Z",
      "slug": "hello-world"
    }
  },
  "meta": {}
}
```

becomes
```json
{
  "id": 1,
  "title": "Hello World!",
  "content": "Hello World, and welcome to our blog!",
  "createdAt": "2022-01-27T02:02:34.249Z",
  "updatedAt": "2022-01-27T02:02:35.032Z",
  "publishedAt": "2022-01-27T02:02:35.030Z",
  "slug": "hello-world"
}
```

Find is an exception - `data` field is not removed. Instead, each entry from the data is converted (attributes field is removed).  
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Hello World!",
        "content": "Hello World, and welcome to our blog!",
        "createdAt": "2022-01-27T02:02:34.249Z",
        "updatedAt": "2022-01-27T02:02:35.032Z",
        "publishedAt": "2022-01-27T02:02:35.030Z",
        "slug": "hello-world"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
        "pageSize": 25,
        "pageCount": 1,
        "total": 1
    }
  }
}
```

becomes
```json
{
  "data": [
    {
      "id": 1,
      "title": "Hello World!",
      "content": "Hello World, and welcome to our blog!",
      "createdAt": "2022-01-27T02:02:34.249Z",
      "updatedAt": "2022-01-27T02:02:35.032Z",
      "publishedAt": "2022-01-27T02:02:35.030Z",
      "slug": "hello-world"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```
