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
/*=================== SERVICE WORKER CODE ===================== */
// please check your browser enable or disable
if('serviceWorker' in navigator){

    window.addEventListener('load',() => {
        navigator.serviceWorker
        .register('./sw.js')
        .then(reg =>
            console.log('Service Worker: Registered')
        )
        .catch(err =>
            console.log(`Service Worker: Error: ${err}`)
        )
    })
}
/*=================== SERVICE WORKER CODE ====================== */

/*===================If signin the below function run ====================== */
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // console.log(user)
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

// window.addEventListener('load', async() => {
//     await getsigninData()
// })

// async function getsigninData() {
//     let getUserFromLocal = await localStorage.getItem('userData');
//     let data = JSON.parse(getUserFromLocal);
//     console.log(data)
//     if (data.user !== 'null') {
//         document.getElementById('signInUser').style.display = 'block'
//         document.getElementById('login').style.display = 'none'
//         document.getElementById('name').innerHTML = data.user.email
//     } else {
//         document.getElementById('signInUser').style.display = 'none'
//         document.getElementById('login').style.display = 'block'

//     }
// }

/*================================================================ */
var messaging = firebase.messaging();
messaging.requestPermission()
    .then(() => {
        console.log('Have Permission')
        return messaging.getToken()
    })
    .then((token) => {
        console.log(token)
    })
    .catch((err) => {
        console.log('Error: ' + err)
    })
/*================================================================ */

function signup() {
    // var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            var obj = {
                // name,
                email,
                password,
                createTime: new Date().toLocaleString()
            }
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/').child('Users/' + userId)
                .set(obj)
                .then(() => {
                    // Get the snackbar DIV
                    var x = document.getElementById("snackbar");

                    // Add the "show" class to DIV
                    x.className = "show";

                    // After 3 seconds, remove the show class from DIV
                    setTimeout(function () {
                        x.className = x.className.replace("show", "");
                        //     // console.log('data saved' + obj)
                        //     // alert('data saved in firebase')
                        window.location.href = './pages/signin.html'
                    }, 3000);



                })
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

/*===================Signin with fb ====================== */
function logfb() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider).then(function (result) {

        var token = result.credential.accessToken;
        console.log(token)
        // The signed-in user info.
        var user = result.user;
        var displayname = user.displayName;
        var email = user.email;
        var phoneNumber = user.phoneNumber;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var userObj = {
            displayname,
            email,
            phoneNumber,
            photoURL,
            createTime: new Date().toLocaleString(),
            uid
        }
        if (user !== null) {
            firebase.database().ref().child(`Users/${userObj.uid}`)
                .set(userObj)
                .then((success) => {
                    localStorage.setItem('userData', JSON.stringify(success))
                    // Get the snackbar DIV
                    var x = document.getElementById("snackbar");

                    // Add the "show" class to DIV
                    x.className = "show";

                    // After 3 seconds, remove the show class from DIV
                    setTimeout(function () {
                        x.className = x.className.replace("show", "");
                        // console.log('data saved' + obj)
                        // alert('data saved in firebase')
                        window.location.href = './index.html'
                    }, 3000);
                    alertify.alert('Success')
                    window.location.href = './pages/adcrte.html'
                })
                .catch((err) => {
                    console.log(err)
                    alertify.alert('Error' + err)
                })
        }



        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        var email = error.email;
        console.log(email)
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(credential)
        // ...
    });
}
/*===================Signin with fb ====================== */
/*=================== LOGOUT ============================= */
function logout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.setItem('userData', JSON.stringify({ user: 'null' }))
            localStorage.removeItem('Client Key')
            alertify.alert('You Logout Successfully')
            window.location.replace('./index.html')
            console.log()
        })
        .catch(function (error) {
            var errorMessage = error.message;
            alertify.alert('Error' + errorMessage)
        })
}
/*===================LOGOUT ====================== */
/*=================== RENDER IN CLOTHES ===================== */
var retriveData = [];
getData()
function getData() {
    firebase.database().ref('/').child('postsAds').on('child_added', (data) => {
        console.log(data.val())
        retriveData.push(data.val())
        renderdata()
    })
}
function renderdata() {
    var view = document.getElementById('view')
    view.innerHTML = ""
    for (var key in retriveData) {
        retriveData[key].keyId = key
        retriveData.map((e) => {
            view.innerHTML += `
            <div class="dis" style="width: 25%">
                <div class="card" >
                    <div class="card-body">
                        <h5 class="card-header">Title: <b>${e.posttitle}</b></h5>
                            <span id="${e.currentUserId}"></span>
                            <img class="card-img-top img-fluid" src="${e.profile}" alt="Card image cap">
                        <h5 class="card-title">Model:   <b>${e.postmodel}</b></h5>
                        <h5 class="card-title">Condition:  <b>${e.strUser}</b></h5>
                            <p class="card-text">Price:<b> Rs. ${e.price}/-</b></p>
                            <p class="card-text">Location:<b> ${e.location}</b></p>
                            <p class="card-text">Categories: <b>${e.strCategories}</b></p>
                            <button onClick="showdata('${e.posttitle}','${e.profile}','${e.strUser}','${e.postdes}','${e.price}','${e.postmodel}','${e.mobile}','${e.location}')" class="btn btn-primary btn-block" data-toggle="modal" data-target="#Modal" > See details</button>
                            <a key="${e.currentUserId}" onClick="startchat(this)" class="btn btn-primary btn-block" href="./pages/chat.html" >Chat With Client</a>
                    </div>
                <div>
            </div>`
        })
    }
}

