import StrapiAttachment from '../strapi-types/StrapiAttachment';

/**
 * A helper typescript util to add attachment fields to a content type
 */
type AddAttachment<ContentType, Attachments> =
  ContentType & { [key in Attachments as string]: StrapiAttachment };

export default AddAttachment;
