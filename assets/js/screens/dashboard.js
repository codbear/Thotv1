import "../../scss/appSettings.css";
import Dashboard from "../modules/Dashboard";

const $navLinks = document.querySelectorAll('.nav-link');

let dashboard;

const openDashboard = async function (e) {
    e.preventDefault();
    $navLinks.forEach($navLink => $navLink.classList.remove('active'));
    e.target.classList.add('active');
    dashboard = new Dashboard(document.getElementById('dashboard'), e.target.dataset.section);
}

$navLinks.forEach($navLink => $navLink.addEventListener('click', openDashboard));