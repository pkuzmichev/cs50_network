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
    const button = document.querySelectorAll(".heart-like-button");

    console.log('button like', button);
    for (let i = 0; i < button.length; i++) {

        button[i].addEventListener("click", () => {
            console.log('click');
            if (button[i].classList.contains("liked")) {
                console.log('liked');
                button[i].classList.remove("liked");
                button[i].setAttribute('src', 'static/network/red-heart-48.png');
            } else {
                console.log('add liked');
                button[i].setAttribute('src', 'static/network/filled-heart-32.png');
                button[i].classList.add("liked");
            }
        });

    }
})
