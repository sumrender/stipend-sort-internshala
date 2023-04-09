const button = document.querySelector("button");
const error = document.querySelector(".error");
const success = document.querySelector(".success");

function resetMessages() {
  error.innerHTML = "";
  success.innerHTML = "";
}

button.addEventListener("click", async () => {
  resetMessages();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.url.startsWith("https://internshala.com/internships/")) {
    error.innerHTML = "You are not at internshala.com";
    return;
  }

  const input = document.querySelector("input");
  let minimumStipend = parseInt(input.value);
  minimumStipend *= 1000; // convert 15 to 15,000
  console.log(minimumStipend);

  if (isNaN(minimumStipend)) {
    error.innerHTML = "Enter a valid number";
    return;
  }

  chrome.tabs.sendMessage(
    tab.id,
    {
      action: "filterInternships",
      minimumStipend,
    },
    (response) => {
      success.innerHTML = response.message;
    }
  );
});
