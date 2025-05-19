export const userMessage = {
  SIGNUP_SUCCESS: "User signed up successfully",
  LOGIN_SUCCESS: "User logged in successfully",
  FETCH_SUCCESS: "User fetched successfully",
  UPDATE_SUCCESS: "User updated successfully",
  DELETE_SUCCESS: "User deleted successfully",
  NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "You are not authorized to perform this action",
  EMAIL_ALREADY_EXISTS: "Email is already registered",
  PROFILE_FETCH_SUCCESS: "User profile fetched successfully",
  PROFILE_UPDATE_SUCCESS: "User profile updated successfully",
  PROFILE_AVATAR_UPDATE_FAILED: "Failed to update profile avatar",
};

export const customerMessage = {
  FETCH_SUCCESS: "Customer fetched successfully",
  UPDATE_SUCCESS: "Customer updated successfully",
  DELETE_SUCCESS: "Customer deleted successfully",
  NOT_FOUND: "Customer not found",
  CREATE_SUCCESS: "Customer created successfully",
};

export const menuItemMessage = {
  FETCH_SUCCESS: "Menu item fetched successfully",
  UPDATE_SUCCESS: "Menu item updated successfully",
  DELETE_SUCCESS: "Menu item deleted successfully",
  NOT_FOUND: "Menu item not found",
  CREATE_SUCCESS: "Menu item created successfully",
};

export const categoryMessage = {
  FETCH_SUCCESS: "Category fetched successfully",
  UPDATE_SUCCESS: "Category updated successfully",
  DELETE_SUCCESS: "Category deleted successfully",
  NOT_FOUND: "Category not found",
  CREATE_SUCCESS: "Category created successfully",
};

export const orderMessage = {
  FETCH_SUCCESS: "Order fetched successfully",
  UPDATE_SUCCESS: "Order updated successfully",
  DELETE_SUCCESS: "Order deleted successfully",
  NOT_FOUND: "Order not found",
  CREATE_SUCCESS: "Order created successfully",
};

export const paymentMessage = {
  PAYMENT_SUCCESS: "Payment done successfully",
  PAYMENT_FAILED: "Payment failed",
};

export const orderItemMessage = {
  FETCH_SUCCESS: "Order item fetched successfully",
  UPDATE_SUCCESS: "Order item updated successfully",
  DELETE_SUCCESS: "Order item deleted successfully",
  NOT_FOUND: "Order item not found",
  CREATE_SUCCESS: "Order item created successfully",
};

export const errorMessage = {
  Auth: {
    INVALID_CREDENTIALS: "Invalid email or password",
    UNAUTHORIZED: "You are not authorized to access this resource",
    TOKEN_EXPIRED: "Authentication token has expired",
    TOKEN_INVALID: "Invalid authentication token",
    FORBIDDEN: "Access forbidden for this role",
  },
  User: {
    NOT_FOUND: "User not found",
    EMAIL_EXISTS: "Email is already in use",
    VALIDATION_FAILED: "User data validation failed",
    PROFILE_UPDATE_FAILED: "Failed to update user profile",
    INPUT_NOT_FOUND: "No image file uploaded",
  },
  MenuItem: {
    NOT_FOUND: "Post not found",
    CREATE_FAILED: "Failed to create menu item",
    UPDATE_FAILED: "Failed to update menu item",
    DELETE_FAILED: "Failed to delete menu item",
    UNAUTHORIZED: "You are not authorized to modify this menu item",
  },
  Customer: {
    NOT_FOUND: "Post not found",
    CREATE_FAILED: "Failed to create Customer",
    UPDATE_FAILED: "Failed to update Customer",
    DELETE_FAILED: "Failed to delete Customer",
    UNAUTHORIZED: "You are not authorized to modify this Customer",
  },
  Order: {
    NOT_FOUND: "Post not found",
    CREATE_FAILED: "Failed to create Order",
    UPDATE_FAILED: "Failed to update Order",
    DELETE_FAILED: "Failed to delete Order",
    UNAUTHORIZED: "You are not authorized to modify this Order",
  },
  OrderItem: {
    NOT_FOUND: "Post not found",
    CREATE_FAILED: "Failed to create Order Item",
    UPDATE_FAILED: "Failed to update Order Item",
    DELETE_FAILED: "Failed to delete Order Item",
    UNAUTHORIZED: "You are not authorized to modify this Order Item",
  },
  Category: {
    NOT_FOUND: "Category not found",
    CREATE_FAILED: "Failed to create category",
    UPDATE_FAILED: "Failed to update category",
    DELETE_FAILED: "Failed to delete category",
  },
  Tag: {
    NOT_FOUND: "Tag not found",
    CREATE_FAILED: "Failed to create tag",
    DELETE_FAILED: "Failed to delete tag",
  },
  Media: {
    UPLOAD_FAILED: "Failed to upload media",
    INVALID_TYPE: "Unsupported media file type",
    FILE_TOO_LARGE: "Media file size exceeds the allowed limit",
    NOT_FOUND: "Media not found",
  },
  General: {
    UNKNOWN_ERROR: "Something went wrong. Please try again later",
    BAD_REQUEST: "Bad request",
    NOT_FOUND: "Resource not found",
    VALIDATION_FAILED: "Validation failed",
    DATABASE_ERROR: "A database error occurred",
    UNAUTHORIZED: "Access denied. Admins only",
  },
};
