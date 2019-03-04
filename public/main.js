
const AjaxModule = window.AjaxModule;

const root = document.getElementById("root");

function createMainMenu () {

};

createMainMenu();

function temp(template) {
  document.getElementById("menu").innerHTML += template();
};

function loadHandlebarsTemplate(url, callback) {
    if (url == '/') {
      url = '/menu.html';
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var raw = xhr.responseText;
            var compiled = Handlebars.compile(raw);
            callback(compiled);
        }
    };
    xhr.send();
}

let tempUrl = '/menu.html'

loadHandlebarsTemplate(tempUrl, temp);
