"use strict";

//Utils

var sentimood = new Sentimood();

const getAverageFromArray = function (array) {
  let number = array[0];
  for (let i = 1; i < array.length; i++) number = number + array[i];
  return number / array.length;
};

const getAbsoluteValues = function (array) {
  const absoluteValues = array.map((value) => Math.abs(value));
  return absoluteValues;
};

const calcDeviation = function (mean, point) {
  if (point > mean) return mean - point;
  if (point < mean) return mean + point;
};

const postIsUnique = (post, gaurd) => {
  if (!post.shortcode) return true;
  if (gaurd.includes(post.shortcode)) return false;
  gaurd.push(post.shortcode);
  return true;
};

const returnCaption = (post) => {
  if (post.text) return post.text;
  if (post.caption) return post.caption;
};

// HTML resources


const html = {
  // HTML Code

  comparisonGroup(number) {
    return `<div class="div--dropdown-container">
    <div class="comparison-group-button" id="btn--comp-${number}">
      Comparison Group ${number} ▼
    </div>
    <div class="div--comparison-group-list" id="div--dropdown-comp-${number}">
      <div>
        <a href="#" class="header-tiktok selector-header-tiktok-${number}"
          >TikTok</a
        >&nbsp;&nbsp;▼
      </div>
      <section class="tiktok-dropdown tiktok-dropdown-${number}">
        <div>
          <input
            type="checkbox"
            class="checkbox-all-comp checkbox-all-${number}"
            value="All"
            id="All${number}"
          /><label for="All${number}">All</label>
        </div>
      </section>
      <div>
        <a
          href="#"
          class="header-instagram selector-header-instagram-${number}"
          >Instagram</a
        >&nbsp;&nbsp;▼
      </div>
      <section class="instagram-dropdown instagram-dropdown-${number}">
        <div>
          <input
            type="checkbox"
            class="checkbox-all-comp checkbox-all-${number}"
            value="All"
            id="All${number}"
          /><label for="All${number}">All</label>
        </div>
      </section>
    </div>
  </div>`;
  },

  comparisonGroupChart(number) {
    return `<div class="chart-div--dropdown-container">
    <div class="chart-comparison-group-button" id="chart-btn--comp-${number}">
      Comparison Group ${number} ▼
    </div>
    <div class="chart-div--comparison-group-list" id="chart-div--dropdown-comp-${number}">
      <div>
        <a href="#" class="chart-header-tiktok chart-selector-header-tiktok-${number}"
          >TikTok</a
        >&nbsp;&nbsp;▼
      </div>
      <section class="chart-tiktok-dropdown chart-tiktok-dropdown-${number}">
        <div>
          <input
            type="checkbox"
            class="chart-checkbox-all-comp chart-checkbox-all-${number}"
            value="All"
            id="chart-All${number}"
          /><label for="chart-All${number}">All</label>
        </div>
      </section>
      <div>
        <a
          href="#"
          class="chart-header-instagram chart-selector-header-instagram-${number}"
          >Instagram</a
        >&nbsp;&nbsp;▼
      </div>
      <section class="chart-instagram-dropdown chart-instagram-dropdown-${number}">
        <div>
          <input
            type="checkbox"
            class="chart-checkbox-all-comp chart-checkbox-all-${number}"
            value="All"
            id="chart-All${number}"
          /><label for="chart-All${number}">All</label>
        </div>
      </section>
    </div>
  </div>`;
  },

  chartConfigEntry(number) {
    return `<div class='div--comparison-group-chart'><div class='div--chart-config-name'><label>Name:</label><input type="text" /></div>${this.comparisonGroupChart(
      number
    )}</div>`;
  },

  readout(number) {
    return `<div class="comp-readout-subdiv comp-readout-subdiv-${number}">
    <a class="bold">Group ${number}</a><br />
    <a>Posts: </a><a id="readout-${number}--post-count"></a><br />
    <div class="margin-top-sm">
      
      
      <a>Total Score: </a><br />
      <a
        >&nbsp;&nbsp;&nbsp;Absolute:
        <a id="readout-${number}--total-abs"></a></a
      ><br />
      <a
        >&nbsp;&nbsp;&nbsp;Comparative:
        <a id="readout-${number}--total-comp"></a
      ></a>
    </div>
    <div class="margin-top-sm">
      <a>Per Post Analysis: </a><br />
      <a
        >&nbsp;&nbsp;&nbsp;Average:
        <a id="readout-${number}--avg-abs"></a></a
      ><br />
      <a>&nbsp;&nbsp;&nbsp;SD: <a id="readout-${number}--avg-sd"></a></a>
    </div>
  </div>`;
  },

  dataListInput(dataName, classModifier = "", additionalClass = "") {
    return `<div>
    <input type="checkbox" class="checkbox-list checkbox-list${classModifier} ${additionalClass}" value="${dataName}" id="${dataName}" /><label for="${dataName}"
      >#${dataName}</label
    >
  </div>`;
  },

  chart(name, title = "untitled") {
    return `<div class='div-chart-content'><p class='chart-title'>${title}</p><canvas id="chart-${name}"></canvas></div>`;
  },

  // HTML Utils

  insert(parent, html, location = "beforeend") {
    parent.insertAdjacentHTML(location, html);
  },

  text(element, text) {
    element.textContent = text;
  },

  class: {
    add(element, className) {
      element.classList.add(className);
    },

    remove(element, className) {
      element.classList.remove(className);
    },

    toggle(element, className) {
      element.classList.toggle(className);
    },
  },

  hide(...elements) {
    elements.forEach((el) => html.class.add(el, "hidden"));
  },
  show(...elements) {
    elements.forEach((el) => html.class.remove(el, "hidden"));
  },
};

