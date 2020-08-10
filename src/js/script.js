/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentListItems = document.querySelectorAll("ul.student-list li.student-item");
const numOfItemsPerPage = 10;


/**
 * Hide all student list items
 */
function hideAllStudentListItems() {
   for (let i = 0; i < studentListItems.length; i++) {
      studentListItems[i].classList.add("hidden");
   }
}


/*** 
   Hide all of the items in the list except for the ones that should be displayed
   on the page

   @param {li[]} studentList - array of student list items 
   @param {int} pageNum - number of the page that will be displayed
***/
function displayPage(studentList, pageNum=1) {
   hideAllStudentListItems();

   let startIndex = (pageNum * numOfItemsPerPage) - numOfItemsPerPage;
   let endIndex = pageNum * numOfItemsPerPage;

   if (endIndex > studentList.length) {
      endIndex = studentList.length;
   }

   for (let i = startIndex; i < endIndex; ++i) {
      studentList[i].classList.remove("hidden");
   }
}


/**
 * Generate pagination buttons
 * 
 * @param {int} num - number of pagination buttons to be generated
 * @return {div html element} div
 */
function generatePginationButtons(num) {
   const div = document.createElement('div');
   div.classList.add('pagination');
   const ul = document.createElement('ul');

   // create links and append them to the list
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
 * @param {div html element} pagination - pagination div element containing links
 */
function addFunctionalityToPaginationLinks(pagination) {
   pagination.addEventListener('click', (e) => {
      if (e.target.tagName == 'A') {
         e.preventDefault();

         // remove active class from the previous link and add it to the clicked one
         pagination.querySelector('a.active').classList.remove('active');
         e.target.classList.add('active');
         
         // display page
         let pageNum = e.target.textContent;
         displayPage(studentListItems, pageNum);
      }
   });
}


/*** 
   Generate, append, and add functionality to the pagination buttons.
***/
function appendPageLinks() {
   const numOfPaginationButtons = 
      Math.floor(studentListItems.length / numOfItemsPerPage) + 1;
   const pagination = generatePginationButtons(numOfPaginationButtons);
      
   const page = document.querySelector('div.page');
   page.appendChild(pagination);

   addFunctionalityToPaginationLinks(pagination);
}


/**
 * Main
 */
document.addEventListener("DOMContentLoaded", () => {
   hideAllStudentListItems();
   displayPage(studentListItems);
   appendPageLinks();
});