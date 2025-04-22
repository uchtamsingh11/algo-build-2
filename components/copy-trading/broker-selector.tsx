'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useNotification } from '@/lib/notification';

type Broker = {
  id: string;
  broker_name: string;
  is_active: boolean;
};

export function CopyTradingBrokerSelector() {
  const [savedBrokers, setSavedBrokers] = useState<Broker[]>([]);
  const [selectedBrokers, setSelectedBrokers] = useState<Broker[]>([]);
  const [isSelectDialogOpen, setIsSelectDialogOpen] = useState(false);
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
      
      // Filter only active brokers
      const activeBrokers = data.filter((broker: Broker) => broker.is_active);
      setSavedBrokers(activeBrokers);
    } catch (error: any) {
      showNotification({
        title: 'Failed to load brokers',
        description: error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBroker = (broker: Broker) => {
    if (!selectedBrokers.some(selected => selected.id === broker.id)) {
      setSelectedBrokers([...selectedBrokers, broker]);
    }
    setIsSelectDialogOpen(false);
  };

  const handleRemoveBroker = (brokerId: string) => {
    setSelectedBrokers(selectedBrokers.filter(broker => broker.id !== brokerId));
  };

  const handleToggleBroker = (brokerId: string) => {
    setSelectedBrokers(prev => 
      prev.map(broker => 
        broker.id === brokerId 
          ? { ...broker, is_active: !broker.is_active } 
          : broker
      )
    );
  };

  // Filter out already selected brokers from the saved brokers list
  const availableBrokers = savedBrokers.filter(
    broker => !selectedBrokers.some(selected => selected.id === broker.id)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-zinc-200">Choose your broker</h3>
      
      <div className="flex flex-col space-y-3">
        {/* Display selected brokers */}
        {selectedBrokers.map((broker) => (
          <div
            key={broker.id}
            className={cn(
              "flex items-center justify-between p-4 rounded-md w-full",
              "bg-zinc-900 border border-zinc-800 hover:border-zinc-700",
              "transition-all duration-200 shadow-sm"
            )}
          >
            <div className="flex items-center">
              <span className="text-sm font-medium text-zinc-100">
                {broker.broker_name}
              </span>
              
              <span className={cn(
                "ml-3 text-xs px-2 py-0.5 rounded-full",
                broker.is_active 
                  ? "text-green-400 bg-green-950/30" 
                  : "text-zinc-400 bg-zinc-800/30"
              )}>
                {broker.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">
                  {broker.is_active ? 'On' : 'Off'}
                </span>
                <Switch 
                  checked={broker.is_active}
                  onCheckedChange={() => handleToggleBroker(broker.id)}
                  className="data-[state=checked]:bg-zinc-700"
                />
              </div>
              
              <button 
                onClick={() => handleRemoveBroker(broker.id)} 
                className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-950/30"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        
        {/* Add broker card */}
        {(availableBrokers.length > 0) && (
          <div
            className={cn(
              "flex items-center justify-center p-4 rounded-md w-full",
              "bg-zinc-900 border border-dashed border-zinc-700 hover:border-zinc-600",
              "transition-all duration-200 shadow-sm cursor-pointer"
            )}
            onClick={() => setIsSelectDialogOpen(true)}
          >
            <div className="flex items-center text-zinc-500 hover:text-zinc-300">
              <Plus className="h-5 w-5 mr-2" />
              <span className="text-sm">Add broker</span>
            </div>
          </div>
        )}

        {/* Empty state when no brokers are available or connected */}
        {savedBrokers.length === 0 && (
          <div className="text-sm text-zinc-500 italic p-4 border border-zinc-800 rounded-md bg-zinc-900/50">
            No active brokers found. Please connect and activate brokers in the 
            <a href="/broker-auth" className="text-zinc-300 hover:underline mx-1">
              Broker Authentication
            </a>
            section.
          </div>
        )}
      </div>

      {/* Broker selection dialog */}
      <Dialog open={isSelectDialogOpen} onOpenChange={setIsSelectDialogOpen}>
        <DialogContent className="sm:max-w-md border-zinc-800 bg-zinc-900">
          <DialogHeader>
            <DialogTitle className="text-zinc-100">Select a Broker</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-2 mt-4">
            {availableBrokers.length === 0 ? (
              <div className="text-center py-4 text-zinc-500">
                No more brokers available to select.
              </div>
            ) : (
              availableBrokers.map((broker) => (
                <div
                  key={broker.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-md",
                    "bg-zinc-900 border border-zinc-800 hover:border-zinc-700",
                    "transition-all duration-200 cursor-pointer"
                  )}
                  onClick={() => handleSelectBroker(broker)}
                >
                  <span className="text-sm font-medium text-zinc-100">
                    {broker.broker_name}
                  </span>
                  <Plus className="h-4 w-4 text-zinc-400" />
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 