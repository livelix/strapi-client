interface StrapiAttachmentFileData {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  size: number;
  url: string;
  width: number;
}

interface StrapiAttachmentAttributes extends  StrapiAttachmentFileData {
  alternativeText: string;
  caption: string;
  createdAt: string;
  previewUrl?: string;
  provider: string;
  updatedAt: string;
  formats: {
    large: StrapiAttachmentFileData;
    medium: StrapiAttachmentFileData;
    small: StrapiAttachmentFileData;
    thumbnail: StrapiAttachmentFileData;
  }
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
