


document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const feedback = document.getElementById("feedback");
  const signInButton = document.getElementById("signInButton");
  const checkButton = document.getElementById("checkButton");

  checkButton.addEventListener("click", () => {
    status.textContent = "Extension is working.";
    feedback.textContent = "Test successful!";
  });

  signInButton.addEventListener("click", () => {
    feedback.textContent = "Requesting Google authentication...";
    signInButton.disabled = true;

    try {
      chrome.identity.getAuthToken(
        { interactive: true },
        (token) => {
          const error = chrome.runtime.lastError;

          signInButton.disabled = false;

          if (error) {
            feedback.textContent = "Google sign-in error: " + error.message;
            console.error("OAuth error:", error.message);
            return;
          }

          if (!token) {
            feedback.textContent = "No access token was returned.";
            console.error("OAuth completed without a token.");
            return;
          }

          status.textContent = "Google account connected.";
          feedback.textContent = "Sign-in successful!";
          console.log("OAuth succeeded; access token received.");
        }
      );
    } catch (error) {
      signInButton.disabled = false;
      feedback.textContent = "Unexpected error: " + error.message;
      console.error("Unexpected OAuth error:", error);
    }
  });
});
