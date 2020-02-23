// Initialize Firebase
var config = {
    apiKey: "AIzaSyAoZC3_dJn78ZZZo5W90pnsVftaUgB6aHA",
    authDomain: "project-olx818.firebaseapp.com",
    databaseURL: "https://project-olx818.firebaseio.com",
    projectId: "project-olx818",
    storageBucket: "project-olx818.appspot.com",
    messagingSenderId: "768030369876"
};
firebase.initializeApp(config);

/*===================User signin ====================== */
function signin() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((success) => {
            console.log(success)
            localStorage.setItem('userData', JSON.stringify(success))

            var x = document.getElementById("snackbar");

            // Add the "show" class to DIV
            x.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function () {
                x.className = x.className.replace("show", "");
                // console.log('data saved' + obj)
                // alert('data saved in firebase')
                window.location.href = '../index.html'
             }, 3000);
         })
        .catch(function (error) {
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
             console.log(errorMessage)
             alertify.alert('Error' + errorMessage)
             // ...
         });
}
/*===================User signin ====================== */



