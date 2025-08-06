import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import tw from 'twrnc';

interface InteractiveHallProps {
  width?: number;
  height?: number;
  onBoothPress?: (boothId: string) => void;
}

export const InteractiveHall: React.FC<InteractiveHallProps> = ({
  width = 300,
  height = 200,
  onBoothPress,
}) => {
  const handleBoothPress = (boothId: string) => {
    onBoothPress?.(boothId);
  };

  return (
    <View style={tw`items-center justify-center`}>
      <Svg width={width} height={height} viewBox="0 0 300 200">
        {/* Hall background */}
        <Rect
          x="0"
          y="0"
          width="300"
          height="200"
          fill="#f8f9fa"
          stroke="#e9ecef"
          strokeWidth="2"
        />
        
        {/* Booth 1 */}
        <TouchableOpacity onPress={() => handleBoothPress('booth-1')}>
          <Rect
            x="20"
            y="20"
            width="60"
            height="40"
            fill="#7c2d12"
            stroke="#451a03"
            strokeWidth="1"
            rx="4"
          />
        </TouchableOpacity>
        
        {/* Booth 2 */}
        <TouchableOpacity onPress={() => handleBoothPress('booth-2')}>
          <Rect
            x="100"
            y="20"
            width="60"
            height="40"
            fill="#7c2d12"
            stroke="#451a03"
            strokeWidth="1"
            rx="4"
          />
        </TouchableOpacity>
        
        {/* Booth 3 */}
        <TouchableOpacity onPress={() => handleBoothPress('booth-3')}>
          <Rect
            x="180"
            y="20"
            width="60"
            height="40"
            fill="#7c2d12"
            stroke="#451a03"
            strokeWidth="1"
            rx="4"
          />
        </TouchableOpacity>
        
        {/* Booth 4 */}
        <TouchableOpacity onPress={() => handleBoothPress('booth-4')}>
          <Rect
            x="20"
            y="140"
            width="60"
            height="40"
            fill="#7c2d12"
            stroke="#451a03"
            strokeWidth="1"
            rx="4"
          />
        </TouchableOpacity>
        
        {/* Booth 5 */}
        <TouchableOpacity onPress={() => handleBoothPress('booth-5')}>
          <Rect
            x="100"
            y="140"
            width="60"
            height="40"
            fill="#7c2d12"
            stroke="#451a03"
            strokeWidth="1"
            rx="4"
          />
        </TouchableOpacity>
        
        {/* Booth 6 */}
        <TouchableOpacity onPress={() => handleBoothPress('booth-6')}>
          <Rect
            x="180"
            y="140"
            width="60"
            height="40"
            fill="#7c2d12"
            stroke="#451a03"
            strokeWidth="1"
            rx="4"
          />
        </TouchableOpacity>
        
        {/* Central area - could be for networking */}
        <Circle
          cx="150"
          cy="100"
          r="30"
          fill="#fef7cd"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        
        {/* Pathways */}
        <Path
          d="M 90 100 L 210 100"
          stroke="#d1d5db"
          strokeWidth="4"
          strokeDasharray="5,5"
        />
        <Path
          d="M 150 70 L 150 130"
          stroke="#d1d5db"
          strokeWidth="4"
          strokeDasharray="5,5"
        />
      </Svg>
    </View>
  );
};
