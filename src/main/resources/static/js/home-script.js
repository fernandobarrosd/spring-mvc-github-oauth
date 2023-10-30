const { protocol, hostname, port } = window.location;
const requestBaseURL = `${protocol}//${hostname}:${port}`;


async function requestGithubUserData() {
    const response =  await fetch(`${requestBaseURL}/user`);
    return await response.json();
}


function createHTMLOfAuthenticatedGithubUserData({ avatar_url, login, name }) {
    return `
        <div class="c-profile">
            <img src="${avatar_url}" 
            class="c-profile__img">
            <span class="c-profile__text">
                Username: ${login}
            </span>
            <span class="c-profile__text">
                Name: ${name}
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


function addLoadingToPage(parent, position) {
    const loadingHTML = createLoadingHTML("Carregando dados do usuário");
    parent.insertAdjacentHTML(position, loadingHTML);
}

window.addEventListener("load", async () => {
    const githubSectionProfile = document.querySelector(".c-section-profile");
    addLoadingToPage(githubSectionProfile, "beforeend");


    try {
        const githubUserData = await requestGithubUserData();
        const githubUserProfileHTML = 
        createHTMLOfAuthenticatedGithubUserData(githubUserData);
        
        githubSectionProfile.insertAdjacentHTML("beforeend", githubUserProfileHTML);


    }
    catch(e) {

    }
    finally {
        toogleLoading();
    }
});