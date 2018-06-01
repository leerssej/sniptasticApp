const dumpAllCode = () => Object.values(localStorage);
const dumpAllKeys = () => Object.keys(localStorage);

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
    $('.display').text(retrievedData);
    
  });
  
  $('.viewAll').click(function (e) { 
    e.preventDefault();
    // console.log('On the road to ALL');
    let allCodeArr = dumpAllCode();
    console.log(JSON.stringify(allCodeArr));
    $('.display').text(allCodeArr);
  });

  // $('.nameField').keyup(function (e) { 
  //   let nameInputField = $('.nameField').val();
  //   $('.debug').text(nameInputField);
  // });

});