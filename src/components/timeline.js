(function($) {
    $.fn.timeline = function(options) {
      var settings = $.extend(
        {
          // These are the defaults.
          eventSpacing: "chronological",
          timelineDirection: "vertical",
          timelineSize: "800px"
        },
        options
      );
      var firstYear = $(".timeline li:first-child .year").text();
      var lastYear = $(".timeline li:last-child .year").text();
      var timeSpan = lastYear - firstYear;
      var percentBetween = 90 / timeSpan;
  
      //  direction of timeline.
      $(".timeline").addClass(settings.timelineDirection);
      
      // timeline size
      if($(".timeline").hasClass("horizontal")) {
        $(".timeline").css("width", settings.timelineSize);
      } else {
        $(".timeline").css("height", settings.timelineSize);
      }
      //  Add spacing between events chronological or equal
      if (settings.eventSpacing === "chronological") {
        $.each($(".timeline li"), function(i, val) {
          var year = $(val)
            .find(".year")
            .text();
          var spacing = (year - firstYear) * percentBetween;
          if (settings.timelineDirection === "horizontal") {
            $(val).css("left", spacing + "%");
          } else {
            $(val).css("top", spacing + "%");
          }
        });
      } else {
        $.each($(".timeline li"), function(i, val) {
          var year = $(val)
            .find(".year")
            .text();
          percentBetween = 90 / ($(".timeline li").length - 1);
          console.log(percentBetween);
          var spacing = i * percentBetween;
          if (settings.timelineDirection === "horizontal") {
            $(val).css("left", spacing + "%");
          } else {
            $(val).css("top", spacing + "%");
          }
        });
      }
    };
  })(jQuery);
  
  $("ul.timeline").timeline({
    eventSpacing: "chronological",
    timelineDirection: "horizontal",
    timelineSize: "100%"
  });
  