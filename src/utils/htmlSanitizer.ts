// HTML sanitization utilities for message content

// Basic HTML sanitization - removes dangerous tags while keeping safe formatting
export const sanitizeHTML = (html: string): string => {
  if (!html) return '';

  // Remove script tags and their content
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove style tags and their content
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove dangerous attributes
  html = html.replace(/\s*(on\w+|javascript:|data:)\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove form elements
  html = html.replace(/<(form|input|textarea|select|button)[^>]*>/gi, '');
  html = html.replace(/<\/(form|input|textarea|select|button)>/gi, '');
  
  // Remove iframe, object, embed
  html = html.replace(/<(iframe|object|embed|applet)[^>]*>/gi, '');
  html = html.replace(/<\/(iframe|object|embed|applet)>/gi, '');
  
  return html.trim();
};

// Convert HTML entities to readable text
export const decodeHTMLEntities = (text: string): string => {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
  };
  
  return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    return entities[entity] || entity;
  });
};

// Strip all HTML tags for fallback display
export const stripAllHTML = (html: string): string => {
  if (!html) return '';
  
  // Remove all HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  text = decodeHTMLEntities(text);
  
  // Clean up extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
};

// Check if string contains HTML tags
export const containsHTML = (text: string): boolean => {
  if (!text) return false;
  const htmlRegex = /<[^>]*>/g;
  return htmlRegex.test(text);
};

// Safe HTML processing for messages
export const processMessageHTML = (html: string): string => {
  if (!html) return '';
  
  // First sanitize to remove dangerous content
  let processed = sanitizeHTML(html);
  
  // Ensure proper paragraph spacing
  processed = processed.replace(/<\/p>\s*<p>/gi, '</p><p>');
  
  // Convert line breaks to proper HTML
  processed = processed.replace(/\n/g, '<br>');
  
  return processed;
};

// Common HTML patterns that servers might send
export const HTML_MESSAGE_PATTERNS = {
  // WordPress style error messages
  WP_ERROR: /<strong>ERROR<\/strong>:\s*(.*?)(?:<br\s*\/?>|$)/i,
  WP_SUCCESS: /<strong>SUCCESS<\/strong>:\s*(.*?)(?:<br\s*\/?>|$)/i,
  
  // Generic patterns
  ERROR_WITH_CODE: /<p.*?>\s*Error\s*(\d+):\s*(.*?)\s*<\/p>/i,
  WARNING_MESSAGE: /<div[^>]*class[^>]*warning[^>]*>(.*?)<\/div>/i,
  SUCCESS_MESSAGE: /<div[^>]*class[^>]*success[^>]*>(.*?)<\/div>/i,
  
  // Extract plain text from common wrapper patterns
  P_TAG_CONTENT: /<p[^>]*>(.*?)<\/p>/i,
  DIV_TAG_CONTENT: /<div[^>]*>(.*?)<\/div>/i,
  SPAN_TAG_CONTENT: /<span[^>]*>(.*?)<\/span>/i,
};

// Extract clean message from common HTML patterns
export const extractCleanMessage = (html: string): string => {
  if (!containsHTML(html)) return html;
  
  // Try to extract from common patterns
  for (const [key, pattern] of Object.entries(HTML_MESSAGE_PATTERNS)) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return stripAllHTML(match[1]);
    }
  }
  
  // Fallback to stripping all HTML
  return stripAllHTML(html);
};

// Enhanced version that handles more complex HTML structures for React Native
export const parseHTMLContent = (html: string): string => {
  if (!html) return '';

  // Remove dangerous tags and attributes
  let cleaned = sanitizeHTML(html);

  // Convert HTML entities
  cleaned = decodeHTMLEntities(cleaned);

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
