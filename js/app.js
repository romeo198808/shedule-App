(() => {
    var __webpack_modules__ = {
        41: module => {
            module.exports = class Spline {
                constructor(xs, ys) {
                    this.xs = xs;
                    this.ys = ys;
                    this.ks = this.getNaturalKs(new Float64Array(this.xs.length));
                }
                getNaturalKs(ks) {
                    const n = this.xs.length - 1;
                    const A = zerosMat(n + 1, n + 2);
                    for (let i = 1; i < n; i++) {
                        A[i][i - 1] = 1 / (this.xs[i] - this.xs[i - 1]);
                        A[i][i] = 2 * (1 / (this.xs[i] - this.xs[i - 1]) + 1 / (this.xs[i + 1] - this.xs[i]));
                        A[i][i + 1] = 1 / (this.xs[i + 1] - this.xs[i]);
                        A[i][n + 1] = 3 * ((this.ys[i] - this.ys[i - 1]) / ((this.xs[i] - this.xs[i - 1]) * (this.xs[i] - this.xs[i - 1])) + (this.ys[i + 1] - this.ys[i]) / ((this.xs[i + 1] - this.xs[i]) * (this.xs[i + 1] - this.xs[i])));
                    }
                    A[0][0] = 2 / (this.xs[1] - this.xs[0]);
                    A[0][1] = 1 / (this.xs[1] - this.xs[0]);
                    A[0][n + 1] = 3 * (this.ys[1] - this.ys[0]) / ((this.xs[1] - this.xs[0]) * (this.xs[1] - this.xs[0]));
                    A[n][n - 1] = 1 / (this.xs[n] - this.xs[n - 1]);
                    A[n][n] = 2 / (this.xs[n] - this.xs[n - 1]);
                    A[n][n + 1] = 3 * (this.ys[n] - this.ys[n - 1]) / ((this.xs[n] - this.xs[n - 1]) * (this.xs[n] - this.xs[n - 1]));
                    return solve(A, ks);
                }
                getIndexBefore(target) {
                    let low = 0;
                    let high = this.xs.length;
                    let mid = 0;
                    while (low < high) {
                        mid = Math.floor((low + high) / 2);
                        if (this.xs[mid] < target && mid !== low) low = mid; else if (this.xs[mid] >= target && mid !== high) high = mid; else high = low;
                    }
                    return low + 1;
                }
                at(x) {
                    let i = this.getIndexBefore(x);
                    const t = (x - this.xs[i - 1]) / (this.xs[i] - this.xs[i - 1]);
                    const a = this.ks[i - 1] * (this.xs[i] - this.xs[i - 1]) - (this.ys[i] - this.ys[i - 1]);
                    const b = -this.ks[i] * (this.xs[i] - this.xs[i - 1]) + (this.ys[i] - this.ys[i - 1]);
                    const q = (1 - t) * this.ys[i - 1] + t * this.ys[i] + t * (1 - t) * (a * (1 - t) + b * t);
                    return q;
                }
            };
            function solve(A, ks) {
                const m = A.length;
                let h = 0;
                let k = 0;
                while (h < m && k <= m) {
                    let i_max = 0;
                    let max = -1 / 0;
                    for (let i = h; i < m; i++) {
                        const v = Math.abs(A[i][k]);
                        if (v > max) {
                            i_max = i;
                            max = v;
                        }
                    }
                    if (A[i_max][k] === 0) k++; else {
                        swapRows(A, h, i_max);
                        for (let i = h + 1; i < m; i++) {
                            const f = A[i][k] / A[h][k];
                            A[i][k] = 0;
                            for (let j = k + 1; j <= m; j++) A[i][j] -= A[h][j] * f;
                        }
                        h++;
                        k++;
                    }
                }
                for (let i = m - 1; i >= 0; i--) {
                    var v = 0;
                    if (A[i][i]) v = A[i][m] / A[i][i];
                    ks[i] = v;
                    for (let j = i - 1; j >= 0; j--) {
                        A[j][m] -= A[j][i] * v;
                        A[j][i] = 0;
                    }
                }
                return ks;
            }
            function zerosMat(r, c) {
                const A = [];
                for (let i = 0; i < r; i++) A.push(new Float64Array(c));
                return A;
            }
            function swapRows(m, k, l) {
                let p = m[k];
                m[k] = m[l];
                m[l] = p;
            }
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
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
        function functions_getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function setHash(hash) {
            hash = hash ? `#${hash}` : window.location.href.split("#")[0];
            history.pushState("", "", hash);
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        function tabs() {
            const tabs = document.querySelectorAll("[data-tabs]");
            let tabsActiveHash = [];
            if (tabs.length > 0) {
                const hash = functions_getHash();
                if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
                tabs.forEach(((tabsBlock, index) => {
                    tabsBlock.classList.add("_tab-init");
                    tabsBlock.setAttribute("data-tabs-index", index);
                    tabsBlock.addEventListener("click", setTabsAction.bind(tabsBlock));
                    initTabs(tabsBlock);
                }));
                let mdQueriesArray = dataMediaQueries(tabs, "tabs");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function setTitlePosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach((tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                    let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                    let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                    let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems.forEach(((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsTitleItems[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("_tab-spoller");
                        } else {
                            tabsTitles.append(tabsTitleItems[index]);
                            tabsMediaItem.classList.remove("_tab-spoller");
                        }
                    }));
                }));
            }
            function initTabs(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
                }
                if (tabsContent.length) tabsContent.forEach(((tabsContentItem, index) => {
                    tabsTitles[index].setAttribute("data-tabs-title", "");
                    tabsContentItem.setAttribute("data-tabs-item", "");
                    if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                    tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                }));
            }
            function setTabsStatus(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                function isTabsAnamate(tabsBlock) {
                    if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
                }
                const tabsBlockAnimate = isTabsAnamate(tabsBlock);
                if (tabsContent.length > 0) {
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                            if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                        } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                    }));
                }
            }
            function setTabsAction(e) {
                const el = e.target;
                if (el.classList.contains("tabs__add")) {
                    let index = Number(this.dataset.index);
                    index++;
                    this.dataset.index = index;
                    const allTab = this.querySelectorAll(".tabs__title");
                    const lastTab = allTab[allTab.length - 1];
                    const newTab = document.createElement("button");
                    newTab.type = "button";
                    newTab.className = "tabs__title _tab-active";
                    newTab.setAttribute("data-tabs-title", "");
                    newTab.textContent = `График ${index}`;
                    allTab.forEach((tab => tab.classList.remove("_tab-active")));
                    lastTab.after(newTab);
                    const dataBody = `<div class="tabs__body">\n            <div class="btnClosed"></div>\n            <fieldset class="data__block data__color">\n              <legend class="data__title">Цвет графика</legend>\n              <div class="data__row data__row--color">\n                <input autocomplete="off" type="color" name="color-${index}" placeholder="Цвет графика" class="input__color"\n                  id="color-${index}">\n              </div>\n            </fieldset>\n\n            <fieldset class="data__block data__point">\n              <legend class="data__title">Данные для построения</legend>\n\n              <div class="data__row points">\n                <table class="points__table">\n                  <tbody class="points__body">\n                    <tr class="points__row">\n                      <th class="points__title points__title--x">X</th>\n                      <th class="points__title points__title--y">Y</th>\n                    </tr>\n                    <tr class="points__row points__row--data">\n                      <td class="points__x">\n                        <input autocomplete="off" type="number" name="point" placeholder="0"\n                          class="input__point  input__point--x-${index}">\n                      </td>\n                      <td class="points__y">\n                        <input autocomplete="off" type="number" name="point" placeholder="0"\n                          class="input__point input__point--y input__point--y-${index}">\n                      </td>\n                    </tr>\n                  </tbody>\n\n                </table>\n              </div>\n            </fieldset>\n          </div>`;
                    this.querySelector(".tabs__content").insertAdjacentHTML("beforeend", dataBody);
                    initTabs(this);
                }
                if (el.closest("[data-tabs-title]")) {
                    const tabTitle = el.closest("[data-tabs-title]");
                    const tabsBlock = tabTitle.closest("[data-tabs]");
                    if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                        tabTitle.classList.add("_tab-active");
                        setTabsStatus(tabsBlock);
                    }
                    e.preventDefault();
                }
            }
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
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
        const canvas = document.querySelector("#shedule");
        const canvasContainer = document.querySelector(".shedule");
        const axesX = document.querySelector("#x");
        const axesY = document.querySelector("#y");
        const pointTitleX = document.querySelector(".points__title--x");
        const pointTitleY = document.querySelector(".points__title--y");
        const maxX = document.querySelector("#divisionX");
        const maxY = document.querySelector("#divisionY");
        const buttonShedule1 = document.querySelector(".shedule__button--1");
        const buttonShedule2 = document.querySelector(".shedule__button--2");
        let flag = true;
        const ctx = canvas.getContext("2d");
        let divisions;
        let canvasWidth, canvasHeight, xToUpperCase, maxXValue, maxYValue, yToUpperCase;
        function initCanvas() {
            paintCanvas(flag);
        }
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
        function setSize() {
            canvasWidth = canvasContainer.clientWidth;
            canvasHeight = canvasContainer.clientHeight;
            canvasHeight = canvasWidth;
            window.screen.width < 768 ? canvasHeight = canvasWidth : "";
            canvas.setAttribute("width", `${canvasWidth}px`);
            canvas.setAttribute("height", `${canvasHeight}px`);
        }
        function setData() {
            maxXValue = maxX.value === "" ? "10" : maxX.value;
            maxYValue = maxY.value === "" ? "10" : maxY.value;
        }
        function paintCanvas() {
            clearCanvas();
            setSize();
            setData();
            divisions = flag ? paintDivisions1(maxXValue, maxYValue) : paintDivisions2(maxXValue, maxYValue);
            flag ? paintAxes1() : paintAxes2();
            pointTitleX.textContent = xToUpperCase;
            pointTitleY.textContent = yToUpperCase;
        }
        function clearCanvas() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }
        buttonShedule1.addEventListener("click", (() => {
            flag = true;
            buttonBuildListener();
        }));
        buttonShedule2.addEventListener("click", (() => {
            flag = false;
            buttonBuildListener();
        }));
        var cubic_spline = __webpack_require__(41);
        function renderShedule(arrShedule, ctx, divisions, type) {
            const newShedule = arrShedule.filter((shedule => {
                if (!shedule.x || !shedule.y || shedule.x.length !== shedule.y.length || shedule.x.length === 0) ; else return shedule;
            }));
            newShedule.forEach((shedule => {
                const pointsX = [];
                const pointsY = [];
                for (let i = 0; i < shedule.x.length; i++) {
                    ctx.beginPath();
                    const x = shedule.x[i] / (divisions.maxCountX / 10) * divisions.widthDivision + divisions.startX;
                    const y = divisions.startY - shedule.y[i] / (divisions.maxCountY / 10) * divisions.widthDivision;
                    pointsX.push(x);
                    pointsY.push(y);
                    ctx.arc(x, y, 2, 0, 2 * Math.PI);
                    ctx.fillStyle = shedule.color;
                    ctx.strokeStyle = shedule.color;
                    ctx.stroke();
                    ctx.fill();
                    ctx.closePath();
                }
                if (type === "linear") drawLinearByPoints(pointsX, pointsY, shedule.color); else if (type === "curve") drawCurveByPoints(pointsX, pointsY, shedule.color);
            }));
            function drawLinearByPoints(pointsX, pointsY, color) {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.moveTo(pointsX[0], pointsY[0]);
                for (let i = 1; i < pointsX.length; i++) ctx.lineTo(pointsX[i], pointsY[i]);
                ctx.stroke();
                ctx.closePath();
            }
            function drawCurveByPoints(pointsX, pointsY, color) {
                const spline = new cubic_spline(pointsX, pointsY);
                ctx.beginPath();
                ctx.moveTo(pointsX[0], pointsY[0]);
                for (let x = pointsX[0]; x <= pointsX[pointsX.length - 1]; x += 1) {
                    const y = spline.at(x);
                    ctx.lineTo(x, y);
                }
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        }
        const buttonBuild = document.querySelector(".data__button--build");
        const buttonClear = document.querySelector(".data__button--clear");
        const dataType = document.querySelector(".data__type");
        let type;
        function resize(evt) {
            paintCanvas();
            buttonBuildListener();
        }
        function buttonBuildListener() {
            paintCanvas();
            type = document.querySelector('input[name="type"]:checked')?.value || "linear";
            let arrShedule = getArraysPoint();
            renderShedule(arrShedule, ctx, divisions, type);
        }
        function buttonClearListener() {
            paintCanvas();
            dataClear();
            dataPaint();
            type = document.querySelector('input[name="type"]:checked')?.value || "linear";
            let points = getArraysPoint();
            renderShedule(points, ctx, divisions, type);
        }
        buttonBuild.addEventListener("click", buttonBuildListener);
        buttonClear.addEventListener("click", buttonClearListener);
        dataType.addEventListener("change", buttonBuildListener);
        window.addEventListener("resize", resize);
        const shedule = [];
        const dataMain = document.querySelector(".data__main");
        function dataPaint() {
            const tabIndex = setActiveTab();
            const allBlocks = document.querySelectorAll(".tabs__body");
            const block = allBlocks[tabIndex];
            const body = block.querySelector(".points__body");
            const dataRow = block.querySelector(".points__row--data");
            const row = dataRow.cloneNode(true);
            function setLastY() {
                const arrayY = block.querySelectorAll(".input__point--y");
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
            function changeColor() {
                buttonBuildListener();
            }
            function addColorListener() {
                const inputColor = block.querySelector(".input__color");
                inputColor.addEventListener("change", changeColor);
            }
            function closeTabListener() {
                document.querySelectorAll(".tabs__title")[tabIndex - 1].classList.add("_tab-active");
                document.querySelectorAll(".tabs__title")[tabIndex].remove();
                allBlocks[tabIndex - 1].removeAttribute("hidden");
                allBlocks[tabIndex].remove();
                const tabs = document.querySelector("[data-tabs]");
                let index = Number(tabs.dataset.index);
                tabs.dataset.index = --index;
                this.removeEventListener("click", closeTabListener);
                buttonBuildListener();
            }
            function addCloseTabBtn() {
                const btnClose = block.querySelector(".btnClosed");
                if (btnClose) {
                    btnClose.classList.add("_active");
                    btnClose.addEventListener("click", closeTabListener);
                }
            }
            addColorListener();
            addCloseTabBtn();
            lastY.addEventListener("change", addRow);
        }
        function dataClear() {
            const index = setActiveTab();
            const allBlocks = document.querySelectorAll(".tabs__body");
            const block = allBlocks[index];
            const body = block.querySelector(".points__body");
            const bodyStart = `<tr class="points__row">\n                      <th class="points__title points__title--x">X</th>\n                      <th class="points__title points__title--y">Y</th>\n                    </tr>\n                    <tr class="points__row points__row--data">\n                      <td class="points__x">\n                        <input autocomplete="off" type="number" name="point" placeholder="0"\n                          class="input__point  input__point--x-${index + 1}">\n                      </td>\n                      <td class="points__y">\n                        <input autocomplete="off" type="number" name="point" placeholder="0"\n                          class="input__point input__point--y input__point--y-${index + 1}">\n                      </td>\n                    </tr>\n              `;
            body.innerHTML = bodyStart;
        }
        function setActiveTab() {
            const allTabs = document.querySelectorAll(".tabs__title");
            let activeBlock;
            allTabs.forEach(((tab, index) => {
                if (tab.classList.contains("_tab-active")) activeBlock = index;
            }));
            return activeBlock;
        }
        function getArraysPoint() {
            shedule.splice(0);
            const countShedule = document.querySelectorAll(".tabs__title");
            const colors = document.querySelectorAll(".input__color");
            countShedule.forEach(((shed, index) => {
                const dataX = Array.from(document.querySelectorAll(`.input__point--x-${index + 1}`)).map((input => +input.value)).slice(0, -1);
                const dataY = Array.from(document.querySelectorAll(`.input__point--y-${index + 1}`)).map((input => +input.value)).slice(0, -1);
                shedule.push({
                    x: dataX,
                    y: dataY,
                    color: colors[index].value === "" ? "#000" : colors[index].value
                });
            }));
            return shedule;
        }
        dataMain.addEventListener("change", buttonBuildListener);
        const buttonAddShedule = document.querySelector(".tabs__add");
        function activeTabListener(evt) {
            setTimeout(dataPaint, 500);
        }
        function initFirstTab() {
            dataPaint();
        }
        tabs();
        buttonAddShedule.addEventListener("click", activeTabListener);
        initCanvas();
        initFirstTab();
        window["FLS"] = true;
        isWebp();
    })();
})();