OSM.Note = function (map) {
  var content = $("#sidebar_content"),
      page = {};

  var noteIcons = {
    "new": L.icon({
      iconUrl: OSM.NEW_NOTE_MARKER,
      iconSize: [25, 40],
      iconAnchor: [12, 40]
    }),
    "open": L.icon({
      iconUrl: OSM.OPEN_NOTE_MARKER,
      iconSize: [25, 40],
      iconAnchor: [12, 40]
    }),
    "closed": L.icon({
      iconUrl: OSM.CLOSED_NOTE_MARKER,
      iconSize: [25, 40],
      iconAnchor: [12, 40]
    })
  };

  page.pushstate = page.popstate = function (path, id) {
    OSM.loadSidebarContent(path, function () {
      initialize(path, id, function () {
        var data = $(".details").data();
        if (!data) return;
        var latLng = L.latLng(data.coordinates.split(","));
        if (!map.getBounds().contains(latLng)) moveToNote();
      });
    });
  };

  page.load = function() {
    // the original page.load content is the function below, and is used when one visits this page, be it first load OR later routing change
    // below, we wrap "if map.timeslider" so we only try to add the timeslider if we don't already have it
    function originalLoadFunction () {
    initialize(moveToNote);
    }  // end originalLoadFunction

    // "if map.timeslider" only try to add the timeslider if we don't already have it
    if (map.timeslider) {
      originalLoadFunction();
    }
    else {
      var params = querystring.parse(location.hash.substring(1));
      addOpenHistoricalMapTimeSlider(map, params, originalLoadFunction);
    }
  };

  function initialize(path, id, callback) {
    content.find("input[type=submit]").on("click", function (e) {
      e.preventDefault();
      var data = $(e.target).data();
      var form = e.target.form;

      $(form).find("input[type=submit]").prop("disabled", true);

      $.ajax({
        url: data.url,
        type: data.method,
        oauth: true,
        data: { text: $(form.text).val() },
        success: function () {
          OSM.loadSidebarContent(path, function () {
            initialize(path, id, moveToNote);
          });
        }
      });
    });

    content.find("textarea").on("input", function (e) {
      var form = e.target.form;

      if ($(e.target).val() === "") {
        $(form.close).val(I18n.t("javascripts.notes.show.resolve"));
        $(form.comment).prop("disabled", true);
      } else {
        $(form.close).val(I18n.t("javascripts.notes.show.comment_and_resolve"));
        $(form.comment).prop("disabled", false);
      }
    });

    content.find("textarea").val("").trigger("input");

    var data = $(".details").data();

    if (data) {
      map.addObject({
        type: "note",
        id: parseInt(id, 10),
        latLng: L.latLng(data.coordinates.split(",")),
        icon: noteIcons[data.status]
      });
    }

    if (callback) callback();
  }

  function moveToNote() {
    var data = $(".details").data();
    if (!data) return;
    var latLng = L.latLng(data.coordinates.split(","));

    if (!window.location.hash || window.location.hash.match(/^#?c[0-9]+$/)) {
      OSM.router.withoutMoveListener(function () {
        map.setView(latLng, 15, { reset: true });
      });
    }
  }

  page.unload = function () {
    map.removeObject();
  };

  return page;
};
