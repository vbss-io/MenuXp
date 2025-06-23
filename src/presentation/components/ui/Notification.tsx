import React, { useContext, useEffect } from 'react';
import { X } from 'lucide-react';
import { AppContext } from '../../contexts/AppContext';

export default function Notification() {
  const { notifications, removeNotification } = useContext(AppContext);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          onClose={() => removeNotification(notification.id)} 
        />
      ))}
    </div>
  );
}

interface NotificationItemProps {
  notification: {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  };
  onClose: () => void;
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  // Auto close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const getToastClass = () => {
    switch (notification.type) {
      case 'success': return 'toast-success';
      case 'error': return 'toast-error';
      case 'warning': return 'toast-warning';
      case 'info': return 'toast-info';
      default: return 'toast-info';
    }
  };

  return (
    <div className={`toast-base ${getToastClass()}`}>
      <p className="font-medium">{notification.message}</p>
      <button 
        onClick={onClose} 
        className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}