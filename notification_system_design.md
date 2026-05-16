# Notification System Design
- Next.js
- React
- TypeScript

Features implemented:
- Responsive dashboard
- Priority notification section
- Notification filtering
- Viewed and unviewed notification tracking
- Pagination support
- API integration
- Logging middleware integration

---

# Viewed and Unviewed Notifications

Viewed notifications are tracked using local storage.

When a notification card is opened:
- The notification is marked as viewed.
- The NEW badge disappears.

This helps users identify newly received notifications easily.

---

# API Handling

Notifications are fetched using API routes.

The frontend communicates with the provided API using secure authorization headers.

Access tokens are stored using environment variables.

---

# Responsive Design

The dashboard was designed to support:
- Desktop devices
- Mobile devices

Separate screenshots for both views have been included in the repository.

---

# Logging Middleware

A reusable logging middleware package was developed separately as required.

The middleware captures:
- Errors
- API events
- Important frontend actions

This improves debugging and monitoring.