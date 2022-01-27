import StrapiClient from './StrapiClient';
import StrapiFindQuery from './strapi-types/StrapiFindQuery';
import StrapiSingleResponse from './strapi-types/StrapiSingleResponse';
import StrapiContentTypeData, { StrapiContentTypeDataFlat } from './strapi-types/StrapiContentTypeData';
import { StrapiMultipleResponseFlat } from './strapi-types/StrapiMultipleResponse';

export default class StrapiClientFlat<Config extends Record<string, unknown>> {
  readonly client: StrapiClient<Config>;

  /**
   * Create a new Strapi Client
   * @param baseURL
   */
  constructor(baseURL: string) {
    this.client = new StrapiClient(baseURL);
  }

  /**
   * Flatten response data
   * @param data
   */
  static flattenResponseData<ContentType>(
    data: StrapiContentTypeData<ContentType>,
  ): StrapiContentTypeDataFlat<ContentType> {
    return {
      id: data.id,
      ...data.attributes,
    };
  }

  static flattenResponse<ContentType>(
    response: StrapiSingleResponse<ContentType>,
  ): StrapiContentTypeDataFlat<ContentType> {
    return StrapiClientFlat.flattenResponseData(response.data);
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
    const response = await this.client.create<ContentTypeName, ContentType>(contentTypeName, data);

    return StrapiClientFlat.flattenResponse<ContentType>(response);
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
    const response = await this.client.get<ContentTypeName, ContentType>(contentTypeName, id);

    return StrapiClientFlat.flattenResponse<ContentType>(response);
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
    const response = await this.client.find<ContentTypeName, ContentType>(contentTypeName, query);

    return {
      ...response,
      data: response.data.map(StrapiClientFlat.flattenResponseData),
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
    data: ContentType,
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    const response = await this.client.update<ContentTypeName, ContentType>(contentTypeName, id, data);

    return StrapiClientFlat.flattenResponse<ContentType>(response);
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
    const response = await this.client.delete<ContentTypeName, ContentType>(contentTypeName, id);

    return StrapiClientFlat.flattenResponse<ContentType>(response);
  }
}
