import StrapiContentTypeData from './StrapiContentTypeData';

export default interface StrapiSingleResponse<ContentType> {
  data: StrapiContentTypeData<ContentType>;
  meta: {};
}