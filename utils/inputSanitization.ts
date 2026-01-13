// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  if (!input) return '';

  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const sanitizeEmail = (email: string): string => {
  if (!email) return '';

  // Basic email sanitization
  return email
    .toLowerCase()
    .replace(/[^\w@.-]/g, '') // Only allow word chars, @, ., -
    .trim();
};

export const sanitizePhone = (phone: string): string => {
  if (!phone) return '';

  // Remove all non-digit characters except + and -
  return phone.replace(/[^\d+\-\s()]/g, '').trim();
};

export const sanitizeFormData = (data: Record<string, unknown>): Record<string, unknown> => {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      if (key === 'email') {
        sanitized[key] = sanitizeEmail(value);
      } else if (key === 'phone') {
        sanitized[key] = sanitizePhone(value);
      } else {
        sanitized[key] = sanitizeInput(value);
      }
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};
