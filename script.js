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

/* Bokning */
const bookedServices = [];
const bookingSection = document.getElementById("booking");
const displayBookings = document.getElementById("bookingCardContainer");
const displayForm = document.getElementById("formContainer");
let activeBooking;

class Order {
  constructor(service, dog, date) {
    this.service = service;
    this.dog = dog;
    this.date = date;
    this.card;
    this.title;
    this.description;
    this.removeButton;
  }

  getContent() {
    this.title = document.createElement("h3");
    this.title.textContent = this.service;
    this.description = document.createElement("p");
    this.description.classList.add("mediumText");
    this.description.innerHTML =
      'Du har bokat tjänsten "' +
      this.service.toLowerCase() +
      '" hos oss, till din hund ' +
      this.dog +
      ", datumet " +
      this.date +
      ". Vad kul!"
  }

  createCard() {
    this.card = document.createElement("article");
    this.card.classList.add("bookingCard");
    this.getContent();
    this.removeButton = document.createElement("button");
    this.removeButton.textContent = "Ta bort";
    this.removeButton.classList.add("removeButton");
    this.card.append(this.title, this.description, this.removeButton);
    displayBookings.append(this.card);
  }

  removeSelf() {
    this.card.remove();
  }
}

function bookingForm(service) {
  const formTitle = document.getElementById("formTitle");

  formTitle.textContent = "Boka: " + service;
  displayForm.style.display = "flex";
}

const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const dogName = document.getElementById("dogName").value;
  const date = document.getElementById("date").value;
  const toSubmit = { service: activeBooking, dog: dogName, date: date };
  bookedServices.push(toSubmit);
  displayForm.style.display = "none";
  renderBookings();
});

function checkStorage() {
  if (localStorage.length !== 0 && bookedServices.length === 0) {
    const storage = JSON.parse(localStorage.getItem("storedBookings") || "[]");
    storage.forEach((booking) => {
      bookedServices.push(booking);
    });
  }
  localStorage.setItem("storedBookings", JSON.stringify(bookedServices));
}

function updateStorage() {
  localStorage.setItem("storedBookings", JSON.stringify(bookedServices));
}

function renderBookings() {
  checkStorage();
  if (bookedServices.length !== 0) {
    displayBookings.innerHTML = "";
  }

  const toRender = JSON.parse(localStorage.getItem("storedBookings") || "[]");
  toRender.forEach((item, index) => {
    const card = new Order(item.service, item.dog, item.date);
    card.createCard();
    card.removeButton.addEventListener("click", () => {
      card.removeSelf();
      bookedServices.splice(index, 1);
      updateStorage();
      if (bookedServices.length === 0) {
        renderPlaceHolder();
      }
    });
  });
}

function renderPlaceHolder() {
  displayBookings.innerHTML = "";
  const placeholder = new Order("Inga bokningar ännu");
  placeholder.createCard();
  placeholder.description.textContent =
    "När du bokat ett tjänst hos oss kommer den dyka upp här";
  placeholder.removeButton.remove();
}

const halfDayBtn = document.getElementById("halfDayBtn");
halfDayBtn.addEventListener("click", () => {
  bookingForm("Halvdag");
  activeBooking = "Halvdag";
});

const fullDayBtn = document.getElementById("fullDayBtn");
fullDayBtn.addEventListener("click", () => {
  bookingForm("Heldag");
  activeBooking = "Heldag";
});

const longTermBtn = document.getElementById("longTermBtn");
longTermBtn.addEventListener("click", () => {
  bookingForm("Pensionat");
  activeBooking = "Pensionat";
});

const careBtn = document.getElementById("careBtn");
careBtn.addEventListener("click", () => {
  bookingForm("Pälsvård");
  activeBooking = "Pälsvård";
});

const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", () => {
  displayForm.style.display = "none";
});

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", () => {
  renderPlaceHolder();
});

renderBookings();

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
