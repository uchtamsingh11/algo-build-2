'use client';

import { useState, useEffect } from 'react';
import { useNotification } from '@/lib/notification';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, ChevronRight, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Types for broker information
type BrokerCredential = {
  id: string;
  user_id: string;
  broker_name: string;
  credentials: Record<string, string>;
  is_active: boolean;
  created_at: string;
};

type AvailableBrokerConfig = {
  name: string;
  fields: string[];
};

// List of available brokers with their required fields
const AVAILABLE_BROKERS: AvailableBrokerConfig[] = [
  { name: 'Alice Blue', fields: ['User ID', 'API Key', 'Secret Key'] },
  { name: 'Angel Broking', fields: ['API Key', 'Secret Key'] },
  { name: 'Binance', fields: ['App Key', 'Secret Key'] },
  { name: 'Delta Exchange', fields: ['API Key', 'Secret Key'] },
  { name: 'Dhan', fields: ['Client ID', 'Access Token'] },
  { name: 'Finvasia', fields: ['User ID', 'Password', 'Vendor Code', 'API Key', '2FA'] },
  { name: 'Fyers', fields: ['API Key', 'Secret Key'] },
  { name: 'ICICI Direct', fields: ['User ID', 'API Key', 'Secret Key', 'DOB', 'Password'] },
  { name: 'IIFL', fields: ['Interactive API Key', 'Interactive Secret Key', 'Market API Key', 'Secret Key'] },
  { name: 'Kotak Neo', fields: ['Consumer Key', 'Secret Key', 'Access Token', 'Mobile No.', 'Password', 'MPIN'] },
  { name: 'MetaTrader 4', fields: ['User ID', 'Password', 'Host', 'Port'] },
  { name: 'MetaTrader 5', fields: ['User ID', 'Password', 'Host', 'Port'] },
  { name: 'Upstox', fields: ['API Key', 'App Secret Key', 'Access Token'] },
  { name: 'Zerodha', fields: ['API Key', 'Secret Key'] },
];

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export default function BrokerAuthContent() {
  const [savedBrokers, setSavedBrokers] = useState<BrokerCredential[]>([]);
  const [selectedBroker, setSelectedBroker] = useState<AvailableBrokerConfig | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBroker, setEditingBroker] = useState<BrokerCredential | null>(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  // Fetch saved brokers on component mount
  useEffect(() => {
    fetchSavedBrokers();
  }, []);

  const fetchSavedBrokers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/brokers');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch brokers');
      }
      
      const data = await response.json();
      setSavedBrokers(data || []);
    } catch (error: any) {
      showNotification({
        title: 'Failed to load saved brokers',
        description: error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBroker = async (broker: BrokerCredential) => {
    try {
      const newStatus = !broker.is_active;
      
      const response = await fetch(`/api/brokers/${broker.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: newStatus }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update broker status');
      }
      
      // Update local state
      setSavedBrokers(prev => 
        prev.map(b => b.id === broker.id ? { ...b, is_active: newStatus } : b)
      );
      
      showNotification({
        title: newStatus ? 'Broker Activated' : 'Broker Deactivated',
        type: 'success',
      });
    } catch (error: any) {
      showNotification({
        title: 'Failed to update broker status',
        description: error.message,
        type: 'error',
      });
    }
  };

  const handleDeleteBroker = async (broker: BrokerCredential) => {
    try {
      const response = await fetch(`/api/brokers/${broker.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete broker');
      }
      
      // Update local state
      setSavedBrokers(prev => prev.filter(b => b.id !== broker.id));
      
      showNotification({
        title: 'Broker Deleted Successfully',
        type: 'success',
      });
    } catch (error: any) {
      showNotification({
        title: 'Failed to delete broker',
        description: error.message,
        type: 'error',
      });
    }
  };

  const openConnectModal = (broker: AvailableBrokerConfig) => {
    setSelectedBroker(broker);
    setFieldValues({});
    setIsConnectModalOpen(true);
  };

  const openEditModal = (broker: BrokerCredential) => {
    setEditingBroker(broker);
    setFieldValues(broker.credentials);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [field]: value }));
  };

  const handleConnect = async () => {
    if (!selectedBroker) return;
    
    setLoading(true);
    
    try {
      // Validate that all fields have values
      const missingFields = selectedBroker.fields.filter(field => !fieldValues[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }
      
      const response = await fetch('/api/brokers/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          broker_name: selectedBroker.name,
          credentials: fieldValues,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to connect broker');
      }
      
      // Close modal and refresh broker list
      setIsConnectModalOpen(false);
      fetchSavedBrokers();
      
      showNotification({
        title: 'Broker Connected Successfully',
        type: 'success',
      });
    } catch (error: any) {
      showNotification({
        title: 'Connection Failed',
        description: error.message || 'An unexpected error occurred',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingBroker) return;
    
    setLoading(true);
    
    try {
      // Get the broker config to validate required fields
      const brokerConfig = AVAILABLE_BROKERS.find(b => b.name === editingBroker.broker_name);
      
      if (!brokerConfig) {
        throw new Error('Broker configuration not found');
      }
      
      // Validate that all fields have values
      const missingFields = brokerConfig.fields.filter(field => !fieldValues[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }
      
      const response = await fetch(`/api/brokers/${editingBroker.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credentials: fieldValues,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update credentials');
      }
      
      // Close modal and refresh broker list
      setIsEditModalOpen(false);
      fetchSavedBrokers();
      
      showNotification({
        title: 'Broker Credentials Updated Successfully',
        type: 'success',
      });
    } catch (error: any) {
      showNotification({
        title: 'Update Failed',
        description: error.message || 'An unexpected error occurred',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter available brokers to exclude already saved ones
  const filteredAvailableBrokers = AVAILABLE_BROKERS.filter(
    broker => !savedBrokers.some(saved => saved.broker_name === broker.name)
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      className="flex flex-col gap-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Shield className="w-6 h-6 text-zinc-200" />
        <h1 className="text-2xl font-bold text-zinc-100">Broker Authentication</h1>
      </div>
      <p className="text-zinc-400 text-sm -mt-6 mb-4">
        Connect and manage your trading accounts securely
      </p>

      {/* Saved Brokers Section */}
      <div className="rounded-lg border border-zinc-800 p-5 bg-zinc-950/50 backdrop-blur-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="bg-zinc-800/80 w-8 h-8 rounded-full inline-flex items-center justify-center mr-3">
            <CheckCircle className="h-4 w-4 text-zinc-300" />
          </span>
          Connected Brokers
        </h2>
        
        {savedBrokers.length === 0 ? (
          <div className="text-zinc-400 rounded-md p-6 text-center bg-zinc-900/40 border border-zinc-800/50">
            <AlertCircle className="w-5 h-5 mx-auto mb-2 opacity-70" />
            <p>No saved brokers. Connect a broker to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedBrokers.map((broker, index) => (
              <motion.div 
                key={broker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "flex items-center justify-between p-4 rounded-md transition-all duration-200",
                  "bg-gradient-to-r from-zinc-900 to-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/50",
                  "shadow-sm hover:shadow-md"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex px-3 py-1.5 bg-zinc-800 rounded-md text-sm font-medium">
                    {broker.broker_name}
                  </div>
                  
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    broker.is_active 
                      ? "text-green-400 bg-green-950/30" 
                      : "text-zinc-400 bg-zinc-800/30"
                  )}>
                    {broker.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={broker.is_active}
                      onCheckedChange={() => handleToggleBroker(broker)}
                      className="data-[state=checked]:bg-zinc-700"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-950/50 rounded-full h-8 w-8"
                      onClick={() => openEditModal(broker)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-950/50 rounded-full h-8 w-8"
                      onClick={() => handleDeleteBroker(broker)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Available Brokers Section */}
      <div className="rounded-lg border border-zinc-800 p-5 bg-zinc-950/50 backdrop-blur-sm shadow-lg mt-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <span className="bg-zinc-800/80 w-8 h-8 rounded-full inline-flex items-center justify-center mr-3">
            <ChevronRight className="h-4 w-4 text-zinc-300" />
          </span>
          Available Brokers
        </h2>
        
        {filteredAvailableBrokers.length === 0 ? (
          <div className="text-zinc-400 rounded-md p-6 text-center bg-zinc-900/40 border border-zinc-800/50">
            <CheckCircle className="w-5 h-5 mx-auto mb-2 opacity-70" />
            <p>All brokers have been connected.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAvailableBrokers.map((broker, index) => (
              <motion.div 
                key={broker.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "flex items-center justify-between p-4 rounded-md transition-all duration-200",
                  "bg-gradient-to-r from-zinc-900 to-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/50",
                  "shadow-sm hover:shadow-md"
                )}
              >
                <div className="inline-flex px-3 py-1.5 bg-zinc-800 rounded-md text-sm font-medium">
                  {broker.name}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
                  onClick={() => openConnectModal(broker)}
                >
                  Connect
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Connect Modal (Centered Dialog) */}
      <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-zinc-100 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Connect {selectedBroker?.name}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter your credentials to connect this broker
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            {selectedBroker?.fields.map(field => (
              <div key={field} className="space-y-2">
                <Label htmlFor={`connect-${field}`} className="text-zinc-300">{field}</Label>
                <Input
                  id={`connect-${field}`}
                  type={field.toLowerCase().includes('password') || field.includes('Secret') || field.includes('Key') ? 'password' : 'text'}
                  placeholder={`Enter ${field}`}
                  value={fieldValues[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-white focus:border-zinc-500 focus:ring-zinc-500"
                />
              </div>
            ))}
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsConnectModalOpen(false)}
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConnect}
              disabled={loading}
              className="bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Modal (Centered Dialog) */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-zinc-100 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Edit {editingBroker?.broker_name} Credentials
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Update your broker credentials
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            {editingBroker && AVAILABLE_BROKERS.find(b => b.name === editingBroker.broker_name)?.fields.map(field => (
              <div key={field} className="space-y-2">
                <Label htmlFor={`edit-${field}`} className="text-zinc-300">{field}</Label>
                <Input
                  id={`edit-${field}`}
                  type={field.toLowerCase().includes('password') || field.includes('Secret') || field.includes('Key') ? 'password' : 'text'}
                  placeholder={`Enter ${field}`}
                  value={fieldValues[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-white focus:border-zinc-500 focus:ring-zinc-500"
                />
              </div>
            ))}
          </div>
          
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={loading}
              className="bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
} 