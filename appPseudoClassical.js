// function storage constructor
// function UI() {};
// const ui = new UI();


// library storage constructor
function UI(localStorage) {
  this.localStorage = localStorage;
  // this.allcode = UI.prototype.getAllCode(localStorage);
}

// helper functions
/// data handling
UI.prototype.getAllCode = () => Object.values(this.localStorage);
UI.prototype.getAllKeys = () => Object.keys(localStorage);

const ui = new UI(localStorage);
// console.log(newSnipLib);
// console.dir(UI.prototype.getAllCode);
// // console.log(UI);

// console.log(newSnipLib.getAllCode());


/// field and display clearing
UI.prototype.clearFields = () => {
  $('.nameField').val('');
  $('.codeField').val('');
}
UI.prototype.clearDropdownList = () => {
  $('.dropdown-content').text('');
  $('.codeField').val('');
}
UI.prototype.clearCodeDisplay = () => {
  $('.sample').text('');
  $('.display').text('');
};
// button reveal and hide management
UI.prototype.toggleDirectCrudButtons = () => {
  $('.directCrudButtonContainer').fadeToggle('.hidden');
  $('.indirectCrudButton').fadeToggle('.hidden');
}

/// code injection
UI.prototype.injectCode = (snippet, i = 0) => {
  $('.display')
    .append(`<code data-id=${i}>${snippet}</code>`);
};
UI.prototype.injectKey = (name, i = 0) => {
  $('.dropdown-content')
    .append(`<div class="keys" data-id=${i}>${name}</div>`);
};

/// collect data from local storage
UI.prototype.getAndDisplayCodebyName = name => {
  let snippet = localStorage.getItem(name);
  ui.injectCode(snippet);
  ui.highlightCode();
}

/// code markup
UI.prototype.highlightCode = () => hljs.highlightBlock($('.display').get(0));


/// Entry and Action Alert injection in vanillaJS 
//// (from Traversy, B. "Modern Javascript from the Beginning" hosted on udemy.com)
UI.prototype.showAlert = (message, className) => {
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
      ui.showAlert('Snippet Added!', 'success');
      ui.clearFields();
    }
  });

  // fetch entry from textbox by button click
  $('.getData').click(() => {
    ui.clearCodeDisplay();
    let desiredName = $('#nameInputField').val();
    ui.getAndDisplayCodebyName(desiredName);
  });

  // offer menu of entries that can be retrieved
  $('.dropdownMenu').click(() => {
    $('.dropdown-content').fadeToggle('.hidden');
    ui.clearDropdownList();
    ui.getAllKeys().map((name, i) => ui.injectKey(name, i));
  });

  // fetch menu item by dropdown menu item click
  $('.dropdown-content').click((e) => {
    ui.clearCodeDisplay();
    // get the text from the menu
    let desiredName = e.target.textContent;
    ui.getAndDisplayCodebyName(desiredName);
    $('.dropdown-content').fadeToggle('.hidden');
    $('#nameInputField').val(desiredName);
    // get code dictionary
    const codeObj = localStorage;
    // post value into textArea
    $('#codeInputField').val(codeObj[desiredName]);
  })

  // fetch all code snippets stored in localstorage
  $('.getAll').click(() => { 
    // console.dir(getAllCode);
    console.dir(UI);
    console.dir(ui);
    ui.clearCodeDisplay();
    ui.getAllCode().map((snippet, i) => ui.injectCode(snippet, i));
    ui.highlightCode();
  });

  // remove data stored in localstorage
  $('.deleteData').click(() => {
    let desiredName = $('#nameInputField').val();
    let snippet = localStorage.getItem(desiredName);
    // Validate available 
    if (desiredName === '' || !snippet ) {
      ui.showAlert('Not Found', 'error');
    } else {
      localStorage.removeItem(desiredName);
      ui.showAlert('Snippet removed!', 'success');
      ui.clearFields();
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
    const keyArr = ui.getAllKeys();
    // post value at index into namefield
    $('#nameInputField').val(keyArr[targetDataId]);
    // create array of all code
    const codeArr = ui.getAllCode();
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

