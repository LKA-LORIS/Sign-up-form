window.addEventListener('load', function () {

    setTimeout(function () {
        var body = document.querySelector('body');
        body.classList.add('loaded');
    }, 1000);
});


/* Déclaration des variables */
var formSignin = document.getElementById('form__signin');
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var email = document.getElementById('email');
var password = document.getElementById('password');
var tooltips = document.querySelectorAll('.message');
var iconError = document.querySelectorAll('.icon--error');

/* Désactivation des infobulles */
function desactivateTooltips() {
    tooltipsLength = tooltips.length;

    for (var i = 0; i < tooltipsLength; i++) {
        tooltips[i].style.display = 'none';
    }
}

/* Récuperation des tooltips pour chaque input */
function getTooltip(element) {
    while (element = element.parentNode) {
        while (element = element.nextSibling) {
            if (element.className === 'message') {
                return element;
            }
        }
    }
    return false;
}

/* Vérification de l'email à l'aide de Regex */
function validationEmail(email) {
    var result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return result.test(String(email).toLowerCase());
}

var check = {}

check['firstname'] = function () {

    tooltipStyle = getTooltip(firstname).style;

    if (firstname.value == '') {

        firstname.className = 'error';
        tooltipStyle.display = 'block';
        iconError[0].style.display = 'block';
        tooltips[0].innerHTML = 'First Name cannot be empty';
        return false;

    } else {

        firstname.className = 'success';
        tooltipStyle.display = 'none';
        iconError[0].style.display = 'none';
        tooltips[0].innerHTML = '';
        return true;

    }
}

check['lastname'] = function () {

    tooltipStyle = getTooltip(lastname).style;

    if (lastname.value == '') {

        lastname.className = 'error';
        tooltipStyle.display = 'block';
        iconError[1].style.display = 'block';
        tooltips[1].innerHTML = 'Last Name cannot be empty';
        return false;

    } else {

        lastname.className = 'success';
        tooltipStyle.display = 'none';
        iconError[1].style.display = 'none';
        tooltips[1].innerHTML = '';
        return true;

    }
}

check['email'] = function () {

    var emailValue = email.value;

    tooltipStyle = getTooltip(email).style;

    if (!validationEmail(emailValue)) {

        if (emailValue.length == "") {

            email.className = 'error';
            tooltipStyle.display = 'block';
            iconError[2].style.display = 'block';
            tooltips[2].innerHTML = 'Email cannot be empty';
            return false;

        } else {

            email.className = 'error';
            tooltipStyle.display = 'block';
            iconError[2].style.display = 'block';
            tooltips[2].innerHTML = 'Looks like this is not an email';
            return false;

        }

    } else {

        email.className = 'success';
        tooltipStyle.display = 'none';
        iconError[2].style.display = 'none';
        return true;

    }
}

check['password'] = function () {

    tooltipStyle = getTooltip(password).style;

    if (password.value == '') {

        password.className = 'error';
        tooltipStyle.display = 'block';
        iconError[3].style.display = 'block';
        tooltips[3].innerHTML = 'Password cannot be empty';
        return false;

    } else {

        password.className = 'success';
        tooltipStyle.display = 'none';
        iconError[3].style.display = 'none';
        tooltips[3].innerHTML = ''
        return true;

    }
}

function checkForms() {

    inputs = document.querySelectorAll('input[type=text], input[type=email], input[type=password]');
    inputsLength = inputs.length;

    for (var i = 0; i < inputsLength; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            check[e.target.id](e.target.id);
        });
    }

    formSignin.addEventListener('submit', function (e) {
        e.preventDefault();
        var resultat = true;

        for (var i in check) {
            resultat = check[i](i) && resultat;
        }

        if (resultat) {

            /* VIDE LES CHAMPS */
            firstname.value = "";
            lastname.value = "";
            email.value = "";
            password.value = "";

            /* APPARITION DE LA MODALE */
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";

            span.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        }
        e.preventDefault();
    });
};

checkForms();

desactivateTooltips();