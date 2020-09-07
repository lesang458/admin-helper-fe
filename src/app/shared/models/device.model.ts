export interface Device {
  id?: number;
  name: string;
  price: number;
  description: string;
  deviceCategoryId: number;
  categoryName?: string;
  user?: any;
}
