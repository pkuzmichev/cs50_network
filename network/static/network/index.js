document.addEventListener("DOMContentLoaded", function (event) {
    console.log('it is js file!');
    // getPosts();
    // var elements = document.body.getElementsByTagName('img');

    // for (var i = 0; i < elements.length; i++) {
    //     console.log('for');
    //     // console.log('work for each') + element;
    //     elements[i].setAttribute('src', "static/network/filled-heart-32.png");
    // }

    // TODO: its help me later
    const buttonLike = document.querySelectorAll(".heart-like-button");
    const buttonFollow = document.querySelector(".follow")
    const buttonUnfollow = document.querySelector(".unfollow")

    eventLike();

    console.log("buttonFollow", buttonFollow);
    console.log("buttonUnfollow", buttonUnfollow);


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
