# 📵 NewsHub – Personalized News App with Caching & Authentication

NewsHub is a secure, efficient, and user-friendly news aggregation app that delivers personalized news to users based on their preferences. It features a full authentication system, preference management, external API integration, and performance optimization using caching.

Caching has been smartly used to speed up the application by storing previously fetched news articles. Instead of calling the external News API repeatedly, cached results are served for repeated requests—significantly reducing latency and API costs.

---

## 🔧 Features

### 1. User Registration
- Endpoint: `POST /users/register`
- Hashes user passwords using bcrypt before storing them.
- Validates email and password length.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

---

### 2. User Login
- Endpoint: `POST /users/login`
- Uses bcrypt to verify passwords.
- Returns a JWT token on successful login.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### 3. Authentication Middleware
- Protects routes using JWT tokens.
- Returns 401 for unauthorized access.

---

### 4. External News API Integration
- Endpoint: `GET /news`
- Fetches news from NewsAPI based on user preferences (category, language, etc.).
- Uses `axios` for API calls.
- Uses caching to reduce repeat API calls for the same query.

**Response:**
```json
{
  "articles": [
    {
      "title": "Breaking News!",
      "description": "Here's what's happening...",
      "url": "https://news.example.com/article1"
    }
  ]
}
```

---

### 5. User Preferences
- Endpoint: `GET /users/preferences`
  - Fetches stored preferences for the logged-in user.

- Endpoint: `PUT /users/preferences`
  - Updates preferences for the logged-in user.

**Request (PUT /preferences):**
```json
{
    "preferences": ["movies", "comics"]
}
```

**Response:**
```json
{
  "message": "Preferences updated successfully"
}
```

---

### 6. Caching Mechanism (optional but implemented ✅)
- Caches API responses based on user preferences.
- Caches the articles marked as read or favourite by the user.
- Reduces external API load and improves response time.

---

### 7. Article Status: Read & Favorite (optional but implemented ✅)

#### Mark Article as Read
- Endpoint: `POST /news/:id/read`

#### Mark Article as Favorite
- Endpoint: `POST /news/:id/favorite`

#### Retrieve Read Articles
- Endpoint: `GET /news/read`

#### Retrieve Favorite Articles
- Endpoint: `GET /news/favorites`

---

## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **JWT** for authentication
- **bcrypt** for password hashing
- **axios** for external API integration
- **node-cache** 

---

## ✅ Validation & Error Handling

- Validates:
  - Email format
  - Password length
  - News preference fields
- Handles:
  - Missing fields
  - Invalid credentials
  - Unauthorized access
  - API call failures

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/newshub.git
cd newshub
npm install
npm start
```

Create a `.env` file with:
```
JWT_SECRET=your_secret_key
NEWS_API_KEY=your_newsapi_key
```

---

## 📬 API Summary

| Endpoint                    | Method | Description                             | Auth Required |
|----------------------------|--------|-----------------------------------------|---------------|
| /users/register            | POST   | Register a new user                     | ❌            |
| /users/login               | POST   | Authenticate user and return JWT token  | ❌            |
| /users/preferences         | GET    | Get user preferences                    | ✅            |
| /users/preferences         | PUT    | Update user preferences                 | ✅            |
| /news                      | GET    | Fetch personalized news articles        | ✅            |
| /news/:id/read             | POST   | Mark article as read                    | ✅            |
| /news/:id/favorite         | POST   | Mark article as favorite                | ✅            |
| /news/read                 | GET    | Get all read articles                   | ✅            |
| /news/favorites            | GET    | Get all favorite articles               | ✅            |

---

## 🧐 Future Improvements

- Use Redis for distributed caching
- Add pagination for news responses
- Support multi-user roles and admin dashboard

---

## 📄 License

This project is licensed under the MIT License.

