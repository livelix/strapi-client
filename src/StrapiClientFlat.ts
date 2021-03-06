import StrapiAPI from './StrapiAPI';
import StrapiAPIFlat from './StrapiAPIFlat';
import StrapiFindQuery from './strapi-types/StrapiFindQuery';
import StrapiContentTypeAPIFlat from './StrapiContentTypeAPIFlat';
import { StrapiContentTypeDataFlat } from './strapi-types/StrapiContentTypeData';
import { StrapiMultipleResponseFlat } from './strapi-types/StrapiMultipleResponse';

export default class StrapiClientFlat<Config extends Record<string, unknown>> {
  /**
   * API
   */
  readonly api: StrapiAPIFlat<Config>;

  /**
   * Create a new Strapi Client
   * @param baseURL
   */
  constructor(baseURL: string) {
    this.api = new StrapiAPIFlat<Config>(new StrapiAPI<Config>(baseURL));
  }

  /**
   * Create an entry
   * @param contentTypeName
   * @param data
   */
  async create<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
    data: ContentType,
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    return this.api.create<ContentTypeName, ContentType>(contentTypeName, data);
  }

  /**
   * Get (GET) a single entry
   * @param contentTypeName
   * @param id
   */
  async get<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
    id: number,
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    return this.api.get<ContentTypeName, ContentType>(contentTypeName, id);
  }

  /**
   * Find (GET) multiple entries
   * @param contentTypeName
   * @param query
   */
  async find<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
    query: StrapiFindQuery<ContentType> = {},
  ): Promise<StrapiMultipleResponseFlat<ContentType>> {
    return this.api.find<ContentTypeName, ContentType>(contentTypeName, query);
  }

  /**
   * Update an entry
   * @param contentTypeName
   * @param id
   * @param data
   */
  async update<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
    id: number,
    data: ContentType,
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    return this.api.update<ContentTypeName, ContentType>(contentTypeName, id, data);
  }

  /**
   * Delete an entry
   * @param contentTypeName
   * @param id
   */
  async delete<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
    id: number,
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    return this.api.delete<ContentTypeName, ContentType>(contentTypeName, id);
  }

  /**
   * An api for a single content type
   * @param contentTypeName
   */
  contentType<ContentTypeName extends string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
  ): StrapiContentTypeAPIFlat<ContentTypeName, ContentType> {
    return new StrapiContentTypeAPIFlat<ContentTypeName, ContentType>(contentTypeName, this.api);
  }

  /**
   * A shorthand function for `contentType` function
   * @param contentTypeName
   */
  ct<ContentTypeName extends string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
  ): StrapiContentTypeAPIFlat<ContentTypeName, ContentType> {
    return this.contentType<ContentTypeName, ContentType>(contentTypeName);
  }
}
