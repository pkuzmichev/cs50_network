document.addEventListener("DOMContentLoaded", function (event) {
    console.log('it is js file!');
    // getPosts();
    var elements = document.body.getElementsByClassName('like');

    for (var i = 0; i < elements.length; i++) {
        console.log('for');
        // console.log('work for each') + element;
        elements[i].setAttribute('src', "static/network/filled-heart-32.png");
    }


    // el.forEach((element) => {
    //     console.log('work for each') + element;
    //     element.getElementById("heart").src = 'static/network/filled-heart-32.png';
    // })


    // el.forEach(function changeImage() {
    //     if (document.getElementById("heart").src == "static/network/filled-heart-32.png") {
    //         document.getElementById("heart").src = "static/network/red-heart-48.png";
    //     } else {
    //         document.getElementById("heart").src = "static/network/filled-heart-32.png";
    //     }
    // })

    // el.onclick = function () {
    //     let mySrc = myImage.getAttribute('src');
    //     if (mySrc === 'static/network/filled-heart-32.png') {
    //         myImage.setAttribute('src', 'static/network/red-heart-48.png');
    //     } else {
    //         myImage.setAttribute('src', 'static/network/filled-heart-32.png');
    //     }
    // }

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function (event) {
            document.getElementById("heart").classList.add("like");
            console.log('click');
            // document.getElementById("heart").src = 'static/network/filled-heart-32.png';
            console.log(document.getElementById("heart").className);
            if (document.getElementById("heart").className == "like") {
                console.log('change');
                document.getElementById("heart").classList.add("unlike");
                document.getElementById("heart").setAttribute("src", "static/network/red-heart-48.png");
            } else {
                document.getElementById("heart").src = "static/network/filled-heart-32.png";
            }


            // TODO: fix!
            // https://stackoverflow.com/questions/19609387/change-image-when-clicking-button
            // https://www.geeksforgeeks.org/how-to-change-the-text-and-image-by-just-clicking-a-button-in-javascript/
        })

        //         // console.log('click by like');
        //         // console.log(document.getElementsByClassName('like').src);
        //         // document.getElementsByClassName('like').src = "static/network/red-heart-48.png";
        //     })
        // }

        // function changeImage() {
        //     if (document.getElementById("heart").src == "static/network/filled-heart-32.png") {
        //         document.getElementById("heart").src = "static/network/red-heart-48.png";
        //     } else {
        //         document.getElementById("heart").src = "static/network/filled-heart-32.png";
        //     }
        // }

        // el[0].addEventListener("click", test());
        // function test() {
        //     console.log('click');
        // }

        // if (el.addEventListener) {
        //     el.addEventListener("click", function () {
        //         console.log('like!');
        //         alert("clicked");
        //     }, false);
        // }

        // TODO: loaded all posts (fetch)
        // TODO: refresh page where new post


        // function getPosts(username) {
        //     console.log(username);
        // }
    }
})
// $(document).ready(function () {
//     $("#heart").click(function () {
//         if ($("#heart").hasClass("liked")) {
//             $("#heart").html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
//             $("#heart").removeClass("liked");
//         } else {
//             $("#heart").html('<i class="fa fa-heart" aria-hidden="true"></i>');
//             $("#heart").addClass("liked");
//         }
//     });
// });