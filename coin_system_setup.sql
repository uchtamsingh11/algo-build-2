-- 1. Add coin_balance column to the users table
ALTER TABLE users
ADD COLUMN coin_balance INTEGER NOT NULL DEFAULT 0;

-- 2. Create the coin_transactions table
CREATE TABLE coin_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description TEXT
);

-- 3. Create index on user_id for better performance
CREATE INDEX idx_coin_transactions_user_id ON coin_transactions(user_id);

-- 4. Create a function to update user balance when a transaction is added
CREATE OR REPLACE FUNCTION update_user_coin_balance()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the user's coin balance
    UPDATE users
    SET coin_balance = coin_balance + NEW.amount
    WHERE id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create trigger to automatically update user balance on transaction insert
CREATE TRIGGER after_coin_transaction_insert
AFTER INSERT ON coin_transactions
FOR EACH ROW
EXECUTE FUNCTION update_user_coin_balance();

-- 6. Enable Row Level Security for coin_transactions
ALTER TABLE coin_transactions ENABLE ROW LEVEL SECURITY;

-- 7. Create policies for Row Level Security
-- Users can only view their own transactions
CREATE POLICY "Users can view their own transactions" ON coin_transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can insert transactions (will be further restricted by application logic)
CREATE POLICY "Authenticated users can insert transactions" ON coin_transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id); 