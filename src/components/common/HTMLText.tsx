import React from 'react';
import { Text, View } from 'react-native';

// Simple HTML-like text renderer for React Native
// Handles basic formatting without external dependencies

interface HTMLTextProps {
  html: string;
  style?: any;
  textStyle?: any;
}

export const HTMLText: React.FC<HTMLTextProps> = ({ html, style, textStyle }) => {
  // Convert HTML to React Native text components
  const parseHTML = (htmlString: string) => {
    if (!htmlString) return null;

    // Simple HTML entity decoder
    const decodeEntities = (str: string) => {
      return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
    };

    // If no HTML tags, return simple text
    if (!/<[^>]*>/.test(htmlString)) {
      return <Text style={textStyle}>{decodeEntities(htmlString)}</Text>;
    }

    // Split by HTML tags and process
    const parts = htmlString.split(/(<[^>]*>)/);
    const elements: React.ReactNode[] = [];
    let currentStyles: any = { ...textStyle };
    const styleStack: any[] = [];

    parts.forEach((part, index) => {
      if (part.startsWith('<') && part.endsWith('>')) {
        // HTML tag
        const tagMatch = part.match(/<\/?(\w+)[^>]*>/);
        if (tagMatch) {
          const tagName = tagMatch[1].toLowerCase();
          const isClosing = part.startsWith('</');

          if (isClosing) {
            // Restore previous style
            if (styleStack.length > 0) {
              currentStyles = styleStack.pop();
            }
          } else {
            // Apply new style
            styleStack.push({ ...currentStyles });
            switch (tagName) {
              case 'strong':
              case 'b':
                currentStyles = { ...currentStyles, fontWeight: 'bold' };
                break;
              case 'em':
              case 'i':
                currentStyles = { ...currentStyles, fontStyle: 'italic' };
                break;
              case 'u':
                currentStyles = { ...currentStyles, textDecorationLine: 'underline' };
                break;
            }
          }
        }
      } else if (part.trim()) {
        // Text content
        const cleanText = decodeEntities(part);
        if (cleanText.trim()) {
          elements.push(
            <Text key={index} style={currentStyles}>
              {cleanText}
            </Text>
          );
        }
      }
    });

    return elements.length > 0 ? elements : <Text style={textStyle}>{decodeEntities(htmlString)}</Text>;
  };

  return (
    <Text style={textStyle}>
      {parseHTML(html)}
    </Text>
  );
};

// Enhanced version that handles more complex HTML structures
export const parseHTMLContent = (html: string): string => {
  if (!html) return '';

  // Remove dangerous tags and attributes
  let cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/\s*(on\w+|javascript:|data:)\s*=\s*["'][^"']*["']/gi, '')
    .replace(/<(iframe|object|embed|applet)[^>]*>/gi, '')
    .replace(/<\/(iframe|object|embed|applet)>/gi, '');

  // Convert HTML entities
  cleaned = cleaned
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Handle line breaks and paragraphs
  cleaned = cleaned
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n');

  // Remove remaining HTML tags but preserve content
  cleaned = cleaned.replace(/<[^>]*>/g, '');

  // Clean up extra whitespace
  cleaned = cleaned.replace(/\n\s*\n/g, '\n\n').trim();

  return cleaned;
};

export default HTMLText;
