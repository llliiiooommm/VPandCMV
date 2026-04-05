export const fetchCover = async (coverId: number): Promise<Blob | null> => {
  try {
    const url = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.blob();
  } catch {
    return null;
  }
};