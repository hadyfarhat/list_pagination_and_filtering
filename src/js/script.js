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
   Hide all of the items in the list except for the ten that are relevant to the
   pageNum param.

   @param {li[]} studentList - array of student list items 
   @param {int} pageNum - number of page that should be displayed
***/
function displayPage(studentList, pageNum) {
   let startIndex = (pageNum * numOfItemsPerPage) - numOfItemsPerPage;
   let endIndex = pageNum * numOfItemsPerPage;

   if (endIndex > studentList.length) {
      endIndex = studentList.length;
   }

   for (let i = startIndex; i < endIndex; ++i) {
      studentList[i].classList.remove("hidden");
   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





document.addEventListener("DOMContentLoaded", () => {
   hideAllStudentListItems();
   displayPage(studentListItems, 2);
});