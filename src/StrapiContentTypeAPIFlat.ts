import StrapiFindQuery from './strapi-types/StrapiFindQuery';
import StrapiAPIFlat from './StrapiAPIFlat';
import { StrapiMultipleResponseFlat } from './strapi-types/StrapiMultipleResponse';
import { StrapiContentTypeDataFlat } from './strapi-types/StrapiContentTypeData';

export default class StrapiContentTypeAPIFlat<ContentTypeName extends string, ContentType> {
  readonly api: StrapiAPIFlat;

  readonly contentTypeName: ContentTypeName;

  constructor(contentTypeName: ContentTypeName, api: StrapiAPIFlat) {
    this.contentTypeName = contentTypeName;
    this.api = api;
  }

  /**
   * Create an entry
   * @param data
   */
  async create<CreateContentType extends ContentType = ContentType>(
    data: CreateContentType,
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    return this.api.create<ContentTypeName, CreateContentType>(this.contentTypeName, data);
  }

  /**
   * Get (GET) a single entry
   * @param id
   */
  async get<GetContentType extends ContentType = ContentType>(
    id: number,
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    return this.api.get<ContentTypeName, GetContentType>(this.contentTypeName, id);
  }

  /**
   * Find (GET) multiple entries
   * @param query
   */
  async find<FindContentType extends ContentType = ContentType>(
    query: StrapiFindQuery<FindContentType> = {},
  ): Promise<StrapiMultipleResponseFlat<FindContentType>> {
    return this.api.find<ContentTypeName, FindContentType>(this.contentTypeName, query);
  }

  /**
   * Update an entry
   * @param id
   * @param data
   */
  async update<UpdateContentType extends ContentType = ContentType>(
    id: number,
    data: Partial<UpdateContentType>,
  ): Promise<StrapiContentTypeDataFlat<ContentType>> {
    return this.api.update<ContentTypeName, UpdateContentType>(this.contentTypeName, id, data);
  }

  /**
   * Delete an entry
   * @param id
   */
  async delete<DeleteContentType extends ContentType = ContentType>(
    id: number,
  ): Promise<StrapiContentTypeDataFlat<DeleteContentType>> {
    return this.api.delete<ContentTypeName, DeleteContentType>(this.contentTypeName, id);
  }
}
