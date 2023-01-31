const formSearch = document.getElementById('formSearch');
const inptUser = document.getElementById('githubUser');
const btnSubmit = document.getElementById('btnSubmit');

// ITEM QUE SERÃO PREENCHIDOS PELA API
const nRepo = document.getElementById('nRepo');
const nFollowing = document.getElementById('nFollowing');
const nFollowers = document.getElementById('nFollowers');
const bio = document.getElementById('bio');
const profileImg = document.getElementById('profileImg');
const btnPort = document.getElementById('btnPort');
const username = document.getElementById('username');

// LISTA DE REPOSITÓRIOS
const listRepo = document.getElementById('listRepo');

formSearch, addEventListener("submit", event => {
    event.preventDefault();
});

function getGithubAPI(nameUser) {
    // INSERIR DADOS INICIAIS AO CABEÇALHO
    fetch(`https://api.github.com/users/${nameUser}`)
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            if (res.status == 200) {
                let userFound = await res.json();

                nRepo.innerHTML = userFound.public_repos;
                nFollowing.innerHTML = userFound.following;
                nFollowers.innerHTML = userFound.followers;
                bio.innerHTML = userFound.bio;
                profileImg.setAttribute('src', userFound.avatar_url);
                btnPort.setAttribute('href', `https://${userFound.blog}`);
                username.innerHTML = userFound.name;
            }
        })
        .catch(err => {
            console.log(err, "usuario nao encontrado")
            //CRIAR MENSAGEM DE USUARIO NAO ENCONTRADO
        });

    fetch(`https://api.github.com/users/${nameUser}/repos`)
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            if (res.status == 200) {
                let repoFound = await res.json();

                repoFound.map(item => {
                    let liCard = document.createElement('li');
                    liCard.classList.add('card');

                    liCard.innerHTML = `
                        <img src="./assets/capa_default.jpg" id="repoCapa" alt="capa padrão de projeto">
                        <p class="desc" id="repoDesc">${item.description}</p>
                        <div class="card-buttons">
                            <a class="btn-repo" id="btnRepo" target="_blank">Ver no github</a>
                            <a class="btn-visit" id="btnVisit" target="_blank">Acessar aplicação</a>
                        </div>
                    `;

                    listRepo.appendChild(liCard);
                });
            }
        })
        .catch(err => {
            console.log(err, "repositórios não encontrados")
            //CRIAR MENSAGEM DE USUARIO NAO ENCONTRADO
        });
}

btnSubmit.addEventListener("click", () => {
    getGithubAPI(inptUser.value);
});
