let currentTextSize = 12; // Initial font size in pixels

function increaseTextSize() {
  currentTextSize += 2;
  document.body.style.fontSize = currentTextSize + 'px';
}

function decreaseTextSize() {
  currentTextSize -= 2;
  document.body.style.fontSize = currentTextSize + 'px';
}

function resetTextSize() {
  currentTextSize = 12; // Reset font size to initial value
  document.body.style.fontSize = currentTextSize + 'px';
}
// Get the input element and button
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button');

// Add click event listener to the search button
searchButton.addEventListener('click', function() {
  const searchText = searchInput.value.toLowerCase(); // Get the input text and convert to lowercase for case-insensitive search

  // Perform the search logic here
  const contentToSearch = document.body.innerText.toLowerCase(); // Get all the text content on the page and convert to lowercase
  const searchRegex = new RegExp(searchText, 'g'); // Create a regular expression for global case-insensitive search

  // Remove previous highlights
  const removeHighlights = document.querySelectorAll('.highlighted');
  removeHighlights.forEach(function(element) {
    element.classList.remove('highlighted');
  });

  // Highlight the found text
  const matches = contentToSearch.match(searchRegex);
  if (matches) {
    matches.forEach(function(match) {
      const regex = new RegExp(match, 'g');
      const nodes = Array.from(document.body.childNodes);
      nodes.forEach(function(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = node.textContent.replace(regex, (matched) => `<span class="highlighted">${matched}</span>`);
        }
      });
    });
    alert('Text found on the page!');
  } else {
    alert('Text not found on the page.');
  }
});

// Get all h2 elements within the left panel
const h3Elements = document.querySelectorAll('.left-panel h3');

// Add click event listener to each h2 element
h3Elements.forEach(function(h3Element) {
  h3Element.addEventListener('click', function() {
    // Get the next ul element after the clicked h2
    const ulElement = h3Element.nextElementSibling;

    // Toggle the visibility of the ul element
    ulElement.classList.toggle('show');
  });
});

// Get all li elements with the class dropdown
const dropdownItems = document.querySelectorAll('.top-menu-bar .dropdown');

// Add click event listener to each dropdown item
dropdownItems.forEach(function(dropdownItem) {
  dropdownItem.addEventListener('click', function() {
    // Get the corresponding dropdown-content element
    const dropdownContent = dropdownItem.querySelector('.dropdown-content');

    // Toggle the visibility of the dropdown-content element
    dropdownContent.classList.toggle('show');
  });
});
