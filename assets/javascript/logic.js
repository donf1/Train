
var config = {
    apiKey: "AIzaSyA0wGYa18L4dS_85OCpi0cpLquWiT2C9-s",
    authDomain: "train-app-2d892.firebaseapp.com",
    databaseURL: "https://train-app-2d892.firebaseio.com",
    projectId: "train-app-2d892",
    storageBucket: "train-app-2d892.appspot.com",
    messagingSenderId: "125777206460",
    appId: "1:125777206460:web:25bac20c0611b9cb"
};

firebase.initializeApp(config);

var database = firebase.database();
var minAway = 0;

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var startTime = $("#start-input").val().trim();
    var frequencyRate = $("#rate-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: dest,
        start: startTime,
        rate: frequencyRate
    };

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");

});

database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var startTime = childSnapshot.val().start;
    var frequencyRate = childSnapshot.val().rate;

    var trainStart = moment.unix(startTime).format("MM/DD/YYYY");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(startTime),
        $("<td>").text(frequencyRate),
        $("<td>").text(trainStart)
    );

    $("#train-table > tbody").append(newRow);
});
