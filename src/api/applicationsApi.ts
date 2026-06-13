function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export type ApplicationUploadResponse = {
  uploadId: string;
  fileName: string;
  status: 'SUCCESS';
};

export class ApplicationUploadApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApplicationUploadApiError';
  }
}

/** POST /api/applications/upload */
export async function uploadApplicationFile(
  file: File
): Promise<ApplicationUploadResponse> {
  await delay(500);

  if (!file.name.toLowerCase().endsWith('.txt')) {
    throw new ApplicationUploadApiError(
      `Файл «${file.name}» обработать не получится. Допустим только формат .txt.`
    );
  }

  return {
    uploadId: `mock-application-upload-${Date.now()}`,
    fileName: file.name,
    status: 'SUCCESS',
  };
}
