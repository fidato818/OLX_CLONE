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
/*===================If signin the below function run ====================== */
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log(user)
        document.getElementById('name').innerHTML = user.email
        document.getElementById('signInUser').style.display = 'block'
        document.getElementById('login').style.display = 'none'
    } else {
        // No user is signed in.
        document.getElementById('name').style.display = 'none'
        document.getElementById('signInUser').style.display = 'none'
        document.getElementById('login').style.display = 'block'
    }
});
/*===================If signin the above function run ====================== */

window.addEventListener('load', async () => {
    await getsigninData()
})

async function getsigninData() {
    let getUserFromLocal = await localStorage.getItem('userData');
    let data = JSON.parse(getUserFromLocal);
    console.log(data)
    if (data.user !== 'null') {
        document.getElementById('signInUser').style.display = 'block'
        document.getElementById('login').style.display = 'none'
        document.getElementById('name').innerHTML = data.user.email
    } else {
        document.getElementById('signInUser').style.display = 'none'
        document.getElementById('login').style.display = 'block'

    }
}



/*===================LOGOUT ====================== */
function logout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.setItem('userData', JSON.stringify({ user: 'null' }))
            localStorage.removeItem('Client Key')
            alertify.alert('You Logout Successfully')
            window.location.replace('./../index.html')
            console.log()
        })
        .catch(function (error) {
            var errorMessage = error.message;
            alertify.alert('Error' + errorMessage)
        })
}
/*===================LOGOUT ====================== */

function mess() {
    var getClientKey = localStorage.getItem('Client Key')
    var parseKey = JSON.parse(getClientKey)
    var userId = firebase.auth().currentUser.uid
    var msg = document.getElementById('msgtext').value
    console.log(parseKey)
    console.log(getClientKey)

    firebase.database().ref(`messages/${parseKey}/${userId}`)
        .push({

            Message: msg,
            senderId: parseKey,
            recivedId: userId,
            createTime: new Date().toLocaleString()
        })
        document.getElementById('msgtext').value = ""
}
var messArr = []
getMessData()
function getMessData() {
    firebase.database().ref('/').child('messages/').on('child_added', (event) => {
        messArr.push(event.val())
        console.log(messArr)
        renData()
    })
}
function renData() {
    var liData = document.getElementById('liData')
    liData.innerHTML = " "
    for (var key in messArr) {
        console.log(messArr[key].msg)
        for (var key2 in messArr[key]) {
            console.log(messArr[key][key2].msg)
            for (var key3 in messArr[key][key2]) {
                console.log(messArr[key][key2][key3].Message)
                messArr[key][key2].keyId = key
                liData.innerHTML += `
            <div class="col-md-8">
                <div class="card-body">
                    <div class="row">
                        <div class="">
                            <div class="card bg-light">
                                <div class="card-body p-2">
                                    <p class="mb-0">
                                    ${messArr[key][key2][key3].Message}
                                    </p>
                                    <div>
                                        <small class="opacity-60">${messArr[key][key2][key3].createTime}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div>
            </div>
                        `
            }
        }
    }
}