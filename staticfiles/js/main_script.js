var takeoffMarker = null;
var landingMarker = null;
var map;
var marker;
var geocoder;
// 新しくgeocoderインスタンスを作成
geocoder = new google.maps.Geocoder();

google.maps.event.addListener(map, 'click', function (event) {
    placeMarker(event.latLng, "takeoff");  // Specify type when placing marker
    getPhysicalAddress(event.latLng);  // この関数で住所を取得
});
window.initMap = function() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6895, lng: 139.6917 },
        zoom: 10,
    });

    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng, "takeoff");  // Specify type when placing marker
    });

    marker = null;

    function placeMarker(location) {
        if (marker) {
            marker.setMap(null);
        }

        marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });

        document.getElementById('departureLat').value = location.lat();
        document.getElementById('departureLng').value = location.lng();

        // Move dragend event listener here to avoid multiple event listeners
        google.maps.event.addListener(marker, 'dragend', function (event) {
            document.getElementById("id_departure_location").value = event.latLng.lat() + ", " + event.latLng.lng();
        });
    }
}

function placeMarker(location, type) {
    var markerToPlace;

    if (type === "takeoff") {
        if (takeoffMarker) {
            takeoffMarker.setMap(null);
        }
        markerToPlace = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });
        takeoffMarker = markerToPlace;
    } else if (type === "landing") {
        if (landingMarker) {
            landingMarker.setMap(null);
        }
        markerToPlace = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });
        landingMarker = markerToPlace;
    }

    // Add dragend event for each marker type
    if (type === "takeoff") {
        google.maps.event.addListener(takeoffMarker, 'dragend', function(event) {
            document.getElementById("id_takeoff_location").value = event.latLng.lat() + ", " + event.latLng.lng();
        });
    } else if (type === "landing") {
        google.maps.event.addListener(landingMarker, 'dragend', function(event) {
            document.getElementById("id_landing_location").value = event.latLng.lat() + ", " + event.latLng.lng();
        });
    }
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
    var landingElapsedTime = 0;
var landingTimerId;

$("#startLanding").on("click", function() {
    $("#stopLanding, #resetLanding").prop("disabled", false);
    $("#startLanding").prop("disabled", true);
    landingTimerId = setInterval(function() {
        landingElapsedTime += 1;
        $("#landingTime").text(getTimeString(landingElapsedTime));
    }, 1000);
});

$("#stopLanding").on("click", function() {
    clearInterval(landingTimerId);
    $("#startLanding").prop("disabled", false);
    $("#stopLanding").prop("disabled", true);
});

$("#resetLanding").on("click", function() {
    landingElapsedTime = 0;
    $("#landingTime").text("00:00:00");
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
// 追加する新しい関数
function getPhysicalAddress(latLng) {
    geocoder.geocode({ 'location': latLng }, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                alert("選択された位置の住所: " + results[0].formatted_address);
            } else {
                alert('住所が見つかりませんでした。');
            }
        } else {
            alert('Geocodeエラー: ' + status);
        }
    });
}
