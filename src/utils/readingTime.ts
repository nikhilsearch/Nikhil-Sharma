// Simple reading time calculation utility
export const calculateReadingTime = (text: string): number => {
  // Remove HTML tags and get plain text
  const plainText = text.replace(/<[^>]*>/g, '');
  
  // Average reading speed is 200-250 words per minute
  const wordsPerMinute = 200;
  
  // Count words (split by whitespace and filter empty strings)
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
};

export const formatReadingTime = (minutes: number): string => {
  return `${minutes} min read`;
};