// startchat()
function startchat(e) {
    var get = e.getAttribute('key')
    console.log(get)
    localStorage.setItem('Client Key', JSON.stringify(get))
    // var get = e.parentNode.firstChild.nextSibling.nextSibling.nextSibling;
    // console.log(get)
    // var getId = document.getElementsByTagName(e.span)
    // console.log(getId)
}





/*============================================================================= */
function showdata(nametitle, phoImg, condit, des, prce, modl, mobi, locate) {
    // console.log(name, img);
    // $('#asd').text(name);
    var title = document.getElementById('nameTitle')
    // var imgModal = document.getElementById('imgAd')
    var conditionModal = document.getElementById('conditionModal')
    var descriptionModal = document.getElementById('descriptionModal')
    var priceModal = document.getElementById('priceModal')
    var modelModal = document.getElementById('modelModal')
    var mobileModal = document.getElementById('mobileModal')
    var locationModal = document.getElementById('locationModal')

    title.innerHTML = 'Title: <b>' + nametitle + '</b>'
    // imgModal.innerHTML = phoImg
    conditionModal.innerHTML = 'Condition: <b> ' + condit + '</b>'
    descriptionModal.innerHTML = 'Description:<b>' + des + '</b>'
    priceModal.innerHTML = 'Price:<b> Rs.' + prce + '/-</b>'
    modelModal.innerHTML = 'Model: <b>' + modl + '</b>'
    mobileModal.innerHTML = 'Mobile / Cell: <b>' + mobi + '</b>'
    locationModal.innerHTML = 'Location: <b>' + locate + '</b>'
}
/*============================================================================== */


/*============================================================================== */

/*=============================FILTER BY OTHERS================================= */
var count = 0
// var other = document.getElementById('other')
// other()
function other() {
    var view = document.getElementById('view')
    var filterData = [];
    firebase.database().ref('postsAds').orderByChild("strCategories").equalTo('others')
        .once("child_added", function (eve) {
            var stringifyData = JSON.stringify(eve.val())
            console.log(stringifyData)
            var parseData = JSON.parse(stringifyData);
            console.log(parseData)
            filterData.push(parseData)
            console.log(filterData)
            view.innerHTML = ""
            for (var key in filterData) {
                filterData[key].keyId = key
                filterData.map((s) => {
                    console.log(s)
                    console.log(s.strCategories)
                    if (s.strCategories === 'others') {
                        view.innerHTML += `
                           <div class="dis" style="width: 25%">
                               <div class="card" >
                                   <div class="card-body">
                                       <h5 class="card-header">Title: <b>${s.posttitle}</b></h5>
                                           <img class="card-img-top img-fluid" src="${s.profile}" alt="Card image cap">
                                       <h5 class="card-title">Model:   <b>${s.postmodel}</b></h5>
                                       <h5 class="card-title">Condition:  <b>${s.strUser}</b></h5>
                                           <p class="card-text">Price:<b> Rs. ${s.price}/-</b></p>
                                           <p class="card-text">Location:<b> ${s.location}</b></p>
                                           <p class="card-text">Categories: <b>${s.strCategories}</b></p>
                                           <button onClick="showdata(${s.posttitle})" class="btn btn-primary" data-toggle="modal" data-target="#Modal" > See details</button>
                                   </div>
                               <div>
                           </div>`
                    }
                    else{
                        console.log('nothing')
                    }
            })
        }
    })
}

