'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// Types for notification
type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  duration?: number;
}

// Context type
interface NotificationContextProps {
  notifications: Notification[];
  showNotification: (props: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
}

// Create context
const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

// Provider component
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Add a notification
  const showNotification = useCallback((props: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const notification = { id, ...props };
    
    setNotifications((prev) => [...prev, notification]);

    // Auto dismiss after duration (default: 3 seconds)
    if (props.duration !== 0) {
      const duration = props.duration || 3000;
      setTimeout(() => {
        dismissNotification(id);
      }, duration);
    }
  }, []);

  // Remove a notification
  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, dismissNotification }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

// Hook to use notifications
export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

// Notification container component
function NotificationContainer() {
  const { notifications, dismissNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          variant={notification.type as any}
          isNotification={true}
          layout="row"
          className="animate-in fade-in slide-in-from-right-5 duration-300"
          action={
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => dismissNotification(notification.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          }
        >
          <div>
            <AlertTitle>{notification.title}</AlertTitle>
            {notification.description && (
              <AlertDescription>{notification.description}</AlertDescription>
            )}
          </div>
        </Alert>
      ))}
    </div>
  );
}

// Utility functions for showing notifications
export function showToast(
  title: string,
  type: NotificationType = 'default',
  description?: string,
  duration: number = 3000
) {
  // This will be used inside components to show notifications
  const context = useContext(NotificationContext);
  if (context) {
    context.showNotification({ title, type, description, duration });
  } else {
    console.error('Notification context not available');
  }
}

// Global functions (to be used outside of React components)
let notificationContextValue: NotificationContextProps | null = null;

export function setNotificationContext(context: NotificationContextProps) {
  notificationContextValue = context;
}

export const toast = {
  success: (title: string, description?: string, duration: number = 3000) => {
    if (notificationContextValue) {
      notificationContextValue.showNotification({ title, description, type: 'success', duration });
    }
  },
  error: (title: string, description?: string, duration: number = 3000) => {
    if (notificationContextValue) {
      notificationContextValue.showNotification({ title, description, type: 'error', duration });
    }
  },
  warning: (title: string, description?: string, duration: number = 3000) => {
    if (notificationContextValue) {
      notificationContextValue.showNotification({ title, description, type: 'warning', duration });
    }
  },
  info: (title: string, description?: string, duration: number = 3000) => {
    if (notificationContextValue) {
      notificationContextValue.showNotification({ title, description, type: 'info', duration });
    }
  },
}; 