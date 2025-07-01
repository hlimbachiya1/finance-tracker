# Finance Tracker

A simple, responsive web app to track income, expenditures, assets, and savings. Built with React and Airtable for data storage.

## Features

- Add, edit, and delete transactions
- View category summaries and net worth
- Persistent data storage using Airtable API
- Responsive layout for desktop and mobile

## Tech Stack

- React
- Vite
- React Router (react-router-dom)
- Airtable API

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/hlimbachiya1/finance-tracker
cd finance-tracker
npm install
```

### 2. Configure Environment Variables
Create a .env.local file in the root directory and add the following:
```bash
VITE_AIRTABLE_BASE_ID=your_base_id
VITE_AIRTABLE_TABLE_NAME=Transactions
VITE_AIRTABLE_TOKEN=your_personal_access_token
```
Replace the placeholder values with your actual Airtable credentials. See the section below for how to get them.

### 3. Airtable Setup
1. Sign up at [airtable.com](airtable.com)
2. Create a new base called **Finance-Tracker**
3. Rename the default table to **Transactions**
4. Add the following fields to the `Transactions` table:

| Field Name | Field Type      | Notes                                      |
|------------|------------------|--------------------------------------------|
| `Description` | Single line text | —                                          |
| `Amount`      | Number           | Decimal, precision 2                      |
| `Category`    | Single select    | Options: `Income`, `Expenditures`, `Assets`, `Savings` |
| `Date`        | Date             | Format: `YYYY-MM-DD`                      |
| `Created`     | Created time     | Auto-generated                            |

5. Visit [airtable.com/api](airtable.com/api), select your base, and copy the Base ID
6. Create a token with the following scopes:
   - `data.records:read`
   - `data.records:write`
7. Copy and save your **Access Token** securely
8. Note: Confirm your .env.local file contains valid Airtable credentials and ensure that the base and Table configurations is proper to bullet points 2-6
9. Restart the development server after updating environment variables
10. If there is **"Failed to save transaction" error**, then please check that category options in Airtable match exactly (case-sensitive)
11. Your Airtable base should now be ready to be connected to the application

### 4. App usage and features
- **Add a Transaction**  
  Navigate to **"Add Transaction"**, select a category, enter details, and save.

- **Edit a Transaction**  
  Click **"Edit"** on a listed transaction, modify the fields, and save changes.

- **Delete a Transaction**  
  Click **"Delete"** and confirm to remove the entry.

- **View Summary**  
  The dashboard shows total values per category and calculates net worth. **Net Worth = Income + Assets - Expenditures + Savings**

- **Demo**  
  For more information about the App usage and features along with Demo, please watch this [Youtube Video](https://www.youtube.com/watch?v=CG51XuAOoZo)
  

