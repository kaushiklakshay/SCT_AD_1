let inputBox = document.getElementById("inputBox");

// Add click event to all buttons
let buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        let value = button.textContent;

        // Handle DEL button
        if (button.classList.contains("del")) {
            inputBox.value = inputBox.value.slice(0, -1);
            if (inputBox.value === "") {
                inputBox.value = "";
            }

        // Handle AC (All Clear) button
        } else if (button.classList.contains("ac")) {
            inputBox.value = "";

        // Handle = (Equal) button
        } else if (button.classList.contains("equalBtn")) {
            if (inputBox.value === "") return;

            try {
                let result = eval(inputBox.value);

                // Handle division by zero
                if (!isFinite(result)) {
                    inputBox.value = "Error";
                } else {
                    // Avoid floating point display issues
                    inputBox.value = parseFloat(result.toFixed(10));
                }
            } catch (e) {
                inputBox.value = "Error";
            }

        // Prevent double operators or starting with an operator (except -)
        } else if (["+", "*", "/", "%"].includes(value)) {
            if (inputBox.value === "") return;

            let lastChar = inputBox.value.slice(-1);
            if (["+", "-", "*", "/", "%"].includes(lastChar)) {
                inputBox.value = inputBox.value.slice(0, -1) + value;
            } else {
                inputBox.value += value;
            }

        // Prevent multiple dots in the same number
        } else if (value === ".") {
            let parts = inputBox.value.split(/[\+\-\*\/\%]/);
            let lastPart = parts[parts.length - 1];
            if (lastPart.includes(".")) return;
            if (lastPart === "") {
                inputBox.value += "0.";
            } else {
                inputBox.value += ".";
            }

        // Default: append digit to display
        } else {
            if (inputBox.value === "Error") {
                inputBox.value = value;
            } else {
                inputBox.value += value;
            }
        }
    });
});

// Optional: Keyboard support
document.addEventListener("keydown", function(e) {
    let key = e.key;

    if ((key >= "0" && key <= "9") || key === ".") {
        inputBox.value += key;
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        if (inputBox.value !== "") inputBox.value += key;
    } else if (key === "%" ) {
        if (inputBox.value !== "") inputBox.value += key;
    } else if (key === "Enter" || key === "=") {
        if (inputBox.value !== "") {
            try {
                let result = eval(inputBox.value);
                inputBox.value = isFinite(result) ? parseFloat(result.toFixed(10)) : "Error";
            } catch {
                inputBox.value = "Error";
            }
        }
    } else if (key === "Backspace") {
        inputBox.value = inputBox.value.slice(0, -1);
    } else if (key === "Escape") {
        inputBox.value = "";
    }
});