const input = document.getElementById("searchInput");

const outputBox = document.getElementById("outputBox");

const character = document.getElementById("character");
const decimal = document.getElementById("decimal");
const binary = document.getElementById("binary");
const octal = document.getElementById("octal");
const hexadecimal = document.getElementById("hexadecimal");

const message = document.getElementById("message");

// ==========================================
// TYPE INSIDE SEARCH BAR
// ==========================================

input.addEventListener("input", function () {
  const value = input.value;

  // Nothing entered
  if (value.length === 0) {
    outputBox.style.display = "none";
    message.textContent = "";
    return;
  }

  // Get the first character
  const char = value.charAt(0);

  // Calculate ASCII
  showASCII(char);
});

// ==========================================
// KEYBOARD DETECTION
// ==========================================

document.addEventListener("keydown", function (event) {
  /*
        If the user is typing normally inside
        the search box, the input event above
        will handle it.

        So we don't interfere with normal typing.
    */

  if (document.activeElement === input) {
    // Enter
    if (event.key === "Enter") {
      event.preventDefault();

      if (input.value.length > 0) {
        showASCII(input.value.charAt(0));
      }

      return;
    }

    // Tab
    if (event.key === "Tab") {
      event.preventDefault();

      showSpecialKey(9, "Tab");

      return;
    }

    // Escape
    if (event.key === "Escape") {
      event.preventDefault();

      showSpecialKey(27, "Escape");

      return;
    }

    // Backspace
    if (event.key === "Backspace") {
      /*
                Let the browser remove the character.
                The input event will then update the output.
            */

      return;
    }

    /*
            For normal characters, DO NOT manually
            put them into the input again.

            The browser already does this.
        */

    return;
  }

  // ======================================
  // KEYBOARD PRESSED OUTSIDE INPUT
  // ======================================

  if (event.key === "Enter") {
    showSpecialKey(13, "Enter");
    return;
  }

  if (event.key === "Tab") {
    event.preventDefault();

    showSpecialKey(9, "Tab");
    return;
  }

  if (event.key === "Backspace") {
    showSpecialKey(8, "Backspace");
    return;
  }

  if (event.key === "Escape") {
    showSpecialKey(27, "Escape");
    return;
  }

  // Ignore modifier keys

  if (
    event.key === "Shift" ||
    event.key === "Control" ||
    event.key === "Alt" ||
    event.key === "Meta" ||
    event.key === "CapsLock"
  ) {
    showMessage("This key does not have a standard ASCII character code.");

    return;
  }

  // Arrow keys and function keys

  if (event.key.startsWith("Arrow") || event.key.startsWith("F")) {
    showMessage("This key does not have a standard ASCII character code.");

    return;
  }

  // Normal keyboard character

  if (event.key.length === 1) {
    input.value = event.key;

    showASCII(event.key);
  }
});

// ==========================================
// CALCULATE ASCII
// ==========================================

function showASCII(char) {
  const ascii = char.charCodeAt(0);

  // Standard ASCII range
  if (ascii < 0 || ascii > 127) {
    showMessage(
      "This character does not have a standard ASCII character code.",
    );

    return;
  }

  showValues(ascii, char);
}

// ==========================================
// SPECIAL ASCII KEYS
// ==========================================

function showSpecialKey(value, name) {
  input.value = "";

  showValues(value, name);
}

// ==========================================
// DISPLAY VALUES
// ==========================================

function showValues(value, displayChar) {
  // Show output bar
  outputBox.style.display = "block";

  // Clear error
  message.textContent = "";

  // Character
  character.textContent = displayChar;

  // Decimal
  decimal.textContent = value;

  // Binary
  binary.textContent = value.toString(2).padStart(8, "0");

  // Octal
  octal.textContent = value.toString(8);

  // Hexadecimal
  hexadecimal.textContent = value.toString(16).toUpperCase();
}

// ==========================================
// ERROR MESSAGE
// ==========================================

function showMessage(text) {
  outputBox.style.display = "none";

  message.textContent = text;
}

// ==========================================
// CLEAR BUTTON
// ==========================================

function clearInput() {
  input.value = "";

  outputBox.style.display = "none";

  message.textContent = "";

  input.focus();
}
