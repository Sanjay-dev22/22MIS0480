# Campus Notifications Dashboard

A responsive campus notifications dashboard built using Next.js and TypeScript.

The application fetches live notification data from the provided API and displays important campus updates in a clean and easy-to-use dashboard.

---

# Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

---

# Features

## Priority Notifications
Displays the top important notifications based on:
- Notification type
- Latest timestamp

Priority order used:
1. Placement
2. Result
3. Event

---

## Notification Filtering

Users can filter notifications by:
- All
- Placement
- Result
- Event

---

## Viewed and Unviewed Notifications

- Newly opened notifications are marked as viewed.
- Unviewed notifications display a NEW badge.

---

## Responsive UI

The application supports:
- Desktop screens
- Mobile screens

---

# Project Structure

notification_app_fe/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   └── page.tsx
│   │
│   ├── services/
│   │
│   └── utils/
│
├── public/
├── screenshots/
├── .env.local
├── package.json
└── README.md

---

# Environment Variables

Create a `.env.local` file inside `notification_app_fe`.

```env
ACCESS_TOKEN=your_access_token_here
````

---

# Installation Steps

## Clone Repository

```bash
git clone <repository-url>
```

## Navigate to frontend folder

```bash
cd notification_app_fe
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:3000
```

---

# Screenshots

## Desktop View

![Desktop View](./screenshots/desktop-view.png.jpg)

![Desktop View 2](./screenshots/desktop-view2.png.jpg)

---

## Mobile View

![Mobile View](./screenshots/mobile-view.png.jpg)

![Mobile View 2](./screenshots/mobile-view2.png.jpg)

---

# Deployment

Vercel Deployment Link:

```text
22mis0480.vercel.app
```

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

# Notes

* Notifications are fetched from the provided API.
* Notifications are rendered dynamically.
* Logging middleware has been integrated throughout the project.
* TypeScript was used for better maintainability and type safety.

