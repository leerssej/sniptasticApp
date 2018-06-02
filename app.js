const dumpAllCode = () => Object.values(localStorage);
const dumpAllKeys = () => Object.keys(localStorage);
const regex = /","/
const replaceStr = `","<br>","`;
const injectLineBreaks = str => str.replace(regex, replaceStr)

$(document).ready(function () {
  $('.setData').on('click', function() {
    let snippetName = $('#nameInputField').val();
    let snippetCode = $('#codeInputField').val();
    console.log(snippetName);
    console.log(snippetCode);

    localStorage.setItem(snippetName, snippetCode);
    $('.nameField').val('');

  });

  $('.getData').click( function () { 
    let desiredName = $('#nameInputField').val();
    let retrievedData = localStorage.getItem(desiredName);
    console.log(retrievedData);
    packagedData = retrievedData
    $('.code').text(packagedData);
    hljs.initHighlighting();
  });
  
  $('.viewAll').click(function () { 
    // e.preventDefault();
    // console.log('On the road to ALL');
    let allCodeArr = dumpAllCode();
    let strungout = JSON.stringify(allCodeArr);
    let codeWithBreaks = injectLineBreaks(strungout);
    console.log(codeWithBreaks);
    let parsedOut = JSON.parse(codeWithBreaks);
    console.log(parsedOut);
    $('.code').text(parsedOut);
    hljs.initHighlighting();
  });

  // $('.nameField').keyup(function (e) { 
  //   let nameInputField = $('.nameField').val();
  //   $('.debug').text(nameInputField);
  // });

});

// $(document).click(function () {
//   let desiredName = $('#nameInputField').val();
//   let retrievedData = localStorage.getItem(desiredName);
//   console.log('oy');
//   packagedData = `<code>${retrievedData}</code><script>hljs.initHighlighting()</script>`
//   $('.display').html(packagedData);
//   hljs.initHighlighting();
// });