export const convertMillisecondsToTimeString = (timeInMilliseconds: number): string => {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10); // Using two digits for milliseconds
  
    const formattedMinutes = minutes.toString().padStart(1, '0'); // Ensure at least 1 digit
    const formattedSeconds = seconds.toString().padStart(2, '0'); // Ensure at least 2 digits
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0'); // Ensure at least 2 digits
  
    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export const convertToMilliseconds = (minutes: number, seconds: number, milliseconds: number): number => {
    return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
  };