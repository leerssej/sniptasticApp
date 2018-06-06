// helper functions
// UI Constructor
function snippetLibrary(name, code, prefix, descrip) {}

/// data handling
const getAllCode = () => Object.values(localStorage);
const getAllKeys = () => Object.keys(localStorage);
/// field and display clearing
const clearFields = () => {
  $('.nameField').val('');
  $('.codeField').val('');
}
const clearDropdownList = () => {
  $('.dropdown-content').text('');
  $('.codeField').val('');
}
const clearCodeDisplay = () => {
  $('.sample').text('');
  $('.display').text('');
};
// button reveal and hide management
const toggleDirectCrudButtons = () => {
  $('.directCrudButtonContainer').fadeToggle('.hidden');
  $('.indirectCrudButton').fadeToggle('.hidden');
}

/// code injection
const injectCode = (snippet, i = 0) => {
  $('.display')
    .append(`<code data-id=${i}>${snippet}</code>`);
};
const injectKey = (name, i = 0) => {
  $('.dropdown-content')
    .append(`<div class="keys" data-id=${i}>${name}</div>`);
};

/// collect data from local storage
const getAndDisplayCodebyName = name => {
  let snippet = localStorage.getItem(name);
  injectCode(snippet);
  highlightCode();
}

/// code markup
const highlightCode = () => hljs.highlightBlock($('.display').get(0));

/// Entry and Action Alert injection in vanillaJS 
//// (from Traversy, B. "Modern Javascript from the Beginning" hosted on udemy.com)
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
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 1500);
}

// event handlers
$(document).ready(() => {
  
  // Create entry
  $('.setData').click(() => {
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

  // fetch entry from textbox by button click
  $('.getData').click(() => {
    clearCodeDisplay();
    let desiredName = $('#nameInputField').val();
    getAndDisplayCodebyName(desiredName);
  });

  // offer menu of entries that can be retrieved
  $('.dropdownMenu').click(() => {
    $('.dropdown-content').fadeToggle('.hidden');
    clearDropdownList();
    getAllKeys().map((name, i) => console.log(injectKey(name, i)));
  });

  // fetch menu item by dropdown menu item click
  $('.dropdown-content').click((e) => {
    clearCodeDisplay();
    // get the text from the menu
    let desiredName = e.target.textContent;
    getAndDisplayCodebyName(desiredName);
    $('.dropdown-content').fadeToggle('.hidden');
    $('#nameInputField').val(desiredName);
    // get code dictionary
    const codeObj = localStorage;
    // post value into textArea
    $('#codeInputField').val(codeObj[desiredName]);
  })

  // fetch all code snippets stored in localstorage
  $('.getAll').click(() => { 
    clearCodeDisplay();
    getAllCode().map((snippet, i) => injectCode(snippet, i));
    highlightCode();
  });

  // remove data stored in localstorage
  $('.deleteData').click(() => {
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

  // get id of clicked entry
  $('.viewContainer').click((e) => { 
    let targetDataId;
    if (e.target.closest("code")) {
      targetDataId = e.target.closest("code").attributes["data-id"].value;
    }
    // debugging the code click calls
    if (targetDataId) {
      console.dir(targetDataId)
    } else {
      console.log('please click on the code!')
    }
    // create array of all keys
    const keyArr = getAllKeys();
    // post value at index into namefield
    $('#nameInputField').val(keyArr[targetDataId]);
    // create array of all code
    const codeArr = getAllCode();
    // post value at index into textArea
    $('#codeInputField').val(codeArr[targetDataId]);
  });

  // shift to directCrudButtons
  $('.nameField').focusin(() => { 
    $('.directCrudButtonContainer').fadeToggle('.display');
    $('.indirectCrudButton').fadeToggle('.display');
  });
  // shift to indirectCrudButtons
  $('.nameField').focusout(() => { 
    $('.directCrudButtonContainer').fadeToggle('.hidden');
    $('.indirectCrudButton').fadeToggle('.hidden');
  });

});