// Charting

class ChartGenerator {
  div = document.querySelector(".div--chart");
  titles = [
    "Cross-Platform Comparison of Average Post Sentiment Score Per Hashtag ",
    "Cross-Platform Comparison of Total Sentiment Score of All Posts Per Hashtag",
  ];
  colors = ["red", "green", "blue"];
  constructor(type, labels, dataset, dataNames, parent, i, title) {
    this.dataset = dataset;
    this.dataNames = dataNames;
    this.chartData = {
      labels,
      datasets: [],
    };
    this.chartConfig = {
      type,
      data: null,
      options: {},
    };
    this.parent = parent;
    this.i = i;
    this.title = title;
  }

  initialize() {
    console.log(this.title);
    console.log(this);
    this.setChartDataset();
    this.generateLineChart();
  }

  setChartDataset() {
    this.dataset.forEach((dataset, i) => {
      const dataObject = {
        label: this.dataNames[i],

        borderColor: this.colors[i],
        data: this.getData(i),
        // fill: false,

        // tension: 0.1,
      };
      dataArr.forEach((data, i) => {});
      this.chartData.datasets.push(dataObject);
    });
    this.chartConfig.data = this.chartData;
  }

  getData(i) {
    const analysis = [];
    console.log(this.dataset);

    this.dataset[i].dataArr.forEach((dataArr) => {
      if (!this.counter) this.getAbsoluteScores(dataArr, analysis);
      if (this.counter) this.getAverages(dataArr, analysis);
    });

    return analysis;
  }

  getAbsoluteScores(dataArr, analysis) {
    let allCaptions = "";

    if (dataArr.image) dataArr = this.unpackInstagramData(dataArr);

    dataArr.forEach((post) => {
      const caption = returnCaption(post);
      allCaptions += caption ? caption : "";
    });

    analysis.push(sentimood.analyze(allCaptions).score);
  }

  getAverages(dataArr, analysis) {
    let averages = [];

    if (dataArr.image) dataArr = this.unpackInstagramData(dataArr);

    dataArr.forEach((post) => {
      const caption = returnCaption(post);
      // if (caption) console.log(sentimood.analyze(caption).score);
      if (caption) averages.push(sentimood.analyze(caption).score);
    });
    // console.log(averages, "/////", getAverageFromArray(averages));
    analysis.push(getAverageFromArray(averages));
  }

  unpackInstagramData(dataArray) {
    dataArray = dataArray.video
      ? [...dataArray.image, ...dataArray.video]
      : [...dataArray.image];
    return dataArray;
  }

