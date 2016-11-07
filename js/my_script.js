$(document).ready(function(){
    //autohid navbar plugin
    $('.navbar-fixed-top').autoHidingNavbar();

    var isFRlang = false;

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

    var allNewsJSON;
    
    $.ajax({
        url: "all_news_json/all_news_json.JSON",
        async: false,
        dataType: 'json',
        success: function (data) {
            allNewsJSON = data;
        }
    });

    function addTwoNews() {
        for (i = 0; i<2; i++){
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
            var dateOfPost = new Date(allNewsJSON.data[i].created_time);
            var monthName = (isFRlang) ? monthNamesFR[dateOfPost.getMonth()] : monthNamesEN[dateOfPost.getMonth()];
            var dateTextNode = document.createTextNode('' + dateOfPost.getDate() + " " + monthName + " " + dateOfPost.getFullYear());
            var liDivATextNode = document.createTextNode('View on Facebook');
            var liDivArticleTextNode = document.createTextNode(allNewsJSON.data[i].message);

            $(h3HeadingNode).html('&nbsp;');

            h3SpanHeadingNode.appendChild(h3SpanHeadingTextNode);

            h3HeadingNode.appendChild(h3SpanHeadingNode);
            liNode.appendChild(h3HeadingNode);

            pDateNode.appendChild(dateTextNode);
            liNode.appendChild(pDateNode);

            liNode.appendChild(liDivNode);

            liDivAImg.setAttribute('src', '' + allNewsJSON.posts.data[i].full_picture);
            liDivANode.appendChild(liDivAImg);

            liDivANode.appendChild(liDivATextNode);
            liDivANode.setAttribute('href', 'https://facebook.com/' + allNewsJSON.posts.data[i].id);
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
    }

    addTwoNews();

    $('#show-more-btn').on('click', function() {

    })
});

