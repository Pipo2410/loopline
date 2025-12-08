export const getAvatar = (
  userPicture: string | null,
  userEmail: string,
): string => userPicture ?? `https://avatar.vercel.sh/${userEmail}`;
