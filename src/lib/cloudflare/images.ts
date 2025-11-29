// src/lib/cloudflare/images.ts
interface CloudflareImageUploadResponse {
  result: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
  };
  success: boolean;
  errors: any[];
  messages: any[];
}

export async function uploadImageToCloudflare(
  file: File,
  accountId: string,
  apiToken: string
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: formData,
    }
  );

  const data: CloudflareImageUploadResponse = await response.json();

  if (!data.success) {
    throw new Error('Failed to upload image');
  }

  return data.result.variants[0];
}

export function getImageUrl(imageId: string, accountId: string, variant: string = 'public'): string {
  return `https://imagedelivery.net/${accountId}/${imageId}/${variant}`;
}

export async function deleteImage(imageId: string, accountId: string, apiToken: string): Promise<void> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to delete image');
  }
}