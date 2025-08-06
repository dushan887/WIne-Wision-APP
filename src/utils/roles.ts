// User role constants from WordPress
export const USER_ROLES = {
  VISITOR: 'visitor',
  EXHIBITOR: 'exhibitor',
  ORGANIZER: 'organizer',
  ADMIN: 'administrator',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Role check functions
export const isVisitor = (role: string): boolean => {
  return role === USER_ROLES.VISITOR;
};

export const isExhibitor = (role: string): boolean => {
  return role === USER_ROLES.EXHIBITOR;
};

export const isOrganizer = (role: string): boolean => {
  return role === USER_ROLES.ORGANIZER;
};

export const isAdmin = (role: string): boolean => {
  return role === USER_ROLES.ADMIN;
};

// Check if user has elevated privileges
export const hasElevatedAccess = (role: string): boolean => {
  return isOrganizer(role) || isAdmin(role);
};

// Check if user can manage exhibitors
export const canManageExhibitors = (role: string): boolean => {
  return isOrganizer(role) || isAdmin(role);
};

// Check if user can access exhibitor features
export const canAccessExhibitorFeatures = (role: string): boolean => {
  return isExhibitor(role) || hasElevatedAccess(role);
};

// Get user role display name
export const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case USER_ROLES.VISITOR:
      return 'Visitor';
    case USER_ROLES.EXHIBITOR:
      return 'Exhibitor';
    case USER_ROLES.ORGANIZER:
      return 'Organizer';
    case USER_ROLES.ADMIN:
      return 'Administrator';
    default:
      return 'Unknown';
  }
};

// Get available roles for registration
export const getAvailableRoles = (): Array<{ value: string; label: string }> => {
  return [
    { value: USER_ROLES.VISITOR, label: 'Visitor' },
    { value: USER_ROLES.EXHIBITOR, label: 'Exhibitor' },
    // Note: Organizer and Admin roles are typically assigned by administrators
  ];
};
