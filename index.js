/************_MAIN_************/
//#1 Главная                  //#4 Спр слов ^              //#7 Доб фр ^
//#2 Учить                    //#5 Спр фраз  ^             //#8 Уд сл
//#3 Провести зачет           //#6  Доб сл  ^              //#9 Уд фр

const fs = require('fs');

let pCol = document.getElementsByTagName("p");
let main = document.getElementById("main");
//FILES STANDART

//**************

function readFiles(nameFileEn,nameFileRu){
  let contentEn = String(fs.readFileSync("group/"+nameFileEn),"utf8").split("\n");
  let contentRu = String(fs.readFileSync("group/"+nameFileRu),"utf8").split("\n");

  let words = new Object();
  words.ru = contentRu;
  words.en = contentEn;
  return words;
}

//ARRAY NAME FILES GROUP
let nameGroupFiles = new Object();
nameGroupFiles.ru = String(fs.readFileSync("dev/ru.txt","utf8")).split("\n");
nameGroupFiles.ru[nameGroupFiles.ru.length-1] = null;
nameGroupFiles.en = String(fs.readFileSync("dev/en.txt","utf8")).split("\n");
nameGroupFiles.en[nameGroupFiles.ru.length-1] = null;


function startStyle(){
  main = document.getElementById("main");
  main.style.display = "flex";
  main.style.justyfiContent = "center";
  main.style.alignItems = "center";
}

//RANDOM
function randNum(min,max){
  return Math.floor(Math.random()*(max-min)+min);
}

pCol[0].onclick=()=>{
  //ТУТ ЕБАШИМ
  let main = document.getElementById("main");
  main.innerHTML="";
  let img = document.createElement("img");
  img.src = "img/sss.jpg";
  main.appendChild(img);

  //ЗАКОНЧИМ
}

function downloadPageGroup(obj){
  //ЗАЧИСТКА МЭЙНА
  let main = document.getElementById("main");
  main.innerHTML = "";
  main.style.display = "flex";
  let lvl=0, exp=0 , nextLvlExp=10;
  //CREATE INTERFACE
  let block = document.createElement("div");
  block.style.display = "block";
  block.style.width = '100%';
  block.style.textAlign = "center";

  let inputLvlAndExp = document.createElement("h1");
  inputLvlAndExp.innerText = "LVL:"+lvl+" EXP:"+exp+" \nUP LVL EXP:"+nextLvlExp;

  let outWorld = document.createElement("span");

  let numID = randNum(0,obj.ru.length-1);
  outWorld.innerText = obj.en[numID];
  //Ожидание
  let message = document.createElement("span");
  message.innerText = "Ожидаю";
  message.style.color = "#de8014";
  //ПРОВЕРКА НА ПРАВИЛЬНОСТЬ ВВОДА
  let inputWorld = document.createElement("input");
  inputWorld.placeholder = "Вводите перевод";
  inputWorld.onchange = ()=>{
    if(String(inputWorld.value).toUpperCase()==String(obj.ru[numID].substring(0,obj.ru[numID].length-1).toUpperCase())){
      //alert("Верно");
      message.innerText = "Верно";
      message.style.color = "#14de21";
      let timer = setInterval(function(){
        message.innerText = "Ожидаю";
        message.style.color = "#de8014";
        clearInterval(timer);
      },2000);
      message.innerText = "Верно";
      message.style.color = "#14de21";
      exp+=5;
      if(exp==nextLvlExp){
        lvl++;
        nextLvlExp*=2;
      }
      inputWorld.value="";
      let old=numID;
      while(old==numID){
        numID=randNum(0,obj.ru.length-1);
      }
      outWorld.innerText = obj.en[numID];
      inputLvlAndExp.innerText = "LVL:"+lvl+" EXP:"+exp+" \nUP LVL EXP:"+nextLvlExp;
    }else{
      //alert("НЕВЕРНо");
      message.innerHTML = "<b>Вы ошиблись<b>";
      message.style.color = "#db2e14";
      let timer = setInterval(function(){
        message.innerHTML = "Ожидаю";
        message.style.color = "#de8014";
        clearInterval(timer);
      },2000);
      exp-=5;
      inputLvlAndExp.innerText = "LVL:"+lvl+" EXP:"+exp+" \nUP LVL EXP:"+nextLvlExp;
    }
  }

  

  let help = document.createElement("button");
  help.innerText = 'help';
  help.addEventListener('click',()=>{
    exp-=10;
    alert(obj.ru[numID]);
    inputLvlAndExp.innerText = "LVL:"+lvl+" EXP:"+exp+" \nUP LVL EXP:"+nextLvlExp;
  });

  let button = document.createElement("Button");
  button.innerText = 'Back';
  button.addEventListener('click',()=>{
      pCol[1].onclick();
  });
  block.appendChild(inputLvlAndExp);
  block.appendChild(document.createElement("br"));
  block.appendChild(outWorld);
  block.appendChild(document.createElement("br"));
  block.appendChild(document.createElement("br"));
  block.appendChild(inputWorld);
  block.appendChild(document.createElement("br"));
  block.appendChild(document.createElement("br"));
  block.appendChild(message);
  block.appendChild(document.createElement("br"));
  block.appendChild(document.createElement("br"));
  block.appendChild(help);
  block.appendChild(document.createElement("br"));
  block.appendChild(button);
  main.appendChild(block);
}