  generateLineChart(name = "default-chart") {
    console.log(this.title);
    html.insert(this.parent, html.chart(name, this.title));
    console.log(document.getElementById(`chart-${name}`));
    this.chart = new Chart(
      document.getElementById(`chart-${name}`).getContext("2d"),
      this.chartConfig
    );
  }
}

// Data Imports

import instagramData from "./modules/instagram.js";
import tiktokData from "./modules/tiktok.js";

let { dataArr, hashtagNames } = tiktokData;

const { dataArrIG, hashtagNamesIG } = instagramData;

const data = [];

// sentimood setup

const sentimentAnalysis = {
  total: {
    analyzeCaptionsFor(data) {},
    analyzeAllCaptions(data = dataObject) {
      const gaurd = [];
      let allCaptions = "";

      data.forEach((post) => {
        // console.log(post);
        if (postIsUnique(post, gaurd)) allCaptions += this.returnCaption(post);
      });

      const analysis = sentimood.analyze(allCaptions);
      // console.log(analysis);
      return analysis;
    },
    returnCaption(post) {
      if (post.text) return post.text;
      if (post.caption) return post.caption;
    },
  },
  perPostAverage: {
    analyzeCaptionsFor(data) {},
    analyzeAllCaptions(data = dataObject) {
      const gaurd = [];
      const scores = [];

      data.forEach((post) => {
        if (!postIsUnique(post, gaurd)) return;
        const caption = this.returnCaption(post);
        if (!caption) return;
        scores.push(sentimood.analyze(caption).score);
      });

      const average = getAverageFromArray(scores);

      return [average, this.getSD(average)];
    },
    getSD(mean) {
      const gaurd = [];
      const deviations = [];
      // const outliers = [];

      data.forEach((post) => {
        if (!postIsUnique(post, gaurd)) return;
        const deviation = calcDeviation(
          mean,
          sentimood.analyze(this.returnCaption(post)).score
        );
        deviations.push(deviation);
        // if (deviation > 1.5) outliers.push(deviation);
      });

      return getAverageFromArray(getAbsoluteValues(deviations));
      // console.log(`outliers: ${outliers.length}`);
      // console.log(outliers);
    },
    returnCaption(post) {
      if (post.text) {
        return post.text;
      }
      if (post.caption) {
        return post.caption;
      }
    },

    controlForOutliers() {},
  },
};

// UI Setup

const source = {
  // inputTikTok: document.getElementById("tiktok"),
  // inputInstagram: document.getElementById("instagram"),
  inputsSelectSource: document.querySelectorAll(".input--select-source"),
  dataObjects: { tiktok: tiktokData, instagram: instagramData },

  data: null,
  maps: {
    data: null,
  },

  initialize() {
    this.addEventListeners();
    this.setDataMaps();
  },

  addEventListeners() {
    this.inputsSelectSource.forEach((input) =>
      input.addEventListener("click", (e) => source.checkboxEL(e))
    );
  },

  checkboxEL(e, checkboxValue) {
    checkboxValue = e.target.value;
    let data = checkboxValue === "tiktok" ? tiktokData : instagramData;
    let otherInput =
      checkboxValue === "tiktok" ? this.inputInstagram : this.inputTikTok;
    if (e.target.checked) source.setData(data);
    if (source.allInputsNull()) source.data = null;
  },

  allInputsNull() {
    let bool = true;
    this.inputsSelectSource.forEach((input) => {
      if (input.checked) bool = false;
    });
    return bool;
  },

  setData(dataObject) {
    this.data = dataObject;
    this.loadData();
  },

  loadData() {
    dataArr = this.data.dataArr;
    hashtagNames = this.data.hashtagNames;
    this.setDataMap();
  },

  setDataMaps() {
    this.maps.data = new Map();
    for (const [key, value] of Object.entries(this.dataObjects)) {
      this.maps.data.set(key, value);
      this.maps[key] = new Map();
      this.mapNameToDataObject(value, this.maps[key]);
    }
  },

  mapNameToDataObject(object, map) {
    object.dataArr.forEach((dataObject, i) =>
      map.set(object.hashtagNames[i], dataObject)
    );
  },
};

