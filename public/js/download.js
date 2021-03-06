$('#download').on('click', function() {
  $('#download-modal').modal('show');
});

$("#download-confirm").click(function() {
  $('#download-modal').modal('hide');
  // create `a` element
  $("<a />", {
      // if supported , set name of file
      download: $.now() + ".txt",
      // set `href` to `objectURL` of `Blob` of `textarea` value
      href: URL.createObjectURL(
        new Blob([$("#working-area").val()], {
          type: "text/plain"
        }))
    })
    // append `a` element to `body`
    // call `click` on `DOM` element `a`
    .appendTo("body")[0].click();
    // remove appended `a` element after "Save File" dialog,
    // `window` regains `focus`
    $(window).one("focus", function() {
      $("a").last().remove()
    })
})
