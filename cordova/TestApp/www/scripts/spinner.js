var createSpinner = function (i, element) {
    var $element = $(element);
    var contentHolder = $("<div>").addClass("tint-spinner-content");
    var spinner = $("<div>").addClass("tint-spinner-wrapper")
      .append(
      $("<div>").addClass("trans trans-left"),
      $("<div>").addClass("trans trans-right"),
      $("<div>").addClass("trans trans-top"),
      $("<div>").addClass("trans trans-bottom"),
      $("<div>").addClass("tint-spinner-content-wrapper").append(contentHolder));
    
     $element.replaceWith(spinner);
     contentHolder.append($element);
};
