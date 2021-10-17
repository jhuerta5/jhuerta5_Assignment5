(function() {
  "use strict";
  /**
   * The starting point in our program, setting up a listener
   * for the "load" event on the window, signalling the HTML DOM has been constructed
   * on the page. When this event occurs, the attached function (init) will be called.
   */
  window.addEventListener("load", init);
  //console.log("Window loaded!");

  /**
   * Init initializes event handlers for the following:
   * encryptionButton event:
   *	- handles click event encrypting text (assumed/treated as lowercase chars)
   *	- then sets the caps state of output following invokation
   *
   * reset event:
   *	- refreshes page
   *
   * font size event:
   *	- changes font size of text box (input) and paragraph (output) to selected font
   *
   * text input caps event:
   * 	- changes input to caps if 'all-caps' is selected when you are entering
   *      input. Note, any output displayed is set to caps if their is any from a 
   *      prev encrytion query
   */
  function init() {
    // Note: In this function, we usually want to set up our event handlers
    // for UI elements on the page.
	var encryptButton = document.getElementById("encrypt-it");
	if(encryptButton != null) {
		encryptButton.addEventListener('click', handleClick);
		encryptButton.addEventListener('click', setCapsState);
	}
	
	var resetButton = document.getElementById("reset");
	if(resetButton != null) {
		resetButton.addEventListener('click', resetClick);
	}
	
	var fontSizeElements = document.querySelectorAll('input[name="text-size"]');
	if(fontSizeElements != null) {
		for(let i = 0; i < fontSizeElements.length; i++) {
			fontSizeElements[i].addEventListener('change', setFontSize);
		}
	}
	var capsElement = document.getElementById("all-caps");
	if(capsElement != null) {
		capsElement.addEventListener('change', setCapsState);
		
		var y = document.getElementById("input-text");
		if(y != null) {
			y.addEventListener('input', setCapsState);
		}
	}
  }
  
  /**
   * When this event is triggered (by button click), text from
   * textbox is encrypted using the selected encryption algorithm.
   * Note: all text imput treated as lowercase
   */  
  function handleClick() {
	  console.log("Window loaded! Now Button Clicked!");
	  var selectedValue = document.getElementById("cipher-type");
	  if(selectedValue != null) {
		var textBox = document.querySelector('#input-text');
		if(textBox != null) {
			var theText = textBox.value;
			if(theText != null) {
				var resultParagraph = document.getElementById("result");
				if(resultParagraph != null) {
					theText = theText.toLowerCase();
					var selectValue = selectedValue.value;
					if(selectValue == "shift") {
						var resultParagraph = document.getElementById("result");
						if(resultParagraph != null) {
							var text = shiftCipher(theText);
							resultParagraph.innerText = text;
						}
					}
					else if(selectValue == "random") { 
						var text = randomCipher(theText);
						resultParagraph.innerText = text;
					}
					else {
						// not specified
					}
				}
				
			}
		}
	  }
  }
  
  /**
   * If font radio button selected, this event is triggered
   * and input box, output paragraph font changed to specified choice. 
   */
  function setFontSize() {
	var fontSizeElement = document.querySelector('input[name="text-size"]:checked');
	if(fontSizeElement != null) {
		var x = document.getElementById("input-text");
		if(x != null) {
			x.style.fontSize = fontSizeElement.value;
		}
		x = document.getElementById("result");
		if(x != null) {
			x.style.fontSize = fontSizeElement.value;
		}
	}
  }
  
  /**
   * If this handler is invoked if all caps element is checked, then
   * on invokation, input text box items all capitalized and output
   * paragraph items all capitalized (following encryption of course)
   */
  function setCapsState() {
	  var allCapsElement = document.getElementById("all-caps");
	  if(allCapsElement != null) {
		  if(allCapsElement.checked == 1) {
			var inputTextBox = document.getElementById("input-text");
			if(inputTextBox != null) {
				inputTextBox.value = (inputTextBox.value).toUpperCase();
			}
			var resultParagraph = document.getElementById("result");
			if(resultParagraph != null) {
				resultParagraph.innerText = resultParagraph.innerText.toUpperCase();
			} 
		  }
	  }
  }
  
  /**
   * If reset button pressed, this event is triggered
   * and the page is simply reloaded
   */
  function resetClick() {
	  window.location.reload(true);
  }
  
  /** 
   * Simple shift cypher. this alg
   * shifts text from the letter a-z
   * Note: expected input for this function 
   * should be lowercase characters.
   *
   * @param {string} text - The text that shift alg will be applied to.
   * @return {string} newStr: The encrypted value.
   */
  function shiftCipher(text) {
	  var newStr = "";
	  if(text != null) {
		  var a_ASCII = "a".charCodeAt(0); 
		  var z_ASCII = "z".charCodeAt(0);
		  for(var i = 0; i < text.length; i++) {
			  var val = text.charCodeAt(i);
			  if((val >= a_ASCII) && (val <= z_ASCII)) {
				 val = (val + 1) % (z_ASCII+1);
				 val = (val == 0) ? a_ASCII: val;
				 var newChar = String.fromCharCode(val); 
				 if(newChar != null) {
					 newStr += newChar;
				 }
			  }
			  else {
				  newStr += text.charAt(i);
			  }
		  }	  
	  }
	  return newStr;
  }
  
  /** 
   * This alg returns random letters with same size that was passed
   * into this function.
   * @param {string} text - The text that shift alg will be applied to.
   * @return {string} newStr: The encrypted value with same len as text param.
   */
  function randomCipher(text) {
	   var newStr = "";
	   var a_ASCII = "a".charCodeAt(0); 
	   var z_ASCII = "z".charCodeAt(0);
	   if(text != null){
		   for(var i = 0; i < text.length; i++) {
			   newStr += String.fromCharCode(Math.random() * (z_ASCII - a_ASCII) + a_ASCII + 1);
		   }
	   }
	   return newStr;
  }
})();
