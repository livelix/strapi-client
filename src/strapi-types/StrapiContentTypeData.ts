type StrapiContentTypeDataFlat<ContentType> = { id: number } & ContentType;

export default interface StrapiContentTypeData<ContentType> {
  id: number;
  attributes: ContentType;
}

export { StrapiContentTypeDataFlat };
