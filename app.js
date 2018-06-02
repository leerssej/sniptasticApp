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
    $('.code').html('');
    let desiredName = $('#nameInputField').val();
    let retrievedData = localStorage.getItem(desiredName);
    console.log(retrievedData);
    $('.code').text(retrievedData);
    hljs.highlightBlock($('.display').get(0))
  });
  
  $('.viewAll').click(function () { 
    // e.preventDefault();
    console.log('On the road to ALL');
    $('.sample').text('');
    $('.display').text('');
    let allCodeArr = dumpAllCode();
    allCodeArr.map(snippet => $('.display').append(`<code class='all'>${snippet}</code>
    <br>`));
    // $('#empty').remove();
    // $('.code').remove();
    // let strungout = JSON.stringify(allCodeArr);
    // let codeWithBreaks = injectLineBreaks(strungout);
    // console.log(codeWithBreaks);
    // let parsedOut = JSON.parse(codeWithBreaks);
    // console.log(parsedOut);
    // hljs.highlightBlock($('display').get(0));
  });
  
  // $('.nameField').keyup(function (e) { 
    //   let nameInputField = $('.nameField').val();
    //   $('.debug').text(nameInputField);
    // });
    
  });
  
// $(document).click(function (e) {
//   console.log('On the road to ALL');
//   let allCodeArr = dumpAllCode();
//   allCodeArr.map(snippet => $('.display').append(`<code class='all'>${snippet}</code>
//     <br>`));
// //   let desiredName = $('#nameInputField').val();
// //   let retrievedData = localStorage.getItem(desiredName);
// //   console.log('oy');
// //   packagedData = `<code>${retrievedData}</code><script>hljs.initHighlighting()</script>`
// //   $('.display').html(packagedData);
//   console.log(e)
//   hljs.highlightBlock($(document).get(0));
// });