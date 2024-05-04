export async function urlToFile(url: string, filename: string): Promise<File| null> {
  try {
    // Fetch the image
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

    // Get the image as a blob
    const blob = await response.blob();

    // Create a file from the blob
    const file = new File([blob], filename, { type: "image/webp" });
    return file;
  } catch (error) {
    return null;
  }
}