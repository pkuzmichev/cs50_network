document.addEventListener("DOMContentLoaded", function(event) {
    console.log('it is js file!');
    getPosts();
    // TODO: loaded all posts (fetch)
    // TODO: refresh page where new post
})

function getPosts(username) {
    console.log(username);
}

$(document).ready(function () {
    $("#heart").click(function () {
        if ($("#heart").hasClass("liked")) {
            $("#heart").html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
            $("#heart").removeClass("liked");
        } else {
            $("#heart").html('<i class="fa fa-heart" aria-hidden="true"></i>');
            $("#heart").addClass("liked");
        }
    });
});