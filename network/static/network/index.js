document.addEventListener("DOMContentLoaded", function (event) {

    const buttonLike = document.querySelectorAll(".heart-like-button");
    const buttonFollow = document.querySelector(".follow");
    const buttonUnfollow = document.querySelector(".unfollow");
    const editPostLink = document.querySelectorAll(".edit");
    const likesCounter = document.querySelectorAll(".likes-counter");
    const pageItem = document.querySelectorAll(".page-item");
    const pagination = document.querySelector(".pagination");

    window.onload = function () {
        getLikes();        
    }
    eventLike();
    editPost();
    hiddenPaginator();

    function hiddenPaginator() {
        if (pageItem.length == 1) {
            pagination.style.display = 'none';
        }
    }

    function getLikes() {
        for (let i = 0; i < buttonLike.length; i++) {
                var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value
                fetch('/get_likes', {
                    method: "GET",
                    headers: {
                        'X-CSRFToken': csrftoken,
                        'post-id': buttonLike[i].id
                    }
                })
                    .then(res => {
                        if (res.headers.get('is_liked') === "True") {
                            buttonLike[i].setAttribute('src', '/static/network/like.png');
                            buttonLike[i].classList.remove("unliked");
                            buttonLike[i].classList.add("liked");
                        } else {
                            buttonLike[i].setAttribute('src', '/static/network/unlike.png');
                            buttonLike[i].classList.remove("liked");
                            buttonLike[i].classList.add("unliked");
                        }
                    })
        }
    }

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
        for (let i = 0; saveButtons.length; i++) {
            var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value
            saveButtons[i].addEventListener("click", () => {
                const editForm = document.querySelector('.edit-form');
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

    function eventLike() {
        for (let i = 0; i < buttonLike.length; i++) {
            buttonLike[i].addEventListener("click", () => {
                var csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
                if (buttonLike[i].classList.contains("unliked")) {
                    buttonLike[i].classList.remove("unliked");
                    buttonLike[i].classList.add("liked");
                    buttonLike[i].setAttribute('src', '/static/network/like.png');
                    if (buttonLike[i].classList.contains('liked')) {
                        fetch('/like', {
                            method: "PUT",
                            headers: {
                                'X-CSRFToken': csrftoken,
                                'post-id': buttonLike[i].id
                            }
                        })
                            .then(res => {
                                if (res.status===200) {
                                    likesCounter[i].textContent++;
                                } else if (res.status===409) {
                                    alert("You've already liked it");
                                }
                            })
                    }
                } else {
                    fetch('/like', {
                        method: "DELETE",
                        headers: {
                            'X-CSRFToken': csrftoken,
                            'post-id': buttonLike[i].id
                        }
                    })
                        .then(likesCounter[i].textContent--);
                    buttonLike[i].setAttribute('src', '/static/network/unlike.png');
                    buttonLike[i].classList.remove("liked");
                    buttonLike[i].classList.add("unliked");
                }
            });
        }
    }
})

