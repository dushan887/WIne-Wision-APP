import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Card, UnreadBadge } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface AnnouncementItemProps {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  onPress?: () => void;
  onMarkAsRead?: (id: string) => void;
}

export const AnnouncementItem: React.FC<AnnouncementItemProps> = ({
  id,
  title,
  content,
  date,
  isRead,
  onPress,
  onMarkAsRead,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
    if (!isRead && onMarkAsRead) {
      onMarkAsRead(id);
    }
    onPress?.();
  };

  return (
    <Card onPress={handlePress} variant="outlined">
      <View style={tw`relative`}>
        {!isRead && <UnreadBadge count={1} size="small" />}
        
        <View style={tw`flex-row justify-between items-start mb-2`}>
          <Text
            style={tw`font-bold text-lg text-gray-900 flex-1 mr-2 ${
              !isRead ? 'text-wine-700' : ''
            }`}
          >
            {title}
          </Text>
          <Text style={tw`text-gray-500 text-sm`}>
            {new Date(date).toLocaleDateString()}
          </Text>
        </View>

        <Text
          style={tw`text-gray-700 text-sm leading-5`}
          numberOfLines={isExpanded ? undefined : 2}
        >
          {content}
        </Text>

        {content.length > 100 && (
          <TouchableOpacity style={tw`mt-2`} onPress={handlePress}>
            <Text style={[tw`text-sm font-medium`, { color: colors['wine-red'] }]}>
              {isExpanded ? 'Show less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};
