import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET(request: NextRequest) {
  try {
    const cloudinaryUrl = process.env.CLOUDINARY_URL;
    const folder = process.env.CLOUDINARY_FOLDER || 'portfolio';

    if (!cloudinaryUrl) {
      return NextResponse.json(
        { success: false, error: 'CLOUDINARY_URL not configured' },
        { status: 500 }
      );
    }

    // Parse CLOUDINARY_URL: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
    const urlRegex = /cloudinary:\/\/(\w+):(.+?)@(\w+)/;
    const match = cloudinaryUrl.match(urlRegex);

    if (!match) {
      return NextResponse.json(
        { success: false, error: 'Invalid CLOUDINARY_URL format' },
        { status: 500 }
      );
    }

    const [, apiKey, apiSecret, cloudName] = match;

    // Construct Cloudinary Search API request
    const searchUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

    const searchParams = new URLSearchParams({
      expression: `folder:"${folder}" AND resource_type:image`,
      max_results: '100',
      resource_type: 'image',
    });

    const response = await fetch(`${searchUrl}?${searchParams}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform Cloudinary resources into photo frame format with original aspect ratios
    let photos = (data.resources || []).map((resource: any, idx: number) => {
      const width = resource.width || 1000;
      const height = resource.height || 1000;
      const aspectRatio = width / height;
      
      return {
        id: `f${String(idx + 1).padStart(2, '0')}`,
        tag: `FRAME_${String(idx + 1).padStart(2, '0')}`,
        // Preserve original aspect ratio with quality optimization
        img: `${resource.secure_url || resource.url}?w=1000&f_auto&q=auto`,
        cat: resource.tags?.[0] || 'CREATIVE',
        width,
        height,
        aspectRatio,
      };
    });

    // Shuffle and take only 20 random images
    photos = photos
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);

    return NextResponse.json({
      success: true,
      photos,
      total: photos.length,
    });
  } catch (error: any) {
    console.error('Cloudinary fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
