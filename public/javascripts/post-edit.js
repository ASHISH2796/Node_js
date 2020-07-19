//find post edit form
let postEditForm =document.getElementById('postEditForm');
//add event listner  on submit event 
postEditForm.addEventListener('submit',function(event){
    //find total no. of new images uploaded
    let imageUpload =document.getElementById('imageUpload').files.length;
    //find total no of existing images
    let existingImgs =document.querySelectorAll('.imageDeleteCheckbox').length;
    //find total no of potential deletion 
    let imgDeletion =document.querySelectorAll('.imageDeleteCheckbox:checked').length;
    let  newTotalImage=existingImgs+imageUpload-imgDeletion;
    if(newTotalImage > 4){
        event.preventDefault();
        let removalImgCount =newTotalImage-4;
        alert(`You need to remove atleast ${removalImgCount} (more) no . of Image${removalImgCount===1 ? '':'s' }`);
    }
});//find post edit form
    let postEditForm =document.getElementById('postEditForm');
    //add event listner  on submit event 
    postEditForm.addEventListener('submit',function(event){
        //find total no. of new images uploaded
        let imageUpload =document.getElementById('imageUpload').files.length;
        //find total no of existing images
        let existingImgs =document.querySelectorAll('.imageDeleteCheckbox').length;
        //find total no of potential deletion 
        let imgDeletion =document.querySelectorAll('.imageDeleteCheckbox:checked').length;
        let  newTotalImage=existingImgs+imageUpload-imgDeletion;
        if(newTotalImage > 4){
            event.preventDefault();
            let removalImgCount =newTotalImage-4;
            alert(`You need to remove atleast ${removalImgCount} (more) no . of Image${removalImgCount===1 ? '':'s' }`);
        }
    });