/*=============================FILTER BY OTHERS================================= */
/*=============================FILTER BY CAR AND BIKES================================= */
// cars()
function cars() {
    var view = document.getElementById('view')
    var filterData = [];
    firebase.database().ref('postsAds').orderByChild("strCategories").equalTo('cars')
        .once("child_added", function (eve) {
            var stringifyData = JSON.stringify(eve.val())
            console.log(stringifyData)
            var parseData = JSON.parse(stringifyData);
            console.log(parseData)
            filterData.push(parseData)
            console.log(filterData)
            view.innerHTML = ""
            for (var key in filterData) {
                filterData[key].keyId = key
                filterData.map((s) => {
                    console.log(s)
                    console.log(s.strCategories)
                    if (s.strCategories === 'cars') {
                        view.innerHTML += `
                           <div class="dis" style="width: 25%">
                               <div class="card" >
                                   <div class="card-body">
                                       <h5 class="card-header">Title: <b>${s.posttitle}</b></h5>
                                           <img class="card-img-top img-fluid" src="${s.profile}" alt="Card image cap">
                                       <h5 class="card-title">Model:   <b>${s.postmodel}</b></h5>
                                       <h5 class="card-title">Condition:  <b>${s.strUser}</b></h5>
                                           <p class="card-text">Price:<b> Rs. ${s.price}/-</b></p>
                                           <p class="card-text">Location:<b> ${s.location}</b></p>
                                           <p class="card-text">Categories: <b>${s.strCategories}</b></p>
                                           <button onClick="showdata(${s.posttitle})" class="btn btn-primary" data-toggle="modal" data-target="#Modal" > See details</button>
                                   </div>
                               <div>
                           </div>`
                    }
                    else{
                        console.log('nothing')
                    }
            })
        }
    })
}
/*=============================FILTER BY CAR AND BIKES================================= */
/*=============================FILTER BY FURNITURE================================= */
// furniture()
function furniture() {
    var view = document.getElementById('view')
    var filterData = [];
    firebase.database().ref('postsAds').orderByChild("strCategories").equalTo('furniture')
        .once("child_added", function (eve) {
            var stringifyData = JSON.stringify(eve.val())
            console.log(stringifyData)
            var parseData = JSON.parse(stringifyData);
            console.log(parseData)
            filterData.push(parseData)
            console.log(filterData)
            view.innerHTML = ""
            for (var key in filterData) {
                filterData[key].keyId = key
                filterData.map((s) => {
                    console.log(s)
                    console.log(s.strCategories)
                    if (s.strCategories === 'furniture') {
                        view.innerHTML += `
                           <div class="dis" style="width: 25%">
                               <div class="card" >
                                   <div class="card-body">
                                       <h5 class="card-header">Title: <b>${s.posttitle}</b></h5>
                                           <img class="card-img-top img-fluid" src="${s.profile}" alt="Card image cap">
                                       <h5 class="card-title">Model:   <b>${s.postmodel}</b></h5>
                                       <h5 class="card-title">Condition:  <b>${s.strUser}</b></h5>
                                           <p class="card-text">Price:<b> Rs. ${s.price}/-</b></p>
                                           <p class="card-text">Location:<b> ${s.location}</b></p>
                                           <p class="card-text">Categories: <b>${s.strCategories}</b></p>
                                           <button onClick="showdata(${s.posttitle})" class="btn btn-primary" data-toggle="modal" data-target="#Modal" > See details</button>
                                   </div>
                               <div>
                           </div>`
                    }
                    else{
                        console.log('nothing')
                    }
            })
        }
    })
}
/*=============================FILTER BY FURNITURE================================= */

/*=============================FILTER BY HOUSES================================= */
// houses()
function houses() {
    var view = document.getElementById('view')
    var filterData = [];
    firebase.database().ref('postsAds').orderByChild("strCategories").equalTo('houses')
        .once("child_added", function (eve) {
            var stringifyData = JSON.stringify(eve.val())
            console.log(stringifyData)
            var parseData = JSON.parse(stringifyData);
            console.log(parseData)
            filterData.push(parseData)
            console.log(filterData)
            view.innerHTML = ""
            for (var key in filterData) {
                filterData[key].keyId = key
                filterData.map((s) => {
                    console.log(s)
                    console.log(s.strCategories)
                    if (s.strCategories === 'houses') {
                        view.innerHTML += `
                           <div class="dis" style="width: 25%">
                               <div class="card" >
                                   <div class="card-body">
                                       <h5 class="card-header">Title: <b>${s.posttitle}</b></h5>
                                           <img class="card-img-top img-fluid" src="${s.profile}" alt="Card image cap">
                                       <h5 class="card-title">Model:   <b>${s.postmodel}</b></h5>
                                       <h5 class="card-title">Condition:  <b>${s.strUser}</b></h5>
                                           <p class="card-text">Price:<b> Rs. ${s.price}/-</b></p>
                                           <p class="card-text">Location:<b> ${s.location}</b></p>
                                           <p class="card-text">Categories: <b>${s.strCategories}</b></p>
                                           <button onClick="showdata(${s.posttitle})" class="btn btn-primary" data-toggle="modal" data-target="#Modal" > See details</button>
                                   </div>
                               <div>
                           </div>`
                    }
                    else{
                        console.log('nothing')
                    }
            })
        }
    })
}
/*=============================FILTER BY HOUSES================================= */
// function myFunction() {
//     // Declare variables
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById('myInput');
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName('li');

//     // Loop through all list items, and hide those who don't match the search query
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }