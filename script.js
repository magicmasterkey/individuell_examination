/* Mobil nav funktionalitet */
const navButton = document.getElementById("mobileNavToggle");

navButton.addEventListener("click", () => {
  const navContent = document.getElementById("mobileNavbar");
  if (navContent.style.display === "none" || navContent.style.display === "") {
    navContent.style.display = "block";
  } else {
    navContent.style.display = "none";
  }
});

/* Dessa tre funktioner beräknar om det är öppet, visar om det är öppet eller inte, och visar hur länge till dem stänger eller öppnar igen */
function displayOpenClosed(status) {
  const displayedStatus = document.getElementById("openStatus");

  if (status === true) {
    displayedStatus.textContent = "Vi har öppet! Välkommen!";
  } else if (status === false) {
    displayedStatus.textContent = "Vi har just nu stängt.";
  } else {
    console.log("Open status display failed");
  }
}

/* Antagligen det sämsta möjliga sätt att göra detta och jag gråter på insidan */
function displayClock(day, hour, minute, second, status) {
  const clock = document.getElementById("clock");

  if (status === true) {
    /* Om det är öppet */
    if (day < 6) {
      /* Om det är vardag */
      const closesIn = [17 - hour, 60 - minute, 60 - second];
      for (let i = 0; i < 3; i++) {
        if (closesIn[i] < 10) {
          closesIn[i] = "0" + closesIn[i];
        }
      }
      clock.textContent =
        "Vi stänger om: " + closesIn[0] + ":" + closesIn[1] + ":" + closesIn[2];
    } else {
      /* Om det är lördag */
      const closesIn = [13 - hour, 60 - minute, 60 - second];
      for (let i = 0; i < 3; i++) {
        if (closesIn[i] < 10) {
          closesIn[i] = "0" + closesIn[i];
        }
      }
      clock.textContent =
        "Vi stänger om: " + closesIn[0] + ":" + closesIn[1] + ":" + closesIn[2];
    }
  } else if (status === false) {
    /* Om det är stängt */
    if (day >= 1 && day <= 5 && hour < 7) {
      /* Om det är vardagsmorgon */
      const opensIn = [7 - hour, 60 - minute, 60 - second];
      for (let i = 0; i < 3; i++) {
        if (opensIn[i] < 10) {
          opensIn[i] = "0" + opensIn[i];
        }
      }
      clock.textContent =
        "Vi öppnar om: " + opensIn[0] + ":" + opensIn[1] + ":" + opensIn[2];
    } else if (day >= 1 && day <= 4) {
      /* Om det är Mån-Tor kväll */
      const opensIn = [hour - 6, 60 - minute, 60 - second];
      for (let i = 0; i < 3; i++) {
        if (opensIn[i] < 10) {
          opensIn[i] = "0" + opensIn[i];
        }
      }
      clock.textContent =
        "Vi öppnar om: " + opensIn[0] + ":" + opensIn[1] + ":" + opensIn[2];
    } else if (day === 5) {
      /* Om det är fredag kväll */
      const opensIn = [hour - 8, 60 - minute, 60 - second];
      for (let i = 0; i < 3; i++) {
        if (opensIn[i] < 10) {
          opensIn[i] = "0" + opensIn[i];
        }
      }
      clock.textContent =
        "Vi öppnar om: " + opensIn[0] + ":" + opensIn[1] + ":" + opensIn[2];
    } else if (day === 6) {
      /* Om det är lördag */
      if (hour < 9) {
        /* Om det är morgon */
        const opensIn = [9 - hour, 60 - minute, 60 - second];
        for (let i = 0; i < 3; i++) {
          if (opensIn[i] < 10) {
            opensIn[i] = "0" + opensIn[i];
          }
        }
        clock.textContent =
          "Vi öppnar om: " + opensIn[0] + ":" + opensIn[1] + ":" + opensIn[2];
      } else /* Om det är kväll */ {
        const opensIn = [54 - hour, 60 - minute, 60 - second];
        for (let i = 0; i < 3; i++) {
          if (opensIn[i] < 10) {
            opensIn[i] = "0" + opensIn[i];
          }
        }
        clock.textContent =
          "Vi öppnar om: " + opensIn[0] + ":" + opensIn[1] + ":" + opensIn[2];
      }
    } else {
      /* Om det är söndag */
      const opensIn = [30 - hour, 60 - minute, 60 - second];
      for (let i = 0; i < 3; i++) {
        if (opensIn[i] < 10) {
          opensIn[i] = "0" + opensIn[i];
        }
      }
      clock.textContent =
        "Vi öppnar om: " + opensIn[0] + ":" + opensIn[1] + ":" + opensIn[2];
    }
  } else {
    console.log("Clock display failed");
  }
}

