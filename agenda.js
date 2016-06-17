"use strict";
var agenda = {
    element: null,
    dayList: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    colorList: ["#FFEBEE","#F3E5F5","#E3F2FD","#FFF3E0","#E0F2F1","#FFFDE7","#FFEBEE"],
    agenda: function (pNode, eID) {
        var elm = document.createElement("section");
        elm.id = eID;
        elm.classList.add("agenda");
        this.element = elm;
        var header = document.createElement("header");
        header.innerHTML = "Agenda";
        elm.appendChild(header);
        pNode.appendChild(elm);
        this.add = agenda.add;
        this.events = {};
        this.days = {};
        for (var i in agenda.dayList) {
            var d = document.createElement("section");
            d.classList.add("day");
            d.style.background = agenda.colorList[i];
            var dayHead = document.createElement("header");
            dayHead.innerHTML = agenda.dayList[i];
            d.appendChild(dayHead);
            this.days[agenda.dayList[i]] = d;
            this.events[agenda.dayList[i]] = [];
            this.element.appendChild(d);
        }
    },
    add: function (name, place, dayList, time) {
        if (this.element !== null) {
            for (var i = 0; i < dayList.length; i++) {
                var day = dayList[i];
                var pointer = 0;
                var ev = document.createElement("div");
                ev.classList.add("event");
                ev.dataset.day = day;
                var n = document.createElement("header");
                n.innerHTML = name;
                n.title = name;
                if ("start" in time) {
                    while (pointer < this.events[day].length && time.start > this.events[day][pointer].dataset.start) {
                        pointer++;
                    }
                    ev.dataset.start = time.start;
                    var start = document.createElement("span");
                    start.innerHTML = " (" + agenda.milToStd(time['start']);
                    start.classList.add("quiet");
                    if ("end" in time) {
                        ev.dataset.end = time.end;
                        start.innerHTML += "-" + agenda.milToStd(time['end']);
                    }
                    start.innerHTML += ")";
                    n.appendChild(start);
                }
                agenda.overlap(ev, this.events[day]);
                var p = document.createElement("div");
                p.innerHTML = place;
                p.title = place;
                p.classList.add("location");
                ev.appendChild(n);
                ev.appendChild(p);
                if (pointer >= this.events[day].length || this.events[day].length == 0) {
                    this.days[day].appendChild(ev);
                } else {
                    this.days[day].insertBefore(ev, this.events[day][pointer]);
                }
                this.events[day].splice(pointer, 0, ev);
            }
        } else {
            console.log("Create instance of object before adding events to it");
        }
    },
    overlap: function (newEvent, eventList) {
        for (var i in eventList) {
            var start = newEvent.dataset.start;
            var end = newEvent.dataset.end;
            var curEvent = eventList[i];
            if (typeof(start) === undefined) {

            } else if (start == curEvent.dataset.start || start == curEvent.dataset.end) {
                newEvent.classList.add("overlap");
                curEvent.classList.add("overlap");
            } else if (start >= curEvent.dataset.start && start <= curEvent.dataset.end) {
                newEvent.classList.add("overlap");
                curEvent.classList.add("overlap");
            }
            if (typeof(end) === undefined) {

            } else if (end == curEvent.dataset.start || end == curEvent.dataset.end) {
                newEvent.classList.add("overlap");
                curEvent.classList.add("overlap");
            } else if (end >= curEvent.dataset.start && end <= curEvent.dataset.end) {
                newEvent.classList.add("overlap");
                curEvent.classList.add("overlap");
            }
        }
    },
    milToStd: function (time) {
        var hours24 = parseInt(time.substring(0,2), 10);
        var hours = ((hours24 + 11) % 12) + 1;
        var amPm = hours24 > 11 ? 'pm' : 'am';
        var minutes = time.substring(2);
        return hours + ":" + minutes + amPm;
    },
};
var ag = new agenda.agenda(document.body, "test");
ag.add("CSCI 330","CF 115",["Monday","Tuesday","Wednesday","Friday"],{start:"1200",end:"1250"});
ag.add("CSCI 322","CF 227",["Monday","Tuesday","Wednesday","Friday"],{start:"0900",end:"0950"});
ag.add("MATH 225","MH 231",["Monday","Tuesday","Thursday","Friday"],{start:"1300",end:"1350"});
ag.add("HNRS 359","AW 408",["Tuesday","Thursday"],{start:"1400",end:"1520"});
ag.add("LAN Managers","CF",["Friday"],{start:"1100",end:"1150"});
