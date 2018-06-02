const getAllCode = () => Object.values(localStorage);
const getAllKeys = () => Object.keys(localStorage);
const cleanSlate = () => {
  $('.sample').text('');
  $('.display').text('');
};
const injectCode = snippet => {
  $('.display')
    .append(`<code>${snippet}</code>
        <br>`);
};
const highlightCode = () => hljs.highlightBlock($('.display').get(0));


$(document).ready(function () {

  $('.setData').on('click', function() {
    let snippetKey = $('#nameInputField').val();
    let snippetValue = $('#codeInputField').val();
    localStorage.setItem(snippetKey, snippetValue);
    $('.nameField').val(''); // empty the NameField on save
  });

  $('.getData').click( function () {
    cleanSlate();
    let desiredName = $('#nameInputField').val();
    let snippet = localStorage.getItem(desiredName);
    injectCode(snippet);
    highlightCode();
  });
  
  $('.getAll').click(function () { 
    cleanSlate();
    getAllCode().map(snippet => injectCode(snippet));
    highlightCode();
  });
  
});
