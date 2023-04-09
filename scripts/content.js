console.log(
  "=============== HIGHEST STIPEND - INTERNSHALA extension ==============="
);

function getStipend(item) {
  let element = item.querySelector(".stipend");
  const text = element.textContent;
  const value = parseInt(text.replace(/[^\d-]+/g, ""), 10);
  return parseInt(value);
}

function updateInternships(minimumStipend = 0) {
  const internships_container = document.querySelector(
    "#internship_list_container"
  );
  const parent = Array.from(internships_container.children)[0];
  const nav = Array.from(internships_container.children)[1];
  let items = Array.from(parent.children);

  items.sort((a, b) => {
    const stipendA = getStipend(a);
    const stipendB = getStipend(b);

    return stipendB - stipendA;
  });

  console.log("updateInternships func called with min stipend", minimumStipend);

  console.log("initial internships", items.length);
  if (minimumStipend > 0) {
    items = items.filter((item) => getStipend(item) >= minimumStipend);
  }
  console.log("remaining internships", items.length);

  parent.innerHTML = "";
  items.forEach((item) => parent.appendChild(item));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "filterInternships") {
    const minimumStipend = parseInt(message.minimumStipend);
    updateInternships(minimumStipend);

    sendResponse({ message: "Internships Filtered!" });
  }
});

let currentUrl = window.location.href;
setInterval(() => {
  if (window.location.href !== currentUrl) {
    currentUrl = window.location.href;
    if (currentUrl.indexOf("https://internshala.com/internships/") === 0) {
      setTimeout(updateInternships, 1000);
    }
  }
}, 1000);

updateInternships();