//Функция принимающая массив для просмотра текста
function learnText(obRuAndEn){
  main = document.getElementById("main");
  main.innerHTML = "";
  block = document.createElement("div");
  block.style.width  = "100%";
  block.style.height = "100%";
  
  for(i=0;i<obRuAndEn.ru.length-1;i++){  
    row = document.createElement("div");//#2a4063
    row.style.paddingLeft = "2%";
    row.style.marginTop = "20px";
    row.style.height = "20px";
    leftBlock = document.createElement("div");
    leftBlock.style.background = "solid 2px black";
    leftBlock.style.float = "left";
    
    leftBlock.style.width = "48%";
    leftBlock.style.color = "white";
    leftBlock.innerHTML = obRuAndEn.en[i];
    rightBlock = document.createElement("div");
    rightBlock.style.float = "left";
    rightBlock.style.width = "50%";
    rightBlock.style.background = "solid 2px black";
    rightBlock.style.color = "white";
    rightBlock.innerHTML = obRuAndEn.ru[i];
    row.appendChild(leftBlock);
    row.appendChild(rightBlock);
    block.appendChild(row);
    block.appendChild(document.createElement("br"));
    block.appendChild(document.createElement("br"));
    block.appendChild(document.createElement("hr"));
  }
  main.appendChild(block);
}

//LEARN GROUP
pCol[1].onclick=()=>{
  main = document.getElementById('main');
  main.innerHTML = "";
  let strEn, strRu;
  let row = document.createElement("div");
  row.className ="row";
  for(i=0;i<nameGroupFiles.ru.length-1;i++){
    let block = document.createElement("div");
    block.className = "blockInRow";
    block.id=i;

    strEn = nameGroupFiles.en[i].substring(0,nameGroupFiles.en[i].length-1);
    strRu = nameGroupFiles.ru[i].substring(0,nameGroupFiles.en[i].length-1);

    block.worlds = readFiles(strEn,strRu);//Создание массива из двух файлов

    //Учить текст
    let learn = document.createElement("p");
    learn.addEventListener("click",()=>{
      learnText(block.worlds);    //Передаем массив для создания интерфейса изучение группы фраз
    });
    learn.innerText = "Учить";
    block.appendChild(learn);
    row.appendChild(block);

    //Провести тест
    let title = document.createElement("p");
    title.addEventListener("click",()=>{
      downloadPageGroup(block.worlds);    //Передаем массив для создания интерфейса изучение группы фраз
    });
    title.innerText = "Тест";
    block.appendChild(title);
    block.appendChild(document.createElement("br"));
    block.appendChild(document.createElement("br"));
    let nameGroup = document.createElement("span");
    nameGroup.innerHTML = "Группа: "+(i+1);
    nameGroup.style.color = "white";
    nameGroup.style.paddingLeft="33%";
    block.appendChild(nameGroup);
    row.appendChild(block);
  }
  main.appendChild(row);
}



