import React from 'react';
import { render,screen } from '@testing-library/react';
import BarChart from '../components/barChart/BarChart';

const clientAccounts = [{
    id: "6084118399e57e9b1e12ac45",
    card_type: "VISA",
    number: 402400,
    balance: 100,
    created: "2021-04-24 12:39:31+00:00"
}]; 
const cardTypes = [{
    id: "6084118399e57e9b1e12ac45",
    card_type: "VISA",
    number: 402400,
    balance: 100,
    created: "2021-04-24 12:39:31+00:00"
}]; 
const selectedSegment = "Balance >=0";
describe('BarChart component', () => {
  it('renders AxisBottom with the correct props', () => {
    

    render(
      <BarChart
        clientAccounts={clientAccounts}
        cardTypes={cardTypes}
        selectedSegment={selectedSegment}
      />
    );
    const axisBottomElement = screen.getByText('VISA');
    expect(axisBottomElement).toBeInTheDocument();
  });
  it('displays Bars with data', () => {
    

   render(
      <BarChart
        clientAccounts={clientAccounts}
        cardTypes={cardTypes}
        selectedSegment={selectedSegment}
      />
    );

    const barsElement = screen.getByTestId('Bars');
    expect(barsElement).toBeInTheDocument();
  });
});
