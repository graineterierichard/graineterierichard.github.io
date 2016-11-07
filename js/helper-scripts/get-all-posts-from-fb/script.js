/**
 * Created by Hexen on 05/11/2016.
 */
$(document).ready(function () {
    // <--- change this token every time
    var isFRlang = false;

    var file = "../all_news_json/all_news_json.JSON";

    var currentAccessToken = 'EAACEdEose0cBADPJAJoGuXeXafdZB9CgrJgDEhcgYR6thWcuqqo0TkV4cFvQv7v56I8spnrcvggnLwBWjuGprN3hNPSZAPBgMc7DVuDaNvWWQGjd1buxIbOcKl7dcUV625w3FgPh8Hvf1bIWBAuiCl1QBofeHdomZC2ZBEUdEgZDZD';
    var urlForGetPosts = 'https://graph.facebook.com/v2.8/949152855202034?fields=posts&access_token=' + currentAccessToken;

    var gottenPostsJson = {};
    var fullPicturesOfPosts = [];

    var monthNamesEN = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var monthNamesFR = [
        "janvier", "février", "mars",
        "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre",
        "novembre", "décembre"
    ];

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

    var text = '{ "data": ' + JSON.stringify(gottenPostsJson.posts.data) + "}";
    var filename = "last_gotten";
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".JSON");


    for (i = 0; i<gottenPostsJson.posts.data.length; i++){
        var liNode = document.createElement("LI");
        var h3HeadingNode = document.createElement("H3");
        var h3SpanHeadingNode = document.createElement("SPAN");
        var pDateNode = document.createElement("P");
        var liDivNode = document.createElement("DIV");
        var liDivANode = document.createElement("A");
        var liDivAImg = document.createElement("IMG");
        var liDivArticleNode = document.createElement("ARTICLE");
        var liHr = document.createElement("HR");

        // var h3HeadingTextNode = document.createTextNode(&nbsp;);
        var h3SpanHeadingTextNode = document.createTextNode('');
        var dateOfPost = new Date(gottenPostsJson.posts.data[i].created_time);
        var monthName = (isFRlang) ? monthNamesFR[dateOfPost.getMonth()] : monthNamesEN[dateOfPost.getMonth()];
        var dateTextNode = document.createTextNode('' + dateOfPost.getDate() + " " + monthName + " " + dateOfPost.getFullYear());
        var liDivATextNode = document.createTextNode('View on Facebook');
        var liDivArticleTextNode = document.createTextNode(gottenPostsJson.posts.data[i].message);

        $(h3HeadingNode).html('&nbsp;');

        h3SpanHeadingNode.appendChild(h3SpanHeadingTextNode);

        h3HeadingNode.appendChild(h3SpanHeadingNode);
        liNode.appendChild(h3HeadingNode);

        pDateNode.appendChild(dateTextNode);
        liNode.appendChild(pDateNode);

        liNode.appendChild(liDivNode);

        liDivAImg.setAttribute('src', '' + gottenPostsJson.posts.data[i].full_picture);
        liDivANode.appendChild(liDivAImg);

        liDivANode.appendChild(liDivATextNode);
        liDivANode.setAttribute('href', 'https://facebook.com/' + gottenPostsJson.posts.data[i].id);
        liDivNode.appendChild(liDivANode);

        liDivArticleNode.appendChild(liDivArticleTextNode);
        liDivNode.appendChild(liDivArticleTextNode);

        liNode.appendChild(liHr);


        document.getElementsByTagName('body')[0].appendChild(liNode);

        $(h3HeadingNode).addClass('news-heading text-center');
        $(h3SpanHeadingNode).addClass('label-new');
        $(pDateNode).addClass('news-date');
        $(liDivNode).addClass('row');
        $(liDivANode).addClass('col-md-4 col-lg-4 col-xs-12 col-sm-3 text-center');
        $(liDivAImg).addClass('img-responsive news-image');
        $(liDivArticleNode).addClass('news col-md-8 col-lg-8 col-xs-12 col-sm-9')
        $(liHr).addClass('news-hr');
    }

});

