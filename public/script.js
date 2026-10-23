const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const answer = document.getElementById("answer");

console.log("JavaScript loaded");
console.log("Button:", askButton);

askButton.addEventListener("click", async () => {

    console.log("Button clicked!");

    const question = questionInput.value.trim();

    if (!question) {
        answer.textContent = "Question is required";
        return;
    }

    answer.textContent = "Thinking...";
    askButton.disabled = true;

    try {

        const response = await fetch("/ask-gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        answer.textContent = data.answer;

    } catch (error) {

        console.error("ERROR:", error);
        answer.textContent = "❌ " + error.message;

    } finally {

        askButton.disabled = false;

    }
});