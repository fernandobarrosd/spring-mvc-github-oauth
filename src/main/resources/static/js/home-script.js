const requestBaseURL = "http://localhost:8080";


async function requestGithubUserData() {
    const response =  await fetch(`${requestBaseURL}/user`);
    return await response.json();
}


function createHTMLOfAuthenticatedGithubUserData(githubUserData) {
    return `
        <div class="c-profile">
            <img src="${githubUserData.avatar_url}" 
            class="c-profile__img">
            <span class="c-profile__text">
                Username: ${githubUserData.login}
            </span>
            <span class="c-profile__text">
                Name: ${githubUserData.name}
            </span>
        </div>
    `;
}


function toogleLoading() {
    const loadingContainer = document.querySelector(".c-loading");
    loadingContainer.classList.toggle("c-loading--visible");
}

function createLoadingHTML(loadingMessage) {
    return `
    <div class="c-loading c-loading--visible">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <span class="c-loading__text">${loadingMessage}</span>
    </div>
    `;
}


function addLoadingToPage(parent) {
    const loadingHTML = createLoadingHTML("Carregando dados do usuário");
    parent.insertAdjacentHTML("beforeend", loadingHTML);
}

window.addEventListener("load", async () => {
    const githubSectionProfile = document.querySelector(".c-section-profile");
    addLoadingToPage(githubSectionProfile);


    try {
        const githubUserData = await requestGithubUserData();
        const githubUserProfileHTML = createHTMLOfAuthenticatedGithubUserData(githubUserData);
        
        githubSectionProfile.insertAdjacentHTML("beforeend", githubUserProfileHTML);


    }
    catch(e) {

    }
    finally {
        toogleLoading();
    }
});