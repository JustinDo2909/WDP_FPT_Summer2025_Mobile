declare global {
    type IProduct = {
    id: string;
    createdAt: string; // or Date
    updatedAt: string; // or Date
    productCategory: ICategory;
    productBrand: IBrand;
    productSkinType: ISkinType;
    title: string;
    description: string;
    price: number;
    sale_price: number;
    image_url: string;
    product_category_id: number;
    product_brand_id: number;
    total_stock: number;
    created_at: string;
    updated_at: string;
    ingredients: string;
    how_to_use: string;
    rating: number;
    reviews_count: number;
  };

  type ICategory = {
    id: number;
    title: string;
    description: string;
  };

  type IBrand = {
    id: number;
    title: string;
    description: string;
  };

  type ISkinType = {
    id: number;
    title: string;
    description: string;
  };

  type IProductMeta = {
    categories: ICategory[];
    brands: IBrand[];
    skinTypes: ISkinType[];
  };
  type IReview = {
    id: string;
    user_id: string;
    product_id: string;
    user_name: string;
    review_value: number;
    review_message: string;
    createdAt: Date;
  };
}

export type {
  IProduct,
  ICategory,
  IBrand,
  IReview
};