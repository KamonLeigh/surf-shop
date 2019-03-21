 // find post edit form 
 let postEditForm = document.getElementById('postEditForm');

 // add submit listener to post edit form
 postEditForm.addEventListener('submit', (e) => {
     // find length of uploaded images 
     const imageUpLoad = document.getElementById('imageUpLoad').files.length;

     // find the total number of existing images
     const existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length;

     // find total number of potential deletions
     const imgDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked').length;

     // figure out if the form can be submittes or not

     const newTotal = (existingImgs - imgDeletions) + imageUpLoad;

     if (newTotal > 4) {
         e.preventDefault();
         const removalAmt = newTotal - 4
         alert(`You need to remove at least ${removalAmt} (more) image${removalAmt === 1 ? '' : 's'}`);
     }


 });