function createFormTest(obj){
  //ЗАЧИСТКА МЭЙНА
  let main = document.getElementById("main");
  main.innerHTML = "";
  main.style.display = "flex";
  let lvl=0, exp=0 , nextLvlExp=10;
  //CREATE INTERFACE
  let block = document.createElement("div");
  block.style.display = "block";
  block.style.width = '100%';
  block.style.textAlign = "center";

  let inputLvlAndExp = document.createElement("h1");
  inputLvlAndExp.innerText = "LVL:"+lvl+" EXP:"+exp+" \nUP LVL EXP:"+nextLvlExp;

  let outWorld = document.createElement("span");

  let numID = randNum(0,obj.ru.length-1);
  outWorld.innerText = obj.en[numID];
  //Ожидание
  let message = document.createElement("span");
  message.innerText = "Ожидаю";
  message.style.color = "#de8014";
  //ПРОВЕРКА НА ПРАВИЛЬНОСТЬ ВВОДА
  let inputWorld = document.createElement("input");
  inputWorld.placeholder = "Вводите перевод";
  inputWorld.onchange = ()=>{
    if(String(inputWorld.value).toUpperCase()==String(obj.ru[numID].toUpperCase())){
      //alert("Верно");
      message.innerText = "Верно";
      message.style.color = "#14de21";
      let timer = setInterval(function(){
        message.innerText = "Ожидаю";
        message.style.color = "#de8014";
        clearInterval(timer);
      },2000);
      message.innerText = "Верно";
      message.style.color = "#14de21";
      exp+=5;
      if(exp==nextLvlExp){
        lvl++;
        nextLvlExp*=2;
      }
      inputWorld.value="";
      let old=numID;
      while(old==numID){
        numID=randNum(0,obj.ru.length-1);
      }
       
      outWorld.innerText = obj.en[numID];
      inputLvlAndExp.innerText = "LVL:"+lvl+" EXP:"+exp+" \nUP LVL EXP:"+nextLvlExp;
    }else{
      //alert("НЕВЕРНо");
      message.innerHTML = "<b>Вы ошиблись<b>";
      message.style.color = "#db2e14";
      let timer = setInterval(function(){
        message.innerHTML = "Ожидаю";
        message.style.color = "#de8014";
        clearInterval(timer);
      },2000);
      exp-=5;
      inputLvlAndExp.innerText = "LVL:"+lvl+" EXP:"+exp+" \nUP LVL EXP:"+nextLvlExp;
    }
  }

  

  let help = document.createElement("button");
  help.innerText = 'help';
  help.addEventListener('click',()=>{
    exp-=10;
    alert(obj.ru[numID]);
    inputLvlAndExp.innerText = "LVL:"+lvl+" EXP:"+exp+" \nUP LVL EXP:"+nextLvlExp;
  });

  let button = document.createElement("Button");
  button.innerText = 'Back';
  button.addEventListener('click',()=>{
      pCol[1].onclick();
  });
  block.appendChild(inputLvlAndExp);
  block.appendChild(document.createElement("br"));
  block.appendChild(outWorld);
  block.appendChild(document.createElement("br"));
  block.appendChild(document.createElement("br"));
  block.appendChild(inputWorld);
  block.appendChild(document.createElement("br"));
  block.appendChild(document.createElement("br"));
  block.appendChild(message);
  block.appendChild(document.createElement("br"));
  block.appendChild(document.createElement("br"));
  block.appendChild(help);
  block.appendChild(document.createElement("br"));
  block.appendChild(button);
  main.appendChild(block);
}
//ФУНКЦИЯ ДЛЯ ВЫБОРКИ ФРАЗ ИЗ СПРАВОЧНИКА ФРАЗ, ДЛЯ ПРОХОЖДЕНИЯ ТЕСТА
function testPharse(){
  main = document.getElementById('main');
  main.innerHTML = "";
  main.style.display = 'block';
  
  findAndDescription = document.createElement("div");
  findAndDescription.style.color = "#fff";
  findAndDescription.style.cursor ="pointer";
  findAndDescription.style.padding="10px";
  findAndDescription.style.background = "rgba(133, 11, 0, 0.56)";
  description = document.createElement("h4");
  description.style.margin = "0px";
  description.innerText = "Нажмите начать";
  description.style.textAlign = "center";
  find = document.createElement("div");
  find.style.textAlign = "center";

  obj    = new Object();
  obj.ru = new Array();
  obj.en = new Array();
  //НАСТРОИТЬ ОБРАБОТЧИК
  saveButtonDescription = document.createElement("button");
  saveButtonDescription.innerText = "Начать";
  saveButtonDescription.addEventListener("click",()=>{
    if(obj.ru.length<=1){
      alert("Необходимо выбрать минимум две фразы");
    }else{
      obj.ru.push("");
      obj.en.push("");
      createFormTest(obj);
    }
    
  });
  
  findAndDescription.appendChild(description);
  findAndDescription.appendChild(find);
  findAndDescription.appendChild(saveButtonDescription);
  main.appendChild(findAndDescription);
  //

  setInitialPharsesDontDel();
  stroka = document.getElementsByClassName("stroka");
  //alert(stroka[0].children[0].innerText);
  for(i=0;i<stroka.length;i++){
    stroka[i].addEventListener("click",(event)=>{
      obj.en.push(event.target.parentNode.children[0].innerText);
      obj.ru.push(event.target.parentNode.children[1].innerText);
      s=event.target.parentNode;
      s.parentNode.removeChild(s);
    }); 
  }
}
//ФУНКЦИЯ ДЛЯ ВЫБОРКИ СЛОВ ИЗ СПРАВОЧНИКА СЛОВ, ДЛЯ ПРОХОЖДЕНИЯ ТЕСТА
function testWorlds(){
  main = document.getElementById('main');
  main.innerHTML = "";
  main.style.display = 'block';
  
  findAndDescription = document.createElement("div");
  findAndDescription.style.color = "#fff";
  findAndDescription.style.cursor ="pointer";
  findAndDescription.style.padding="10px";
  findAndDescription.style.background = "rgba(133, 11, 0, 0.56)";
  description = document.createElement("h4");
  description.style.margin = "0px";
  description.innerText = "Что бы удалить слово нажмите на него\nДля внесения изменений нажмите кнопку СОХРАНИТЬ";
  description.style.textAlign = "center";
  find = document.createElement("div");
  find.style.textAlign = "center";
  
  //\*/***************\*/
  //\*/ТУТ ОСТАНОВИЛСЯ\*/
  //\*/***************\*/
  obj    = new Object();
  obj.ru = new Array();
  obj.en = new Array();
  //НАСТРОИТЬ ОБРАБОТЧИК
  saveButtonDescription = document.createElement("button");
  saveButtonDescription.innerText = "Сохранить";
  saveButtonDescription.addEventListener("click",()=>{
    if(obj.ru.length<=1){
      alert("Необходимо выбрать минимум две фразы");
    }else{
      obj.ru.push("");
      obj.en.push("");
      createFormTest(obj);
    }
    
  });
  
  findAndDescription.appendChild(description);
  findAndDescription.appendChild(find);
  findAndDescription.appendChild(saveButtonDescription);
  main.appendChild(findAndDescription);
  

  ///
  setInitialWordsDontDel("wordsEN.txt","wordsRU.txt");
  stroka = document.getElementsByClassName("stroka");
  //alert(stroka[0].children[0].innerText);
  
  for(i=0;i<stroka.length;i++){
    stroka[i].addEventListener("click",(event)=>{
      obj.en.push(event.target.parentNode.children[0].innerText);
      obj.ru.push(event.target.parentNode.children[1].innerText);
      let s=event.target.parentNode;
      s.parentNode.removeChild(s);
    }); 
  }
}

