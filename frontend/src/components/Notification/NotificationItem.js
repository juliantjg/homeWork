import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NotificationItem({ notification }) {
    console.log(notification)
    return (
        <Link to="/application-list" id="notificationItemLink">
            <div class="row">
                <div class="row">
                    <small><i class="fas fa-info-circle"></i> {notification.description}</small>
                </div>
                <hr />
            </div>
        </Link>
    );
}

export default NotificationItem;
