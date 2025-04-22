# Coin System Implementation

This documentation outlines the implementation of a coin-based system integrated with Supabase. The system allows users to have a coin balance, make purchases, and view their transaction history.

## Database Setup

The system uses two main database components:

1. **Coin Balance Column in Users Table**
   - Added directly to the existing Supabase `users` table
   - New users start with a balance of 0

2. **Coin Transactions Table**
   - Stores every transaction (recharges and spending)
   - Connected to users via foreign key
   - Includes amount, transaction type, timestamps, and descriptions

## Features

- **User Coin Balance Display**
  - Shows the current balance on the dashboard
  
- **Purchase Options**
  - Three pricing options: 1000 coins, 2500 coins, and a custom amount
  - Each purchase creates a transaction record
  
- **Transaction History**
  - Modal popup showing all user transactions
  - Accessible via the "History" button
  - Displays transaction amount, type, and timestamp
  - Includes transaction description when available

## Implementation Steps

### 1. Database Schema

Run the provided SQL script (`coin_system_setup.sql`) on your Supabase project to:
- Add the `coin_balance` column to your users table
- Create the `coin_transactions` table
- Set up triggers to automatically update user balances
- Configure Row Level Security policies

```sql
-- Example of the core database setup
ALTER TABLE users
ADD COLUMN coin_balance INTEGER NOT NULL DEFAULT 0;

CREATE TABLE coin_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Frontend Components

The system includes:

- **Dashboard Pricing Component**
  - Displays coin packages
  - Shows current balance
  - Handles coin purchases
  - Provides access to transaction history

- **Transaction History Modal**
  - Displays user's transaction history
  - Provides transaction details in a clean interface

## Usage Examples

### Adding Coins to a User

```typescript
// Example of adding coins to the current user
const { data: { user } } = await supabase.auth.getUser();
if (user) {
  const { error } = await supabase
    .from('coin_transactions')
    .insert({
      user_id: user.id,
      amount: amount, // positive number for recharge
      transaction_type: 'recharge',
      description: 'Purchased coins'
    });
}
```

### Spending Coins

```typescript
// Example of spending coins
const { data: { user } } = await supabase.auth.getUser();
if (user) {
  const { error } = await supabase
    .from('coin_transactions')
    .insert({
      user_id: user.id,
      amount: -amount, // negative number for spending
      transaction_type: 'spend',
      description: 'Used coins for a service'
    });
}
```

### Viewing Transaction History

The transaction history is automatically fetched when the History modal is opened, showing a chronological list of the user's transactions.

## Security Considerations

- Row Level Security (RLS) ensures users can only view their own transactions
- Database triggers keep the user's balance in sync with their transactions
- All operations are validated to prevent negative balances or unauthorized actions

## Future Enhancements

Potential improvements to the system could include:

- Transaction receipt generation
- Subscription-based coin rewards
- Special discount periods or bonus coins
- Analytics dashboard for admins to view system-wide usage 