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

// window.addEventListener('load', async () => {
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

var arrPost = []
function postAd() {
    var posttitle = document.getElementById('posttitle').value
    var dropdownvalue = document.getElementById('dropdownvalue')
    var strUser = dropdownvalue.options[dropdownvalue.selectedIndex].value;
    var cate = document.getElementById('cate')
    var strCategories = cate.options[cate.selectedIndex].value;
    var postmodel = document.getElementById('postmodel').value
    var postdes = document.getElementById('postdes').value
    var price = document.getElementById('price').value
    var mobile = document.getElementById('mobile').value
    var location = document.getElementById('location').value
    var file = document.getElementById('file').files[0]
    var key = firebase.database().ref('/').child('postsAds').push().key
    var currentUserId = firebase.auth().currentUser.uid
    var postObj = {
        strUser,
        strCategories,
        posttitle,
        postmodel,
        postdes,
        price,
        mobile,
        location,
        file,
        key,
        currentUserId
    }
    arrPost.push(postObj)
    console.log(arrPost)
    localStorage.setItem('arrPost', JSON.stringify(arrPost))
    let storage = firebase.storage().ref().child(`profile/${file.name}`)
    storage.put(file)
        .then((image) => {
            image.ref.getDownloadURL()
                .then((urlRef) => {
                    postObj.profile = urlRef;
                    console.log(postObj)
                    firebase.database().ref('/').child(`postsAds/${key}`)
                        .set(postObj)
                        .then(() => {
                            var x = document.getElementById("adpost");

                            // Add the "show" class to DIV
                            x.className = "show";

                            // After 3 seconds, remove the show class from DIV
                            setTimeout(function () {
                                x.className = x.className.replace("show", "");
                                // console.log('data saved' + obj)
                                // alert('data saved in firebase')
                            }, 3000);
                        })
                    document.getElementById('posttitle').value = ''
                    document.getElementById('postmodel').value = ''
                    document.getElementById('postdes').value = ''
                    document.getElementById('price').value = ''
                    document.getElementById('mobile').value = ''
                    document.getElementById('location').value = ''
                    document.getElementById('file').files[0] = ''
                })
        })
}



/*===================LOGOUT ====================== */
function logout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.setItem('userData', JSON.stringify({ user: 'null' }))
            var x = document.getElementById("snackbar");

            // Add the "show" class to DIV
            x.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function () {
                x.className = x.className.replace("show", "");
                // console.log('data saved' + obj)
                // alert('data saved in firebase')
                window.location.replace('./index.html')
            }, 3000);

        })
        .catch(function (error) {
            var errorMessage = error.message;
            alertify.alert('Error' + errorMessage)
        })
}
/*===================LOGOUT ====================== */