const analyze = {
  div: document.querySelector(".div--analyze"),
  dataDivs: document.querySelectorAll(".div--data-samples"),
  headers: document.querySelectorAll(".header-data-select"),
  subdivs: document.querySelectorAll(".div--data-sample-selector"),
  checkboxInputs: document.querySelectorAll(".checkbox-list-analyze"),
  allCheck: document.querySelectorAll(".checkbox-all"),
  btn: document.querySelector(".run-btn"),
  readout: {
    div: document.querySelector(".analysis-readout"),
    postCount: document.getElementById("readout--post-count"),
    totalAbsolute: document.getElementById("readout--total-abs"),
    totalPositive: document.getElementById("readout--total-pos"),
    totalNegative: document.getElementById("readout--total-neg"),
    totalComparative: document.getElementById("readout--total-comp"),
    avgAbsolute: document.getElementById("readout--avg-abs"),
    avgStanDev: document.getElementById("readout--avg-sd"),
  },

  initialize(data, dataMaps) {
    this.generateInputs(data);
    this.addEventListeners(dataMaps);
  },

  addEventListeners(dataMaps) {
    console.log(this.headers);
    this.headers.forEach((header) =>
      header.addEventListener("click", (e) => analyze.headersDisplay(e))
    );
    this.allCheck.forEach((checkbox) =>
      checkbox.addEventListener("change", (e) => analyze.checkAll(e))
    );
    this.btn.addEventListener("click", () => {
      analyze.getData(dataMaps);
      // console.log(analyze.data);
      const postCount = analyze.data.length;
      const total = sentimentAnalysis.total.analyzeAllCaptions(analyze.data);
      console.log(total);
      const avg = sentimentAnalysis.perPostAverage.analyzeAllCaptions(
        analyze.data
      );
      // console.log(avg);
      analyze.setReadout(
        postCount,
        total.score,
        total.comparative,
        avg[0],
        total.positive.score,
        total.negative.score
      );
    });
    this.checkboxInputs.forEach((checkbox) => {
      const allCheck = this.returnAllCheck(checkbox);

      checkbox.addEventListener("click", () => {
        allCheck.checked = checkbox.checked ? allCheck.checked : false;
      });
    });
  },

  returnAllCheck(checkbox) {
    let input;
    this.allCheck.forEach((checkboxAll) => {
      if (checkboxAll.parentNode.parentNode === checkbox.parentNode.parentNode)
        input = checkboxAll;
    });

    return input;
  },

  checkAll(e, inputs = this.checkboxInputs, allInput) {
    allInput = e.target;
    this.refreshInputs();
    const parent = allInput.parentNode.parentNode;
    if (allInput.checked) {
      inputs.forEach((checkbox) => {
        if (checkbox.parentNode.parentNode === parent) checkbox.checked = true;
      });
      return;
    }
    inputs.forEach((checkbox) => {
      if (checkbox.parentNode.parentNode === parent) checkbox.checked = false;
    });
  },

  sourceData(checkbox, dataMaps) {
    // console.log(123);
    let dataArray;
    if (document.getElementById("div-datalist-tiktok").contains(checkbox)) {
      dataArray = dataMaps.tiktok.get(checkbox.value);
      dataArray = [...dataArray];
    }
    if (document.getElementById("div-datalist-instagram").contains(checkbox)) {
      dataArray = dataMaps.instagram.get(checkbox.value);
      dataArray = dataArray.video
        ? [...dataArray.image, ...dataArray.video]
        : [...dataArray.image];
    }
    return dataArray;
  },

  unpackInstagramData(dataArray) {
    dataArray = dataArray.video
      ? [...dataArray.image, ...dataArray.video]
      : [...dataArray.image];
    return dataArray;
  },

  getData(dataMaps) {
    this.data = [];
    this.checkboxInputs.forEach((checkbox) => {
      if (checkbox.checked) {
        // console.log(this.sourceData(checkbox, dataMaps));
        this.data.push(...this.sourceData(checkbox, dataMaps));
      }
    });
    this.data;
    console.log(this.data);
  },

  refreshInputs() {
    this.checkboxInputs = document.querySelectorAll(".checkbox-list-analyze");
  },

  headersDisplay(e) {
    html.class.toggle(
      document.getElementById(`div-datalist-${e.target.name}`),
      "hidden"
    );
  },

  generateInputs(dataObject) {
    this.dataDivs.forEach((div, j) => {
      for (let i = 0; i < dataObject[j].dataArr.length; i++)
        html.insert(
          div,
          html.dataListInput(dataObject[j].hashtagNames[i], "-analyze")
        );
    });
    this.refreshInputs();
  },

  setReadout(postCount, totalAbs, totalComp, avgAbs, totalPos, totalNeg) {
    this.readout.postCount.textContent = postCount;
    this.readout.totalAbsolute.textContent = totalAbs;
    this.readout.totalPositive.textContent = totalPos;
    this.readout.totalNegative.textContent = totalNeg;
    this.readout.totalComparative.textContent = totalComp;
    this.readout.avgAbsolute.textContent = avgAbs;
    this.readout.avgStanDev.textContent = "W-I-P";
  },
};

