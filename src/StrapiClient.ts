import stringify from 'qs-stringify';
import axios, { Axios } from 'axios';

import StrapiFindQuery from './strapi-types/StrapiFindQuery';
import StrapiSingleResponse from './strapi-types/StrapiSingleResponse';
import StrapiMultipleResponse from './strapi-types/StrapiMultipleResponse';

export default class StrapiClient<Config extends Record<string, unknown>> {
  /**
   * Base API URL
   */
  readonly baseURL: string;

  /**
   * Axios instance
   */
  readonly axios: Axios;

  /**
   * Create a new Strapi Client
   * @param baseURL
   */
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.axios = axios.create({ baseURL });
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
    const response = await this.axios.post<StrapiSingleResponse<ContentType>>(contentTypeName as string, { data });

    return response.data;
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
    const response = await this.axios.get<StrapiSingleResponse<ContentType>>(`${contentTypeName}/${id}`);

    return response.data;
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
    // @ts-ignore
    const queryString = Object.keys(query).length > 0 ? `?${stringify(query)}` : '';
    const response = await this.axios.get<StrapiMultipleResponse<ContentType>>(`${contentTypeName}${queryString}`);

    return response.data;
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
    const response = await this.axios.post<StrapiSingleResponse<ContentType>>(`${contentTypeName}/${id}`, { data });

    return response.data;
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
    const response = await this.axios.delete<StrapiSingleResponse<ContentType>>(`${contentTypeName}/${id}`);

    return response.data;
  }
}
