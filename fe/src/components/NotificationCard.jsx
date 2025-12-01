import { useState } from 'react';
import { MessageCircle, DollarSign, Heart, MapPin, Settings, ShoppingBag, TrendingDown, ALertCircle, Check, X } from 'lucide-react';

function NotificationCard({ type, message, onClose }) {
  const [isVisible, setIsVisible] = useState(true); 
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
        iconBg: 'bg-blue-50'
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
        iconBg: 'bg-green-50'
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
        iconBg: 'bg-pink-50'
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
        iconBg: 'bg-purple-50'
    },
    {
        id: 5,
        type: 'account',
        title: 'Verify your email',
        description: 'Please verify your email to secure your account.',
        time: '2d ago',
        read: true,
        icon: ALertCircle,
        iconColor: 'text-orange-500',
        iconBg: 'bg-orange-50'
    }
  ]);


  const unreadCOunt = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.maop(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };


  return(
    <div className='relative'>
        <button onClick={() => setIsVisible(!isVisible)} className='relative p-3 text-gray-600 hover:text-[#7A0019] focus:outline-none'></button>
    </div>

  );
}

export default NotificationCard;