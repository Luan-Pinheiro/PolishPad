# PolishPad - Simple AI Language Corrector

## Project Description

PolishPad is a simple web app where users can paste text in any language and get AI corrections and improvements. Perfect for language learners who want quick feedback on their writing.

### Core Features (MVP)
- Submit text and get AI corrections
- Basic user accounts (register/login)
- View correction history
- Simple settings (correction style)

### Tech Stack
- **Frontend**: Vite + Preact + CSS
- **Backend**: Spring Boot (Java 21) + H2 Database
- **AI**: Ollama + Gemma 3 (12B)
- **Deployment**: Docker Compose

---

## Phase 1: Core MVP (Essential Features)

### Frontend - Basic UI
- [ ] Simple text input/output page
- [ ] Basic login/register forms
- [ ] Settings page (correction tone: formal/casual)
- [ ] Correction history list
- [ ] Simple responsive CSS

### Backend - Core API
- [ ] User registration/login (JWT)
- [ ] Text correction endpoint
- [ ] Save corrections to database
- [ ] Get user's correction history
- [ ] Basic user settings

### Database Schema (H2)
- [ ] Users table (id, email, password, settings)
- [ ] Corrections table (id, user_id, original_text, corrected_text, created_at)

### AI Integration
- [ ] Connect to Ollama
- [ ] Basic correction prompt
- [ ] Handle AI responses

### Docker Setup
- [ ] Frontend Dockerfile
- [ ] Backend Dockerfile  
- [ ] Ollama container
- [ ] docker-compose.yml

---

## Phase 2: Polish & Improvements (If time allows)

### Nice-to-have Features
- [ ] Dark mode toggle
- [ ] Copy corrected text button
- [ ] Basic mistake statistics (most common errors)
- [ ] Language selection dropdown
- [ ] Better error handling and loading states

### Minor Improvements
- [ ] Better CSS styling
- [ ] Toast notifications for success/errors
- [ ] Pagination for correction history
- [ ] Export corrections as text file

---

## API Endpoints (Simple)

```
POST /api/auth/register    - Create account
POST /api/auth/login       - Login
POST /api/corrections      - Submit text for correction
GET  /api/corrections      - Get user's history
GET  /api/users/settings   - Get user settings
PUT  /api/users/settings   - Update settings
```