/*
 * Create a coin flip game that integrates AFG ads in the following way:
 * the player gets +1 score if they guess the coin flip correctly and -1 score if wrong.
 * When they guess the coin flip wrong, the player needs to watch an interstitial ad in order to continue;
 * and when the player's score reaches 0, they need to watch a rewarded ad to continue;
 * or else they need to restart the game.
 */
class Game {
  constructor() {
    // Define variables
    this.score = 0;
    this.choice = "";

    this.canvas = document.getElementById("gameContainer").getContext("2d");
    this.canvas.font = "24px Arial";

    this.playButton = document.getElementById("playButton");
    this.headsButton = document.getElementById("headsButton");
    this.tailsButton = document.getElementById("tailsButton");
    this.muteButton = document.getElementById("muteButton");

    this.rewardMsg = document.getElementById("rewardMsg");
    this.muted = false;
    this.shouldShowAdOnPlay = true;
    this.isRewarded = true;
    this.shouldRestart = false;

    adConfig({ sound: "on", preloadAdBreaks: "auto" });

    // On click listeners for the game's buttons
    this.playButton.addEventListener("click", () => {
      this.erase();
      this.play();
    });

    this.headsButton.addEventListener("click", () => {
      this.choice = "Heads";
      this.flipCoin();
    });

    this.tailsButton.addEventListener("click", () => {
      this.choice = "Tails";
      this.flipCoin();
    });

    this.muteButton.addEventListener("click", () => {
      const soundString = this.muted ? "on" : "off";
      this.muteButton.textContent = this.muted ? "Mute sound" : "Un-mute sound";
      this.muted = !this.muted;
      adConfig({ sound: soundString });
    });

    this.erase();

    //this.canvas.fillText("Loading. . .", 66, 150);
    adBreak({
      type: "preroll",
      name: "coin_flip_preroll",

      adBreakDone: (info) => {
        // Log the preroll result to better understand the break status even when an ad is not shown.
        console.log(`Preroll result: ${info.breakStatus}`);
        this.restartGame();
        this.playButton.style.display = "inline-block";
      },
    });
  }
  play() {
    console.log("Play " + this.shouldShowAdOnPlay + " . " + this.shouldRestart);
    if (this.shouldShowAdOnPlay) {
      adBreak({
        type: "reward",
        name: "one_more_chance",

        afterAd: () => {
          this.enableButtons();
          if (this.shouldRestart) {
            this.restartGame();
          }
          this.shouldRestart = false;
        },
        beforeReward: (showAdFn) => {
          showAdFn();
        },
        adDismissed: () => {
          this.restartGame();
          this.enableButtons();
          try {
            document.getElementById("showadsmodclose").click();
          } catch (error) {}
        },
        adViewed: () => {
          this.restartGame();
          try {
            document.getElementById("showadsmodget").click();
          } catch (error) {}
        },
      });
    }

    if (this.shouldRestart) {
      this.restartGame();
    } else {
      this.canvas.fillText("Score: " + this.score, 8, 26);
      this.canvas.fillText("Heads or Tails?", 66, 150);

      this.headsButton.style.display = "inline-block";
      this.tailsButton.style.display = "inline-block";
    }

    this.shouldRestart = false;
  }
  flipCoin() {
    this.headsButton.disabled = true;
    this.tailsButton.disabled = true;
    this.erase();
    this.canvas.fillText("Score: " + this.score, 8, 26);
    this.canvas.fillText("Flipping coin . . .", 60, 150);
  }

  // Logic for when the coin lands
  coinLanded() {
    this.headsButton.disabled = false;
    this.tailsButton.disabled = false;
    const sideUp = Math.random() < 0.5 ? "Heads" : "Tails";

    if (sideUp === this.choice) {
      this.win(sideUp);
    } else {
      this.lose(sideUp);
    }
  }

  // Check if it's eligible to show rewarded ads
  isEligibleForRewarded() {
    return this.score === 0;
  }

  restartGame() {
    this.erase();
    this.shouldShowAdOnPlay = false;
    this.playButton.style.display = "inline-block";
    setTimeout(() => {
      this.lose();
    }, 500);
  }

  // Guess the flip correctly
  win(sideUp) {
    this.erase();
    this.score += 1;
    this.canvas.fillText("Score: " + this.score, 8, 26);
    this.canvas.fillText("It was " + sideUp + "!", 66, 150);
    this.canvas.fillText("Guess again", 70, 200);
  }

  // Guess the flip incorrectly
  lose(sideUp) {
    this.playButton.style.display = "inline-block";
    this.headsButton.style.display = "none";
    this.tailsButton.style.display = "none";
    this.shouldShowAdOnPlay = true;
    setTimeout(() => {
      this.play();
    }, 500);
  }

  // Erase the canvas
  erase() {}

  enableButtons() {
    this.playButton.disabled = false;
    this.headsButton.disabled = false;
    this.tailsButton.disabled = false;
  }

  disableButtons() {
    this.playButton.disabled = true;
    this.headsButton.disabled = true;
    this.tailsButton.disabled = true;
  }
}
try {
  const game = new Game();
} catch (error) {
  setTimeout(() => {
    const game = new Game();
  }, 4000);
}
