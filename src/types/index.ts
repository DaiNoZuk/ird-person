
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
  perfix_name: string
  first_name: string
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
  created_date: string
  updated_date: string
  created_by: string
  updated_by: string
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

export interface Affiliation{
  id:number,
  name:string
}

export interface Expertise{
  id:number,
  name:string
}