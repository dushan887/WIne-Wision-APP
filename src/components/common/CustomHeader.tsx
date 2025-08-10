import React, { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { theme } from '../../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutUser } from '../../store/actions/userActions';
import WVLogo from '../../../assets/images/wv_logo-official.svg';
import MessageArea from './MessageArea';

// Interactive header with togglable menu and logout for Wine Vision app
interface CustomHeaderProps {
  isAuthenticated: boolean;
}

const { height, width } = Dimensions.get('window');

const CustomHeader: React.FC<CustomHeaderProps> = React.memo(({ isAuthenticated }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize static values
  const staticPages = useMemo(() => ['About', 'Contact', 'FAQ', 'Privacy', 'Terms', 'Support'], []);
  const authPages = useMemo(() => ['Login', 'Register'], []);
  
  const isOnStaticPage = useMemo(() => staticPages.includes(route.name), [staticPages, route.name]);
  const isOnAuthPage = useMemo(() => authPages.includes(route.name), [authPages, route.name]);
  const isOnLoginPage = useMemo(() => route.name === 'Login', [route.name]);
  
  // Responsive padding
  const headerPadding = useMemo(() => ({
    paddingHorizontal: width > 768 ? 32 : 16
  }), [width]);
  const shouldShowBackButton = isOnStaticPage || isOnAuthPage;

  // Memoized callbacks for performance
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  
  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
    navigation.navigate('Landing' as never);
  }, [dispatch, navigation]);

  const handleNavigation = useCallback((screen: string) => {
    setIsMenuOpen(false);
    navigation.navigate(screen as never);
  }, [navigation]);

  const handleBackNavigation = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Landing' as never);
    }
  }, [navigation]);

  // Memoize theme colors for better performance - map old color names to new theme
  const colors = useMemo(() => ({
    c: theme.colors.carbon.base,      // Main carbon color
    c_90: theme.colors.carbon[90],    // Light carbon
    c_80: theme.colors.carbon[80],    // Medium-light carbon
    c_70: theme.colors.carbon[70],    // Medium carbon
    c_50: theme.colors.carbon[50],    // Medium carbon
    c_20: theme.colors.carbon[20],    // Light text
    c_10: theme.colors.carbon[10],    // Very light
    v: theme.colors.velvet.base,      // Velvet color
    r: theme.colors.red,              // Red color
    w: theme.colors.white,            // White color
  }), []);

  if (!isAuthenticated) {
    // Simple header for guests with conditional navigation
    return (
      <View>
        <LinearGradient
          colors={[colors.c_90, colors.c]}
          style={tw``}
        >
          <SafeAreaView style={tw``}>
            <StatusBar barStyle="light-content" backgroundColor={colors.c_90} />
            <View style={tw`flex-row justify-between items-center px-4 py-4 relative min-h-16`}>  
            {/* Left side - Back or About */}
            {shouldShowBackButton ? (
              <TouchableOpacity onPress={handleBackNavigation} style={tw`flex-row items-center flex-1`}>
                <View style={[tw`relative w-6 h-6 mr-1 justify-center items-center`, { transform: [{ rotate: '180deg' }] }]}>
                  <Text style={[tw`font-medium text-lg absolute`, { 
                    fontFamily: 'Wine-Vision', 
                    color: colors.c_20
                  }]}>&#xe94e;</Text>
                  <Text style={[tw`text-white font-medium text-lg absolute`, { 
                    fontFamily: 'Wine-Vision', 
                    color: colors.c
                  }]}>&#xe94f;</Text>
                </View>
                <Text style={[tw`font-medium`, { color: colors.c_20 }]}>Back</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('About' as never)} style={tw`flex-row items-center flex-1`}>
                <View style={tw`relative w-6 h-6 mr-1 justify-center items-center`}>
                  <Text style={[tw`font-medium text-lg absolute`, { fontFamily: 'Wine-Vision', color: colors.c_20 }]}>&#xe9a1;</Text>
                  <Text style={[tw`text-white font-medium text-lg absolute`, { fontFamily: 'Wine-Vision', color: colors.c }]}>&#xe9a2;</Text>
                </View>
                <Text style={[tw`font-medium`, { color: colors.c_20 }]}>About</Text>
              </TouchableOpacity>
            )}
            
            {/* Centered Logo */}
            <View style={tw`absolute left-0 right-0 top-0 bottom-0 justify-center items-center z-10`} pointerEvents="none">
              <TouchableOpacity 
                onPress={() => navigation.navigate('Landing' as never)} 
              >
                <WVLogo width={40} height={40} />
              </TouchableOpacity>
            </View>
            
            {/* Right side - Register or Sign In */}
            {isOnLoginPage ? (
              <TouchableOpacity onPress={() => navigation.navigate('Register' as never)} style={tw`flex-row items-center justify-end flex-1`}>
                <Text style={[tw`font-medium mr-1`, { color: colors.c_20 }]}>Register</Text>
                <View style={tw`relative w-6 h-6 justify-center items-center`}>
                  <Text style={[tw`text-white font-medium text-lg absolute`, { fontFamily: 'Wine-Vision', color: colors.c_20 }]}>&#xe91a;</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Login' as never)} style={tw`flex-row items-center justify-end flex-1`}>
                <Text style={[tw`font-medium mr-1`, { color: colors.c_20 }]}>Sign In</Text>
                <View style={tw`relative w-6 h-6 justify-center items-center`}>
                  <Text style={[tw`text-white font-medium text-lg absolute`, { fontFamily: 'Wine-Vision', color: colors.c_20 }]}>&#xe91a;</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
      <MessageArea />
      </View>
    );
  }

  return (
    <View>
      <LinearGradient
        colors={[colors.c_90, colors.c]}
        style={tw``}
      >
        <SafeAreaView style={tw``}>  
          <StatusBar barStyle="light-content" backgroundColor={colors.c_90} />
          <View style={tw`flex-row justify-between items-center px-4 py-3 relative`}>  
        {/* Left Icons */}
        <View style={tw`flex-row items-center flex-1`}>
          <TouchableOpacity style={tw`mr-3`}>
            <View style={tw`relative w-12 h-12 justify-center items-center`}>
              <Text style={[tw`text-4xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c_80 }]}>&#xe9ad;</Text>
              <Text style={[tw`text-4xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c }]}>&#xe9ae;</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={tw`relative w-10 h-10 justify-center items-center`}>
              <Text style={[tw`text-3xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c_80 }]}>&#xe915;</Text>
              <Text style={[tw`text-3xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c }]}>&#xe916;</Text>
            </View>
          </TouchableOpacity>
        </View>
        
          {/* Centered Logo */}
          <View style={tw`absolute left-0 right-0 top-0 bottom-0 justify-center items-center z-10`} pointerEvents="none">
            <TouchableOpacity 
              onPress={() => navigation.navigate('Landing' as never)} 
            >
              <WVLogo width={40} height={40} />
            </TouchableOpacity>
          </View>        {/* Right Icons */}
        <View style={tw`flex-row items-center justify-end flex-1`}>
          <TouchableOpacity style={tw`mr-3`}>
            <View style={tw`relative w-10 h-10 justify-center items-center`}>
              <Text style={[tw`text-3xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.v }]}>&#xe99e;</Text>
              <Text style={[tw`text-3xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c }]}>&#xe99f;</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw`mr-3 relative`}>
            <View style={tw`relative w-10 h-10 justify-center items-center`}>
              <Text style={[tw`text-3xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c_80 }]}>&#xe924;</Text>
              <Text style={[tw`text-3xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c }]}>&#xe925;</Text>
            </View>
            {/* Message counter badge */}
            <View style={[tw`absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center`, { backgroundColor: colors.r }]}>
              <Text style={[tw`text-xs font-bold`, { color: colors.w }]}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <View style={tw`relative w-12 h-12 justify-center items-center`}>
              <Text style={[tw`text-4xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: isMenuOpen ? colors.w : colors.c_80 }]}>&#xe972;</Text>
              <Text style={[tw`text-4xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c }]}>&#xe973;</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
    {isMenuOpen && (
      <View style={[tw`z-50`, { backgroundColor: colors.c }]}>  
        {/* Top border edge to edge */}
        <View style={[tw`border-t`, { borderColor: colors.c_80 }]} />
        
        {/* User info with company/name and buttons */}
          <View style={tw`px-6 py-4`}>
            <View style={tw`flex-row items-start justify-between`}>
              <View style={tw`flex-1 mr-4`}>
                <Text style={[tw`text-lg font-medium mb-2`, { color: colors.c_20 }]}>
                  {user?.role === 'exhibitor' ? 'Exhibitor Winery Company Title' : 'Full Name '}
                </Text>                
                {/* Profile buttons */}
                <View style={tw`flex-row gap-2`}>
                  <TouchableOpacity 
                    style={[tw`px-2 py-1 rounded-full border`, { backgroundColor: colors.v ,borderColor: colors.v }]} 
                    onPress={() => handleNavigation('Profile')}
                  >
                    <Text style={[tw`text-center font-bold text-xs`, { color: colors.c_20 }]}>PROFILE INFO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[tw`px-2 py-1 rounded-full border`, { backgroundColor: colors.c, borderColor: colors.c_50 }]} 
                    onPress={() => handleNavigation('ComingSoon')}
                  >
                    <Text style={[tw`text-center font-bold text-xs`, { color: colors.c_20 }]}>CO-EXHIBITORS</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Profile image */}
              <View style={[tw`w-16 h-16 rounded-lg`, { backgroundColor: colors.c_20 }]}>
                <Image source={{ uri: 'https://placehold.co/64x64/PNG/?text=Profile' }} style={tw`w-16 h-16 rounded-md`} />
              </View>
            </View>
          </View>
          
          {/* Bottom border edge to edge */}
          <View style={[tw`border-b`, { borderColor: colors.c_80 }]} />
          
          {/* Centered Main Nav Items */}
          <View style={tw`items-center mb-6 px-6 pt-6`}>
            {['2025 List of Buyers','Meeting Requests','Calendar','Events','Products','Services','2025 Program','Latest News','Open Podcast']
              .map(item => {
                const isDisabled = ['2025 List of Buyers','Meeting Requests','Calendar','Events','Products','Services'].includes(item);
                return (
                  <TouchableOpacity 
                    key={item} 
                    style={tw`py-2`} 
                    onPress={isDisabled ? undefined : () => handleNavigation(item)}
                    disabled={isDisabled}
                  >
                    <Text style={[tw`text-lg font-medium text-center`, { color: isDisabled ? colors.c_80 : colors.c_20 }]}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          
          {/* Border above search edge to edge */}
          <View style={[tw`border-t`, { borderColor: colors.c_80 }]} />
          
          {/* Search */}
          <View style={tw`px-6 pt-6`}>
            <View style={tw`relative`}>
              <TextInput 
                style={[tw`rounded-full p-3 pl-12 mb-4`, { backgroundColor: colors.c_80, color: colors.c_20 }]} 
                placeholder="Search" 
                placeholderTextColor={colors.c_50}
              />
              {/* Search icon */}
              <View style={[tw`absolute left-4 w-6 h-6 justify-center items-center`, { top: 12 }]}>
                <Text style={[tw`text-2xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c_50 }]}>&#xe932;</Text>
                <Text style={[tw`text-2xl font-bold absolute`, { fontFamily: 'Wine-Vision', color: colors.c }]}>&#xe933;</Text>
              </View>
            </View>
          </View>
          
          {/* Static Pages centered */}
          <View style={tw`flex-row flex-wrap justify-center mb-6 gap-2 px-6`}>
            {['About','Contact','FAQ','Privacy','Terms','Support']
              .map(page => (
                <TouchableOpacity key={page} style={tw`px-1 py-1`} onPress={() => handleNavigation(page)}>
                  <Text style={[tw`font-medium text-xs`, { color: colors.c_50 }]}>{page}</Text>
                </TouchableOpacity>
              ))}
          </View>
          
          {/* Sign Out */}
          <View style={tw`items-center px-6 pb-6`}>
            <TouchableOpacity 
              style={[tw`rounded-full px-4 py-2 border`, { backgroundColor: colors.c, borderColor: colors.c_80 }]} 
              onPress={handleLogout}
            >
              <Text style={[tw`text-center font-bold`, { color: colors.c_80 }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <MessageArea />
    </View>
  );
});

export default CustomHeader;
