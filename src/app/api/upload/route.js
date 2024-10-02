import cloudinary from "@/lib/cloudinary";
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Image is required",
      }),
      { status: 400 }
    );
  }

  try {
    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a readable stream from the buffer
    const stream = Readable.from(buffer);

    // Upload buffer to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.pipe(uploadStream);
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Upload success",
        url: result.secure_url,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Upload failed",
      }),
      { status: 500 }
    );
  }
}
