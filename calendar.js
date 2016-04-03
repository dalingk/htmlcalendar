"use strict";
var calendar = {
    days: {},
    fullscreen: function () {
        return false;
    },
    maximizeDay: function (e) {
        e.preventDefault();
        var expanded = e.target.classList.contains("max") || e.target.parentNode.classList.contains("max");
        for (var i = 0; i < this.days.length; i++) {
            this.days[i].classList.remove("max");
        }
        if (!expanded) {
            if (e.target.classList.contains("event")) {
                e.target.parentNode.classList.add("max");
            } else {
                e.target.classList.add("max");
            }
        }
    },
    init: function(calendarID) {
        this.days = document.getElementById(calendarID).getElementsByClassName("day");
        for (var i = 0; i < this.days.length; i++) {
            this.days[i].addEventListener("click", function (e) {calendar.maximizeDay(e)}, false);
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
