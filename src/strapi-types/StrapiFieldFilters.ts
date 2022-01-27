type StrapiFieldFilters<FieldType> = Partial<{
  $eq: FieldType;
  $ne: FieldType;
  $lt: FieldType;
  $lte: FieldType;
  $gt: FieldType;
  $gte: FieldType;
  $in: FieldType[];
  $notIn: FieldType[];
  $contains: string;
  $notContains: string;
  $containsi: string;
  $notContainsi: string;
  $null: boolean;
  $notNull: boolean;
  $between: [number, number];
  $startsWith: string;
  $endsWith: string;
}>;

export default StrapiFieldFilters;
