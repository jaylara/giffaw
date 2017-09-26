//example api request: http://api.giphy.com/v1/gifs/search?q=cats&api_key=dc6zaTOxFJmzC

var offset = 0;
var totalResults = 0;

$(function() {

  SearchGiphy();

  $("form").submit(function(e) {
    e.preventDefault();
    SearchGiphy();
  });

  $("button").click(function(e) {
    e.preventDefault();
    LoadMoreGiphy();
  });
});

function SyncOffset(num) {
  offset = num;
  $('[name="offset"]').val(offset);
}

function SearchGiphy() {
  $.ajax({
    method: 'GET',
    url: 'http://api.giphy.com/v1/gifs/search',
    dataType: 'json',
    data: $("form").serialize(),
    success: OnSuccessSearch, //code to run if request succeeds
    error: OnError
  });
} // SearchGiphy()

function LoadMoreGiphy() {
  $.ajax({
    method: 'GET',
    url: 'http://api.giphy.com/v1/gifs/search',
    dataType: 'json',
    data: $("form").serialize(),
    success: OnSuccessLoadMore, //code to run if request succeeds
    error: OnError
  });
} // SearchGiphy()


function OnSuccessSearch(resp) {
  document.querySelector(".gif-gallery").innerHTML = "";

  for(var i = 0; i < resp.data.length; i++) {
    var img = resp.data[i].images.fixed_height;
    $(".gif-gallery").append(`<img src='${img.url}' " >`);
  }

  totalResults = resp.data.length;
  SyncOffset(totalResults);
  $("button").text("Load 25 More: "+ totalResults +" Total");
}

function OnSuccessLoadMore(resp) {
  for(var i = 0; i < resp.data.length; i++) {
    var img = resp.data[i].images.fixed_height;
    $(".gif-gallery").append(`<img src='${img.url}' " >`);
  }
  totalResults = resp.data.length+ totalResults;
  SyncOffset(totalResults);
  $("button").text("Load 25 More: "+ totalResults +" Total");
}

function OnError(xhr, status, err) {
  console.log("ERROR");
  alert("Sorry, there was a problem!");
	console.log("Error: " + err);
	console.log("Status: " + status);
	console.dir(xhr);
}
