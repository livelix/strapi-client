import StrapiFindQuery from './strapi-types/StrapiFindQuery';
import StrapiSingleResponse from './strapi-types/StrapiSingleResponse';
import StrapiMultipleResponse from './strapi-types/StrapiMultipleResponse';
import StrapiAPI from './StrapiAPI';
import StrapiContentTypeAPI from './StrapiContentTypeAPI';

export default class StrapiClient<Config extends Record<string, unknown>> {
  /**
   * API
   */
  readonly api: StrapiAPI<Config>;

  /**
   * Create a new Strapi Client
   * @param baseURL
   */
  constructor(baseURL: string) {
    this.api = new StrapiAPI(baseURL);
  }

  /**
   * Create an entry
   * @param contentTypeName
   * @param data
   */
  async create<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: keyof Config | string,
    data: ContentType,
  ): Promise<StrapiSingleResponse<ContentType>> {
    return this.api.create(contentTypeName, data);
  }

  /**
   * Get (GET) a single entry
   * @param contentTypeName
   * @param id
   */
  async get<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
    id: number,
  ): Promise<StrapiSingleResponse<ContentType>> {
    return this.api.get(contentTypeName, id);
  }

  /**
   * Find (GET) multiple entries
   * @param contentTypeName
   * @param query
   */
  async find<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
    query: StrapiFindQuery<ContentType> = {},
  ): Promise<StrapiMultipleResponse<ContentType>> {
    return this.api.find(contentTypeName, query);
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
    data: Partial<ContentType>,
  ): Promise<StrapiSingleResponse<ContentType>> {
    return this.api.update(contentTypeName, id, data);
  }

  /**
   * Delete an entry
   * @param contentTypeName
   * @param id
   */
  async delete<ContentTypeName extends keyof Config | string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
    id: number,
  ): Promise<StrapiSingleResponse<ContentType>> {
    return this.api.delete(contentTypeName, id);
  }

  /**
   * An api for a single content type
   * @param contentTypeName
   */
  async contentType<ContentTypeName extends string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
  ) {
    return new StrapiContentTypeAPI<ContentTypeName, ContentType>(contentTypeName, this.api);
  }

  /**
   * A shorthand function for `contentType` function
   * @param contentTypeName
   */
  async ct<ContentTypeName extends string, ContentType = Config[ContentTypeName]>(
    contentTypeName: ContentTypeName,
  ) {
    return this.contentType<ContentTypeName, ContentType>(contentTypeName);
  }
}
