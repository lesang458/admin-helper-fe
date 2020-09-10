export interface Device {
  id?: number;
  name: string;
  price: number;
  description: string;
  status?: string;
  deviceCategoryId: number;
  categoryName?: string;
  user?: any;
}
