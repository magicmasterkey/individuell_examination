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

/* Jag ber om ursäkt till dig som läser denna kod, men detta funkar */
function displayClock(day, hour, minute, second, status) {
  const clock = document.getElementById("clock");

  if (status === true) {
    /* Om det är öppet */
    if (day < 6) {
      /* Om det är vardag */
      const closesIn = [17 - hour, 60 - minute, 60 - second];
      /* Läste in på tillräckligt i tid så har återuppfunnit hjulet, eller i detta fall manuellt lagt till en nolla framför för att alltid ha tvåsiffrigt */
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

/* Bokade tjänster */
let bookedServices = [];

const bookingSection = document.getElementById("booking");
const halfDayBtn = document.getElementById("halfDayBtn");
const fullDayBtn = document.getElementById("fullDayBtn");
const longTermBtn = document.getElementById("longTermBtn");
const careBtn = document.getElementById("careBtn");
const container = document.getElementById("bookingCardContainer");

class Order {
  constructor(service, dog) {
    this.service = service;
    this.dog = dog;
  }

  createCard() {}

  removeSelf() {}
}

function bookingForm(service) {
  
}

halfDayBtn.addEventListener("click", () => {
  bookingForm(halfDay);
});

fullDayBtn.addEventListener("click", () => {
  bookingForm(fullDay);
});

longTermBtn.addEventListener("click", () => {
  bookingForm(longTerm);
});

careBtn.addEventListener("click", () => {
  bookingForm(care);
});

const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", () => {
  container.innerHTML = "";
  bookedServices = [];
  localStorage.setItem("storedServices", JSON.stringify(bookedServices));

  const bookedCard = document.createElement("article");
  bookedCard.classList.add("bookingCard");
  const bookedTitle = document.createElement("h3");
  const bookedContent = document.createElement("p");
  bookedContent.classList.add("mediumText");
  bookedTitle.textContent = "Inga bokningar ännu.";
  bookedContent.textContent =
    "När du bokat ett tjänst hos oss kommer den dyka upp här";
  bookedCard.append(bookedTitle, bookedContent);
  container.append(bookedCard);
});

/* Recensioner */
const reviewTitle = document.getElementById("reviewTitle");
const reviewScore = document.getElementById("reviewScore");
const reviewContent = document.getElementById("reviewContent");
const author = document.getElementById("author");

const nextReview = document.getElementById("nextReview");

class Review {
  constructor(title, score, content, author) {
    this.title = title;
    this.score = score;
    this.content = content;
    this.author = author;
  }

  getTitle() {
    return this.title;
  }

  getScore() {
    return this.score;
  }

  getContent() {
    return this.content;
  }

  getAuthor() {
    return this.author;
  }
}

const r1 = new Review(
  "Dunderbra!",
  "10/10",
  "Ett fantastiskt hundpensionat med kunnig och omtänksam personal som verkligen bryr sig om hundarna.",
  "-Jocke Ek",
);

const r2 = new Review(
  "Trevlig personal",
  "9/10",
  "Trevlig personal och utmärkt service – vi lämnar gärna vår hund här igen.",
  "-Maggan Bengtsson",
);

const r3 = new Review(
  "Vovvens nya favorit!",
  "9/10",
  "Vår hund trivdes jättebra och kom hem både glad och nöjd!",
  "-Sven Larsson",
);

const r4 = new Review(
  "Väldigt professionella.",
  "10/10",
  "Tryggt, rent och välskött hundpensionat som vi varmt rekommenderar.",
  "-Stina Gren",
);

const r5 = new Review(
  "Rekommenderar!",
  "8/10",
  "Ett toppenställe där hundarna får massor av kärlek, omsorg och uppmärksamhet.",
  "-Lena Stenmark",
);

function displayRandomReview() {
  const chosenReview = Math.floor(Math.random() * 5) + 1;

  if (chosenReview === 1) {
    reviewTitle.textContent = r1.getTitle();
    reviewScore.textContent = r1.getScore();
    reviewContent.textContent = r1.getContent();
    author.textContent = r1.getAuthor();
  } else if (chosenReview === 2) {
    reviewTitle.textContent = r2.getTitle();
    reviewScore.textContent = r2.getScore();
    reviewContent.textContent = r2.getContent();
    author.textContent = r2.getAuthor();
  } else if (chosenReview === 3) {
    reviewTitle.textContent = r3.getTitle();
    reviewScore.textContent = r3.getScore();
    reviewContent.textContent = r3.getContent();
    author.textContent = r3.getAuthor();
  } else if (chosenReview === 4) {
    reviewTitle.textContent = r4.getTitle();
    reviewScore.textContent = r4.getScore();
    reviewContent.textContent = r4.getContent();
    author.textContent = r4.getAuthor();
  } else {
    reviewTitle.textContent = r5.getTitle();
    reviewScore.textContent = r5.getScore();
    reviewContent.textContent = r5.getContent();
    author.textContent = r5.getAuthor();
  }
}

nextReview.addEventListener("click", () => {
  displayRandomReview();
});

displayRandomReview();
