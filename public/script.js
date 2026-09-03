const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const answer = document.getElementById("answer");

askButton.addEventListener("click", async () =>{
    const question = questionInput.value.trim();



if(!question){
    answer.textContent = "question is required";
    return
}

answer.textContent = "Thinking...."
askButton.disabled = true

try{
    const response = await fetch("/ask-gemini",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            question:question,
        })
    })

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.error);
    }

    answer.textContent = data.message
}catch(error){
 answer.textContent = error.message
}

askButton.disabled = false;

});