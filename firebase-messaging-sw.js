importScripts('https://www.gstatic.com/firebasejs/5.8.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.3/firebase-messaging.js');

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

var  messaging = firebase.messaging();
messaging.setbackgroundMessageHandle((v)=>{
    var title = 'hello world'
    var options = {
        body: v.data.status
    }
return self.registration.showNotification(title, options)
})