const compare = {
  div: document.querySelector(".div--compare"),
  selectorDivs: document.querySelectorAll(".div--dropdown-container"),
  dropdownDivs: document.querySelectorAll(".div--comparison-group-list"),
  dropdownCompTwo: document.getElementById("div--dropdown-comp-2"),
  selectorBtns: document.querySelectorAll(".comparison-group-button"),
  compTwoBtn: document.getElementById("btn--comp-two"),
  inputsCompOne: document.querySelectorAll(".checkbox-list-comp-one"),
  inputsCompTwo: document.querySelectorAll(".checkbox-list-comp-two"),
  checkboxAllOne: document.querySelectorAll(".checkbox-all-one"),
  checkboxAllTwo: document.querySelector(".checkbox-all-two"),
  btn: document.querySelector(".btn-compare"),
  checkboxInputs: document.querySelectorAll(".checkbox-list-comp"),
  allCheck: document.querySelectorAll(".checkbox-all-comp"),
  checkboxAll: document.querySelectorAll(".checkbox-list-comp"),

  headers: {
    tiktok: document.querySelectorAll(".header-tiktok"),
    instagram: document.querySelectorAll(".header-instagram"),
  },

  sections: {
    tiktok: document.querySelectorAll(".tiktok-dropdown"),
    instagram: document.querySelectorAll(".instagram-dropdown"),
  },

  readout: {
    div: document.querySelector(".comparison-readout"),
    groups: [],
  },

  initialize(dataNames) {
    this.newComparison();
    this.newComparison();
    this.refreshElements();
    this.generateDataLists(dataNames);
    this.generateReadouts();
    this.addEventListeners();
  },

  refreshElements() {
    this.selectorDivs = document.querySelectorAll(".div--dropdown-container");
    this.dropdownDivs = document.querySelectorAll(
      ".div--comparison-group-list"
    );
    this.selectorBtns = document.querySelectorAll(".comparison-group-button");
    this.inputsCompOne = document.querySelectorAll(".checkbox-list-comp-one");
    this.checkboxAllOne = document.querySelectorAll(".checkbox-all-one");

    this.headers.tiktok = document.querySelectorAll(".header-tiktok");
    this.headers.instagram = document.querySelectorAll(".header-instagram");

    this.sections.tiktok = document.querySelectorAll(".tiktok-dropdown");
    this.sections.instagram = document.querySelectorAll(".instagram-dropdown");

    this.checkboxInputs = document.querySelectorAll(".checkbox-list-comp");
    this.allCheck = document.querySelectorAll(".checkbox-all-comp");

    this.inputsByGroup = [];

    for (let i = 1; i <= this.dropdownDivs.length; i++) {
      const array = [];

      this.checkboxInputs.forEach((checkbox) => {
        if (this.dropdownDivs[i - 1].contains(checkbox)) array.push(checkbox);
      });

      this.inputsByGroup.push(array);
    }
  },

  getHeadersAndSections(number) {
    this.headerInstagram = document.querySelector(
      `.selector-header-instagram-${number}`
    );
    this.headerTikTok = document.querySelector(
      `.selector-header-tiktok-${number}`
    );

    this.sectionInstagram = document.querySelector(
      `.instagram-dropdown-${number}`
    );

    this.sectionTikTok = document.querySelector(`.tiktok-dropdown-${number}`);
  },

  addEventListeners() {
    this.headers.tiktok.forEach((header, i) => {
      header.addEventListener("click", () => {
        compare.getHeadersAndSections(i + 1);
        console.log(compare.sectionTikTok);
        html.class.toggle(compare.sectionTikTok, "hidden");
      });
    });
    this.headers.instagram.forEach((header, i) => {
      header.addEventListener("click", () => {
        compare.getHeadersAndSections(i + 1);
        html.class.toggle(compare.sectionInstagram, "hidden");
      });
    });
    this.btn.addEventListener("click", () => {
      compare.getData(source.maps);
    });
    console.log(this.allCheck);
    this.allCheck.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        console.log("hello");
        compare.refreshElements();
        compare.checkAll(e);
      });
    });
  },

  returnAllCheck(checkbox) {
    let input;
    this.allCheck.forEach((checkboxAll) => {
      if (checkboxAll.parentNode.parentNode === checkbox.parentNode.parentNode)
        input = checkboxAll;
    });

    return input;
  },

  checkAll(e, inputs = this.checkboxInputs, allInput) {
    allInput = e.target;

    compare.refreshElements();
    const parent = allInput.parentNode.parentNode;
    if (allInput.checked) {
      inputs.forEach((checkbox) => {
        if (checkbox.parentNode.parentNode === parent) checkbox.checked = true;
      });
      return;
    }
    inputs.forEach((checkbox) => {
      if (checkbox.parentNode.parentNode === parent) checkbox.checked = false;
    });
  },

  getData(dataMaps) {
    this.refreshElements();

    for (let i = 0; i < this.dropdownDivs.length; i++) {
      const data = [];
      let inputs = this.inputsByGroup[i];
      console.log("////////", i, inputs, this.inputsByGroup);
      console.log(i + 1);
      inputs.forEach((checkbox) => {
        console.log(checkbox);
        if (checkbox.checked) {
          // console.log(this.sourceData(checkbox, dataMaps));
          const sourceData = this.sourceData(checkbox, dataMaps, i + 1);

          data.push(...sourceData);
        }
      });
      this.processData(data, i);
    }
  },

  sourceData(checkbox, dataMaps, i) {
    let dataArray;

    console.log(document.querySelector(`.tiktok-dropdown-${i}`), i);

    if (document.querySelector(`.tiktok-dropdown-${i}`).contains(checkbox)) {
      dataArray = dataMaps.tiktok.get(checkbox.value);
      dataArray = [...dataArray];
    }
    if (document.querySelector(`.instagram-dropdown-${i}`).contains(checkbox)) {
      dataArray = dataMaps.instagram.get(checkbox.value);
      console.log(dataArray);
      dataArray = dataArray.video
        ? [...dataArray.image, ...dataArray.video]
        : [...dataArray.image];
    }
    return dataArray;
  },

  processData(data, i) {
    const postCount = data.length;
    const total = sentimentAnalysis.total.analyzeAllCaptions(data);
    // console.log(total);
    const avg = sentimentAnalysis.perPostAverage.analyzeAllCaptions(data);
    // console.log(avg);
    this.setReadout(
      postCount,
      total.score,
      total.comparative,
      avg[0],
      avg[1],
      i
    );
  },

  setReadout(postCount, totalAbs, totalComp, avgAbs, avgSD, i) {
    const readout = this.readout.groups[i];
    // console.log(this.readout.groups[i], i);
    readout.postCount.textContent = postCount;
    readout.totalAbsolute.textContent = totalAbs;
    readout.totalComparative.textContent = totalComp;
    readout.avgAbsolute.textContent = avgAbs;
    readout.avgStanDev.textContent = "W-I-P";
  },

  generateDataLists(dataNames) {
    this.refreshElements();
    this.sections.tiktok.forEach((section) => {
      dataNames.forEach((dataName, i) => {
        html.insert(
          section,
          html.dataListInput(dataName, i + 1, "checkbox-list-comp")
        );
      });
    });
    this.sections.instagram.forEach((section) => {
      dataNames.forEach((dataName, i) => {
        html.insert(
          section,
          html.dataListInput(dataName, i + 1, "checkbox-list-comp")
        );
      });
    });
  },

  generateReadouts() {
    for (let i = 1; i <= this.dropdownDivs.length; i++) {
      html.insert(this.readout.div, html.readout(i));
      this.readout.groups.push({
        postCount: document.getElementById(`readout-${i}--post-count`),
        totalAbsolute: document.getElementById(`readout-${i}--total-abs`),
        totalComparative: document.getElementById(`readout-${i}--total-comp`),
        avgAbsolute: document.getElementById(`readout-${i}--avg-abs`),
        avgStanDev: document.getElementById(`readout-${i}--avg-sd`),
      });
    }
  },

  newComparison() {
    this.refreshElements();
    let number = this.selectorDivs.length + 1 || 0;
    console.log(number);
    html.insert(this.div, html.comparisonGroup(number));
  },
};

