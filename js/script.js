
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetstr = $('#street').val();
    var citystr = $('#city').val();
    var address = streetstr + ", " + citystr;

    $greeting.text("So you want to live at " + address + "?");

    var source = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + "";
    $body.append('<img class="bgimg" src="' + source + '">');

    var nyTimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + citystr + "&sort=newest&api-key=251012f79b884bf48daa9037cde12a6e";
    $.getJSON(nyTimesUrl, function(data)
    {
      $nytHeaderElem.text("Articles about " + citystr);
      articles = data.response.docs;

      for(var i = 0; i < articles.length; i++)
      {
        article = articles[i];
        $nytElem.append('<li class="article">'
        + '<a href="' + article.web_url + '"/>' + article.headline.main + '</a>'
        + '<p>' + article.snippet + '</p>' +
      '</li>');

      }
    }).error(function(e)
    {
      $nytHeaderElem.text("Sorry, The New York Times article for this city could not be found.");
    });

    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + citystr +"&format=json&callback=wikiCallback";
    $.ajax(
      {
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response)
        {
          var articles = response[1];
          for(var i = 0; i < articles.length; i++)
          {
            var article = articles[i];
            var articleUrl = "https://en.wikipedia.org/wiki/" + article;
            $wikiElem.append(
              '<li class = "article">' +
              '<a href = "' + articleUrl + '">' + article +
              '</a></li>'
            );
          }
        },
      }
    );

    return false;
};

$('#form-container').on("submit",loadData);
