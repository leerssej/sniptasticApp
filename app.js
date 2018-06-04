const getAllCode = () => Object.values(localStorage);
const getAllKeys = () => Object.keys(localStorage);
const cleanSlate = () => {
  $('.sample').text('');
  $('.display').text('');
};
const clearFields = () => {
  $('.nameField').val('');
  $('.codeField').val('');
}
const injectCode = (snippet, i = 0) => {
  $('.display')
    .append(`<code data-id=${i}>${snippet}</code>
        <br>`);
};
const injectKey = (name, i = 0) => {
  $('.dropdown-content')
    .append(`<div data-id=${i}>${name}</div>`);
};

const highlightCode = () => hljs.highlightBlock($('.display').get(0));

// Show Alert
const showAlert = (message, className) => {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.formContainer');
  // Get form
  const form = document.querySelector('#nameInputField');
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 1.5 sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 1500);
}


$(document).ready(function () {

  $('.setData').click(function() {
    let snippetKey = $('#nameInputField').val();
    let snippetValue = $('#codeInputField').val();
    // Validate
    if (snippetKey === '' || snippetValue === '') {
      showAlert('Please fill in all fields', 'error');
    } else {
      localStorage.setItem(snippetKey, snippetValue);
      showAlert('Snippet Added!', 'success');
      clearFields();
    }
  });

  $('.getData').click(function() {
    cleanSlate();
    let desiredName = $('#nameInputField').val();
    let snippet = localStorage.getItem(desiredName);
    injectCode(snippet);
    highlightCode();
  });
  
  $('.dropMenu').click(function(e) { 
    console.dir(e.target)
  // fetch list of keys
  // appendInject them into the dropdown-content class
    console.dir(getAllKeys().map((name, i) => console.log(injectKey(name, i))));
  // 

  });

  $('.getAll').click(function() { 
    cleanSlate();
    getAllCode().map((snippet, i) => injectCode(snippet, i));
    highlightCode();
  });
  
  $('.deleteData').click(function() {
    let desiredName = $('#nameInputField').val();
    let snippet = localStorage.getItem(desiredName);
    // Validate available 
    if (desiredName === '' || !snippet ) {
      showAlert('Not Found', 'error');
    } else {
      localStorage.removeItem(desiredName);
      showAlert('Snippet removed!', 'success');
      clearFields();
    }
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
