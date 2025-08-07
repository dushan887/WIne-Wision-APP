import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { removeMessage, Message } from '../../store/slices/messagesSlice';
import { containsHTML, parseHTMLContent } from '../../utils/htmlSanitizer';
import { HTMLText } from './HTMLText';

interface MessageItemProps {
  message: Message;
  onDismiss: (id: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onDismiss }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss if duration is set
    if (message.duration && message.duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, message.duration);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(message.id);
    });
  };

  const getMessageStyles = () => {
    switch (message.type) {
      case 'success':
        return {
          backgroundColor: colors.g,
          borderColor: colors.g_80,
          textColor: colors.w,
          iconColor: colors.w,
        };
      case 'error':
        return {
          backgroundColor: colors.r,
          borderColor: colors.r_80,
          textColor: colors.w,
          iconColor: colors.w,
        };
      case 'warning':
        return {
          backgroundColor: colors.y,
          borderColor: colors.y_80,
          textColor: colors.c_90,
          iconColor: colors.c_90,
        };
      case 'info':
        return {
          backgroundColor: colors.v,
          borderColor: colors.v_80,
          textColor: colors.w,
          iconColor: colors.w,
        };
      default:
        return {
          backgroundColor: colors.c_80,
          borderColor: colors.c_60,
          textColor: colors.c_20,
          iconColor: colors.c_20,
        };
    }
  };

  const styles = getMessageStyles();

  return (
    <Animated.View
      style={[
        tw`mx-4 mb-2 rounded-lg p-3 flex-row items-start shadow-lg`,
        {
          backgroundColor: styles.backgroundColor,
          borderWidth: 1,
          borderColor: styles.borderColor,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Content */}
      <View style={tw`flex-1`}>
        {message.title && (
          <View style={tw`mb-1`}>
            {containsHTML(message.title) ? (
              <HTMLText
                html={message.title}
                textStyle={[tw`font-bold text-sm`, { color: styles.textColor }]}
              />
            ) : (
              <Text style={[tw`font-bold text-sm`, { color: styles.textColor }]}>
                {message.title}
              </Text>
            )}
          </View>
        )}
        
        <View>
          {containsHTML(message.message) ? (
            <HTMLText
              html={message.message}
              textStyle={[tw`text-sm leading-5`, { color: styles.textColor }]}
            />
          ) : (
            <Text style={[tw`text-sm leading-5`, { color: styles.textColor }]}>
              {message.message}
            </Text>
          )}
        </View>
      </View>

      {/* Dismiss button */}
      {message.dismissible && (
        <TouchableOpacity
          onPress={handleDismiss}
          style={tw`ml-2 p-0 mt-0`}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[tw`text-sm font-bold leading-none`, { color: styles.textColor }]}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const MessageArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages } = useSelector((state: RootState) => state.messages);

  const handleDismiss = (id: string) => {
    dispatch(removeMessage(id));
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <View style={tw`left-0 right-0 z-40`}>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onDismiss={handleDismiss}
        />
      ))}
    </View>
  );
};

export default MessageArea;