pCol[2].onclick=()=>{
  main = document.getElementById('main');
  main.innerHTML = "";
  main.style.display = "block";
  
  let title = document.createElement("h2");
  title.innerHTML = "Выбирите вариант теста";
  title.style.color = "white";
  title.style.textAlign = "center";
  main.appendChild(title);
  main.appendChild(document.createElement("hr"));

  
  ////
  //**ТУТ ПРОДОЛЖАЙ */
  ////
  let block = document.createElement("div");
  block.style.height = "90%";
  block.style.width = "100%";
  block.style.textAlign = "center";
  block.style.display = "flex";
  block.style.justifyContent = "center";
  block.style.alignItems = "center";

  let pharse = document.createElement("div");
  pharse.style.float = "left";
  pharse.style.width = "50%";
  pharse.style.marginRight = "2%";
  pharse.style.marginBottom = "2%";

  let butPh = document.createElement("button");
  butPh.innerHTML = "ФРАЗЫ";
  butPh.addEventListener("click",testPharse);
  pharse.appendChild(butPh);

  let worlds = document.createElement("div");
  worlds.style.float = "left";
  worlds.style.width = "50%";
  let butWor = document.createElement("button");
  butWor.innerHTML = "СЛОВА";
  butWor.addEventListener("click",testWorlds);
  worlds.appendChild(butWor); 

  block.appendChild(pharse);
  block.appendChild(worlds);
  main.appendChild(block);
}

