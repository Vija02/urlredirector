function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

$(function() {
  $(".success").hide();

	$(".submit").on('click', function() {

    // Get variables
    var url = $(".url").val();
    var link = $(".link").val();

		if(url != "" && link != ""){
      // If url is valid, send data
			$.ajax({
			  method: "POST",
			  url: "/createLink",
			  data: { url: url, link: link }
			}).done(function( msg ) {
        if(msg == "ok"){ // If all good
          copyTextToClipboard("url.rollingmagnet.com/" + url);
    			// TODO: make the link clickable
    			$(".success-link").text("url.rollingmagnet.com/" + url);
          $(".success-link").attr("href", "url.rollingmagnet.com/" + url);
    			$(".success").show();

        }else if(msg == "duplicate"){ // If the url have been used before
          toastr.error('The URL have been used before. Please change into another URL', 'Error!');
        }else if(msg == "not-valid"){
          toastr.error('One or more of the URL you entered are invalid', 'Error!');
        }else{
          toastr.error('Something went wrong, please contact the administrator. Thanks!', 'Error!')
        }
			});
		}else{
			toastr.error('One or more of the URL you entered are invalid', 'Error!');
		}
	});
});
