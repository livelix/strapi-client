/**
 * Example: ['date'], ['date:asc'], ['date', 'viewsCount:desc']
 */
type StrapiFieldSort<ContentType> = keyof ContentType
| `${string & keyof ContentType}:asc`
| `${string & keyof ContentType}:desc`;

type StrapiSort<ContentType> = StrapiFieldSort<ContentType> | Array<StrapiFieldSort<ContentType>>;

export default StrapiSort;

export { StrapiFieldSort };
