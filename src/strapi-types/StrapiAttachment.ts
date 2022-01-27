interface StrapiAttachmentAttributes {
  alternativeText: string;
  caption: string;
  createdAt: string;
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl?: string;
  provider: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

interface StrapiAttachmentData {
  attributes: StrapiAttachmentAttributes;
  id: number;
}

export default interface StrapiAttachment {
  data: StrapiAttachmentData;
  title: string;
  updatedAt: string;
}

export { StrapiAttachmentData, StrapiAttachmentAttributes };
