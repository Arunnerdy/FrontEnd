import React, { useState, useEffect } from "react";
import { FaBell, FaBellSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(false);
  const [showList, setShowList] = useState(false);

  // Simulated initial load - replace this with actual API call
  useEffect(() => {
    // TODO: Replace with backend API call to fetch notifications
    /*
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setUnread(data.some(n => !n.read));
      });
    */

    const mockNotifications = [
      { id: 1, message: "You were assigned to the XYZ project", read: false },
      { id: 2, message: "You have Design task on ABC project", read: false },
      { id: 3, message: "New comment added to UI Review task", read: false },
    ];
    setNotifications(mockNotifications);
    setUnread(true);
  }, []);

  const toggleNotifications = () => {
    setShowList(!showList);
    setUnread(false); // mark all as read

    // TODO: Notify backend to mark as read
    /*
    fetch('/api/notifications/mark-read', { method: 'POST' });
    */
  };

  return (
    <div className="position-relative d-inline-block">
      <button
        className="btn position-relative"
        onClick={toggleNotifications}
        style={{ background: "none", border: "none" }}
      >
        {unread ? (
          <FaBell style={{ color: "white" }} size={24} />
        ) : (
          <FaBellSlash style={{ color: "white" }} size={24} />
        )}
        {unread && (
          <span
            className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
            style={{ fontSize: "0.6rem" }}
          ></span>
        )}
      </button>

      {showList && (
        <div
          className="position-absolute bg-white shadow border rounded p-2"
          style={{ right: 0, minWidth: "250px", zIndex: 1000 }}
        >
          <h6 className="mb-2">Notifications</h6>
          <ul className="list-unstyled mb-0">
            {notifications.length > 0 ? (
              notifications.map((note) => (
                <li key={note.id} className="mb-1 border-bottom pb-1">
                  {note.message}
                </li>
              ))
            ) : (
              <li>No notifications</li>
            )}
          </ul>
          <div className="text-end">
            <button
              className="btn btn-sm btn-outline-secondary mt-2"
              onClick={() => setShowList(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
