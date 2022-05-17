document.addEventListener("DOMContentLoaded", function (event) {


    // TODO: its help me later
    const buttonLike = document.querySelectorAll(".heart-like-button");
    const buttonFollow = document.querySelector(".follow")
    const buttonUnfollow = document.querySelector(".unfollow")

    eventLike();

    buttonUnfollow.addEventListener("click", () => {
        // fetch
        console.log("click unfollow button");
    })

    function eventLike() {
        for (let i = 0; i < buttonLike.length; i++) {

            buttonLike[i].addEventListener("click", () => {
                console.log('click');
                if (buttonLike[i].classList.contains("liked")) {
                    console.log('liked');
                    buttonLike[i].classList.remove("liked");
                    buttonLike[i].setAttribute('src', 'static/network/like.png');
                } else {
                    console.log('add liked');
                    buttonLike[i].setAttribute('src', 'static/network/unlike.png');
                    buttonLike[i].classList.add("liked");
                }
            });

        }
    }
})
