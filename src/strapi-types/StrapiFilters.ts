import StrapiFieldFilters from './StrapiFieldFilters';

type StrapiBaseFilters<ContentType> = Partial<{ [key in keyof ContentType]: StrapiFieldFilters<ContentType[key]>; }>;

type StrapiFilters<ContentType> =
  StrapiBaseFilters<ContentType>
  | (StrapiBaseFilters<ContentType> & { $or: StrapiBaseFilters<ContentType>[]; });

export default StrapiFilters;

export { StrapiBaseFilters };
