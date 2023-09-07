import {
    preprocessClientAccountsData,
    preprocessAccountsData,
  } from "../utils/chartUtilities";
  
  const clientAccounts = [
    {
      id: "6084118399e57e9b1e12ac45",
      card_type: "VISA",
      number: 402400,
      balance: 100,
      created: "2021-04-24 12:39:31+00:00",
    },
  ];
  const accounts = [
    {
      id: "6084118399e57e9b1e12ac16",
      card_type: "Master Card",
      number: 402400,
      balance: 100,
      created: "2021-04-24 12:39:31+00:00",
    },
  ];
  describe("Chart Utilities", () => {
    it("should not modify the data if the conditions are not met", () => {
      const outputData = preprocessClientAccountsData(clientAccounts, accounts);
  
      expect(outputData).toEqual(clientAccounts);
    });
  
    it("should modify the data if the conditions are met", () => {
      const mockAccounts = [
        {
          id: "6084118399e57e9b1e12ac45",
          card_type: "extra-VISA",
          number: 402400,
          balance: 100,
          created: "2021-04-24 12:39:31+00:00",
        },
      ];
  
      const outputData = preprocessClientAccountsData(clientAccounts, mockAccounts);
  
      expect(outputData[0].card_type).toBe("extra-VISA");
      
    });
    it("should not modify the accounts data", () => {
      const outputData = preprocessAccountsData(clientAccounts);
  
      expect(outputData).toEqual(clientAccounts);
    });
  
    it("should modify the accounts data", () => {
      const mockClientAccounts = [
        {
          id: "6084118399e57e9b1e12ac45",
          card_type: "VISA",
          number: 402400,
          balance: 100,
          created: "2021-04-24 12:39:31+00:00",
        },
        {
          id: "6084118399e57e9b1e12ac16",
          card_type: "VISA",
          number: 402400,
          balance: 100,
          created: "2021-04-24 12:39:31+00:00",
        },
      ];
  
      const outputData = preprocessAccountsData(mockClientAccounts);
  
      expect(outputData[1].card_type).toBe("extra-VISA");
      
    });
  });
  