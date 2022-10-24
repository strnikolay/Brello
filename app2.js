//const lists= document.querySelectorAll('.list')
const button=document.querySelector('.button')

let listbtn, listaddBtn, listcancelBtn, listtextarea, listform

function select(){
listbtn = document.querySelectorAll('.add_btn')  //кнопка добавления карточки
listaddBtn = document.querySelectorAll('.add_item_btn')// проверить необходимость кнопки 
listcancelBtn = document.querySelectorAll('.cancel_item_btn') // кнопка отмены добавления 
listtextarea= document.querySelectorAll('.textarea') // поле ввода текста карточки
listform = document.querySelectorAll('.form') //форма добавления карточки     
}
const lists= document.querySelectorAll('.list')
select()

function addTask(){
    /*const btn = document.querySelector('.add_btn') // кнопка добавления карточки
    const addBtn = document.querySelector('.add_item_btn')// проверить необходимость кнопки 
    const cancelBtn = document.querySelector('.cancel_item_btn') // кнопка отмены добавления 
    const textarea= document.querySelector('.textarea') // поле ввода текста карточки
    const form = document.querySelector('.form') //форма добавления карточки */

     // введеный текст карточки

    for (let i=0; i < listbtn.length; i++ ){
    /*const btn = listbtn[i] 
    const addBtn = listaddBtn[i]
    const cancelBtn = listcancelBtn[i]
    const textarea = listtextarea[i]
    //const form = listform[i]*/
    //let value
    listbtn[i].addEventListener('click', () => {
        //при клике на "добавить карточку"
        listform[i].style.display = 'block' //появляется форма
        listbtn[i].style.display='none' // убирается кнопка "добавить карточку"
        //addBtn.style.display='none' //?

        /*listtextarea[i].addEventListener('input', function (e) {// обработчик на изменение поля ввода
            value = this.target.value

            /*if(value){
              listaddBtn[i].style.display='block' // если поле не пустое появляется кнопка "добавить"
            } else {
              listaddBtn[i].style.display='none'//если поле пустое кнопка "добавить" исчезает
            }
        })*/

        listtextarea[i].addEventListener('input', e => {// обработчик на изменение поля ввода
          value = e.target.value

          if(value){
            listaddBtn[i].style.display='block' // если поле не пустое появляется кнопка "добавить"
          } else {
            listaddBtn[i].style.display='none'//если поле пустое кнопка "добавить" исчезает
          }
      })
    })

    //кнопка отмены
    listcancelBtn[i].addEventListener('click', ()=>{
        listtextarea[i].value='' // очищает поля
        value=''
        listform[i].style.display='none' //скрывает форму
        listbtn[i].style.display='flex' // отображает кнопку добавить
       
    })

    listaddBtn[i].addEventListener('click', () =>{
        const newItem = document.createElement('div')// создает новый div
        newItem.classList.add('list_item') // присваивает div'у класс 'list_item'
        newItem.draggable=true //присваивает div'у свойство
        newItem.textContent= value
        lists[0].append(newItem)

        listtextarea[i].value='' // очищает поля
        value=''

        listform[i].style.display='none' //скрывает форму
        listbtn[i].style.display='flex' // отображает кнопку добавить
        dragNdrop()
    })}
}
addTask()

//добавить новую доску
function addBoard(){
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards_item')
    board.innerHTML=`
    <span contenteditable="true" class="title">введите название</span>
    <div class="list"></div>
    <div class="form">
    <textarea class="textarea" placeholder="введите название карточки"></textarea>
    <div class="buttons">
        <button class="add_item_btn">добавить карточку</button>
        <button class="cancel_item_btn">отмена</button>
    </div>
    </div>
    <div class="add_btn">
    <span>+</span> добавить карточку
    </div>
    `
    boards.append(board)
    //listbtn = document.querySelectorAll('.add_btn') // кнопка добавления карточки
    select()
    changeTitle()
    dragNdrop()
}

//при клике запускается функция "добавить доску"
button.addEventListener('click', addBoard)

//изменение названия доски
function changeTitle(){
    const titles = document.querySelectorAll('.title') // title это название доски

    titles.forEach( title => { // для каждого title
        title.addEventListener('click', e=> e.target.textContent='') // вешаем слушатель и при клике отчищаем название
    }

    )
}
changeTitle()

let draggetItem = null //заводим переменную для перетаскиваемого обьекта

