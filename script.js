const navButton = document.getElementById("mobileNavToggle");

navButton.addEventListener("click", () => {
  const navContent = document.getElementById("mobileNavbar");
  if (navContent.style.display === "none" || navContent.style.display === "") {
    navContent.style.display = "block";
  } else {
    navContent.style.display = "none";
  }
});

function displayOpenClosed(status) {
  displayedStatus = document.getElementById("openStatus");

  if (status === true) {
    displayedStatus.textContent = "Vi har öppet! Välkommen!";
  } else if (status === false) {
    displayedStatus.textContent = "Vi har just nu stängt.";
  } else {
    console.log("Open hours status check failed");
  }
}

const currentTime = new Date();

function checkOpen() {
  const currentDay = currentTime.getDay();
  const currentHour = currentTime.getHours();

  if (currentDay > 0 && currentDay <= 5) {
    if (currentHour >= 7 && currentHour <= 17) {
      displayOpenClosed(true);
    } else {
      displayOpenClosed(false);
    }
  } else if (currentDay === 6) {
    if (currentHour >= 9 && currentHour <= 13) {
      displayOpenClosed(true);
    } else {
      displayOpenClosed(false);
    }
  } else {
    displayOpenClosed(false);
  }
}

checkOpen();
