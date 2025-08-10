/**
 * Input sanitization utilities for security
 * Prevents XSS, injection attacks, and validates input formats
 */

// Email validation with sanitization
export const sanitizeEmail = (email: string): string => {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w\s@.-]/gi, ''); // Remove potentially harmful characters
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = sanitizeEmail(email);
  return emailRegex.test(sanitized) && sanitized.length <= 254; // RFC 5321 limit
};

// Phone number sanitization
export const sanitizePhoneNumber = (phone: string): string => {
  return phone.replace(/[^\d+\-\s()]/g, '').trim();
};

export const validatePhoneNumber = (phone: string): boolean => {
  const sanitized = sanitizePhoneNumber(phone);
  const phoneRegex = /^[\+]?[\d\s\-()]{10,15}$/;
  return phoneRegex.test(sanitized);
};

// Name sanitization (for first name, last name, company name)
export const sanitizeName = (name: string): string => {
  return name
    .trim()
    .replace(/[<>\"'/\\]/g, '') // Remove potential XSS characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 100); // Limit length
};

export const validateName = (name: string): boolean => {
  const sanitized = sanitizeName(name);
  return sanitized.length >= 2 && sanitized.length <= 100 && /^[a-zA-Z\s\-'.]+$/.test(sanitized);
};

// URL sanitization
export const sanitizeUrl = (url: string): string => {
  return url.trim().toLowerCase();
};

export const validateUrl = (url: string): boolean => {
  try {
    const sanitized = sanitizeUrl(url);
    const urlObj = new URL(sanitized);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Generic text sanitization for user content
export const sanitizeUserContent = (content: string): string => {
  return content
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // Remove object tags
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '') // Remove embed tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .substring(0, 5000); // Limit content length
};

// Password validation
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Check for common patterns
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password cannot contain more than 2 consecutive identical characters');
  }
  
  if (/123|abc|qwe|password|admin/i.test(password)) {
    errors.push('Password cannot contain common patterns');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// SQL injection prevention for search queries
export const sanitizeSearchQuery = (query: string): string => {
  return query
    .trim()
    .replace(/['";\-\-\/\*]/g, '') // Remove SQL injection characters
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b/gi, '') // Remove SQL keywords
    .substring(0, 200); // Limit query length
};

// File name sanitization
export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '') // Remove invalid file name characters
    .replace(/^\.+/, '') // Remove leading dots
    .substring(0, 255); // Limit length
};

export const validateFileType = (fileName: string, allowedTypes: string[]): boolean => {
  const sanitized = sanitizeFileName(fileName);
  const extension = sanitized.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

// Rate limiting helper
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(identifier) || [];
    
    // Remove requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true; // Request allowed
  };
};

// Input validation schemas
export const ValidationSchemas = {
  registration: {
    email: validateEmail,
    password: validatePassword,
    firstName: (name: string) => validateName(name),
    lastName: (name: string) => validateName(name),
    phoneNumber: validatePhoneNumber,
    companyName: (name: string) => name.length <= 200 && sanitizeName(name).length >= 2,
    website: validateUrl,
  },
  
  profile: {
    bio: (bio: string) => bio.length <= 500 && sanitizeUserContent(bio).length >= 0,
    interests: (interests: string[]) => interests.every(interest => 
      interest.length <= 50 && sanitizeName(interest).length >= 2
    ),
    socialLinks: (links: string[]) => links.every(validateUrl),
  },
  
  content: {
    title: (title: string) => title.length <= 200 && sanitizeName(title).length >= 5,
    description: (desc: string) => desc.length <= 2000 && sanitizeUserContent(desc).length >= 10,
    tags: (tags: string[]) => tags.length <= 10 && tags.every(tag => 
      tag.length <= 30 && /^[a-zA-Z0-9\-_]+$/.test(tag)
    ),
  }
};

// Comprehensive input sanitizer
export const sanitizeFormData = <T extends Record<string, any>>(
  data: T,
  schema: Record<keyof T, (value: any) => any>
): T => {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(data)) {
    const sanitizer = schema[key as keyof T];
    if (sanitizer && typeof sanitizer === 'function') {
      sanitized[key as keyof T] = sanitizer(value);
    } else {
      // Default sanitization for strings
      if (typeof value === 'string') {
        sanitized[key as keyof T] = sanitizeUserContent(value) as T[keyof T];
      } else {
        sanitized[key as keyof T] = value;
      }
    }
  }
  
  return sanitized;
};
