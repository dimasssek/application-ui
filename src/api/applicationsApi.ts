import { ENDPOINTS } from './endpoints';
import { ApiError, httpPostMultipart } from './httpClient';

export type ApplicationUploadResponse = {
  uploaded: boolean;
  detailedError: string | null;
};

export class ApplicationUploadApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApplicationUploadApiError';
  }
}

/** POST /applications/upload (multipart, part name: file) */
export async function uploadApplicationFile(
  file: File
): Promise<ApplicationUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await httpPostMultipart<ApplicationUploadResponse>(
      ENDPOINTS.applicationsUpload,
      formData
    );

    if (!response.uploaded) {
      throw new ApplicationUploadApiError(
        response.detailedError ??
          `Файл «${file.name}» обработать не получилось.`
      );
    }

    return response;
  } catch (error) {
    if (error instanceof ApplicationUploadApiError) {
      throw error;
    }
    if (error instanceof ApiError) {
      throw new ApplicationUploadApiError(error.message);
    }
    throw error;
  }
}
