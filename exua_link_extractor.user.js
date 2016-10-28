// ==UserScript==
// @name         ExUa Direct Link Extractor
// @namespace    http://github.com/ndikanov/
// @version      0.1
// @description  Direct link extractor for ex.ua
// @author       Nick
// @grant        none
// @include      http://www.ex.ua/*
// @include      http://ex.ua/*
// ==/UserScript==


function main() {

    var sourceElements = document.getElementsByClassName('fox-play-btn');

    for(var i=1; i<sourceElements.length; i++){
        sourceElement = sourceElements[i];

        var getLink = sourceElement.getAttribute('href');
        var showLink = getLink.replace('get', 'show');
        
        var directLinkInput = document.createElement('input');
        directLinkInput.setAttribute('value', 'www.ex.ua'+showLink);
        
        var directLinkButton = document.createElement('button');
        directLinkButton.innerHTML = 'копировать ссылку';
        directLinkButton.addEventListener("click", copyDirectLink);

        var parent = sourceElement.parentNode;    
        parent.insertBefore(directLinkButton, sourceElement.nextSibling);
        parent.insertBefore(directLinkInput, sourceElement.nextSibling);
    
    }
    
    function copyDirectLink(){
        var currentInput = this.previousElementSibling;
        currentInput.select();
        document.execCommand('copy');
    }
}

window.onload = main();
