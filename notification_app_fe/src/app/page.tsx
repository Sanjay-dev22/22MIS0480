"use client";

import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notifications";
import { getTopNotifications } from "../utils/priority";

export default function Home() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedType, setSelectedType] =
    useState("All");

  const [viewedNotifications, setViewedNotifications] =
    useState<string[]>([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const notificationsPerPage = 10;

  useEffect(() => {
    const storedViewedNotifications =
      localStorage.getItem(
        "viewedNotifications"
      );

    if (storedViewedNotifications) {
      setViewedNotifications(
        JSON.parse(storedViewedNotifications)
      );
    }

    const loadNotifications = async () => {
      try {
        const data =
          await fetchNotifications();

        setNotifications(data);
      } catch (err) {
        setError(
          "Unable to load notifications."
        );
      }

      setLoading(false);
    };

    loadNotifications();
  }, []);

  const getNotificationKey = (
    notification: any
  ) => {
    return `${notification.Type}-${notification.Message}-${notification.Timestamp}`;
  };

  const markAsViewed = (
    notification: any
  ) => {
    const notificationKey =
      getNotificationKey(notification);

    if (
      viewedNotifications.includes(
        notificationKey
      )
    ) {
      return;
    }

    const updatedViewedNotifications = [
      ...viewedNotifications,
      notificationKey,
    ];

    setViewedNotifications(
      updatedViewedNotifications
    );

    localStorage.setItem(
      "viewedNotifications",
      JSON.stringify(
        updatedViewedNotifications
      )
    );
  };

  const filteredNotifications =
    selectedType === "All"
      ? notifications
      : notifications.filter(
          (notification) =>
            notification.Type ===
            selectedType
        );

  const topNotifications =
    getTopNotifications(
      filteredNotifications
    );

  const startIndex =
    (currentPage - 1) *
    notificationsPerPage;

  const paginatedNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex +
        notificationsPerPage
    );

  const totalPages = Math.ceil(
    filteredNotifications.length /
      notificationsPerPage
  );

  const getBadgeColor = (
    type: string
  ) => {
    if (type === "Placement") {
      return "bg-blue-100 text-blue-700";
    }

    if (type === "Result") {
      return "bg-green-100 text-green-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  const formatDate = (
    timestamp: string
  ) => {
    return new Date(
      timestamp
    ).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white border rounded-xl shadow-sm p-6 w-full max-w-md">
          <p className="text-red-500 font-medium text-center">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Campus Notifications
          </h1>

          <p className="text-gray-500">
            View important campus updates,
            placements, events, and results.
          </p>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-5 mb-8">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter Notifications
          </label>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(
                e.target.value
              );

              setCurrentPage(1);
            }}
            className="w-full md:w-64 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">
              All
            </option>

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
          <div className="bg-white border rounded-xl shadow-sm p-6">
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
                      className="bg-white border-l-4 border-red-500 rounded-xl shadow-sm hover:shadow-md transition p-5"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

                        <div className="flex items-center gap-2">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                              notification.Type
                            )}`}
                          >
                            {
                              notification.Type
                            }
                          </span>

                          {!viewedNotifications.includes(
                            getNotificationKey(
                              notification
                            )
                          ) && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              NEW
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500">
                          {formatDate(
                            notification.Timestamp
                          )}
                        </p>
                      </div>

                      <p className="text-lg font-medium text-gray-800">
                        {
                          notification.Message
                        }
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
                  {
                    filteredNotifications.length
                  } notifications
                </span>
              </div>

              {paginatedNotifications.length ===
              0 ? (
                <div className="bg-white border rounded-xl shadow-sm p-8 text-center">
                  <p className="text-gray-500">
                    No notifications found.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">

                  {paginatedNotifications.map(
                    (
                      notification,
                      index
                    ) => (
                      <div
                        key={index}
                        onClick={() =>
                          markAsViewed(
                            notification
                          )
                        }
                        className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5 cursor-pointer ${
                          viewedNotifications.includes(
                            getNotificationKey(
                              notification
                            )
                          )
                            ? "opacity-60"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

                          <div className="flex items-center gap-2">

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                                notification.Type
                              )}`}
                            >
                              {
                                notification.Type
                              }
                            </span>

                            {!viewedNotifications.includes(
                              getNotificationKey(
                                notification
                              )
                            ) && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                NEW
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-gray-500">
                            {formatDate(
                              notification.Timestamp
                            )}
                          </p>
                        </div>

                        <p className="text-lg text-gray-800 leading-relaxed">
                          {
                            notification.Message
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}

              <div className="flex items-center justify-center gap-3 mt-8">

                <button
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                  disabled={
                    currentPage === 1
                  }
                  className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                >
                  Previous
                </button>

                <span className="text-gray-600">
                  Page {currentPage} of{" "}
                  {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition"
                >
                  Next
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}