//СПРАВОЧНИК СЛОВ
pCol[3].onclick=()=>{
  main = document.getElementById('main');
  main.innerHTML = "";
  main.style.display = 'block';

  findAndDescription = document.createElement("div");
  findAndDescription.style.color = "#fff";
  findAndDescription.style.cursor ="pointer";
  findAndDescription.style.padding="10px";
  findAndDescription.style.background = "rgba(133, 11, 0, 0.56)";
  description = document.createElement("h4");
  description.style.margin = "0px";
  description.innerText = "СПРАВОЧНИК СЛОВ";
  description.style.textAlign = "center";
  find = document.createElement("div");
  find.style.textAlign = "center";


  findWord = document.createElement("input");
  findWord.style.width = "97%";
  findWord.placeholder = "Для нахождения нужного слова воспользуйтесь поиском";
  findWord.onkeydown = (event)=>{
    if(findWord.value!=""){
      if(event.keyCode==8){
        findWord.value="";
        document.getElementById("lines").remove();
        setInitialWordsDontDel("wordsEN.txt","wordsRU.txt");
      }
    }
  };

  findWord.oninput = ()=>{
    if(findWord.value!=""){
      wordsArray = document.getElementsByClassName("stroka");
      strCheck = String(findWord.value).toLowerCase();
      let newWordsArray=new Array();
      for(i=0;i<wordsArray.length;i++){
        strOne = String(wordsArray[i].children[0].innerText).toLowerCase();
        strTwo = String(wordsArray[i].children[1].innerText).toLowerCase();
        if(strOne.indexOf(strCheck)!=-1 || strTwo.indexOf(strCheck)!=-1) {
          newWordsArray.push(wordsArray[i]);
        }
      }
      lines = document.getElementById("lines");
      lines.innerHTML = "";
      for(i=0;i<newWordsArray.length;i++){
        lines.appendChild(newWordsArray[i]);

      }
    }
  };
  findWord.style.padding = "5px 10px";
  findWord.style.marginTop = "10px";


    find.appendChild(findWord);
    findAndDescription.appendChild(description);
    findAndDescription.appendChild(find);
    main.appendChild(findAndDescription);

   setInitialWordsDontDel("wordsEN.txt","wordsRU.txt");
};
//СПРАВОЧНИК ФРАЗ
pCol[4].onclick=()=>{
  main = document.getElementById('main');
  main.innerHTML = "";
  main.style.display = 'block';

  findAndDescription = document.createElement("div");
  findAndDescription.style.color = "#fff";
  findAndDescription.style.cursor ="pointer";
  findAndDescription.style.padding="10px";
  findAndDescription.style.background = "rgba(133, 11, 0, 0.56)";
  description = document.createElement("h4");
  description.style.margin = "0px";
  description.innerText = "СПРАВОЧНИК ФРАЗ";
  description.style.textAlign = "center";
  find = document.createElement("div");
  find.style.textAlign = "center";


  findWord = document.createElement("input");
  findWord.style.width = "97%";
  findWord.placeholder = "Для нахождения нужного слова воспользуйтесь поиском";
  findWord.onkeydown = (event)=>{
    if(findWord.value!=""){
      if(event.keyCode==8){
        findWord.value="";
        document.getElementById("lines").remove();
        setInitialPharsesDontDel();
      }
    }
  };

  findWord.oninput = ()=>{
    if(findWord.value!=""){
      wordsArray = document.getElementsByClassName("stroka");
      strCheck = String(findWord.value).toLowerCase();
      let newWordsArray=new Array();
      for(i=0;i<wordsArray.length;i++){
        strOne = String(wordsArray[i].children[0].innerText).toLowerCase();
        strTwo = String(wordsArray[i].children[1].innerText).toLowerCase();
        if(strOne.indexOf(strCheck)!=-1 || strTwo.indexOf(strCheck)!=-1) {
          newWordsArray.push(wordsArray[i]);
        }
      }
      lines = document.getElementById("lines");
      lines.innerHTML = "";
      for(i=0;i<newWordsArray.length;i++){
        lines.appendChild(newWordsArray[i]);

      }
    }
  };
  findWord.style.padding = "5px 10px";
  findWord.style.marginTop = "10px";

    find.appendChild(findWord);
    findAndDescription.appendChild(description);
    findAndDescription.appendChild(find);
    main.appendChild(findAndDescription);

   setInitialPharsesDontDel();
};
//ДОБАВИТЬ СЛОВО
pCol[5].onclick=()=>{
  startStyle();
  if(document.getElementById('addWordEN')==undefined){
    main = document.getElementById('main');
    main.innerHTML="";
    block = document.createElement('div');
    block.id = "addWordEN";
    block.style.textAlign = "center";
    inputEN = document.createElement("input");
    inputEN.id = "inputAddWordEN";
    inputRU = document.createElement('input');
    inputRU.id = "inputAddWordRU";
    inputEN.placeholder = " английское слово";
    inputRU.placeholder = " перевод слова";
    buttonEN = document.createElement("button");
    buttonEN.innerText = "Добавить";
    buttonEN.onclick=()=>{

        word = document.getElementById("inputAddWordEN");
        translation = document.getElementById("inputAddWordRU");
        if(word.value!="" && translation.value !=""){
            fs.appendFileSync('wordsEN.txt',String(word.value).toLowerCase()+'\n');
            fs.appendFileSync('wordsRU.txt',String(translation.value).toLowerCase()+'\n');
            word.value="";
            translation.value="";
            mes = document.getElementById('mes');
            mes.style.color = "rgba(62, 219, 50)";
            mes.innerText = "ДОБАВЛЕНО";
            inter = setInterval(()=>{
              mes.style.color = "#fff";
              clearInterval(inter);
            },2000);
        }else{
          mes = document.getElementById('mes');
          mes.style.color = "#e50e27";
          mes.innerText = "ЗАПОЛНИТЕ ОБА ПОЛЯ";
        }
    };
    mes = document.createElement('h3');
    mes.id = 'mes';
    mes.style.color = "#3edb32";
    mes.innerText = "..."
    block.appendChild(inputEN);
    block.appendChild(document.createElement('br'));
    block.appendChild(document.createElement('br'));
    block.appendChild(inputRU);
    block.appendChild(document.createElement('br'));
    block.appendChild(document.createElement('br'));
    block.appendChild(buttonEN);
    block.appendChild(document.createElement('br'));
    block.appendChild(mes);
    main.appendChild(block);
  }
};
//Добавить фразу
pCol[6].onclick=()=>{
  startStyle();
  if(document.getElementById('addPharseEN')==undefined){
    main = document.getElementById('main');
    main.innerHTML="";
    block = document.createElement('div');
    block.id = "addPharseEN";
    block.style.textAlign = "center";
    inputEN = document.createElement("input");
    inputEN.id = "inputAddWordEN";
    inputRU = document.createElement('input');
    inputRU.id = "inputAddWordRU";
    inputEN.placeholder = " английская фраза";
    inputRU.placeholder = " перевод фразы";
    buttonEN = document.createElement("button");
    buttonEN.innerText = "Добавить";
    buttonEN.onclick=()=>{

        word = document.getElementById("inputAddWordEN");
        translation = document.getElementById("inputAddWordRU");
        if(word.value!="" && translation.value !=""){
            fs.appendFileSync('pharsesEN.txt',String(word.value).toLowerCase()+'\n');
            fs.appendFileSync('pharsesRU.txt',String(translation.value).toLowerCase()+'\n');
            word.value="";
            translation.value="";
            mes = document.getElementById('mes');
            mes.style.color = "rgba(62, 219, 50)";
            mes.innerText = "ДОБАВЛЕНО";
            inter = setInterval(()=>{
              mes.style.color = "#fff";
              clearInterval(inter);
            },2000);
        }else{
          mes = document.getElementById('mes');
          mes.style.color = "#e50e27";
          mes.innerText = "ЗАПОЛНИТЕ ОБА ПОЛЯ";
        }
    };
    mes = document.createElement('h3');
    mes.id = 'mes';
    mes.style.color = "#3edb32";
    mes.innerText = "...";
    block.appendChild(inputEN);
    block.appendChild(document.createElement('br'));
    block.appendChild(document.createElement('br'));
    block.appendChild(inputRU);
    block.appendChild(document.createElement('br'));
    block.appendChild(document.createElement('br'));
    block.appendChild(buttonEN);
    block.appendChild(document.createElement('br'));
    block.appendChild(mes);
    main.appendChild(block);
  }
};
//СПРАВОЧНИК СЛОВ
let arrayWithNewWords = new Array();//ПЕРЕЗАПИСЬ ФАЙЛА
pCol[7].onclick=()=>{
  main = document.getElementById('main');
  main.innerHTML = "";
  main.style.display = 'block';

  findAndDescription = document.createElement("div");
  findAndDescription.style.color = "#fff";
  findAndDescription.style.cursor ="pointer";
  findAndDescription.style.padding="10px";
  findAndDescription.style.background = "rgba(133, 11, 0, 0.56)";
  description = document.createElement("h4");
  description.style.margin = "0px";
  description.innerText = "Что бы удалить слово нажмите на него\nДля внесения изменений нажмите кнопку СОХРАНИТЬ";
  description.style.textAlign = "center";
  find = document.createElement("div");
  find.style.textAlign = "center";


  findWord = document.createElement("input");
  findWord.style.width = "97%";
  findWord.placeholder = "Для нахождения нужного слова воспользуйтесь поиском";
  findWord.onkeydown = (event)=>{
    if(findWord.value!=""){
      if(event.keyCode==8){
        findWord.value="";
        document.getElementById("lines").remove();
        setInitialWords("wordsEN.txt","wordsRU.txt");
      }
    }
  };

  findWord.oninput = ()=>{
    if(findWord.value!=""){
      wordsArray = document.getElementsByClassName("stroka");
      strCheck = String(findWord.value).toLowerCase();
      let newWordsArray=new Array();
      for(i=0;i<wordsArray.length;i++){
        strOne = String(wordsArray[i].children[0].innerText).toLowerCase();
        strTwo = String(wordsArray[i].children[1].innerText).toLowerCase();
        if(strOne.indexOf(strCheck)!=-1 || strTwo.indexOf(strCheck)!=-1) {
          newWordsArray.push(wordsArray[i]);
        }
      }
      lines = document.getElementById("lines");
      lines.innerHTML = "";
      for(i=0;i<newWordsArray.length;i++){
        lines.appendChild(newWordsArray[i]);

      }
    }
  };
  findWord.style.padding = "5px 10px";
  findWord.style.marginTop = "10px";

  saveButtonDescription = document.createElement("button");
  saveButtonDescription.innerText = "Сохранить";
  mes = document.createElement('span');
  mes.id = 'mes';
  mes.style.color = "#3edb32";
  mes.innerText = "...";
/////////////////////////////////////////////////
  saveButtonDescription.onclick = ()=>{
    let writeWords = new Array();
    findWord.value="";
    document.getElementById("lines").remove();
    setInitialWords("wordsEN.txt","wordsRU.txt");

    oldArrayWithWords = document.getElementsByClassName("stroka");
    for(x=0;x<oldArrayWithWords.length;x++){
      strOne = String(oldArrayWithWords[x].children[0].innerText).toLowerCase();
      for(y=0;y<arrayWithNewWords.length;y++){
        strTwo = String(arrayWithNewWords[y].children[0].innerText).toLowerCase();
        if(strOne==strTwo){
          oldArrayWithWords[x].innerHTML = "";
          oldArrayWithWords[x].style = "";
        }
      }
    }



    for(i=0;i<oldArrayWithWords.length;i++){
      if(oldArrayWithWords[i].innerHTML!=""){
        writeWords.push(oldArrayWithWords[i]);
      }
    }
    //*******************
    fs.writeFileSync("wordsEN.txt","");
    fs.writeFileSync("wordsRU.txt","");
    for(i=0;i<writeWords.length;i++){
      fs.appendFileSync("wordsEN.txt",String(writeWords[i].children[0].innerText)+ "\n");
      fs.appendFileSync("wordsRU.txt",String(writeWords[i].children[1].innerText)+ "\n");
    }
    arrayWithNewWords.splice(0,arrayWithNewWords.length-1);
    mes = document.getElementById('mes');
    mes.style.color = "rgba(62, 219, 50)";
    mes.innerText = "УДАЛЕНО";
    inter = setInterval(()=>{
      mes.style.color = "#fff";
      clearInterval(inter);
    },2000);
    //********************/
  };
/////////////////////////////////////////////////
    find.appendChild(findWord);
    findAndDescription.appendChild(description);
    findAndDescription.appendChild(find);
    findAndDescription.appendChild(saveButtonDescription);
    findAndDescription.appendChild(mes);
    main.appendChild(findAndDescription);

   setInitialWords("wordsEN.txt","wordsRU.txt");
};

