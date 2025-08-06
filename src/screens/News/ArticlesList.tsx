import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'twrnc';
import { Card } from '../../components/common';

type NewsScreenNavigationProp = StackNavigationProp<any, 'News'>;

interface Props {
  navigation: NewsScreenNavigationProp;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Innovative Wine Technologies at Wine Vision 2025',
    excerpt: 'Discover the latest technological advances transforming the wine industry, from smart vineyard management to AI-powered quality control.',
    image: 'https://via.placeholder.com/300x200',
    author: 'Sarah Johnson',
    date: '2025-01-20',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Sustainable Practices in Modern Winemaking',
    excerpt: 'Learn about eco-friendly approaches that leading wineries are adopting to reduce their environmental impact while maintaining quality.',
    image: 'https://via.placeholder.com/300x200',
    author: 'Michael Chen',
    date: '2025-01-18',
    category: 'Sustainability',
  },
  {
    id: '3',
    title: 'Market Trends: The Rise of Natural Wines',
    excerpt: 'Explore the growing popularity of natural wines and how consumer preferences are shaping the future of wine production.',
    image: 'https://via.placeholder.com/300x200',
    author: 'Elena Rodriguez',
    date: '2025-01-15',
    category: 'Market Trends',
  },
];

export const NewsScreen: React.FC<Props> = ({ navigation }) => {
  const handleArticlePress = (article: Article) => {
    // TODO: Navigate to article detail screen
    console.log('Article pressed:', article.title);
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`px-4 py-6`}>
        <Text style={tw`text-2xl font-bold text-wine-800 mb-6`}>
          Latest News & Articles
        </Text>

        {mockArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            onPress={() => handleArticlePress(article)}
            style={tw`mb-6`}
          >
            <Card variant="elevated">
              <Image
                source={{ uri: article.image }}
                style={tw`w-full h-48 rounded-lg mb-4`}
                resizeMode="cover"
              />
              
              <View style={tw`flex-row items-center mb-2`}>
                <View style={tw`bg-wine-100 px-3 py-1 rounded-full mr-3`}>
                  <Text style={tw`text-wine-700 text-xs font-medium`}>
                    {article.category}
                  </Text>
                </View>
                <Text style={tw`text-gray-500 text-sm`}>
                  {new Date(article.date).toLocaleDateString()}
                </Text>
              </View>

              <Text style={tw`text-xl font-bold text-gray-900 mb-2`}>
                {article.title}
              </Text>

              <Text style={tw`text-gray-700 leading-5 mb-3`}>
                {article.excerpt}
              </Text>

              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-gray-600 text-sm`}>
                  By {article.author}
                </Text>
                <Text style={tw`text-wine-600 font-medium text-sm`}>
                  Read more →
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {/* Load More Button */}
        <View style={tw`mt-4 mb-8`}>
          <TouchableOpacity
            style={tw`bg-wine-600 rounded-lg py-3 px-6 items-center`}
            onPress={() => console.log('Load more articles')}
          >
            <Text style={tw`text-white font-semibold`}>Load More Articles</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
