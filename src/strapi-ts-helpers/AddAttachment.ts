import StrapiAttachment from '../strapi-types/StrapiAttachment';

/**
 * A helper typescript util to add attachment fields to a content type
 */
type AddAttachment<ContentType, FieldName extends string> = ContentType & Record<FieldName, StrapiAttachment>;

export default AddAttachment;
