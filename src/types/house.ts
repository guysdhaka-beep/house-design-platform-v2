export interface House {
  id: number;

  title: string;

  houseType: string;

  folder: string;

  length: number;
  width: number;

  foundation: number;
  complete: number;

  isFeatured: boolean;

  type: string;

  images: {
    id: number;
    type: string;
    image: string;
    sortOrder?: number;
    altText?: string;
    imageTitle?: string;
  }[];

  status?: string;
}