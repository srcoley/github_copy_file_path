jQuery(function($){
  var reviewBoxes = $(".inline-review-comment .box-header code span");
  reviewBoxes
    .each(function(){
      $(this).css("cursor", "pointer");
    })
    .on('click', function(e){
      var el = $(this);
      var file_path = el.text();
      copyToClipboard(file_path);
      el.fadeOut(100, function(){
        el.text('Copied to clipboard...').fadeIn(100, function(){
          el.delay(2000).fadeOut(100, function(){
            el.text(file_path).fadeIn(100);
          });
        });
      });
      e.preventDefault();
    });
});

function copyToClipboard(text) {
  var message = { method: "copy", text: text };
  chrome.runtime.sendMessage(message, function(response){
    if( response ){
      console.log(response);
    } else {
      console.log("An error occurred: " + chrome.runtime.lastError);
    }
  });
}
