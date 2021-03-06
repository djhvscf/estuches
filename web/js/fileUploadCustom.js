/*
 * EnhanceJS version 1.1 - Test-Driven Progressive Enhancement
 * http://enhancejs.googlecode.com/
 * Copyright (c) 2010 Filament Group, Inc, authors.txt
 * Licensed under MIT (license.txt)
*/(function(a,b,c){function o(){return!!b.cookie}function p(){J(d.testName,"fail");a.location.reload()}function q(){J(d.testName,"pass");a.location.reload()}function r(){L(d.testName);a.location.reload()}function s(){f=b.createElement("body");i.insertBefore(f,i.firstChild);e=f}function t(){i.removeChild(f);e=b.body}function u(){var a=K(d.testName);if(a){if(a==="pass"){y();d.onPass()}else{d.onFail();x()}d.appendToggleLink&&v(function(){w(a)})}else{var b=!0;s();for(var c in d.tests){b=d.tests[c]();if(!b){d.alertOnFailure&&alert(c+" failed");break}}t();a=b?"pass":"fail";J(d.testName,a);if(b){y();d.onPass()}else{d.onFail();x()}d.appendToggleLink&&v(function(){w(a)})}}function v(b){if(g)b();else{var c=a.onload;a.onload=function(){c&&c();b()}}}function w(a){if(!d.appendToggleLink||!enhance.cookiesSupported)return;if(a){var c=b.createElement("a");c.href="#";c.className=d.testName+"_toggleResult";c.innerHTML=a==="pass"?d.forceFailText:d.forcePassText;c.onclick=a==="pass"?enhance.forceFail:enhance.forcePass;b.getElementsByTagName("body")[0].appendChild(c)}}function x(){i.className=i.className.replace(d.testName,"")}function y(){j=!0;d.loadStyles.length&&D();d.loadScripts.length?F():d.onScriptsLoaded()}function z(b,c){if(K(k)&&K(l)){L(k);L(l)}else{J(k,b);J(l,c)}a.location.reload()}function A(a){m.length==2&&(a==m[0]?a=m[1]:a==m[1]&&(a=m[0]));return a}function B(){var a=d.testName+"-incomplete";i.className.indexOf(a)===-1&&(i.className+=" "+a)}function C(a){if(a.constructor===Array){var b=!0;for(var c in a)b&&(b=!!a[c]);return b}return!!a}function D(){var a=-1,e;while(e=d.loadStyles[++a]){var f=b.createElement("link");f.type="text/css";f.rel="stylesheet";f.onerror=d.onLoadError;if(typeof e=="string"){f.href=e;h.appendChild(f)}else{if(e.media){e.media=A(e.media);d.media&&d.media[e.media]!==c&&(e.media=d.media[e.media])}e.excludemedia&&(e.excludemedia=A(e.excludemedia));var g=!0;e.media&&e.media!=="print"&&e.media!=="projection"&&e.media!=="speech"&&e.media!=="aural"&&e.media!=="braille"&&(g=n(e.media));g&&e.excludemedia&&(g=!n(e.excludemedia));g&&e.iecondition&&(g=E(e.iecondition));if(g&&e.ifsupported!==c){g=C(e.ifsupported);if(!g&&e.fallback!==c){e.href=e.fallback;g=!0}}if(g){for(var i in e)i!=="iecondition"&&i!=="excludemedia"&&i!=="ifsupported"&&i!=="fallback"&&f.setAttribute(i,e[i]);h.appendChild(f)}}}}function F(){d.queueLoading?G():H()}function G(){function b(){if(a.length===0)return!1;var c=a.shift(),e=I(c),f=!1;if(!e)return b();e.onload=e.onreadystatechange=function(){if(!f&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){f=!0;b()===!1&&d.onScriptsLoaded();this.onload=this.onreadystatechange=null}};h.insertBefore(e,h.firstChild)}var a=[].concat(d.loadScripts);b()}function H(){var a=-1,b;while(b=d.loadScripts[++a]){var c=I(b);c&&h.insertBefore(c,h.firstChild)}d.onScriptsLoaded()}function I(a){var e=b.createElement("script");e.type="text/javascript";e.onerror=d.onLoadError;if(typeof a=="string"){e.src=a;return e}if(a.media){a.media=A(a.media);d.media&&d.media[a.media]&&(a.media=d.media[a.media])}a.excludemedia&&(a.excludemedia=A(a.excludemedia));var f=!0;a.media&&(f=n(a.media));f&&a.excludemedia&&(f=!n(a.excludemedia));f&&a.iecondition&&(f=E(a.iecondition));if(f&&a.ifsupported!==c){f=C(a.ifsupported);if(!f&&a.fallback!==c){a.src=a.fallback;f=!0}}if(f){for(var g in a)g!=="iecondition"&&g!=="media"&&g!=="excludemedia"&&g!=="ifsupported"&&g!=="fallback"&&e.setAttribute(g,a[g]);return e}return!1}function J(a,c,d){d=d||90;var e=new Date;e.setTime(e.getTime()+d*24*60*60*1e3);var f="; expires="+e.toGMTString();b.cookie=a+"="+c+f+"; path=/"}function K(a){var c=a+"=",d=b.cookie.split(";");for(var e=0;e<d.length;e++){var f=d[e];while(f.charAt(0)==" ")f=f.substring(1,f.length);if(f.indexOf(c)==0)return f.substring(c.length,f.length)}return null}function L(a){J(a,"",-1)}function M(){if(b.readyState==null&&b.addEventListener){b.addEventListener("DOMContentLoaded",function a(){b.removeEventListener("DOMContentLoaded",a,!1);b.readyState="complete"},!1);b.readyState="loading"}}var d,e,f,g,h,i=b.documentElement,j=!1,k,l,m=[];b.getElementsByTagName?h=b.getElementsByTagName("head")[0]||i:h=i;var n=function(){var a={},d=b.createElement("div");d.setAttribute("id","ejs-qtest");return function(f){if(a[f]===c){s();var g=b.createElement("style");g.type="text/css";h.appendChild(g);var i="@media "+f+" { #ejs-qtest { position: absolute; width: 10px; } }";g.styleSheet?g.styleSheet.cssText=i:g.appendChild(b.createTextNode(i));e.appendChild(d);var j=d.offsetWidth;e.removeChild(d);h.removeChild(g);t();a[f]=j==10}return a[f]}}();a.enhance=function(a){a=a||{};d={};for(var b in enhance.defaultSettings){var e=a[b];d[b]=e!==c?e:enhance.defaultSettings[b]}for(var f in a.addTests)d.tests[f]=a.addTests[f];i.className.indexOf(d.testName)===-1&&(i.className+=" "+d.testName);k=d.testName+"-toggledmediaA";l=d.testName+"-toggledmediaB";m=[K(k),K(l)];setTimeout(function(){j||x()},3e3);u();M();v(function(){g=!0})};enhance.query=n;enhance.defaultTests={getById:function(){return!!b.getElementById},getByTagName:function(){return!!b.getElementsByTagName},createEl:function(){return!!b.createElement},boxmodel:function(){var a=b.createElement("div");a.style.cssText="width: 1px; padding: 1px;";e.appendChild(a);var c=a.offsetWidth;e.removeChild(a);return c===3},position:function(){var a=b.createElement("div");a.style.cssText="position: absolute; left: 10px;";e.appendChild(a);var c=a.offsetLeft;e.removeChild(a);return c===10},floatClear:function(){var a=!1,c=b.createElement("div"),d='style="width: 5px; height: 5px; float: left;"';c.innerHTML="<div "+d+"></div><div "+d+"></div>";e.appendChild(c);var f=c.childNodes,g=f[0].offsetTop,h=f[1],i=h.offsetTop;if(g===i){h.style.clear="left";i=h.offsetTop;g!==i&&(a=!0)}e.removeChild(c);return a},heightOverflow:function(){var a=b.createElement("div");a.innerHTML='<div style="height: 10px;"></div>';a.style.cssText="overflow: hidden; height: 0;";e.appendChild(a);var c=a.offsetHeight;e.removeChild(a);return c===0},ajax:function(){var a=!1,b=-1,c,d=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];while(c=d[++b]){try{a=c()}catch(e){continue}break}return!!a},resize:function(){return a.onresize!=0},print:function(){return!!a.print}};enhance.defaultSettings={testName:"enhanced",loadScripts:[],loadStyles:[],queueLoading:!0,appendToggleLink:!0,forcePassText:"View high-bandwidth version",forceFailText:"View low-bandwidth version",tests:enhance.defaultTests,media:{"-ejs-desktop":enhance.query("screen and (max-device-width: 1024px)")?"not screen and (max-device-width: 1024px)":"screen","-ejs-handheld":"screen and (max-device-width: 1024px)"},addTests:{},alertOnFailure:!1,onPass:function(){},onFail:function(){},onLoadError:B,onScriptsLoaded:function(){}};enhance.cookiesSupported=o();enhance.cookiesSupported&&(enhance.forceFail=p);enhance.cookiesSupported&&(enhance.forcePass=q);enhance.cookiesSupported&&(enhance.reTest=r);enhance.toggleMedia=z;var E=function(){var a={},d;return function(e){return!1}}()})(window,document);
/**
 * --------------------------------------------------------------------
 * jQuery customfileinput plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group. Updated 2012.
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */

