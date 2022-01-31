import StrapiContentTypeData, { StrapiContentTypeDataFlat } from './StrapiContentTypeData';

type StrapiMultipleResponseMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type StrapiMultipleResponseFlat<ContentType> = {
  data: StrapiContentTypeDataFlat<ContentType>[];
  meta: StrapiMultipleResponseMeta;
};

export default interface StrapiMultipleResponse<ContentType> {
  data: StrapiContentTypeData<ContentType>[];
  meta: StrapiMultipleResponseMeta;
}

export { StrapiMultipleResponseFlat, StrapiMultipleResponseMeta };
