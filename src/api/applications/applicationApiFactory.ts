import {
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from '../httpClient';
import type { PageData } from '../../types/common/page';

export function createApplicationApi<
  TDto,
  TCreate,
  TUpdate,
  TQueryParams,
>(basePath: string) {
  return {
    search(params: TQueryParams): Promise<PageData<TDto>> {
      return httpPost<PageData<TDto>>(`${basePath}/search`, params);
    },
    getById(id: string): Promise<TDto> {
      return httpGet<TDto>(`${basePath}/${id}`);
    },
    create(payload: TCreate): Promise<TDto> {
      return httpPost<TDto>(basePath, payload);
    },
    update(id: string, payload: TUpdate): Promise<TDto> {
      return httpPut<TDto>(`${basePath}/${id}`, payload);
    },
    delete(id: string): Promise<void> {
      return httpDelete(`${basePath}/${id}`);
    },
  };
}
