import StrapiSort from './StrapiSort';
import StrapiFilters from './StrapiFilters';
import StrapiFields from './StrapiFields';
import StrapiPublicationState from './StrapiPublicationState';
import StrapiPopulate from './StrapiPopulate';
import StrapiPagination from './StrapiPagination';

export default interface StrapiFindQuery<ContentType> {
  sort?: StrapiSort<ContentType>;
  filters?: StrapiFilters<ContentType>;
  fields?: StrapiFields<ContentType>;
  pagination?: StrapiPagination;
  publicationState?: StrapiPublicationState;
  populate?: StrapiPopulate<ContentType>;
}
