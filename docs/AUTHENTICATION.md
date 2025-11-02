# Authentication System

This document describes the authentication system implemented in Loomic.

## Overview

The authentication system provides:
- User login and registration
- Password reset functionality
- JWT-based authentication
- Protected routes
- Persistent sessions using localStorage

## Architecture

### Components

1. **Auth Context** (`src/contexts/auth-context.tsx`)
   - Manages global authentication state
   - Provides `user`, `login`, `signup`, `logout`, and `isAuthenticated`
   - Automatically checks for existing sessions on mount

2. **API Module** (`src/lib/api.ts`)
   - Handles all API requests
   - Manages JWT tokens in localStorage
   - Provides error handling and response formatting

3. **Auth Pages**
   - `/login` - User login page
   - `/signup` - User registration page
   - `/forgot-password` - Password reset request page

### Flow

#### Login Flow
```
1. User enters email and password
2. Form validation (client-side)
3. API call to /auth/login
4. On success:
   - JWT token stored in localStorage
   - User data stored in context state
   - Redirect to home page
5. On error:
   - Display error message
   - User can retry
```

#### Signup Flow
```
1. User enters name, email, and password
2. Form validation (client-side)
   - Email format validation
   - Password length check (min 8 chars)
   - Password confirmation match
3. API call to /auth/signup
4. On success:
   - JWT token stored in localStorage
   - User data stored in context state
   - Redirect to home page
5. On error:
   - Display error message
   - User can retry
```

#### Session Management
```
1. On app load:
   - Check if JWT token exists in localStorage
   - If exists, call /auth/me to get current user
   - If valid, restore user session
   - If invalid, remove token and show login
2. On logout:
   - Remove token from localStorage
   - Clear user data from context
   - Redirect to login page
```

## Usage

### Using Auth Context in Components

```typescript
import { useAuth } from "@/contexts/auth-context";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Routes

To create protected routes, check authentication status:

```typescript
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <div>Protected content</div>;
}
```

## API Endpoints

The authentication system expects the following backend endpoints:

### POST `/api/auth/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "avatar": "https://..."
    }
  }
}
```

### POST `/api/auth/signup`
**Request:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "avatar": "https://..."
    }
  }
}
```

### GET `/api/auth/me`
**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "avatar": "https://..."
  }
}
```

### POST `/api/auth/logout`
**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true
}
```

## Environment Variables

Set the backend API URL in your environment:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

If not set, it defaults to `http://localhost:3001/api`.

## Security Considerations

1. **JWT Storage**: Tokens are stored in localStorage. Consider using httpOnly cookies for production.
2. **HTTPS**: Always use HTTPS in production to prevent token interception.
3. **Token Expiration**: Implement token refresh logic for long-lived sessions.
4. **CSRF Protection**: Add CSRF tokens if using cookie-based authentication.
5. **Rate Limiting**: Implement rate limiting on the backend to prevent brute force attacks.

## UI/UX Features

- **Loading States**: All forms show loading indicators during API calls
- **Error Handling**: User-friendly error messages displayed inline
- **Form Validation**: Client-side validation before API calls
- **Password Visibility Toggle**: Users can toggle password visibility
- **Social Login**: UI for Google and GitHub OAuth (implementation pending)
- **Responsive Design**: Works seamlessly on all screen sizes
- **Theme Support**: Full support for light/dark mode and custom themes

## Future Enhancements

- [ ] Implement social login (Google, GitHub)
- [ ] Add email verification flow
- [ ] Implement password reset functionality
- [ ] Add two-factor authentication (2FA)
- [ ] Create middleware for route protection
- [ ] Add "Remember Me" option
- [ ] Implement session timeout warnings
- [ ] Add user profile management

