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
    this.shouldShowAdOnPlay = false;
    this.isRewarded = true;
    this.shouldRestart = false;

    adConfig({ sound: "on", preloadAdBreaks: "on" });

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

    this.canvas.fillText("Loading. . .", 66, 150);
    adBreak({
      type: "preroll",
      name: "coin_flip_preroll",
      adBreakDone: (info) => {
        // Log the preroll result to better understand the break status even when an ad is not shown.
        console.log(`Preroll result: ${info.breakStatus}`);
        this.erase();
        this.playButton.style.display = "inline-block";
      },
    });
  }

  // Start the game
  play() {
    if (this.isEligibleForRewarded() && this.shouldShowAdOnPlay) {
      adBreak({
        type: "reward",
        name: "one_more_chance",
        beforeAd: () => {
          this.disableButtons();
        },
        afterAd: () => {
          this.enableButtons();
          if (this.shouldRestart) {
            this.restartGame();
          }
          this.shouldRestart = false;
        },
        beforeReward: (showAdFn) => {
          const r = confirm("Watch this video to get one more chance?");
          if (r) {
            showAdFn();
          } else {
            alert("You need to restart the game");
            this.shouldRestart = true;
          }
        },
        adDismissed: () => {
          this.shouldRestart = true;
        },
        adViewed: () => {
          /*
           * This is normally the place where a reward is given, but
           * in this specific instance, action is done in "adDismissed".
           */
        },
      });
    } else {
      if (this.shouldShowAdOnPlay) {
        adBreak({
          type: "next",
          name: "continue_game",
          beforeAd: () => {
            this.disableButtons();
          },
          afterAd: () => {
            this.enableButtons();
          },
        });
      }
    }

    if (this.shouldRestart) {
      this.restartGame();
    } else {
      this.canvas.fillText("Score: " + this.score, 8, 26);
      this.canvas.fillText("Heads or Tails?", 66, 150);
      this.playButton.style.display = "none";
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

    setTimeout(() => {
      this.coinLanded();
    }, 2000);
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
    this.headsButton.style.display = "none";
    this.tailsButton.style.display = "none";
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
    this.erase();
    if (this.score >= 1) {
      this.score -= 1;
    }
    this.canvas.fillText("Sorry, it was " + sideUp, 50, 100);
    this.canvas.fillText("Your score was " + this.score, 50, 150);
    this.canvas.fillText("Want to play again?", 45, 200);

    this.playButton.style.display = "inline-block";
    this.headsButton.style.display = "none";
    this.tailsButton.style.display = "none";
    this.shouldShowAdOnPlay = true;
  }

  // Erase the canvas
  erase() {
    this.canvas.fillStyle = "#ADD8E6";
    this.canvas.fillRect(0, 0, 300, 300);
    this.canvas.fillStyle = "#000000";
  }

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
  }, 3000);
}
