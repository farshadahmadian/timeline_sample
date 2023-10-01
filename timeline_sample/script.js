"use strict";

const timelineContainer = document.querySelector(".timeline-container");
const addForm = document.querySelector(".add-timeline");
const textArea = document.querySelector(".timeline-text");
const inputAddDate = document.querySelector(".input-add-date");
const btnAddTimeline = document.querySelector(".btn-add-timeline");

const searchForm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const btnSearch = document.querySelector(".btn-search");

let timelineItems;

const renderTimeline = function (timelineArray) {
  timelineContainer.innerHTML = "";
  timelineArray.forEach((timeline) => {
    timelineContainer.insertAdjacentHTML("beforeend", timeline.html);
    textArea.value = "";
  });

  const rightSideItems = document.querySelectorAll(".timeline:nth-child(odd)");

  rightSideItems.forEach((rightSideItem) => {
    rightSideItem.classList.add("timeline-left");
  });

  const leftSideItems = document.querySelectorAll(".timeline:nth-child(even)");

  leftSideItems.forEach((leftSideItem) => {
    leftSideItem.classList.add("timeline-right");
  });
};

const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("timelineItems"));

  if (!data) {
    timelineItems = [];
    return;
  } else {
    timelineItems = data;

    renderTimeline(timelineItems);
  }
};

const onAddNewTimeline = function (event) {
  event.preventDefault();

  const textAreaValue = textArea.value;
  const inputAddDateValue = inputAddDate.value;

  const html = `
                <div class="timeline">
                  <div class="divider"></div>
                  <div class="content">
                    <div class="date">${inputAddDateValue}</div>
                    <div class="text">
                    ${textAreaValue}
                    </div>
                  </div>
                </div>
                `;

  timelineItems.push({
    html: html,
    content: textAreaValue,
    date: new Date(inputAddDateValue).getTime(),
  });

  const sortedTimelines = timelineItems.sort((timelineTagA, timelineTagB) => {
    return timelineTagA.date - timelineTagB.date;
  });

  renderTimeline(sortedTimelines);

  localStorage.setItem("timelineItems", JSON.stringify(timelineItems));
};

const onSearchTimeline = function (event) {
  event.preventDefault();

  const startDateValue = new Date(startDate.value).getTime();
  const endDateValue = new Date(endDate.value).getTime();

  if (endDateValue < startDateValue) {
    alert("End date must be equal to or greater than start date!");
    return;
  }

  const matchedTimelineItems = timelineItems.filter((timelineTag) => {
    return (
      timelineTag.date >= startDateValue && timelineTag.date <= endDateValue
    );
  });

  renderTimeline(matchedTimelineItems);
};

getLocalStorage();

addForm.addEventListener("submit", onAddNewTimeline);

searchForm.addEventListener("submit", onSearchTimeline);
