# Coin-Based System SQL Queries

This repository contains SQL queries for implementing a coin-based system that can be used with SuperViz as the backend database.

## Schema

The database schema consists of two main tables:

1. `clients` - Stores information about clients including their coin balance
2. `coin_transactions` - Records all coin transactions (recharges and spends)

## Available Queries

The following SQL queries are available in the `coin_system_queries.sql` file:

1. **Insert a new client** - Creates a new client record with an initial coin balance of 0
2. **Recharge coins** - Updates a client's coin balance and records the transaction
3. **Spend coins** - Deducts coins from a client's balance and records the transaction
4. **Fetch coin balance** - Retrieves the current coin balance for a specific client
5. **Fetch client transactions** - Gets all transactions for a specific client
6. **Fetch all transactions** - Gets all transactions for all clients
7. **Client summary** - Gets a summary of all clients with their current balances

## Setup Instructions

1. First, run the schema creation script (`coin_system_schema.sql`) to set up the database tables
2. Then, use the queries in `coin_system_queries.sql` as needed for your application

## Important Notes

- The queries for recharging and spending coins use transactions to ensure data consistency
- When using these queries, replace the placeholder values (like client IDs and amounts) with actual values
- Make sure to properly handle any potential errors in your application code

## Usage Example

To create a new client:

```sql
INSERT INTO clients (name, email, coin_balance)
VALUES ('John Doe', 'john.doe@example.com', 0)
RETURNING id, name, email, coin_balance;
```

To recharge 100 coins for client with ID 1:

```sql
BEGIN;
UPDATE clients SET coin_balance = coin_balance + 100 WHERE id = 1;
INSERT INTO coin_transactions (client_id, amount, transaction_type) VALUES (1, 100, 'recharge');
COMMIT;
```
