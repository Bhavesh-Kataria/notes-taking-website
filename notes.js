showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    date=String(new Date());
    actual=date.substring(0,10);
    console.log(date);
    notesObj.push([addTitle.value.toUpperCase(),addTxt.value,isImp=false,actual]);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    showNotes();
})


function showNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 25rem;border:2px solid black">
            <div class="card-body">
                <h5 class="card-title">NOTE ${index+1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${element[3]}&nbsp;</h5>
                <h5 id="${index}" onclick="editTitle(this.id)" class="card-text">${element[0]}</h5>
                <p id="${index}" onclick="editText(this.id)" class="card-text">${element[1]}</p>
                <button id="${index}" style="display:inline;margin:0px 6.3rem" onclick="deleteNote(this.id)" class="btn btn-primary">DELETE NOTE</button>
                <button type="button" style="display:inline" id="${index}" onclick="marker(this.id)" class="btn btn-danger my-2">MARK IMPORTANT</button>
                <button type="button" style="display:inline" id="${index}" onclick="unmarker(this.id)" class="btn btn-danger my-2">MARK UNIMPORTANT</button>
            </div>
        </div>`      
    });
    let noteselem=document.getElementById("notes");
    if(notesObj.length!=0){
        noteselem.innerHTML=html;
    }
    else{
        noteselem.innerHTML=`<p>THERE ARE NO NOTES TO DISPLAY! PLZ USE "ADD NOTE" BUTTON TO ADD NOTES</p>`
    }
    let doc=document.getElementsByClassName("noteCard");
    notesObj.forEach(function(element,index){
        if(element[2]==true){
            doc[index].style.backgroundColor="yellow";
        }
    });
}

function deleteNote(index){
    let notes=localStorage.getItem("notes");
    notesObj=JSON.parse(notes);
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

search=document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let searchval=search.value.toLowerCase();
    let doc=document.getElementsByClassName("noteCard");
    Array.from(doc).forEach(function(element){
       let cardVal=(element.getElementsByTagName("p")[0]).innerText.toLowerCase();
       let titleVal=(element.getElementsByTagName("h5")[1]).innerText.toLowerCase();
       if(cardVal.includes(searchval) || titleVal.includes(searchval)){
           element.style.display="block";
       }
       else{
        element.style.display="none";
       }
    });
});

function marker(index1){
    let notes=localStorage.getItem("notes");
    notesObj=JSON.parse(notes);
    notesObj[index1][2]=true;
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

function unmarker(index1){
    let notes=localStorage.getItem("notes");
    notesObj=JSON.parse(notes);
    notesObj[index1][2]=false;
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}


function editTitle(index1){
    let notes=localStorage.getItem("notes");
    notesObj=JSON.parse(notes);
    let html=notesObj[index1][0];
    let inp=document.createElement("input");
    inp.type="text";
    inp.value=`${html}`;
    let doc=document.getElementsByClassName("noteCard");
    Array.from(doc).forEach(function(element,index){
        if(index1==index){
            element.getElementsByTagName("h5")[1].replaceWith(inp);
        }
    });
    inp.addEventListener("blur",function(){
        notesObj[index1][0]=inp.value.toUpperCase();
        localStorage.setItem("notes",JSON.stringify(notesObj));
        showNotes();
    });
}

function editText(index1){
    let notes=localStorage.getItem("notes");
    notesObj=JSON.parse(notes);
    let html=notesObj[index1][1];
    let inp=document.createElement("textarea");
    inp.value=`${html}`;
    inp.setAttribute("rows","3");
    inp.setAttribute("cols","40");
    let doc=document.getElementsByClassName("noteCard");
    Array.from(doc).forEach(function(element,index){
        if(index1==index){
            element.getElementsByTagName("p")[0].replaceWith(inp);
        }
    });
    inp.addEventListener("blur",function(){
        notesObj[index1][1]=inp.value;
        localStorage.setItem("notes",JSON.stringify(notesObj));
        showNotes();
    });
}

