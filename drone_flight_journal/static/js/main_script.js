var map, marker;
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
    });

    let marker = null;

    function placeMarker(location) {
        // Remove the previous marker if one exists
        if (marker !== null) {
            marker.setMap(null);
        }
    marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        draggable: true
    });
    document.getElementById('departureLat').value = location.lat();
    document.getElementById('departureLng').value = location.lng();
    }
    // マーカーのドラッグイベントを追加
    google.maps.event.addListener(marker, 'dragend', function (event) {
        document.getElementById("id_departure_location").value = event.latLng.lat() + ", " + event.latLng.lng();
    });
}
var data = {
    "flight_date": $("#flightDate").val(),
    "flyer_name": $("#flyerName").val(),
    "flight_overview": $("#flightOverview").val(),
    "takeoff_location": $("#takeoffLocation").val(),
    // ... other data fields...
};

var isRunning = false;
var elapsedTime = 0;
var timerId;
var totalFlightTime = 0;
$(document).ready(function() {
    $("#start").on("click", function(){
        isRunning = true;
        $("#stop, #reset").prop("disabled", false);
        $("#start").prop("disabled", true);
        timerId = setInterval(function(){
            elapsedTime += 1; // Increment elapsed time
            $("#time").text(getTimeString(elapsedTime));
            totalFlightTime += elapsedTime;
        $("#totalTime").text(getTimeString(totalFlightTime));
        }, 1000); // Update the time every 1000ms (1s)
    });

    $("#stop").on("click", function(){
        isRunning = false;
        $("#start").prop("disabled", false);
        $("#stop").prop("disabled", true);
        clearInterval(timerId);
    });

    $("#reset").on("click", function(){
        elapsedTime = 0;
        $("#time").text("00:00:00");
        $("#totalTime").text(getTimeString(totalFlightTime));
    });
    $("#saveRecord").on("click", function(){
        var data = {
            "flight_date": $("#flightDate").val(),
            "flyer_name": $("#flyerName").val(),
            // ... other data fields...
        };
        
        $.ajax({
            type: 'POST',
            url: '/save_record/',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(data),
            dataType: "json",
            success: function(response) {
                alert("記録が保存されました");
            },
            error: function(error) {
                console.log(error);
                alert("エラーが発生しました。もう一度お試しください。");
            }
        });
    });
});

function getTimeString(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    return strPad(hours) + ":" + strPad(minutes) + ":" + strPad(seconds);
}

function strPad(n) {
    return String("00" + n).slice(-2);
}
