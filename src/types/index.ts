
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

export interface Person {
  id: number
  frist_name: string
  last_name: string
  image_url: string
  affiliation: string
  expertise_main: string[]
  expertise_second: string[]
  retired: boolean
  contact: Contact
  bank: Bank
  history: string[]
  characteristic: string[]
  note: string
}

export interface Contact {
  email: string
  phone: string[]
  address: string
}

export interface Bank {
  bank_name: string
  bank_logo_url: string
  bank_number: string
}