import { useState } from 'react';
import { MessageCircle, DollarSign, Heart, TrendingDown, AlertCircle, Check, X, Bell } from 'lucide-react';

function NotificationCard() {
  const [isOpen, setIsOpen] = useState(false);
  
  // TODO: Replace with backend API call
  // const { notifications, unreadCount } = useNotifications();
  
  // CURRENT: Static notifications for development
  const [notifications, setNotifications] = useState([
    {
        id: 1,
        type: 'message',
        title: 'New message about your listing',
        description: 'John asked: "Is the MacBook still available?"',
        time: '2m ago',
        read: false,
        icon: MessageCircle,
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-50',
        link: '/messages'
    },
    {
        id: 2,
        type: 'sale',
        title: 'Your item has been sold!',  
        description: 'Congratulations! Your bicycle has been sold for $150.',
        time: '10m ago',
        read: false,
        icon: DollarSign,
        iconColor: 'text-green-500',
        iconBg: 'bg-green-50',
        link: '/my-listings'
    },
    {
        id: 3,
        type: 'favorite',
        title: 'Someone saved your item',
        description: '3 people added your desk to favorites',
        time: '3h ago',
        read: false,
        icon: Heart,
        iconColor: 'text-pink-500',
        iconBg: 'bg-pink-50',
        link: '/my-listings'
    },
    {   
        id: 4,
        type: 'price',
        title: 'Price drop on saved item',
        description: 'iPhone 13 now $450 (was $500)',
        time: '1d ago',
        read: true,
        icon: TrendingDown,
        iconColor: 'text-purple-500',
        iconBg: 'bg-purple-50',
        link: '/saved'
    },
    {
        id: 5,
        type: 'account',
        title: 'Verify your email',
        description: 'Please verify your email to secure your account.',
        time: '2d ago',
        read: true,
        icon: AlertCircle,
        iconColor: 'text-orange-500',
        iconBg: 'bg-orange-50',
        link: '/settings'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    // TODO: Call backend API to mark as read
    // await notificationsAPI.markAsRead(id);
    
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    // TODO: Call backend API to mark all as read
    // await notificationsAPI.markAllAsRead();
    
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    // TODO: Call backend API to delete notification
    // await notificationsAPI.deleteNotification(id);
    
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className='relative'>
      {/* Notification Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className='relative p-3 text-gray-600 hover:text-[#7A0019] hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110'
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[600px] overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">{unreadCount} unread</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-[#7A0019] hover:text-[#7A0019]/80 font-medium flex items-center space-x-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Mark all read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button 
                  onClick={() => setNotifications([])}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Bell className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No notifications yet</p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer relative ${
                        !notification.read ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (notification.link) {
                          window.location.href = notification.link;
                        }
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className={`${notification.iconBg} p-2 rounded-full flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                            {notification.description}
                          </p>
                          <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationCard;