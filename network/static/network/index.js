document.addEventListener("DOMContentLoaded", function (event) {


    // TODO: its help me later
    const buttonLike = document.querySelectorAll(".heart-like-button");
    const buttonFollow = document.querySelector(".follow");
    const buttonUnfollow = document.querySelector(".unfollow");
    const editPostLink = document.querySelectorAll(".edit");
    // const post = document.querySelectorAll('.post');

    eventLike();
    editPost();

    // TODO: like/unlike fetch
    // buttonUnfollow.addEventListener("click", () => {
    //     // fetch
    //     console.log("click unfollow button");
    // })

    // TODO:
    // 1. close edit other edit open
    // 2. backend
    function editPost() {
        for (let i = 0; i < editPostLink.length; i++) {
            editPostLink[i].addEventListener("click", () => {
                editPost = document.getElementById(editPostLink[i].id);
                textPost = document.querySelector('.text-' + editPostLink[i].id);
                editPost.innerHTML = `<div class="form-floating"><textarea class="form-control" id="floatingTextarea2" style="height: 10%; width: 50%;" maxlength="148" required name='new_post' autofocus>` + textPost.textContent + `</textarea></div><input class="btn btn-primary" type="submit" style="margin-top: 10px;" value="Save">`;
            })
        }
    }

    function eventLike() {
        for (let i = 0; i < buttonLike.length; i++) {
            buttonLike[i].addEventListener("click", () => {
                if (buttonLike[i].classList.contains("liked")) {
                    buttonLike[i].classList.remove("liked");
                    buttonLike[i].setAttribute('src', '/static/network/like.png');
                } else {
                    buttonLike[i].setAttribute('src', '/static/network/unlike.png');
                    buttonLike[i].classList.add("liked");
                }
            });
        }
    }
})

