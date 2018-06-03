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

// // Show Alert
// const showAlert = (message, className) => {
//   // Create div
//   const div = document.createElement('div');
//   // Add classes
//   div.className = `alert ${className}`;
//   // Add text
//   div.appendChild(document.createTextNode(message));
//   // Get parent
//   const container = document.querySelector('.container');
//   // Get form
//   const form = document.querySelector('#book-form');
//   // Insert alert
//   container.insertBefore(div, form);

//   // Timeout after 3 sec
//   setTimeout(function () {
//     document.querySelector('.alert').remove();
//   }, 3000);
// }


$(document).ready(function () {

  $('.setData').click(function() {
    let snippetKey = $('#nameInputField').val();
    let snippetValue = $('#codeInputField').val();

    // Validate
    if (snippetKey === '' || snippetValue === '') {
      // Error alert
      console.log("empty!");
      // ui.showAlert('Please fill in all fields', 'error');
    } else {
      // Add snippet to localStorage
      localStorage.setItem(snippetKey, snippetValue);
    }
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
