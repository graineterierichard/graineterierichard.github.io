var allNewsJSON = {};

var isFRlang = (document.getElementById("lang-flag").getAttribute("src").indexOf("c8cdeb35b2.png") == -1);

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
    url: "https://raw.githubusercontent.com/graineterierichard/graineterierichard.github.io/master/js/helper-scripts/all_news_json/all_news_json.JSON",
    async: false,
    dataType: 'json',
    success: function (data) {
        allNewsJSON = data;
    }
});

$(document).ready(function(){
    //autohid navbar plugin
    $('.navbar-fixed-top').autoHidingNavbar();

    console.log(allNewsJSON.data);

    function addTwoNews(from, upTo) {
        if (allNewsJSON.data[from]) {
            for (; from<upTo; from++){
                var message = (isFRlang) ? allNewsJSON.data[from].messageFR : allNewsJSON.data[from].messageEN;
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
                var dateOfPost = new Date(allNewsJSON.data[from].created_time);
                var monthName = (isFRlang) ? monthNamesFR[dateOfPost.getMonth()] : monthNamesEN[dateOfPost.getMonth()];
                var dateTextNode = document.createTextNode('' + dateOfPost.getDate() + " " + monthName + " " + dateOfPost.getFullYear());
                var liDivATextNode = document.createTextNode('View on Facebook');
                var liDivArticleTextNode = document.createTextNode(message);

                $(h3HeadingNode).html('&nbsp;');

                h3SpanHeadingNode.appendChild(h3SpanHeadingTextNode);

                h3HeadingNode.appendChild(h3SpanHeadingNode);
                liNode.appendChild(h3HeadingNode);

                pDateNode.appendChild(dateTextNode);
                liNode.appendChild(pDateNode);

                liNode.appendChild(liDivNode);

                liDivAImg.setAttribute('src', '' + allNewsJSON.data[from].full_picture);
                liDivANode.appendChild(liDivAImg);

                liDivANode.appendChild(liDivATextNode);
                liDivANode.setAttribute('href', 'https://facebook.com/' + allNewsJSON.data[from].id);
                liDivANode.setAttribute('target', '_blank');
                liDivNode.appendChild(liDivANode);

                liDivArticleNode.appendChild(liDivArticleTextNode);
                liDivNode.appendChild(liDivArticleTextNode);

                liNode.appendChild(liHr);


                document.getElementById("news-reciever").appendChild(liNode);

                $(h3HeadingNode).addClass('news-heading text-center');
                $(h3SpanHeadingNode).addClass('label-new');
                $(pDateNode).addClass('news-date');
                $(liDivNode).addClass('row');

                if (message == "") {
                    $(liDivANode).addClass('col-md-10 col-md-offset-1 col-xs-12 col-xs-offset-1 col-sm-12 col-sm-offset-1 col-lg-12 col-lg-offset-1 text-center');
                } else {
                    $(liDivANode).addClass('col-md-4 col-lg-4 col-xs-12 col-sm-3 text-center');
                }
                $(liDivAImg).addClass('img-responsive news-image');
                $(liDivArticleNode).addClass('news col-md-8 col-lg-8 col-xs-12 col-sm-9');
                $(liHr).addClass('news-hr');
                $(liHr).attr('id', 'scroll' + from);

                $(liNode).attr("id", "news" + from);
                // liNode.appendChild(document.createElement("A"));
                // $(liNode > a).attr('href', )
                $(liNode).addClass("animate fadeIn");
            }
        }
    }

    addTwoNews(0, 2);

    var from = 2;
    var upTo = 2;
    var scrollTo = '#news' + from-1;

    $('#show-more-btn').on('click', function() {
        if ( $('#news'+(upTo-1)).length) {
            upTo += 2;
            addTwoNews(from, upTo);
            from += 2;
            scrollTo = '#news' + from-1;
            $('.news-list').localScroll({
                target: scrollTo,
                lazy: true
            });

            // $('.news-list').animate({
            //     scrollTop: $(scrollTo).offset().top
            // }, 'slow');
            // scrollTo = '#scroll' + from;
            // $('.news-list > a').attr('href', "#news" + upTo);
            // console.log(scrollTo);
        }
    });





    // $('#show-more-btn').click(function () {
    //     if ( $('#news'+scrollTo).length ) {
    //         $('.news-list').animate({
    //             scrollTop: $('#news' + scrollTo).offset().top
    //             }, 'slow');
    //             return false;
    //         }
    //     return false;
    // });
});

// ///
// $('.news-list, html, body').animate({
//     scrollTop: $('#news'+scrollTo).offset().top
// }, 'slow');
// scrollTo += 2;
// console.log(scrollTo);
// return false;

