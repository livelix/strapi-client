import StrapiSort from './StrapiSort';
import StrapiFilters from './StrapiFilters';
import StrapiFields from './StrapiFields';
import StrapiPublicationState from './StrapiPublicationState';
import StrapiPagination from './StrapiPagination';

type StrapiBasePopulate = '*' | string[];

type StrapiFieldPopulateFilters<ContentType> = {
  sort?: StrapiSort<ContentType>;
  filters?: StrapiFilters<ContentType>;
  fields?: StrapiFields<ContentType>;
  pagination?: StrapiPagination;
  publicationState?: StrapiPublicationState;
};

type StrapiPopulate<ContentType> =
  StrapiBasePopulate
  | { [key in keyof ContentType]: StrapiBasePopulate | StrapiFieldPopulateFilters<Record<string, unknown>> };

export default StrapiPopulate;

export { StrapiBasePopulate };
