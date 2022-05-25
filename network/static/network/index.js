document.addEventListener("DOMContentLoaded", function (event) {


    // TODO: its help me later
    const buttonLike = document.querySelectorAll(".heart-like-button");
    const buttonFollow = document.querySelector(".follow");
    const buttonUnfollow = document.querySelector(".unfollow");
    const editPostLink = document.querySelectorAll(".edit");
    const post = document.querySelectorAll('.new-post');

    eventLike();
    editPost();

    // TODO: like/unlike fetch
    buttonUnfollow.addEventListener("click", () => {
        // fetch
        console.log("click unfollow button");
    })

    function editPost() {
        for (let i = 0; i < editPostLink.length; i++) {
            for (let p = 0; p < post.length; p++) {

                editPostLink[i].addEventListener("click", () => {

                    // 1. copy text post
                    // 2. view textarea and button
                    // TODO: add id post to new post
                    post[p].innerHTML = `<div class="form-floating"><textarea class="form-control" id="floatingTextarea2" style="height: 10%; width: 50%;" maxlength="148" required name='new_post'></textarea></div><input class="btn btn-primary" type="submit" style="margin-top: 10px;" value="Post">`;
                    // 3. paste text post
                    // 4. save
                    console.log('edit link click');
                }

                )
            }
        }
    }

    function eventLike() {
        for (let i = 0; i < buttonLike.length; i++) {
            buttonLike[i].addEventListener("click", () => {
                console.log('click');
                if (buttonLike[i].classList.contains("liked")) {
                    console.log('liked');
                    buttonLike[i].classList.remove("liked");
                    buttonLike[i].setAttribute('src', '/static/network/like.png');
                } else {
                    console.log('add liked');
                    buttonLike[i].setAttribute('src', '/static/network/unlike.png');
                    buttonLike[i].classList.add("liked");
                }
            });
        }
    }
})