function checkTime() {
  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes() + 1;
  const currentSecond = currentTime.getSeconds();

  if (currentDay > 0 && currentDay <= 5) {
    if (currentHour >= 7 && currentHour <= 17) {
      displayOpenClosed(true);
      displayClock(currentDay, currentHour, currentMinute, currentSecond, true);
    } else {
      displayOpenClosed(false);
      displayClock(
        currentDay,
        currentHour,
        currentMinute,
        currentSecond,
        false,
      );
    }
  } else if (currentDay === 6) {
    if (currentHour >= 9 && currentHour <= 13) {
      displayOpenClosed(true);
      displayClock(currentDay, currentHour, currentMinute, currentSecond, true);
    } else {
      displayOpenClosed(false);
      displayClock(
        currentDay,
        currentHour,
        currentMinute,
        currentSecond,
        false,
      );
    }
  } else {
    displayOpenClosed(false);
    displayClock(currentDay, currentHour, currentMinute, currentSecond, false);
  }
}
/* Anropa "checkTime" varje 1000 millisekunder, dvs varje sekund */
setInterval(checkTime, 1000);

/* Localstorage stuff yippieeeee kill me now */
const bookedServices = [];

const bookingSection = document.getElementById("booking");
const halfDayBtn = document.getElementById("halfDayBtn");
const fullDayBtn = document.getElementById("fullDayBtn");
const longTermBtn = document.getElementById("longTermBtn");
const careBtn = document.getElementById("careBtn");

function renderBookedServices() {
  const toRender = JSON.parse(localStorage.getItem("storedServices") || []);
  const container = document.getElementById("bookingCardContainer");
  if (bookedServices.length !== 0) {
    container.innerHTML = "";

    toRender.forEach((element) => {
      if (element === "halfDay") {
        const bookedCard = document.createElement("article");
        bookedCard.classList.add("bookingCard");
        const bookedTitle = document.createElement("h3");
        const bookedContent = document.createElement("p");
        bookedTitle.textContent = "Halvdag";
        bookedContent.textContent =
          "Vi tar hand om din hund i upp till 4 timmar";
        bookedCard.append(bookedTitle, bookedContent);
        container.append(bookedCard);
      } else if (element === "fullDay") {
        const bookedCard = document.createElement("article");
        bookedCard.classList.add("bookingCard");
        const bookedTitle = document.createElement("h3");
        const bookedContent = document.createElement("p");
        bookedTitle.textContent = "Heldag";
        bookedContent.textContent =
          "Vi tar hand om din hund i upp till 8 timmar.";
        bookedCard.append(bookedTitle, bookedContent);
        container.append(bookedCard);
      } else if (element === "longTerm") {
        const bookedCard = document.createElement("article");
        bookedCard.classList.add("bookingCard");
        const bookedTitle = document.createElement("h3");
        const bookedContent = document.createElement("p");
        bookedTitle.textContent = "Pensionat";
        bookedContent.textContent =
          "Vi tar hand om din hund som får övernatta hos oss i upp till 5 dagar.";
        bookedCard.append(bookedTitle, bookedContent);
        container.append(bookedCard);
      } else {
        const bookedCard = document.createElement("article");
        bookedCard.classList.add("bookingCard");
        const bookedTitle = document.createElement("h3");
        const bookedContent = document.createElement("p");
        bookedTitle.textContent = "Pälsvård";
        bookedContent.textContent =
          "Din hund kommer få ett härligt bad och professionell pälsvård.";
        bookedCard.append(bookedTitle, bookedContent);
        container.append(bookedCard);
      }
    });
  }
}

function storeBookedService(service) {
  if (bookedServices.length === 0) {
    const previousBookings = JSON.parse(
      localStorage.getItem("storedServices") || "[]",
    );
    previousBookings.forEach((booking) => {
      bookedServices.push(booking);
    });
  }
  if (service) {
    bookedServices.push(service);
    localStorage.setItem("storedServices", JSON.stringify(bookedServices));
  }
  renderBookedServices();
}

halfDayBtn.addEventListener("click", () => {
  storeBookedService("halfDay");
});

fullDayBtn.addEventListener("click", () => {
  storeBookedService("fullDay");
});

longTermBtn.addEventListener("click", () => {
  storeBookedService("longTerm");
});

careBtn.addEventListener("click", () => {
  storeBookedService("care");
});

storeBookedService();

/* Reviews */

const reviews = document.querySelector(".reviewsContainer");
const reviewTitle = document.getElementById("inputTitle");
const reviewContent = document.getElementById("inputContent");


