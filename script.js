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
        "Vi stänger om: " +
        closesIn[0] +
        ":" +
        closesIn[1] +
        ":" +
        closesIn[2];
    } else {
      /* Om det är lördag */
      const closesIn = [13 - hour, 60 - minute, 60 - second];
      for (let i = 0; i < 3; i++) {
        if (closesIn[i] < 10) {
          closesIn[i] = "0" + closesIn[i];
        }
      }
      clock.textContent =
        "Vi stänger om: " +
        closesIn[0] +
        ":" +
        closesIn[1] +
        ":" +
        closesIn[2];
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
  const currentMinute = currentTime.getMinutes() - 1;
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

setInterval(checkTime, 1000);
