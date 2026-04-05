import axios from 'axios';

export const fetchGoogleCover = async (isbn: string): Promise<Blob | null> => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const response = await axios.get(url);
    const thumbnail = response.data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
    if (!thumbnail) return null;
    
    const imgResponse = await fetch(thumbnail.replace('http://', 'https://'));
    return await imgResponse.blob();
  } catch {
    return null;
  }
};