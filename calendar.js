"use strict";
var calendar = {
    days: {},
    isFullscreen: false,
    icons:  {
        fullscreen: "<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\"/></svg>", // https://design.google.com/icons/#ic_fullscreen
        fullscreenExit: "<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z\"/></svg>" // https://design.google.com/icons/#ic_fullscreen
    },
    fullscreen: function (e, calendarID) {
        var node = e.target;
        while (!node.classList.contains("pad")) {
            node = node.parentNode;
        }
        if (calendar.isFullscreen) {
            calendar.isFullscreen = false;
            node.innerHTML = calendar.icons.fullscreen;
            document.getElementById(calendarID).classList.remove("fullscreen");
        } else {
            calendar.isFullscreen = true;
            node.innerHTML = calendar.icons.fullscreenExit;
            document.getElementById(calendarID).classList.add("fullscreen");
        }
    },
    maximizeDay: function (e) {
        e.preventDefault();
        var node = e.target;
        while (!node.classList.contains("day")) {
            node = node.parentNode;
        }
        var expanded = node.classList.contains("max");
        for (var i = 0; i < this.days.length; i++) {
            this.days[i].classList.remove("max");
        }
        if (!expanded) {
            node.classList.add("max");
        }
    },
    init: function(calendarID) {
        var c = document.getElementById(calendarID);
        this.days = c.getElementsByClassName("day");
        for (var i = 0; i < this.days.length; i++) {
            this.days[i].addEventListener("click", function (e) {calendar.maximizeDay(e)}, false);
        }
        if (c.dataset.enablefullscreen) {
            var pad = c.getElementsByClassName("pad");
            for (var i = 0; i < pad.length; i++) {
                pad[i].addEventListener("click", function (e) {calendar.fullscreen(e, calendarID)}, false);
                pad[i].innerHTML = calendar.icons.fullscreen;
                pad[i].style.cursor = "pointer";
            }
        }
    }
}
if (window.addEventListener) {
    if (document.readyState !== "loading") {
        calendar.init("calendar0");
    } else {
        window.addEventListener("DOMContentLoaded", function () {calendar.init("calendar0")}, false);
    }
}
