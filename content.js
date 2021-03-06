jQuery(function($){
  
  var selectors = [
    ".inline-review-comment .box-header code span",
    ".file .meta .info .js-selectable-text",
    ".gh-header-meta .flex-table-item-primary span.commit-ref:last-child span"
  ].join(',');

  var selectorDataPathParents = [
    ".box-header",
    ".meta"
  ].join(',');

  $(selectors).each(function(){
    $(this).css("cursor", "pointer");
  })
  .click(function(e){
    var el = $(this);
    var file_path = el.text();
    if(el.is(".css-truncate-target")) {
      var full_file_path = file_path;
    } else {
      var full_file_path = el.closest(selectorDataPathParents).data('path');
    }

    sendCopyToClipboardMessage(el, full_file_path, function(){
      el.fadeOut(100, function(){
        el.text('Copied to clipboard...').fadeIn(100, function(){
          el.delay(1000).fadeOut(100, function(){
            el.text(file_path).fadeIn(100);
          });
        });
      });   
    });
    
    e.preventDefault();
  });
});

function sendCopyToClipboardMessage(el, text, callback) {
  chrome.runtime.sendMessage(text, function(response){
    if(response){
      callback();
    } else {
      console.log("An error occurred: " + chrome.runtime.lastError);
    }
  });
}
