"use client";

import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notifications";
import { getTopNotifications } from "../utils/priority";

export default function Home() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();

      setNotifications(data);
      setLoading(false);
    };

    loadNotifications();
  }, []);

  const topNotifications =
    getTopNotifications(notifications);

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        Campus Notifications
      </h1>

      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Priority Notifications
            </h2>

            <div className="space-y-4">
              {topNotifications.map(
                (notification, index) => (
                  <div
                    key={index}
                    className="border-2 border-red-500 rounded-lg p-4 bg-white"
                  >
                    <p>
                      <strong>Type:</strong>{" "}
                      {notification.Type}
                    </p>

                    <p>
                      <strong>Message:</strong>{" "}
                      {notification.Message}
                    </p>

                    <p>
                      <strong>Timestamp:</strong>{" "}
                      {notification.Timestamp}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              All Notifications
            </h2>

            <div className="space-y-4">
              {notifications.map(
                (notification, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow bg-white"
                  >
                    <p>
                      <strong>Type:</strong>{" "}
                      {notification.Type}
                    </p>

                    <p>
                      <strong>Message:</strong>{" "}
                      {notification.Message}
                    </p>

                    <p>
                      <strong>Timestamp:</strong>{" "}
                      {notification.Timestamp}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}