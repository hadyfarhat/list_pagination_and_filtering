/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentListItems = document.querySelectorAll("ul.student-list li.student-item");
const numOfItemsPerPage = 10;


/**
 * Hide given list items
 * 
 * @param {li[] HTML elements} listItems - list items that will be hidden
 */
function hideListItems(listItems) {
   for (let i = 0; i < listItems.length; i++) {
      listItems[i].classList.add("hidden");
   }
}


/**
 * Remove all pagination buttons
 */
function removePagination() {
   const page = document.querySelector('div.page');
   const existingPagination = page.querySelector('.pagination');
   if (existingPagination) page.removeChild(existingPagination);
}


/**
 * Hide all of the items in the given list except for the ones that 
 * should be displayed on the page
 * 
 * @param {li[] HTML elements} listItems - student list items
 * @param {int} pageNum - number of the page that will be displayed
 */
function displayPage(listItems, pageNum=1) {
   hideListItems(studentListItems);

   let startIndex = (pageNum * numOfItemsPerPage) - numOfItemsPerPage;
   let endIndex = pageNum * numOfItemsPerPage;

   if (endIndex > listItems.length) {
      endIndex = listItems.length;
   }

   for (let i = startIndex; i < endIndex; ++i) {
      listItems[i].classList.remove("hidden");
   }
}


/**
 * Generate pagination buttons
 * 
 * @param {int} num - number of pagination buttons to be generated
 * @return {div HTML element} div
 */
function generatePginationButtons(num) {
   const div = document.createElement('div');
   div.classList.add('pagination');
   const ul = document.createElement('ul');

   // create links and append them to the pagination list
   for (let i = 0; i < num; ++i) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.textContent = i + 1;
      a.href = "#";

      li.appendChild(a);
      ul.appendChild(li);
   }

   // add the class 'active' to the first link
   ul.children[0].firstElementChild.classList.add('active');

   div.appendChild(ul);

   return div;
}


/**
 * Add event listeners to pagination links
 * 
 * @param {div HTML element} pagination - pagination div element containing links
 * @param {li[] HTML elements} listItems - student list items
 */
function addFunctionalityToPaginationLinks(pagination, listItems) {
   pagination.addEventListener('click', (e) => {
      if (e.target.tagName == 'A') {
         e.preventDefault();

         // remove active class from the previous link and add it to the clicked one
         pagination.querySelector('a.active').classList.remove('active');
         e.target.classList.add('active');
         
         // display page
         let pageNum = e.target.textContent;
         displayPage(listItems, pageNum);
      }
   });
}


/**
 * Generate, append, and add functionality to the pagination buttons.
 * 
 * @param {li[] HTML elements} listItems - student list items
 */
function appendPageLinks(listItems) {
   const numOfPaginationButtons = 
      Math.floor(listItems.length / numOfItemsPerPage) + 1;
   const pagination = generatePginationButtons(numOfPaginationButtons);
   
   // remove existing pagination and add the new one
   removePagination();
   const page = document.querySelector('div.page');
   page.appendChild(pagination);

   addFunctionalityToPaginationLinks(pagination, listItems);
}


/**
 * Generate search bar
 * 
 * @return {div HTML element} div
 */
function generateSearchBar() {
   const div = document.createElement('div');
   div.classList.add('student-search');

   const input = document.createElement('input');
   input.placeholder = "Search for students...";
   div.appendChild(input);

   const button = document.createElement('button');
   button.textContent = 'Search';
   div.appendChild(button);

   return div;
}


/**
 * Search for list items that contain the search string in their names
 * 
 * @param {string} str - search query string
 * @param {li[] HTML elements} listItems - listItems that will be searched
 * @return {li[] HTML elements} foundListItems
 */
function search(str, listItems) {
   str = str.toLowerCase().trim();
   
   let foundListItems = [];
   for (let i = 0; i < listItems.length; ++i) {
      let item = listItems[i];
      let studentName = item.querySelector('h3');
      if (studentName.textContent.includes(str)) {
         foundListItems.push(item);
      }
   }

   return foundListItems;
}


/**
 * Generate no search results element
 */
function generateNoSearchResultElement() {
   let div = document.createElement('div');
   div.className = 'no-search-results';
   let h2 = document.createElement('h2');
   h2.textContent = 'No search results were found';
   div.appendChild(h2);

   return div;
}


/**
 * Remove no search results element
 */
function removeNoSearchResultsMessage() {
   const noSearchResultsDiv = document.querySelector('.no-search-results');
   if (noSearchResultsDiv) {
      const page = document.querySelector('.page');
      page.removeChild(noSearchResultsDiv);
   }
}


/**
 * Display no search results message
 * @param {li[] HTML elements} listItems - listItems that will be hidden
 */
function displayNoSearchResults(listItems) {
   removeNoSearchResultsMessage();
   hideListItems(listItems);
   removePagination();

   const noSearchResultsDiv = generateNoSearchResultElement();
   const page = document.querySelector('.page');
   page.appendChild(noSearchResultsDiv);
}


/**
 * Add event listeners to input change and button click of the search bar
 * 
 * @param {div HTML element} searchBar - search bar div
 * @param {li[] HTML elements} listItems - listItems that will be searched
 */
function addFunctionalityToSearchBar(searchBar, listItems) {
   const button = searchBar.querySelector('button');
   const input = searchBar.querySelector('input');

   function searchFuncionality(query) {
      removeNoSearchResultsMessage();

      const foundListItems = search(query, listItems);
      if (foundListItems.length > 0) {
         appendPageLinks(foundListItems);
         displayPage(foundListItems);
      } else {
         displayNoSearchResults(listItems);
      }
   }
   
   button.addEventListener('click', () => {
      const query = searchBar.querySelector('input').value;
      searchFuncionality(query);
   });

   input.addEventListener('input', (e) => {
      const query = e.target.value;
      searchFuncionality(query);
   });
}


/**
 * Generate, append, and add functionality to the search bar
 * 
 * @param {li[] HTML elements} listItems - listItems that will be searched
 */
function appendSearchBar(listItems) {
   const searchBar = generateSearchBar();
   
   addFunctionalityToSearchBar(searchBar, listItems);

   const pageHeader = document.querySelector('div.page-header');
   pageHeader.appendChild(searchBar);
}


document.addEventListener("DOMContentLoaded", () => {
   hideListItems(studentListItems);
   displayPage(studentListItems);
   appendPageLinks(studentListItems);
   appendSearchBar(studentListItems);
});