/*_________________________________СПРАВОЧНИК ФРАЗ____________________________*/
pCol[8].onclick=()=>{
  main = document.getElementById('main');
  main.innerHTML = "";
  main.style.display = 'block';

  findAndDescription = document.createElement("div");
  findAndDescription.style.color = "#fff";
  findAndDescription.style.cursor ="pointer";
  findAndDescription.style.padding="10px";
  findAndDescription.style.background = "rgba(133, 11, 0, 0.56)";
  description = document.createElement("h4");
  description.style.margin = "0px";
  description.innerText = "Что бы удалить фразу нажмите на неё\nДля внесения изменений нажмите кнопку СОХРАНИТЬ";
  description.style.textAlign = "center";
  find = document.createElement("div");
  find.style.textAlign = "center";


  findWord = document.createElement("input");
  findWord.style.width = "97%";
  findWord.placeholder = "Для нахождения нужной фразы воспользуйтесь поиском";
  findWord.onkeydown = (event)=>{
    if(findWord.value!=""){
      if(event.keyCode==8){
        findWord.value="";
        document.getElementById("lines").remove();
        setInitialPharses();
      }
    }
  };

  findWord.oninput = ()=>{
    if(findWord.value!=""){
      wordsArray = document.getElementsByClassName("stroka");
      strCheck = String(findWord.value).toLowerCase();
      let newWordsArray=new Array();
      for(i=0;i<wordsArray.length;i++){
        strOne = String(wordsArray[i].children[0].innerText).toLowerCase();
        strTwo = String(wordsArray[i].children[1].innerText).toLowerCase();
        if(strOne.indexOf(strCheck)!=-1 || strTwo.indexOf(strCheck)!=-1) {
          newWordsArray.push(wordsArray[i]);
        }
      }
      lines = document.getElementById("lines");
      lines.innerHTML = "";
      for(i=0;i<newWordsArray.length;i++){
        lines.appendChild(newWordsArray[i]);

      }
    }
  };
  findWord.style.padding = "5px 10px";
  findWord.style.marginTop = "10px";

  saveButtonDescription = document.createElement("button");
  saveButtonDescription.innerText = "Сохранить";
  mes = document.createElement('span');
  mes.id = 'mes';
  mes.style.color = "#3edb32";
  mes.innerText = "...";

/////////////////////////////////////////////////
  saveButtonDescription.onclick = ()=>{
    let writeWords = new Array();
    findWord.value="";
    document.getElementById("lines").remove();
    setInitialPharses();

    oldArrayWithWords = document.getElementsByClassName("stroka");
    for(x=0;x<oldArrayWithWords.length;x++){
      strOne = String(oldArrayWithWords[x].children[0].innerText).toLowerCase();
      for(y=0;y<arrayWithNewWords.length;y++){
        strTwo = String(arrayWithNewWords[y].children[0].innerText).toLowerCase();
        if(strOne==strTwo){
          oldArrayWithWords[x].innerHTML = "";
        }
      }
    }



    for(i=0;i<oldArrayWithWords.length;i++){
      if(oldArrayWithWords[i].innerHTML!=""){
        writeWords.push(oldArrayWithWords[i]);
      }
    }
    //*******************
    fs.writeFileSync("pharsesEN.txt","");
    fs.writeFileSync("pharsesRU.txt","");
    for(i=0;i<writeWords.length;i++){
      fs.appendFileSync("pharsesEN.txt",String(writeWords[i].children[0].innerText)+ "\n");
      fs.appendFileSync("pharsesRU.txt",String(writeWords[i].children[1].innerText)+ "\n");
    }
    arrayWithNewWords.splice(0,arrayWithNewWords.length-1);
    mes = document.getElementById('mes');
    mes.style.color = "rgba(62, 219, 50)";
    mes.innerText = "УДАЛЕНО";
    inter = setInterval(()=>{
      mes.style.color = "#fff";
      clearInterval(inter);
    },2000);
    //********************/
  };
/////////////////////////////////////////////////
    find.appendChild(findWord);
    findAndDescription.appendChild(description);
    findAndDescription.appendChild(find);
    findAndDescription.appendChild(saveButtonDescription);
    findAndDescription.appendChild(mes);
    main.innerHTML="";
    main.appendChild(findAndDescription);
    setInitialPharses();
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////ФУНКЦИЯ_ЗАГРУЗКА_ФРАЗ//////////////////
function setInitialPharses(){

    fileContentEN = String(fs.readFileSync('pharsesEN.txt')).split("\n");
    fileContentRU = String(fs.readFileSync('pharsesRU.txt')).split("\n");

    lines = document.createElement("div");
    lines.id = "lines";
    for(i=(fileContentEN.length-2);i>=0;i--){

      //STROKA
      line = document.createElement('div');
      line.style.width = "100%";
      line.style.marginBottom = '10px';
      line.id = i;
      line.onmouseenter=(event)=>{
        event.target.style.background = "rgba(3, 240, 252, 0.59)";
      }
      line.className = "stroka";
      line.style.background="#2a4063";
      line.style.color = "#fff";
      line.style.cursor="pointer";
      line.onclick = (event)=>{
        arrayWithNewWords.push(event.target.parentElement);
        event.target.parentElement.remove();
      };

      enWord = document.createElement("div");
      enWord.onmouseenter=(event)=>{
        event.target.style.background="rgba(252, 3, 23, 0.66)";
        event.target.nextSibling.style.background="rgba(252, 3, 23, 0.66)";
      };
      enWord.onmouseleave=()=>{
        event.target.style.background="#2a4063";
        event.target.nextSibling.style.background="#2a4063";
      };

      enWord.innerHTML = fileContentEN[i];
      enWord.style.background = "#2a4063";//
      enWord.style.width = "49%";
      enWord.style.float = "left";
      enWord.style.paddingLeft ="2%";
      enWord.style.marginBottom="10px";

      ruWord = document.createElement("div");
      ruWord.innerHTML = fileContentRU[i];
      ruWord.style.width = "49%";
      ruWord.style.float = "right";
      ruWord.style.background = "#2a4063";//
      ruWord.style.marginBottom="10px";

      line.appendChild(enWord);
      line.appendChild(ruWord);
      lines.appendChild(line);
    }
    main.appendChild(lines);
  }
  //////////////////ФУНКЦИЯ_ЗАГРУЗКА_ФРАЗ//////////////////
  function setInitialPharsesDontDel(){

      fileContentEN = String(fs.readFileSync('pharsesEN.txt')).split("\n");
      fileContentRU = String(fs.readFileSync('pharsesRU.txt')).split("\n");

      lines = document.createElement("div");
      lines.id = "lines";
      for(i=(fileContentEN.length-2);i>=0;i--){

        //STROKA
        line = document.createElement('div');
        line.style.width = "100%";
        line.style.marginBottom = '10px';
        line.id = i;
        line.onmouseenter=(event)=>{
          event.target.style.background = "rgba(3, 240, 252, 0.59)";
        }
        line.className = "stroka";
        line.style.background="#2a4063";
        line.style.color = "#fff";
        line.style.cursor="pointer";


        enWord = document.createElement("div");
        enWord.onmouseenter=(event)=>{
          event.target.style.background="rgba(252, 3, 23, 0.66)";
          event.target.nextSibling.style.background="rgba(252, 3, 23, 0.66)";
        };
        enWord.onmouseleave=()=>{
          event.target.style.background="#2a4063";
          event.target.nextSibling.style.background="#2a4063";
        };

        enWord.innerHTML = fileContentEN[i];
        enWord.style.background = "#2a4063";//
        enWord.style.width = "49%";
        enWord.style.float = "left";
        enWord.style.paddingLeft ="2%";
        enWord.style.marginBottom="10px";

        ruWord = document.createElement("div");
        ruWord.innerHTML = fileContentRU[i];
        ruWord.style.width = "49%";
        ruWord.style.float = "right";
        ruWord.style.background = "#2a4063";//
        ruWord.style.marginBottom="10px";

        line.appendChild(enWord);
        line.appendChild(ruWord);
        lines.appendChild(line);
      }
      main.appendChild(lines);
    }
//////////////////ФУНКЦИЯ_ЗАГРУЗКА_СЛОВ//////////////////
function setInitialWords(enFile,ruFile){
  lines=document.createElement("lines");
  lines.id="lines";
  main.appendChild(lines);
  fileContentEN = String(fs.readFileSync(enFile)).split("\n");
  fileContentRU = String(fs.readFileSync(ruFile)).split("\n");
  for(i=(fileContentEN.length-2);i>=0;i--){

    //STROKA
    line = document.createElement('div');
    line.className = "stroka";
    line.style.cursor = "pointer";
    line.style.width = "100%";
    line.style.marginTop = '10px';
    line.id = i;
    line.onmouseenter=(event)=>{
      event.target.style.background = "rgba(252, 3, 23, 0.66)";
    }
    line.onmouseleave=(event)=>{
      event.target.style.background = "#2a4063";
    }
    line.onclick = (event)=>{
      arrayWithNewWords.push(event.target.parentElement);
      event.target.parentElement.remove();
    };
    line.style.height="20px";
    line.style.background="#2a4063";
    line.style.color = "#fff";

    enWord = document.createElement("div");
    enWord.innerText = fileContentEN[i];
    enWord.style.width = "49%";
    enWord.style.float = "left";
    enWord.style.paddingLeft ="2%";
    ruWord = document.createElement("div");
    ruWord.innerText = fileContentRU[i];
    ruWord.style.width = "49%";
    ruWord.style.float = "right";


    line.appendChild(enWord);
    line.appendChild(ruWord);
    lines.appendChild(line);


  }
}

///БЕЗ УДАЛЕНИЯ
function setInitialWordsDontDel(enFile,ruFile){
  lines=document.createElement("lines");
  lines.id="lines";
  main.appendChild(lines);
  fileContentEN = String(fs.readFileSync(enFile)).split("\n");
  fileContentRU = String(fs.readFileSync(ruFile)).split("\n");
  for(i=(fileContentEN.length-2);i>=0;i--){

    //STROKA
    line = document.createElement('div');
    line.className = "stroka";
    line.style.cursor = "pointer";
    line.style.width = "100%";
    line.style.marginTop = '10px';
    line.id = i;
    line.onmouseenter=(event)=>{
      event.target.style.background = "rgba(252, 3, 23, 0.66)";
    }
    line.onmouseleave=(event)=>{
      event.target.style.background = "#2a4063";
    }
    line.style.height="20px";
    line.style.background="#2a4063";
    line.style.color = "#fff";

    enWord = document.createElement("div");
    enWord.innerText = fileContentEN[i];
    enWord.style.width = "49%";
    enWord.style.float = "left";
    enWord.style.paddingLeft ="2%";
    ruWord = document.createElement("div");
    ruWord.innerText = fileContentRU[i];
    ruWord.style.width = "49%";
    ruWord.style.float = "right";


    line.appendChild(enWord);
    line.appendChild(ruWord);
    lines.appendChild(line);


  }
}
/*


const fs = require('fs');
fs.appendFileSync("hello.txt",'\n hack');
let fileContent = fs.readFileSync('hello.txt','utf8');
alert(fileContent);
*/