const chart = {
  div: document.querySelector(".div--chart"),
  divChart: document.querySelector(".div--chart-container"),
  btn: {
    open: document.querySelector(".link-see-graph"),
    genChart: document.querySelector(".footer--chart-config"),
    close: document.querySelector(".btn-close--div--chart"),
  },
  charts: [],
  configMenu: {
    div: document.querySelector(".div--chart-config-content"),
    entries: document.querySelectorAll(".chart-div--comparison-group-list"),
    headers: {
      tiktok: document.querySelectorAll(".chart-header-tiktok"),
      instagram: document.querySelectorAll(".chart-header-instagram"),
    },
    sections: {
      tiktok: document.querySelectorAll(".chart-tiktok-dropdown"),
      instagram: document.querySelectorAll(".chart-instagram-dropdown"),
    },
    checkboxAll: document.querySelectorAll(".chart-checkbox-all-comp"),
    checkboxInputs: document.querySelectorAll(".checkbox-list-chart"),
  },
  counter: 0,

  initialize(labels, dataset, dataNames) {
    this.addEventListeners();

    this.generateChart("line", labels, dataset, dataNames, this.divChart);

    this.generateConfigMenu();
    this.generateConfigMenu();
  },

  addEventListeners() {
    this.btn.open.addEventListener("click", () => html.show(chart.div));
    this.btn.close.addEventListener("click", () => html.hide(chart.div));
  },

  generateConfigMenu() {
    this.counter++;
    html.insert(this.configMenu.div, html.chartConfigEntry(this.counter));
  },

  generateChart(type, labels, dataset, dataNames) {
    const index = this.charts.length;
    this.charts.push(
      new ChartGenerator(type, labels, dataset, dataNames, this.divChart)
    );
    this.charts[index].initialize();
  },
};

