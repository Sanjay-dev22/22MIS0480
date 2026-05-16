# Campus Notifications Dashboard

A responsive notification dashboard built using Next.js and Tailwind CSS for the Affordmed Campus Evaluation.

---

# Features

* View all campus notifications
* Priority notifications section
* Filter notifications by type
* Viewed and unviewed notification tracking
* Pagination support
* Responsive UI for desktop and mobile
* API integration using authorization token
* Error handling and loading states
* Logging middleware integration

---

# Tech Stack

Frontend:

* Next.js
* React
* TypeScript
* Tailwind CSS

Utilities:

* Axios
* Local Storage

---

# Project Structure

```bash
notification_app_fe/
├── src/
│   ├── app/
│   │   ├── api/
│   │   └── page.tsx
│   ├── services/
│   └── utils/
│
├── public/
├── .env.local
└── package.json
```

---

# Environment Variables

Create a `.env.local` file inside `notification_app_fe`.

```env
ACCESS_TOKEN=your_access_token_here 
```

---

# Installation Steps

## 1. Clone Repository

```bash
git clone https://github.com/Sanjay-dev22/22MIS0480.git
```

## 2. Move Into Frontend Folder

```bash
cd notification_app_fe
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:3000
```

---

# Notification Features

## Priority Notifications

Top important notifications are displayed separately using priority sorting logic.

## Viewed Notifications

When a notification card is clicked:

* NEW badge disappears
* viewed state is stored using localStorage

## Filtering

Users can filter notifications by:

* All
* Placement
* Result
* Event

## Pagination

Notifications are displayed page-wise for better readability.

---

# Logging Middleware

A reusable logging middleware was created separately for:

* API logging
* error logging
* request tracking

---

# Backend Folder Note

The frontend track mainly focuses on API integration using the provided APIs. No separate database backend implementation was required for this evaluation.

---

# Future Improvements

* Search functionality
* Better animations
* Dark mode
* Notification bookmarking
* Real-time notification updates

---

