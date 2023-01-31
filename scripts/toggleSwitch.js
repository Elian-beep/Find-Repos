const btnSearch = document.querySelector("#btnSearch");
const btnRepo = document.querySelector("#btnRepo");
const moveBtn = document.querySelector(".moveBtn");

const areaForm = document.querySelector(".area-form");
const areaRepo = document.querySelector(".area-repo");

btnSearch.addEventListener("click", () => {
    areaForm.classList.remove("hide");
    areaRepo.classList.remove("show");
    moveBtn.classList.remove("rightBtn");
});

btnRepo.addEventListener("click", () => {
    areaForm.classList.add("hide");
    areaRepo.classList.add("show");
    moveBtn.classList.add("rightBtn");
});