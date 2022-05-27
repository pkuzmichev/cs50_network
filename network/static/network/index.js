document.addEventListener("DOMContentLoaded", function (event) {


    // TODO: its help me later
    const buttonLike = document.querySelectorAll(".heart-like-button");
    const buttonFollow = document.querySelector(".follow");
    const buttonUnfollow = document.querySelector(".unfollow");
    const editPostLink = document.querySelectorAll(".edit");

    eventLike();
    editPost();
    like();
    unlike();

    function like() {
        for (let i = 0; i < buttonLike.length; i++) {
            buttonLike[i].addEventListener("click", () => {
                console.log('clasName', buttonLike[i].className);
                if (buttonLike[i].classList.contains('liked')) {
                    console.log('liked');
                    // TODO: like request and change style
                } else {
                    // TODO: unlike request and change style
                }
            })
        }
    }

    function unlike() {

    }

    // TODO: like/unlike fetch
    // buttonUnfollow.addEventListener("click", () => {
    //     // fetch
    //     console.log("click unfollow button");
    // })

    function editPost() {
        for (let i = 0; i < editPostLink.length; i++) {
            editPostLink[i].addEventListener("click", () => {
                const post = document.getElementById(editPostLink[i].id);
                const editPost = document.getElementById(editPostLink[i].id);
                editPost.innerHTML = post.outerHTML;
                textPost = document.querySelector('.text-' + editPostLink[i].id);
                editPost.innerHTML = `<div class="form-floating form-edit-post"><textarea class="form-control edit-form" id="floatingTextarea2" style="height: 10%; width: 50%;" maxlength="148" required name='new_post' autofocus>` + textPost.textContent + `</textarea></div><input class="btn btn-primary save" type="submit" style="margin-top: 10px;" value="Save">`;
                updatePost(editPostLink[i].id);

            })
        }
    }

    function updatePost(idPost) {
        const saveButtons = document.querySelectorAll(".save");
        console.log(saveButtons);
        for (let i = 0; saveButtons.length; i++) {
            var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value
            saveButtons[i].addEventListener("click", () => {
                const editForm = document.querySelector('.edit-form');
                console.log('update text', editForm.value);
                fetch('/edit', {
                    method: "PUT",
                    headers: { 
                        'X-CSRFToken': csrftoken,
                        'post-id': idPost,
                        'updateText': editForm.value
                    }
                })
                .then(location.reload())
            })
        }

    }


        // buttonFollow.addEventListener("click", () => {
     //     console.log("click follow button");
     //     // fetch
     //     fetch("/follow", {
     //         method: "POST",
     //         "credentials": 'include',
     //         headers: {
     //             'follow_user': 'pkuzmichev'
     //         },
     //         body: {
     //             csrfmiddlewaretoken: '{{ csrf_token }}'
     //         }
     //     })
     //     .then(response => console.log(response))
     // })

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

