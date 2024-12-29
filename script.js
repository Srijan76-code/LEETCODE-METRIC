const searchBtn = document.querySelector("#search-btn");
const inputUsername = document.querySelector("#input-username");

function progressBar(solved, total, circle_id) {
    const progress = (solved / total) * 100;
    const circleId = document.querySelector(`#${circle_id}`);
    circleId.style.setProperty("--progress-degree", `${progress}%`);
    circleId.innerHTML = `${progress.toFixed(2)}%`;

}

async function fetchData(username) {
    document.querySelector(".error").style.visibility = "hidden";
    document.querySelector(".progress").style.visibility = "hidden";

    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    searchBtn.textContent = "Searching...";
    searchBtn.disabled = true;
    const response = await fetch(url);
    const data = await response.json();



    if (data.status == "error") {
        const error = document.querySelector(".error");

        error.style.visibility = "visible";
        inputUsername.value = "";
        searchBtn.textContent = "Search";
        searchBtn.disabled = false;

    }

    else {

        inputUsername.value = "";

        searchBtn.textContent = "Search";
        searchBtn.disabled = false;


        document.querySelector(".progress").style.visibility = "visible";

        // Updating Info:-
        document.querySelector(".ranking").innerHTML = `Rank: ${data.ranking}`;
        document.querySelector("#user_name").innerHTML = username;

        // Updating Progress Circle:-
        progressBar(data.totalSolved, data.totalQuestions, 'circle-all');
        progressBar(data.easySolved, data.totalEasy, 'circle-easy');
        progressBar(data.mediumSolved, data.totalMedium, 'circle-medium');
        progressBar(data.hardSolved, data.totalHard, 'circle-hard');

        // Updating Progress Bar:-
        document.querySelector("#all_ques").innerHTML = `${data.totalSolved}/${data.totalQuestions}`;
        document.querySelector("#easy_ques").innerHTML = `${data.easySolved}/${data.totalEasy}`;
        document.querySelector("#medium_ques").innerHTML = `${data.mediumSolved}/${data.totalMedium}`;
        document.querySelector("#hard_ques").innerHTML = `${data.hardSolved}/${data.totalHard}`;





    }



}



searchBtn.addEventListener("click", () => {
    username = inputUsername.value;
    fetchData(username);
})