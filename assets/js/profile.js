/* ^^^^^ les fonctions^^^^^^ */
document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(function (user) {
        userId = user.uid

        if (user) {
            getDatabase()
            $('#etatConnexion').css('color', 'green');
            $('#etatConnexion').html('En ligne  <i class="fas fa-circle"></i>');
            // User is signed in.
            console.log('connecter');
            $('#validerSave').click(() => {

                saveDatabase();





            })

        } else {
            console.log('deconnecter');

            $('#etatConnexion').css('color', 'red');
            // $('#signOut').css('display','none');
            window.location = 'signIn.html';

            // User is signed out.
            // ...

        }
        // document.getElementById('total').style.display = 'none';
    });

})

function saveDatabase() {
    const name = $('#nameInput').val();
    const firstname = $('#firstnameInput').val();
    const pseudo = $('#pseudoInput').val();

    const profile = {
        name,
        firstname,
        pseudo,
    }

    firebase.database().ref('users/' + userId + '/profile/').set(profile).then(() => {
            alert('Vos informations ont bien été enregistrées');

        })
        .catch((error) => {
            alert('Code :' + error.code + '\nMessage :' + error.message);
        });
}


function getDatabase() {
    firebase.database().ref('/users/' + userId + '/profile/').once('value').then(function (snapshot) {
        // tasksArr = JSON.parse(localStorage.getItem('tasks'));
        if (snapshot.val()) {
            console.log(snapshot.val())
            document.getElementById('nameInput').value = snapshot.val().name
            document.getElementById('firstnameInput').value = snapshot.val().firstname
            document.getElementById('pseudoInput').value = snapshot.val().pseudo
        } else {
            document.getElementById('nameInput').value = ''
            document.getElementById('firstnameInput').value = ''
            document.getElementById('pseudoInput').value = ''

        }

    }).catch((error) => {
        alert('Code :' + error.code + '\nMessage :' + error.message);
    });
}