// ==UserScript==
// @icon         http://www.ex.ua/favicon.ico
// @name         ExUa Direct Link Extractor
// @namespace    http://github.com/ndikanov/
// @version      0.3.1
// @description  Direct link extractor for ex.ua
// @author       Nick
// @grant        none
// @include      http://www.ex.ua/*
// @include      http://ex.ua/*
// ==/UserScript==


function main() {

    var sourceElements = document.getElementsByClassName('mail-add');
    var directLinks = [];

    for(var i=0; i<sourceElements.length; i++){
        var playColumnChildrenQty = sourceElements[i].parentNode.parentNode.previousElementSibling.childNodes.length;

        if (playColumnChildrenQty > 1) {
            var md5 = sourceElements[i].parentNode.previousElementSibling.children[1].innerHTML;
            var fileNameElement = sourceElements[i].parentNode.parentNode.previousElementSibling.previousElementSibling.getElementsByTagName('a')[0];
            var fileName = fileNameElement.getAttribute('title');
            fileName = encodeURI(fileName);

            var fsElements = sourceElements[i].parentNode.nextSibling.children;

            var span = document.createElement('span');
            span.setAttribute('class', 'r_button_small');
            span.style.float = 'right';

            var parent = fileNameElement.parentNode;
            parent.insertBefore(span, fileNameElement.nextSibling);

            for(var j=0; j<fsElements.length; j++){
                var fsElement = fsElements[j];

                var fsName = fsElement.innerHTML;
                var fileId = fsElement.getAttribute('href').match(/\d+/);

                var directLink = 'http://'+fsName+'.www.ex.ua/show/'+md5+'/'+fileId+'/'+fileName;

                if (j===0) {
                    directLinks.push(directLink);
                }

                var directLinkInput = document.createElement('input');
                directLinkInput.setAttribute('value', directLink);

                // ===TextArea Hiding Begin===
                // Place in top-left corner of screen regardless of scroll position.
                directLinkInput.style.position = 'fixed';
                directLinkInput.style.top = 0;
                directLinkInput.style.left = 0;

                // Ensure it has a small width and height. Setting to 1px / 1em
                // doesn't work as this gives a negative w/h on some browsers.
                directLinkInput.style.width = '2em';
                directLinkInput.style.height = '2em';

                // We don't need padding, reducing the size if it does flash render.
                directLinkInput.style.padding = 0;

                // Clean up any borders.
                directLinkInput.style.border = 'none';
                directLinkInput.style.outline = 'none';
                directLinkInput.style.boxShadow = 'none';

                // Avoid flash of white box if rendered for any reason.
                directLinkInput.style.background = 'transparent';
                // ===TextArea Hiding End===

                var directLinkButton = document.createElement('a');
                directLinkButton.innerHTML = 'копировать '+fsName;
                directLinkButton.setAttribute('href','');
                directLinkButton.setAttribute('onclick','return false');
                directLinkButton.addEventListener("click", copyDirectLink);

                span.appendChild(directLinkInput);
                span.appendChild(directLinkButton);
            }
        }
    }

    //Direct Links List
    var linksText = directLinks.join('\n');

    var topCell = sourceElements[0].parentNode.parentNode.parentNode.previousElementSibling.getElementsByTagName('td')[0];
    var details = document.createElement('details');
    var summary = document.createElement('summary');
    summary.style.padding = '5px 0';
    summary.style.cursor = 'pointer';

    var textArea = document.createElement('textarea');
    textArea.value = linksText;
    textArea.style.width = '100%';
    textArea.rows = Math.min(15, directLinks.length);

    topCell.appendChild(details).appendChild(summary).innerHTML='<b>Список прямых ссылок</b>';
    details.appendChild(textArea);
}

function copyDirectLink(){
  var currentInput = this.previousElementSibling;
  currentInput.select();
  document.execCommand('copy');
}

window.onload = main();
