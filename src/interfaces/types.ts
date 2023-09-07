export interface IClientAccounts {
  balance: number;
  card_type: string;
  created: string;
  id: string;
  number: number;
}

export interface IClientDetails {
  id: string;
  firstname: string;
  name: string;
  birthday: string;
  address: string;
  created: string;
  accounts: [];
}
