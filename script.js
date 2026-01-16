document.addEventListener("DOMContentLoaded", () => {
  const cake = document.getElementById("cake");
  const introText = document.getElementById("introText");
  const message = document.getElementById("message");
  const music = document.getElementById("bg-music");

  if (!cake || !introText || !message) {
    console.error("Required elements not found");
    return;
  }

  // ----------------------------
  // 🔁 MODE SWITCH
  // ----------------------------
  const USE_TEST_TIMER = false; // 👈 change to false for real timer

  // ----------------------------
  // INITIAL STATE
  // ----------------------------
  cake.style.display = "none";
  introText.style.display = "none";

  // CREATE TIMER ELEMENT
  const timer = document.createElement("div");
  timer.id = "timer";
  document.body.prepend(timer);

  // ----------------------------
  // ⏱️ TEST TIMER (SECONDS)
  // ----------------------------
  if (USE_TEST_TIMER) {
    let timeLeft = 10; // change to 5, 3, etc.

    const testInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(testInterval);
        timer.remove();
        showCake();
        return;
      }

      timer.innerHTML = `
        <h2>${timeLeft}s</h2>
        <p>until something special ✨</p>
      `;

      timeLeft--;
    }, 1000);
  }

  // ----------------------------
  // 📅 REAL DATE TIMER
  // ----------------------------
  else {
    const targetDate = new Date("January 18, 2026 00:00:00").getTime();

    const realInterval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(realInterval);
        timer.remove();
        showCake();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      timer.innerHTML = `
        <h2>${days}d ${hours}h ${mins}m ${secs}s</h2>
        <p>until something special ✨</p>
      `;
    }, 1000);
  }

  // ----------------------------
  // 🎂 SHOW CAKE + TEXT
  // ----------------------------
  function showCake() {
    cake.style.display = "block";
    introText.style.display = "block";
  }

  // ----------------------------
  // 🎂 CAKE CLICK
  // ----------------------------
  let clicked = false;
  cake.addEventListener("click", () => {
    if (clicked) return;
    clicked = true;

    introText.style.display = "none";
    message.classList.remove("hidden");

    if (music) music.play();
  });
});
