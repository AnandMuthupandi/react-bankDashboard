import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountsTable from '../../src/pages/accountsTable/AccountsTable';

// Mock the useApiContext hook
jest.mock('../../src/contexts/apicontext', () => ({
  useApiContext: () => ({
    apiState: {
      apiState: {
        clientAccounts: {
            "123": [{
              id: "aadasdf",
              card_type: "VISA",
              number: 402400,
              balance: 100,
              created: "2021-04-24 12:39:31+00:00"
          }],
          "456": []
          }
      },
    },
  }),
}));

// Mock the Empty Accounts component
jest.mock("../../src/components/common/EmptyAccounts", () => () => (
    <div data-testid="mock-empty-accounts">Empty Accounts</div>
  ));

describe('AccountsTable Component', () => {
  it('renders table headers', () => {
    const selectedClient = {
      id: '123', 
    };

    render(<AccountsTable selectedClient={selectedClient} />);

    expect(screen.getByText('Account ID')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
  });

  it('renders account data', () => {
    const selectedClient = {
      id: '123', 
    };

    render(<AccountsTable selectedClient={selectedClient} />);

    expect(screen.getByText('aadasdf')).toBeInTheDocument();
    expect(screen.getByText('VISA')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument(); 
    expect(screen.getByText('2021-04-24 12:39:31+00:00')).toBeInTheDocument();
  });

  it('renders EmptyAccounts component when there are no accounts', () => {
    const selectedClient = {
      id: '456', 
    };

    render(<AccountsTable selectedClient={selectedClient} />);

    const emptyAccountsComponent = screen.getByTestId("mock-empty-accounts");
    expect(emptyAccountsComponent).toBeInTheDocument();
  });
});
