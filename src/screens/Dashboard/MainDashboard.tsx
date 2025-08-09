import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/actions/userActions';
import { AppDispatch } from '../../store';
import tw from 'twrnc';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

type MainDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'MainDashboard'>;

interface MainDashboardProps {
  navigation: MainDashboardNavigationProp;
}

const { width, height } = Dimensions.get('window');

export const MainDashboard: React.FC<MainDashboardProps> = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.navigate('Landing');
  };

  const menuItems = [
    { title: 'Dashboard', icon: '🏠', screen: 'MainDashboard' },
    { title: 'My Events', icon: '🗓️', screen: 'Events' },
    { title: 'Applications', icon: '📝', screen: 'Applications' },
    { title: 'Exhibitors', icon: '🏢', screen: 'Exhibitors' },
    { title: 'Visitors', icon: '👥', screen: 'Visitors' },
    { title: 'Trade Meetings', icon: '🤝', screen: 'TradeMeetings' },
    { title: 'News & Updates', icon: '📰', screen: 'News' },
    { title: 'Notifications', icon: '🔔', screen: 'Notifications' },
    { title: 'My Profile', icon: '👤', screen: 'Profile' },
    { title: 'Settings', icon: '⚙️', screen: 'Settings' },
  ];

  const quickStats = [
    { title: 'Registered Events', value: '3', color: colors.v },
    { title: 'Pending Applications', value: '2', color: colors.y },
    { title: 'Trade Meetings', value: '7', color: colors.r },
    { title: 'Messages', value: '12', color: colors.g },
  ];

  const upcomingEvents = [
    {
      title: 'Wine Vision 2025',
      date: 'Nov 22-25, 2025',
      location: 'Belgrade Fair, Serbia',
      status: 'Registered',
      image: 'https://placehold.co/300x200/8B5CF6/ffffff?text=Wine+Vision'
    },
    {
      title: 'International Wine Expo',
      date: 'Dec 15-18, 2025',
      location: 'Paris, France',
      status: 'Application Pending',
      image: 'https://placehold.co/300x200/F59E0B/ffffff?text=Wine+Expo'
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-[#0b051c]`}>
      <StatusBar barStyle="light-content" backgroundColor="#0b051c" />
      
      {/* Header */}
      <View style={tw`flex-row justify-between items-center px-6 py-4 border-b border-gray-800`}>
        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <View style={tw`w-8 h-8 justify-center items-center`}>
            <View style={tw`w-6 h-0.5 bg-white mb-1`} />
            <View style={tw`w-6 h-0.5 bg-white mb-1`} />
            <View style={tw`w-6 h-0.5 bg-white`} />
          </View>
        </TouchableOpacity>
        
        <Text style={tw`text-white text-xl font-['InterTight-VariableFont_wght'] font-bold`}>
          Wine Vision Dashboard
        </Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <View style={tw`w-8 h-8 bg-purple-600 rounded-full justify-center items-center`}>
            <Text style={tw`text-white text-xs`}>🔔</Text>
            <View style={tw`absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full justify-center items-center`}>
              <Text style={tw`text-white text-xs font-bold`}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Slide Menu Overlay */}
      {isMenuOpen && (
        <TouchableOpacity 
          style={tw`absolute inset-0 bg-black/50 z-40`}
          onPress={() => setIsMenuOpen(false)}
        >
          <View style={tw`absolute left-0 top-0 bottom-0 w-80 bg-[#1a0f2e] z-50`}>
            <TouchableOpacity 
              style={tw`p-0`}
              onPress={() => {}}
              activeOpacity={1}
            >
              {/* Menu Header */}
              <LinearGradient
                colors={['#8B5CF6', '#6D28D9']}
                style={tw`px-6 py-8`}
              >
                <View style={tw`flex-row items-center mb-4`}>
                  <View style={tw`w-16 h-16 bg-white/20 rounded-full justify-center items-center mr-4`}>
                    <Text style={tw`text-white text-2xl`}>👤</Text>
                  </View>
                  <View>
                    <Text style={tw`text-white text-lg font-['InterTight-VariableFont_wght'] font-bold`}>
                      Wine Professional
                    </Text>
                    <Text style={tw`text-white/80 text-sm font-['InterTight-VariableFont_wght']`}>
                      Exhibitor Premium
                    </Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Menu Items */}
              <ScrollView style={tw`flex-1 px-4 py-4`}>
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw`flex-row items-center py-4 px-4 border-b border-gray-700/30`}
                    onPress={() => {
                      setIsMenuOpen(false);
                      navigation.navigate(item.screen as any);
                    }}
                  >
                    <Text style={tw`text-xl mr-4`}>{item.icon}</Text>
                    <Text style={tw`text-white text-base font-['InterTight-VariableFont_wght']`}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
                
                {/* Logout */}
                <TouchableOpacity
                  style={tw`flex-row items-center py-4 px-4 mt-4 bg-red-600/20 rounded-lg`}
                  onPress={handleLogout}
                >
                  <Text style={tw`text-xl mr-4`}>🚪</Text>
                  <Text style={tw`text-red-400 text-base font-['InterTight-VariableFont_wght'] font-semibold`}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Main Content */}
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <LinearGradient
          colors={['#8B5CF6', '#6D28D9']}
          style={tw`mx-6 mt-6 p-6 rounded-2xl`}
        >
          <Text style={tw`text-white text-2xl font-['InterTight-VariableFont_wght'] font-bold mb-2`}>
            Welcome to Wine Vision 2025
          </Text>
          <Text style={tw`text-white/90 text-base font-['InterTight-VariableFont_wght'] mb-4`}>
            Manage your events, applications, and connect with industry professionals
          </Text>
          <TouchableOpacity 
            style={tw`bg-white/20 px-4 py-2 rounded-lg self-start`}
            onPress={() => navigation.navigate('Events')}
          >
            <Text style={tw`text-white font-['InterTight-VariableFont_wght'] font-semibold`}>
              View Events
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={tw`px-6 mt-6`}>
          <Text style={tw`text-white text-lg font-['InterTight-VariableFont_wght'] font-bold mb-4`}>
            Quick Overview
          </Text>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {quickStats.map((stat, index) => (
              <View 
                key={index}
                style={[tw`bg-gray-800 p-4 rounded-xl mb-4`, { width: (width - 60) / 2 }]}
              >
                <Text style={[tw`text-3xl font-bold mb-2`, { color: stat.color }]}>
                  {stat.value}
                </Text>
                <Text style={tw`text-gray-300 text-sm font-['InterTight-VariableFont_wght']`}>
                  {stat.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={tw`px-6 mt-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-white text-lg font-['InterTight-VariableFont_wght'] font-bold`}>
              Upcoming Events
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={tw`text-purple-400 font-['InterTight-VariableFont_wght']`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          {upcomingEvents.map((event, index) => (
            <TouchableOpacity 
              key={index}
              style={tw`bg-gray-800 rounded-xl p-4 mb-4 flex-row`}
              onPress={() => navigation.navigate('EventDetails')}
            >
              <Image 
                source={{ uri: event.image }}
                style={tw`w-20 h-20 rounded-lg mr-4`}
              />
              <View style={tw`flex-1`}>
                <Text style={tw`text-white text-base font-['InterTight-VariableFont_wght'] font-bold mb-1`}>
                  {event.title}
                </Text>
                <Text style={tw`text-gray-400 text-sm font-['InterTight-VariableFont_wght'] mb-1`}>
                  {event.date}
                </Text>
                <Text style={tw`text-gray-400 text-sm font-['InterTight-VariableFont_wght'] mb-2`}>
                  {event.location}
                </Text>
                <View style={tw`bg-purple-600 px-2 py-1 rounded self-start`}>
                  <Text style={tw`text-white text-xs font-['InterTight-VariableFont_wght']`}>
                    {event.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={tw`px-6 mt-6 mb-8`}>
          <Text style={tw`text-white text-lg font-['InterTight-VariableFont_wght'] font-bold mb-4`}>
            Quick Actions
          </Text>
          <View style={tw`flex-row flex-wrap justify-between`}>
            <TouchableOpacity 
              style={tw`bg-orange-600 p-4 rounded-xl mb-4 flex-row items-center`}
              onPress={() => navigation.navigate('Applications')}
            >
              <Text style={tw`text-2xl mr-3`}>📝</Text>
              <Text style={tw`text-white font-['InterTight-VariableFont_wght'] font-semibold`}>
                New Application
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={tw`bg-green-600 p-4 rounded-xl mb-4 flex-row items-center`}
              onPress={() => navigation.navigate('TradeMeetings')}
            >
              <Text style={tw`text-2xl mr-3`}>🤝</Text>
              <Text style={tw`text-white font-['InterTight-VariableFont_wght'] font-semibold`}>
                Schedule Meeting
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
