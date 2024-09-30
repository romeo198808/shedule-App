(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const dataRow = document.querySelector(".points__row--data");
    const row = dataRow.cloneNode(true);
    const body = document.querySelector(".points__body");
    function dataPaint() {
        function setLastY() {
            const arrayY = document.querySelectorAll(".input__point--y");
            const lastY = arrayY[arrayY.length - 1];
            return lastY;
        }
        function addRow(evt) {
            const copyRow = row.cloneNode(true);
            body.append(copyRow);
            lastY.removeEventListener("change", addRow);
            lastY = setLastY();
            lastY.addEventListener("change", addRow);
        }
        let lastY = setLastY();
        lastY.addEventListener("change", addRow);
    }
    function dataClear() {
        const bodyStart = `<tr class="points__row">\n                <th class="points__title points__title--x">X</th>\n                <th class="points__title points__title--y">Y</th>\n              </tr>\n              <tr class="points__row points__row--data">\n                <td class="points__x">\n                  <input autocomplete="off" type="number" name="point" placeholder="0"\n                    class="input__point input__point--x">\n                </td>\n                <td class="points__y">\n                  <input autocomplete="off" type="number" name="point" placeholder="0"\n                    class="input__point input__point--y">\n                </td>\n              </tr>`;
        body.innerHTML = bodyStart;
    }
    function buildShedule(ctx, divisions, color) {
        const pointsX = [];
        const pointsY = [];
        for (let i = 0; i < this.x.length; i++) {
            ctx.beginPath();
            const x = this.x[i] / (divisions.maxCountX / 10) * divisions.widthDivision + divisions.startX;
            const y = divisions.startY - this.y[i] / (divisions.maxCountY / 10) * divisions.widthDivision;
            pointsX.push(x);
            pointsY.push(y);
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        ctx.moveTo(pointsX[0], pointsY[0]);
        for (let i = 1; i < pointsX.length; i++) {
            ctx.lineTo(pointsX[i], pointsY[i]);
            ctx.stroke();
        }
    }
    const canvas = document.querySelector("#shedule");
    const canvasContainer = document.querySelector(".shedule");
    const axesX = document.querySelector("#x");
    const axesY = document.querySelector("#y");
    const maxX = document.querySelector("#divisionX");
    const maxY = document.querySelector("#divisionY");
    const color = document.querySelector("#color");
    const pointTitleX = document.querySelector(".points__title--x");
    const pointTitleY = document.querySelector(".points__title--y");
    const buttonBuild = document.querySelector(".data__button--build");
    const buttonClear = document.querySelector(".data__button--clear");
    const buttonShedule1 = document.querySelector(".shedule__button--1");
    const buttonShedule2 = document.querySelector(".shedule__button--2");
    const dataMain = document.querySelector(".data__main");
    let canvasWidth, canvasHeight, maxXValue, maxYValue, divisions, colorValue, xToUpperCase, yToUpperCase;
    let flag = true;
    const ctx = canvas.getContext("2d");
    setSize();
    paintCanvas(flag);
    dataPaint();
    function paintDivisions1(maxCountX = 10, maxCountY = 10) {
        const widthDivision = Math.floor(canvasWidth / 20) - 2;
        const countDivisions = Math.floor(canvasWidth / 2 / widthDivision) * widthDivision;
        const startPaintX = canvasWidth / 2;
        const startPaintY = canvasHeight / 2;
        const divisionX = maxCountX / 10;
        const divisionY = maxCountY / 10;
        ctx.strokeStyle = "#000";
        window.screen.width < 768 ? ctx.font = "8px serif" : ctx.font = "12px serif";
        function paintX(divisionX) {
            for (let i = 0, d = 0; i < countDivisions + widthDivision; i += widthDivision, d += divisionX) {
                let toFixed = null;
                divisionX === .1 || !Number.isInteger(d) ? toFixed = d.toFixed(1) : d;
                divisionX === .01 ? toFixed = d.toFixed(2) : d;
                divisionX === .001 ? toFixed = d.toFixed(3) : d;
                ctx.moveTo(startPaintX + i, startPaintY - 5);
                ctx.lineTo(startPaintX + i, startPaintY + 5);
                ctx.fillText(d === 0 ? "" : `${toFixed ?? d}`, startPaintX + i - 5, startPaintY + 15);
                ctx.moveTo(startPaintX - i, startPaintY - 5);
                ctx.lineTo(startPaintX - i, startPaintY + 5);
                ctx.fillText(d === 0 ? "" : `-${toFixed ?? d}`, startPaintX - i - 5, startPaintY + 15);
            }
        }
        function paintY(divisionY) {
            for (let i = 0, d = 0; i < countDivisions + widthDivision; i += widthDivision, d += divisionY) {
                let toFixed = null;
                divisionY === .1 || !Number.isInteger(d) ? toFixed = d.toFixed(1) : d;
                divisionY === .01 ? toFixed = d.toFixed(2) : d;
                divisionY === .001 ? toFixed = d.toFixed(3) : d;
                ctx.moveTo(startPaintX - 5, startPaintY + i);
                ctx.lineTo(startPaintX + 5, startPaintY + i);
                ctx.fillText(d === 0 ? "" : `${toFixed ?? d}`, startPaintX - 20, startPaintY - i - 5);
                ctx.moveTo(startPaintX - 5, startPaintY - i);
                ctx.lineTo(startPaintX + 5, startPaintY - i);
                ctx.fillText(d === 0 ? "" : `-${toFixed ?? d}`, startPaintX - 25, startPaintY + i - 5);
            }
        }
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#000";
        paintX(divisionX);
        paintY(divisionY);
        ctx.stroke();
        ctx.closePath();
        return {
            widthDivision,
            startX: startPaintX,
            startY: startPaintY,
            maxCountX,
            maxCountY
        };
    }
    function paintDivisions2(maxCountX = 10, maxCountY = 10) {
        const widthDivision = Math.floor((canvasWidth - 40) / 10) - 2;
        const countDivisions = Math.floor(canvasWidth / widthDivision) * widthDivision;
        const startPaintX = 40;
        const startPaintY = canvasHeight - 40;
        const divisionX = maxCountX / 10;
        const divisionY = maxCountY / 10;
        ctx.strokeStyle = "#000";
        ctx.font = "14px serif";
        function paintX(divisionX) {
            for (let i = 0, d = 0; i < countDivisions + widthDivision; i += widthDivision, d += divisionX) {
                let toFixed = null;
                divisionX === .1 || !Number.isInteger(d) ? toFixed = d.toFixed(1) : d;
                divisionX === .01 ? toFixed = d.toFixed(2) : d;
                divisionX === .001 ? toFixed = d.toFixed(3) : d;
                ctx.moveTo(startPaintX + i, startPaintY - 8);
                ctx.lineTo(startPaintX + i, startPaintY + 8);
                ctx.fillText(d === 0 ? "" : `${toFixed ?? d}`, startPaintX + i - 5, startPaintY + 25);
            }
        }
        function paintY(divisionY) {
            for (let i = 0, d = 0; i < countDivisions + widthDivision; i += widthDivision, d += divisionY) {
                let toFixed = null;
                divisionY === .1 || !Number.isInteger(d) ? toFixed = d.toFixed(1) : d;
                divisionY === .01 ? toFixed = d.toFixed(2) : d;
                divisionY === .001 ? toFixed = d.toFixed(3) : d;
                ctx.moveTo(startPaintX - 8, startPaintY - i);
                ctx.lineTo(startPaintX + 8, startPaintY - i);
                ctx.fillText(d === 0 ? "" : `${toFixed ?? d}`, startPaintX - 30, startPaintY - i + 5);
            }
        }
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#000";
        paintX(divisionX);
        paintY(divisionY);
        ctx.stroke();
        ctx.closePath();
        return {
            widthDivision,
            startX: startPaintX,
            startY: startPaintY,
            maxCountX,
            maxCountY
        };
    }
    function paintAxes1() {
        const x = axesX.value === "" ? "x" : axesX.value;
        const y = axesY.value === "" ? "y" : axesY.value;
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(canvasWidth / 2, 0);
        ctx.lineTo(canvasWidth / 2, canvasHeight);
        ctx.moveTo(0, canvasHeight / 2);
        ctx.lineTo(canvasWidth, canvasHeight / 2);
        ctx.stroke();
        ctx.closePath();
        ctx.stroke();
        ctx.font = "24px serif";
        xToUpperCase = x.slice(0, 1).toUpperCase().concat(x.slice(1));
        yToUpperCase = y.slice(0, 1).toUpperCase().concat(y.slice(1));
        ctx.fillText(xToUpperCase, canvasWidth - 60, canvasHeight / 2 + 40);
        ctx.fillText(yToUpperCase, canvasWidth / 2 + 20, 30);
    }
    function paintAxes2() {
        const x = axesX.value === "" ? "x" : axesX.value;
        const y = axesY.value === "" ? "y" : axesY.value;
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(40, 0);
        ctx.lineTo(40, canvasHeight - 40);
        ctx.moveTo(40, canvasHeight - 40);
        ctx.lineTo(canvasWidth, canvasHeight - 40);
        ctx.stroke();
        ctx.closePath();
        ctx.stroke();
        ctx.font = "24px serif";
        xToUpperCase = x.slice(0, 1).toUpperCase().concat(x.slice(1));
        yToUpperCase = y.slice(0, 1).toUpperCase().concat(y.slice(1));
        ctx.fillText(xToUpperCase, canvasWidth - 60, canvasHeight - 60);
        ctx.fillText(yToUpperCase, 60, 30);
    }
    function setData() {
        clearCanvas();
        maxXValue = maxX.value === "" ? "10" : maxX.value;
        maxYValue = maxY.value === "" ? "10" : maxY.value;
        colorValue = color.value === "" ? "#000" : color.value;
        paintCanvas(flag);
        buttonBuildListener();
    }
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    function getArraysPoint() {
        const dataX = Array.from(document.querySelectorAll(".input__point--x")).map((input => +input.value)).slice(0, -1);
        const dataY = Array.from(document.querySelectorAll(".input__point--y")).map((input => +input.value)).slice(0, -1);
        return {
            x: dataX,
            y: dataY
        };
    }
    function paintCanvas(flag) {
        clearCanvas();
        divisions = flag ? paintDivisions1(maxXValue, maxYValue) : paintDivisions2(maxXValue, maxYValue);
        flag ? paintAxes1() : paintAxes2();
        pointTitleX.textContent = xToUpperCase;
        pointTitleY.textContent = yToUpperCase;
    }
    function resize(evt) {
        setSize();
        paintCanvas(flag);
        buttonBuildListener();
    }
    function setSize() {
        canvasWidth = canvasContainer.clientWidth;
        canvasHeight = canvasContainer.clientHeight;
        canvasHeight = canvasWidth;
        window.screen.width < 768 ? canvasHeight = canvasWidth : "";
        canvas.setAttribute("width", `${canvasWidth}px`);
        canvas.setAttribute("height", `${canvasHeight}px`);
    }
    function buttonBuildListener() {
        paintCanvas(flag);
        let points = getArraysPoint();
        let buildSheduleWithData = buildShedule.bind(points, ctx, divisions, colorValue);
        buildSheduleWithData();
    }
    function buttonClearListener() {
        clearCanvas();
        paintCanvas();
        dataClear();
        dataPaint();
    }
    window.addEventListener("resize", resize);
    dataMain.addEventListener("change", setData);
    buttonBuild.addEventListener("click", buttonBuildListener);
    buttonClear.addEventListener("click", buttonClearListener);
    buttonShedule1.addEventListener("click", (() => {
        flag = true;
        paintCanvas(flag);
    }));
    buttonShedule2.addEventListener("click", (() => {
        flag = false;
        paintCanvas(flag);
    }));
    window["FLS"] = true;
    isWebp();
})();