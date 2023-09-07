import { IClientAccounts } from "../interfaces/types";

export const chartColors = [
  "#e0ac2b",
  "#e85252",
  "#6689c6",
  "#9a6fb0",
  "#a53253",
  "#69b3a2",
];

export const margins = {
  MARGIN_X: 150,
  MARGIN_Y: 50,
  INFLEXION_PADDING: 20,
  width: 400,
  height: 200,
};

export function preprocessClientAccountsData(
  clientData: IClientAccounts[],
  accounts: IClientAccounts[]
): IClientAccounts[] {
  return clientData.map((clientItem) => {
    const matchedAccount = accounts.find(
      (accountItem) => accountItem.id === clientItem.id
    );
    if (matchedAccount) {
      return { ...clientItem, card_type: matchedAccount.card_type };
    } else {
      return clientItem;
    }
  });
}

export function preprocessAccountsData(
  data: IClientAccounts[]
): IClientAccounts[] {
  const cardTypeCounts: Record<string, number> = {};
  data.sort((a, b) => a.number - b.number);
  return data.map((item) => {
    const { card_type } = item;
    if (!cardTypeCounts[card_type]) {
      cardTypeCounts[card_type] = 1;
      return { ...item };
    } else {
      return { ...item, card_type: `extra-${item.card_type}` };
    }
  });
}