const analysisInterface = {
  source,
  analyze,
  compare,
  chart,
  links: {
    analyze: document.getElementById("link-analyze"),
    compare: document.getElementById("link-compare"),
  },
  dataset: [source.dataObjects.tiktok, source.dataObjects.instagram],
  hashtags: source.dataObjects.tiktok.hashtagNames,
  dataNames: [
    "TikTok Caption Sentiment By Hashtag",
    "Instagram Caption Sentiment By Hashtag",
  ],

  initialize() {
    source.initialize();
    analyze.initialize(
      [source.dataObjects.tiktok, source.dataObjects.instagram],
      source.maps
    );
    compare.initialize(source.dataObjects.tiktok.hashtagNames);
    chart.initialize(this.hashtags, this.dataset, this.dataNames);
    this.addEventListeners();
  },

  addEventListeners() {
    const links = analysisInterface.links;
    this.links.analyze.addEventListener("click", () => {
      html.hide(compare.div, compare.readout.div);
      html.show(analyze.div, analyze.readout.div);
      html.class.add(links.analyze, "active");
      html.class.remove(links.compare, "active");
    });
    this.links.compare.addEventListener("click", () => {
      html.hide(analyze.div, analyze.readout.div);
      html.show(compare.div, compare.readout.div);
      html.class.add(links.compare, "active");
      html.class.remove(links.analyze, "active");
    });
  },

  generateInputs() {},
};

analysisInterface.initialize();
