export {};

declare global {
  type IProductQueryParams = {
    category?: string;
    brand?: string;
    page?: number;
    skinType?: string;
    limit?: number;
    sort?: string;
    title?: string;
    sale?: string;
  };

  type IPaginatedResponse<T, N extends string> = Record<N, T[]> & {
    pagination: IPaginationMeta;
    success: boolean;
  };

  type IPaginationMeta = {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };

  type IListResponse<T, N extends string> = Record<N, T[]> & {
        success: boolean;
  }

  type IResponse<T, N extends string> = Record<N, T> & {
        success: boolean;
  }
}
   


