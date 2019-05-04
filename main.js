const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow(){

  mainWindow = new BrowserWindow({minWidth:800, minHeight: 600})

  mainWindow.loadFile('index.html');
  
  

  mainWindow.on('closed', function(){
    mainWindow = null
  })
}

app.on('ready',createWindow)

app.on('window-all-closed',function(){
  if(process.platform !== 'darwin'){
    app.quit()
  }
})

app.on('active',function (){
  if(mainWindow === null){
    createWindow()
  }
})
