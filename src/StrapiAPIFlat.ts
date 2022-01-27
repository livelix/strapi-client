import StrapiAPI from './StrapiAPI';
import StrapiFindQuery from './strapi-types/StrapiFindQuery';
import { StrapiContentTypeDataFlat } from './strapi-types/StrapiContentTypeData';
import { StrapiMultipleResponseFlat } from './strapi-types/StrapiMultipleResponse';

export default class StrapiAPIFlat<Config extends Record<string, unknown> = {}> {
  readonly api: StrapiAPI<Config>;

  /**
   * Create a new Strapi Client
   * @param api
   */
  constructor(api: StrapiAPI<Config>) {
    this.api = api;
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
    const response = await this.api.create<ContentTypeName, ContentType>(contentTypeName, data);

    return StrapiAPI.flattenResponse<ContentType>(response);
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
    const response = await this.api.get<ContentTypeName, ContentType>(contentTypeName, id);

    return StrapiAPI.flattenResponse<ContentType>(response);
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
    const response = await this.api.find<ContentTypeName, ContentType>(contentTypeName, query);

    return {
      ...response,
      data: response.data.map(StrapiAPI.flattenResponseData),
    };
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
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    const response = await this.api.update<ContentTypeName, ContentType>(contentTypeName, id, data);

    return StrapiAPI.flattenResponse<ContentType>(response);
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
    const response = await this.api.delete<ContentTypeName, ContentType>(contentTypeName, id);

    return StrapiAPI.flattenResponse<ContentType>(response);
  }
}
