const getAllCode = () => Object.values(localStorage);
const getAllKeys = () => Object.keys(localStorage);
const cleanSlate = () => {
  $('.sample').text('');
  $('.display').text('');
};
const injectCode = (snippet, i = 0) => {
  $('.display')
    .append(`<code data-id=${i}>${snippet}</code>
        <br>`);
};
const highlightCode = () => hljs.highlightBlock($('.display').get(0));


$(document).ready(function () {

  $('.setData').click(function() {
    let snippetKey = $('#nameInputField').val();
    let snippetValue = $('#codeInputField').val();
    localStorage.setItem(snippetKey, snippetValue);
    $('.nameField').val(''); // empty the NameField on save
  });

  $('.getData').click(function() {
    cleanSlate();
    let desiredName = $('#nameInputField').val();
    let snippet = localStorage.getItem(desiredName);
    injectCode(snippet);
    highlightCode();
  });

  $('.getAll').click(function() { 
    cleanSlate();
    getAllCode().map((snippet, i) => injectCode(snippet, i));
    highlightCode();
  });

  $('.viewContainer').click(function(e) { 
    let targetDataId;
    if (e.target.closest("code")) {
      targetDataId = e.target.closest("code").attributes["0"].nodeValue;
    }
    if (targetDataId) {
      console.dir(targetDataId)
    } else {
      console.log('please click on the code!')
    }
  });

});
