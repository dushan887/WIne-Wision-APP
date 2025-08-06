import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { AnnouncementItem } from '../../components/notifications';

type NotificationsScreenNavigationProp = StackNavigationProp<any, 'Notifications'>;

interface Props {
  navigation: NotificationsScreenNavigationProp;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to Wine Vision 2025!',
    content: 'We are excited to welcome you to the premier wine industry event of the year. Please check your schedule and don\'t miss our opening ceremony at 9:00 AM in the main hall. We have prepared an exceptional program with renowned speakers, exclusive tastings, and networking opportunities that will make this event unforgettable.',
    date: '2025-01-20T09:00:00Z',
    isRead: false,
  },
  {
    id: '2',
    title: 'Schedule Update: Wine Tasting Session',
    content: 'The premium wine tasting session originally scheduled for 2:00 PM has been moved to 3:30 PM in Hall B. This change allows for better coordination with our featured vintners and ensures you have the full experience.',
    date: '2025-01-19T14:30:00Z',
    isRead: false,
  },
  {
    id: '3',
    title: 'New Exhibitor Added: Château Excellence',
    content: 'We are pleased to announce that Château Excellence has joined our list of exhibitors. Visit their booth A-25 to discover their award-winning collection.',
    date: '2025-01-18T11:15:00Z',
    isRead: true,
  },
  {
    id: '4',
    title: 'Networking Lunch Tomorrow',
    content: 'Join us for a special networking lunch featuring local cuisine paired with selected wines from our exhibitors. Limited seats available.',
    date: '2025-01-17T12:00:00Z',
    isRead: true,
  },
];

export const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);

  const handleMarkAsRead = (id: string) => {
    setAnnouncements(prev =>
      prev.map(announcement =>
        announcement.id === id
          ? { ...announcement, isRead: true }
          : announcement
      )
    );
    // TODO: Call API to mark as read
  };

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`px-4 py-6`}>
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <Text style={tw`text-2xl font-bold text-wine-800`}>
            Announcements
          </Text>
          {unreadCount > 0 && (
            <View style={tw`bg-red-500 rounded-full px-3 py-1`}>
              <Text style={tw`text-white text-sm font-bold`}>
                {unreadCount} New
              </Text>
            </View>
          )}
        </View>

        {announcements.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center py-12`}>
            <Text style={tw`text-gray-500 text-center text-lg`}>
              No announcements yet
            </Text>
            <Text style={tw`text-gray-400 text-center mt-2`}>
              Check back later for updates
            </Text>
          </View>
        ) : (
          announcements.map((announcement) => (
            <AnnouncementItem
              key={announcement.id}
              id={announcement.id}
              title={announcement.title}
              content={announcement.content}
              date={announcement.date}
              isRead={announcement.isRead}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};
