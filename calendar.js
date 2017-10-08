class Calendar {
    icons(type) {
        // https://design.google.com/icons/#ic_fullscreen
        switch (type) {
            case "fullscreenExit":
            return "<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z\"/></svg>";
            default:
            return "<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\"/></svg>";
        }
    }
    toggleFullscreen(e) {
        var node = e.target;
        while (!node.classList.contains("pad")) {
            node = node.parentNode;
        }
        if (this.isFullscreen) {
            this.isFullscreen = false;
            node.innerHTML = this.icons();
            this.calendar.classList.remove("fullscreen");
        } else {
            this.isFullscreen = true;
            node.innerHTML = this.icons("fullscreenExit");
            this.calendar.classList.add("fullscreen");
        }
    }
    maximizeDay(e) {
        e.preventDefault();
        let node = e.target;
        while (!node.classList.contains("day")) {
            node = node.parentNode;
        }
        if (this.maximized && this.maximized != node) {
            this.maximized.classList.remove("max");
        }
        node.classList.toggle("max");
        this.maximized = node;
    }
    constructor(calendarID) {
        let self = this;
        this.calendar = document.getElementById(calendarID);
        this.days = this.calendar.getElementsByClassName("day");
        Array.from(this.days).map((day) => {
            day.addEventListener("click", function (e) {self.maximizeDay(e)}, false);
            let date = new Date();
            if (date.getHours() > 7 && date.getHours() < 18) {
                let bar = document.createElement('div');
                bar.classList.add('time-bar');
                let position = ((date.getHours() - 8) + (date.getMinutes() / 60)) * 49 + 32;
                bar.style.top = `${position}px`;
                day.appendChild(bar);
            }
        });
        if (this.calendar.dataset.enablefullscreen) {
            Array.from(this.calendar.getElementsByClassName("pad")).map((item) => {
                item.addEventListener("click", function (e) {self.toggleFullscreen(e)}, false);
                item.innerHTML = this.icons();
                item.style.cursor = "pointer";
            });
        }
    }
}

let c1 = new Calendar("calendar0");
