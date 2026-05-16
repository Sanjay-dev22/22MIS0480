"use client";

import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notifications";
import { getTopNotifications } from "../utils/priority";

export default function Home() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedType, setSelectedType] =
    useState("All");

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();

      setNotifications(data);
      setLoading(false);
    };

    loadNotifications();
  }, []);

  const filteredNotifications =
    selectedType === "All"
      ? notifications
      : notifications.filter(
          (notification) =>
            notification.Type === selectedType
        );

  const topNotifications =
    getTopNotifications(filteredNotifications);

  const getBadgeColor = (type: string) => {
    if (type === "Placement") {
      return "bg-blue-100 text-blue-700";
    }

    if (type === "Result") {
      return "bg-green-100 text-green-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Campus Notifications
          </h1>

          <p className="text-gray-500">
            View important campus updates,
            placements, events, and results.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter Notifications
          </label>

          <select
            value={selectedType}
            onChange={(e) =>
              setSelectedType(e.target.value)
            }
            className="w-full md:w-60 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All</option>

            <option value="Placement">
              Placement
            </option>

            <option value="Result">
              Result
            </option>

            <option value="Event">
              Event
            </option>
          </select>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <p className="text-gray-600">
              Loading notifications...
            </p>
          </div>
        ) : (
          <>
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Priority Notifications
                </h2>

                <span className="text-sm text-gray-500">
                  Top Important Updates
                </span>
              </div>

              <div className="grid gap-5">
                {topNotifications.map(
                  (notification, index) => (
                    <div
                      key={index}
                      className="bg-white border-l-4 border-red-500 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

                        <span
                          className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                            notification.Type
                          )}`}
                        >
                          {notification.Type}
                        </span>

                        <p className="text-sm text-gray-500">
                          {notification.Timestamp}
                        </p>
                      </div>

                      <p className="text-lg font-medium text-gray-800 leading-relaxed">
                        {notification.Message}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                  All Notifications
                </h2>

                <span className="text-sm text-gray-500">
                  {filteredNotifications.length} notifications
                </span>
              </div>

              <div className="grid gap-4">
                {filteredNotifications.map(
                  (notification, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

                        <span
                          className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                            notification.Type
                          )}`}
                        >
                          {notification.Type}
                        </span>

                        <p className="text-sm text-gray-500">
                          {notification.Timestamp}
                        </p>
                      </div>

                      <p className="text-gray-800 text-lg leading-relaxed">
                        {notification.Message}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}