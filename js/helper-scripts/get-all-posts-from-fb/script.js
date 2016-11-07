/**
 * Created by Hexen on 05/11/2016.
 */
$(document).ready(function () {
    // <--- change this token every time
    var currentAccessToken = 'EAACEdEose0cBAKHHZBPs9WhMsOLndkGVo5WWOMWRBnt5oY2vf4qXQNZC2rgZBClOt6endB4ZBBl0pYgMxv3BrBdZChETnE00AuLQ7wyov524JC6ZCw3I4nKCmFFJknGE9Utd9hGFIOE2SUpZBJjJFHzIEa3J3JidFfapuv42DtKyQZDZD';
    var urlForGetPosts = 'https://graph.facebook.com/v2.8/949152855202034?fields=posts&access_token=' + currentAccessToken;

    var gottenPostsJson = {};
    var fullPicturesOfPosts = [];

    $.ajax({
        url: ""+urlForGetPosts,
        async: false,
        dataType: 'json',
        success: function (data) {
            gottenPostsJson = data;
        }
    });

    console.log(gottenPostsJson);

    // setTimeout(function(){},3000);

    for (var i = 0; i<gottenPostsJson.posts.data.length; i++) {
        var urlForGetFullPictures = "https://graph.facebook.com/v2.8/" + gottenPostsJson.posts.data[i].id + "?fields=full_picture&access_token=" + currentAccessToken;
        var objFullPicture;

        $.ajax({
            url: ""+urlForGetFullPictures,
            async: false,
            dataType: 'json',
            success: function (data) {
                objFullPicture = data;
            }
        });

        gottenPostsJson.posts.data[i]["full_picture"] = objFullPicture.full_picture;
    }

    console.log(i);
});

