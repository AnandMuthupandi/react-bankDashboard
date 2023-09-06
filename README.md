# Banking Dashboard

A web application for checking registered clients and their banking accounts. This project displays clients and their accounts as a scrollable page with various filtering options. The data is fetched from a RESTful API.

<!-- ![Screenshot](screenshot.png) -->

## Features

- View a list of clients and their accounts.
- Filter clients by their first name.
- Filter accounts by account type (e.g., VISA).
- Highlights accounts by balance (>= or < 0).
- Interactive pie chart for balance filtering.
- Click on graphs to view client account details in a popup.

## Technologies Used

- React, TypeScript
- Fetch (for API requests)
- D3 (for pie chart)
- React Router (for routing)
- CSS (for styling)

## Installation

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run Test Suite:

`npm test`

To Start Server:

`npm start`

To Visit App:

`localhost:3000/`

## Usage

- Use the text filter at the top to search for clients by their first name.
- Click on the buttons near each vertical bar chart to filter accounts by account type.
- Interact with the pie chart to filter accounts by balance (>= or < 0).
- Click on a graph or 'More...' button to view client account details in a popup.
