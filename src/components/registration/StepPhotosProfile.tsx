import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import { getProfileTheme } from '../../utils/profileTheming';
import { StepHeader } from '../common';
const { theme: { extend: { colors } } } = require('../../../tailwind.config.js');

interface StepPhotosProfileProps {
  savedData?: any;
  onUpdateData?: (data: any) => void;
  onNext?: (bypassValidation?: boolean) => void;
  headerTitle?: string;
  headerSubtitle?: string;
}

// Step component for 'photos-profile' (Profile Avatar Upload)
const StepPhotosProfile: React.FC<StepPhotosProfileProps> = ({ 
  savedData, 
  onUpdateData, 
  onNext, 
  headerTitle, 
  headerSubtitle 
}) => {
  const [selectedImage, setSelectedImage] = useState(savedData?.wv_user_avatar || null);
  const [uploading, setUploading] = useState(false);
  
  // Get the current profile theme - memoized to prevent unnecessary recalculations
  const profileTheme = useMemo(() => {
    return getProfileTheme(savedData?.wv_profileSelection || null);
  }, [savedData?.wv_profileSelection]);

  const requestPermissions = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to upload your profile picture.'
      );
      return false;
    }
    return true;
  }, []);

  const pickImage = useCallback(async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio for profile avatar
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        
        // Check file size (10MB limit - we'll resize to 200px/400px later)
        if (asset.fileSize && asset.fileSize > 10 * 1024 * 1024) {
          Alert.alert(
            'File Too Large',
            'Please select an image smaller than 10MB.'
          );
          return;
        }

        const imageData = `data:image/jpeg;base64,${asset.base64}`;
        setSelectedImage(imageData);
        onUpdateData?.({ wv_user_avatar: imageData });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  }, [requestPermissions, onUpdateData]);

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    onUpdateData?.({ wv_user_avatar: null });
  }, [onUpdateData]);

  return (
    <View style={tw`px-6 pb-2 flex-1`}>  
      {/* Header */}
      <StepHeader title={headerTitle || ''} subtitle={headerSubtitle || ''} />
      
      {/* Upload Area */}
      <View style={tw`flex-1 justify-center`}>
        {selectedImage ? (
          // Show selected image with options
          <View style={tw`items-center`}>
            <View style={[
              tw`w-48 h-48 rounded-full overflow-hidden border-2 mb-6`,
              { borderColor: profileTheme.selectionColors.primary }
            ]}>
              <Image 
                source={{ uri: selectedImage }} 
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            </View>
            
            {/* Action Buttons */}
            <View style={tw`flex-row gap-4`}>
              <TouchableOpacity
                style={[
                  tw`px-6 py-3 rounded-full`,
                  { backgroundColor: profileTheme.selectionColors.primary }
                ]}
                onPress={pickImage}
              >
                <Text style={[
                  tw`text-center font-semibold`,
                  { color: colors.w }
                ]}>
                  Change Photo
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  tw`px-6 py-3 rounded-full`,
                  { backgroundColor: colors.r }
                ]}
                onPress={removeImage}
              >
                <Text style={[
                  tw`text-center font-semibold`,
                  { color: colors.w }
                ]}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Show upload prompt
          <TouchableOpacity
            style={[
              tw`border-2 border-dashed rounded-lg p-8 items-center justify-center min-h-64`,
              { 
                borderColor: profileTheme.selectionColors.primary,
                backgroundColor: 'rgba(255,255,255,0.5)'
              }
            ]}
            onPress={pickImage}
          >
            <Text style={[
              tw`text-lg font-semibold mb-2 text-center`,
              { color: profileTheme.selectionColors.primary }
            ]}>
              Upload Profile Picture
            </Text>
            
            <Text style={[
              tw`text-sm text-center mb-4`,
              { color: colors.c }
            ]}>
              Drag and drop to upload image or
            </Text>
            
            <TouchableOpacity
              style={[
                tw`px-6 py-3 rounded-full`,
                { backgroundColor: profileTheme.selectionColors.primary }
              ]}
              onPress={pickImage}
            >
              <Text style={[
                tw`text-center font-semibold`,
                { color: colors.w }
              ]}>
                Upload image
              </Text>
            </TouchableOpacity>
            
            <Text style={[
              tw`text-xs text-center mt-4`,
              { color: colors.c }
            ]}>
              Supported files: .jpg .png | Maximum upload file size: 10mb
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default React.memo(StepPhotosProfile);
