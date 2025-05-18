import { auth } from "./firebase";

export const getCurrentUserToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};