/**
 * All credits go to the Author of this file, some additional customization was
 * done for theme compat. purposes.
 */
jQuery(document).ready(function ($) {
$.fn.customFileInput = function(options){
	
	//Get current element
	var fileInput = $(this);
	
	//Define settings
	var settings	= jQuery.extend({
		button_position 	: 'right',
		classes				: fileInput.attr('class'),
		feedback_text		: 'No image added...',
		button_text			: 'Browse',
		button_change_text	: 'Add new'
	}, options);
	
	//apply events and styles for file input element
	fileInput
		.addClass('customfile-input') //add class for CSS
		.focus(function(){
			upload.addClass('customfile-focus'); 
			fileInput.data('val', fileInput.val());
		})
		.blur(function(){ 
			upload.removeClass('customfile-focus');
			$(this).trigger('checkChange');
		 })
		 .bind('disable',function(){
		 	fileInput.attr('disabled',true);
			upload.addClass('customfile-disabled');
		})
		.bind('enable',function(){
			fileInput.removeAttr('disabled');
			upload.removeClass('customfile-disabled');
		})
		.bind('checkChange', function(){
			if(fileInput.val() && fileInput.val() != fileInput.data('val')){
				fileInput.trigger('change');
			}
		})
		.bind('change',function(){
			//get file name
			var fileName = $(this).val().split(/\\/).pop();
			//get file extension
			var fileExt = 'customfile-ext-' + fileName.split('.').pop().toLowerCase();
			//update the feedback
			uploadFeedback
				.css({ width : '-=21' })
				.text(fileName) //set feedback text to filename
				.removeClass(uploadFeedback.data('fileExt') || '') //remove any existing file extension class
				.addClass(fileExt) //add file extension class
				.data('fileExt', fileExt) //store file extension for class removal on next change
				.addClass('customfile-feedback-populated'); //add class to show populated state
			//change text of button	
			uploadButton.text(settings.button_change_text);	
		})
		.click(function(){ //for IE and Opera, make sure change fires after choosing a file, using an async callback
			fileInput.data('val', fileInput.val());
			setTimeout(function(){
				fileInput.trigger('checkChange');
			},100);
		});
		
		//create custom control container
		var upload = $('<div class="input-' + (('right' === settings.button_position)?'append':'prepend') + ' customfile">');
		//create custom control feedback
		var uploadFeedback = $('<span class="customfile-feedback ' + settings.classes + '" aria-hidden="true">' + settings.feedback_text + '</span>').appendTo(upload);
		//create custom control button
		var uploadButton = $('<span class="add-on customfile-button" aria-hidden="true">' + settings.button_text + '</span>').css({ float : settings.button_position });
		
		if ('right' === settings.button_position) {
			uploadButton.insertAfter(uploadFeedback);
		} else uploadButton.insertBefore(uploadFeedback);
	
	//match disabled state
	if(fileInput.is('[disabled]')){
		fileInput.trigger('disable');
	} else upload.click(function () { fileInput.trigger('click'); });
		
	
	//insert original input file in dom, css if hide it outside of screen
	upload.insertAfter(fileInput);
	fileInput.insertAfter(upload);
		
	//return jQuery
	return $(this);
};
});