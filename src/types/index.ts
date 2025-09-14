
export type User = {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatarUrl?: string;
};

export type LoginPayload = {
  user: User;
  accessToken: string | null;
  remember: boolean;
};