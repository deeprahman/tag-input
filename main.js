'use strict';
[].forEach.call(document.getElementsByClassName('tags-input'), function (el) {
    let hiddenInput = document.createElement('input'),
        mainInput = document.createElement('input');
       
    
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', el.getAttribute('data-name'));

    mainInput.setAttribute('type', 'text');
    mainInput.classList.add('main-input');

    // Take the input form the main input field
    mainInput.addEventListener('input', function(){
        let enteredTags = mainInput.value.split(','); // Split the input at the comma
        //Run a function if the enteredTags array length is greater than 1
        if(enteredTags.length > 1){
            //For each element in enteredTags
            enteredTags.forEach(function(t){
                let filteredTag = filterTag(t);
                if(filteredTag.length > 0){
                    addTag(filteredTag); //If the length of the filtered element is greater than 0, add that element as tag
                }
            });
        }
    });

    el.appendChild(mainInput);
    el.appendChild(hiddenInput);

    let tags=[];
    addTag('Hello');
    function addTag(text){
        let tag ={
            text:text,
            elememt:document.createElement('span')
        };
        tag.elememt.classList.add('tag');
        tag.elememt.textContent = tag.text;

        tags.push(tag);
        el.insertBefore(tag.elememt,mainInput);

        // Close button
        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        tag.elememt.appendChild(closeBtn);
        // remove tag
        closeBtn.addEventListener('click', function(){
            removeTag(tags.indexOf(tag));
        });

        refreshTag();
    }
    function removeTag(index){
        let tag = tags[index]; //indicate a special element form the tag array
        tags.splice(index,1);

        //el has the object <div class='tags-input'></div>
        //that object has a child <span class='tag'></span>
        //remove that child
        el.removeChild(tag.elememt);
        refreshTag();
    }
    function refreshTag(){}
    function filterTag(tag){
        let filtered = tag.replace(/^\w -/g,'').trim().replace(/\W+/g,'-');
        return filtered;
    }
});