function dragNdrop(){
    const listItem=document.querySelectorAll('.list_item')
    const lists=document.querySelectorAll('.list')

    for (let i=0; i < listItem.length; i++ ){
        const item = listItem[i]

        item.addEventListener('dragstart', ()=> {
            draggetItem = item
            setTimeout(()=> {
                item.style.display='none'
            }, 0)
        })

        item.addEventListener('dragend', ()=> {
            setTimeout(()=> {
                item.style.display='block'
                draggetItem = null
            }, 0)
        })

        item.addEventListener('dblclick', ()=> {
            item.remove()
        })

        for (let j=0; j < lists.length; j++ ) {
          const list = lists[j]

          list.addEventListener('dragover', e => e.preventDefault())

          // при попадании карточки в поле появляется тень
          list.addEventListener('dragenter', function (e) {
          e.preventDefault()
          this.style.backgroundColor = 'rgba(0,0,0,.3)'
        })

        list.addEventListener('dragleave', function (e) {
          this.style.backgroundColor = 'rgba(0,0,0,0)'
        })

        list.addEventListener('drop', function(e) {
          this.style.backgroundColor = 'rgba(0,0,0,0)'
          this.append(draggetItem)
        })
        }
}}
dragNdrop()

/*function showlists(){
let listvalue ={} 
let listItem = document.querySelectorAll('.list_item')
for (let i=0; i < listItem.length; i++ ){
  listvalue[listItem[i]] = listItem[i].innerText
}
//localStorage["listItem"] = JSON.stringify(listItem)
localStorage.setItem(listItem, JSON.stringify(listItem))
console.log(listItem)
console.log(listvalue)
}
//setInterval(showlists,1000)*/

////***********////
/*var property = ["cost","efficiency","totalGrown"];
var variables = ["xp","xpN","level","seasonTime"];

function saveTest(){
    achievementUnlocked("<code style=font-size:20px;>Игра сохранена!</code>",false); //отображает сообщение о сохраненной игре


    var savedoards = {};
    for (var i = 0; i < lists.length; i++){
      for (var j = 0; j < listItem.length; j++){ //проходит по массиву property
        savedoards[lists[i] + property[j]] = window[plants[i]][property[j]]; // добавляет в saveFile значания из plants[i] + property[j] 
    }}
  
    var variabless = {};
    for (var i = 0; i < variables.length; i++){
      variabless[variables[i]] = window[variables[i]]; // добавляет в saveFile значания из variables
    }
    
    localStorage["variabless"] = JSON.stringify(variabless); // сохраняет в localStorage
    localStorage["saveFile"] = JSON.stringify(saveFile);// сохраняет в localStorage
    
    var tiles = ""; // проходит по элементам tile и заносит в массив tiles 
    for (var i = 0; i < $('.tile').length; i++){ 
      var cell = $('#cell'+i);
      if (i < $('.tile').length - 1){
        tiles += "|";
      }
    }
    localStorage["tiles"] = tiles; //сохраняет в localStorage
    localStorage["skilltree"] = JSON.stringify(skilltree);//сохраняет в localStorage
    localStorage["achievements"] = JSON.stringify(achievements);//сохраняет в localStorage
  }
    
  function loadTest(){
    var saveFile = JSON.parse(localStorage.getItem("saveFile"));
    if (!saveFile) return;
    achievementUnlocked("<code style=font-size:20px;>Game has been loaded!</code>",false);
    for (var i = 0; i < plants.length; i++){
      for (var j = 0; j < property.length; j++){
        if (!plants[i] || !property[j]) continue;
        if (property[j] == "cost" || property[j] == "growsIn" || property[j] == "profit" || property[j] == "unlockPrice") continue;
        window[plants[i]][property[j]] = saveFile[plants[i]+property[j]];
      }
    }
    var tiles = localStorage.getItem("tiles");
    
    tiles = tiles.split("|");
    $('.tile').remove();
    for (var i = 0; i < tiles.length; i++){
      var element = '<div class=tile id=cell'+i+' onclick=plant(this);></div>';
      $('#map').append(element);
      $('#cell'+i).html(tiles[i]);
    }
    var variabless = JSON.parse(localStorage["variabless"]);
    
    for (var i = 0; i < variables.length; i++){
      if (!variabless[variables[i]]) continue;
      window[variables[i]] = variabless[variables[i]];
    }
    // skill tree
    
    skilltree = JSON.parse(localStorage["skilltree"]);
    
    achievements = JSON.parse(localStorage["achievements"]);
    
    for (var key in achievements){
      for (var s = 0; s < achievements[key].amount.length; s++){
        if (achievements[key].achieved[s]){
          $('#'+key+achievements[key].amount[s]).html("");
          var title = "Grow "+achievements[key].amount[s].toLocaleString()+" "+key+"(s).";
          $('#'+key+achievements[key].amount[s]).html("<img src=http://game-icons.net/icons/delapouite/originals/svg/trophy-cup.svg class=info title='"+title+"'>");
        }
      }
    }
  }
   
  setTimeout(loadTest,100)
  setInterval(saveTest,30000);

  function achievementUnlocked(text,title){
    var hasClass = $('.ach').hasClass('achieved');
    if (hasClass) return;
    if (!title) title = false;
    if (title) $('.title').html("Achievement unlocked!");
    $('.detail').html(text);
    $('.ach').addClass("achieved");
    setTimeout(function(){
      $('.ach').removeClass("achieved");
    },5000)
  }  */