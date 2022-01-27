type StrapiPagination =
  { withCount?: boolean }
  & ({ page: number, pageSize: number } | { start: number, limit: number });

export default StrapiPagination;
