function signOut() {
    console.log('ok')
    firebase.auth().signOut().then(function (data) {
        // Sign-out successful.
        console.log(data)
    }).catch(function (error) {
        // An error happened.
    });
    // window.location = 'signIn.html'
}




/* ^^^^^^^fonction ^^^^^^^ */
$(() => {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log('connecter');
            $('#signOut').click(signOut)


            
        } else {
            $('#etatConnexion').css('color','red');

            console.log('déconnecter');
            // User is signed out.
            // ...

        }
    });
})