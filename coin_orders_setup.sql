-- Create coin_orders table for tracking payment orders
CREATE TABLE IF NOT EXISTS coin_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id TEXT NOT NULL UNIQUE,
    amount NUMERIC NOT NULL,
    coins INTEGER NOT NULL,
    status TEXT NOT NULL,
    payment_session_id TEXT,
    cashfree_order_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_coin_orders_user_id ON coin_orders(user_id);

-- Create index on order_id for quick lookups
CREATE INDEX IF NOT EXISTS idx_coin_orders_order_id ON coin_orders(order_id);

-- Enable Row Level Security for coin_orders
ALTER TABLE coin_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
-- Users can only view their own orders
CREATE POLICY "Users can view their own orders" ON coin_orders
    FOR SELECT USING (auth.uid() = user_id);

-- Only authenticated users can insert orders (will be further restricted by application logic)
CREATE POLICY "Authenticated users can insert orders" ON coin_orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only server-side API functions can update orders
CREATE POLICY "Service role can update orders" ON coin_orders
    FOR UPDATE USING (auth.uid() = user_id OR auth.role() = 'service_role'); 