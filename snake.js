window.onload=Game;

function Game(){
    //define snake object to represent snake div
    var gameOn=true;
    function Snake(posX, posY){
        this.posX=posX;
        this.posY=posY; 
        this.movingLeft=false;
        this.movingRight=false;
        this.movingUp=false;
        this.movingDown=false;                                      
    } 
    function Food(posX,posY){
        this.posX=posX;
        this.posY=posY;
    }
    function Body(posX,posY){
        this.posX=posX;
        this.posY=posY;
    }
    //set snake speed
    var speed=220;  
    //create snake 
    var snakeObj = new Snake(0,480);
    var foodObj= new Food(480,300);
    //arrays to store active setIntervals(for deletimg), bodyObjs & bodies
    var intervals=[ ]; 
    var bodyObjs=[ ];
    var bodies=[ ];
    
    //create body div prototpe to be used later
    var bodyPrototype= document.createElement("div");
    bodyPrototype.id="body";
    //get score
    var score= document.getElementById("score");
    //get grass plane
    var grass=document.getElementById("grass");
    //get all buttons 
    var left_btn=document.getElementById("left_btn");
    var right_btn=document.getElementById ("right_btn");
    var up_btn=document.getElementById("up_btn");
    var down_btn=document.getElementById("down_btn");
    
    //get snake & food div div
    var snake=document.getElementById("snake");
    var food=document.getElementById("food");
    //set event listners on all 4 buttons
    left_btn.onclick=set_Dir_Interval;
    right_btn.onclick=set_Dir_Interval;
    up_btn.onclick=set_Dir_Interval;
    down_btn.onclick=set_Dir_Interval;
    //when an event is triggered, get the dir uidng  the id of the btn and set setInterval with the info
    function set_Dir_Interval(eventObj){
        var btn=eventObj.target;
        if (btn.id=="up_btn" && snakeObj.movingDown==false){
            direction="up";
            snakeObj.movingUp=true;
            snakeObj.movingDown=false;
            snakeObj.movingLeft=false;
            snakeObj.movingRight=false;
        }else if(btn.id=="down_btn" && snakeObj.movingUp==false){
            direction="down";
            snakeObj.movingUp=false;
            snakeObj.movingDown=true;
            snakeObj.movingLeft=false;
            snakeObj.movingRight=false;
        }else if(btn.id=="left_btn" && snakeObj.movingRight==false){
            direction="left";
            snakeObj.movingUp=false;
            snakeObj.movingDown=false;
            snakeObj.movingLeft=true;
            snakeObj.movingRight=false;
        }else if(btn.id=="right_btn" && snakeObj.movingLeft==false){
            direction="right";
            snakeObj.movingUp=false;
            snakeObj.movingDown=false;
            snakeObj.movingLeft=false;
            snakeObj.movingRight=true;
        }
        //delete active kntervals set new ome amd add it to intervals arr
        deleteIntervals();
        var interval=setInterval(moveSnake, speed, direction );
        intervals.push(interval);
        
    }
    
    //move snake
    function moveSnake(direction){
        if (gameOn){
            checkSnakeFoodCollide();
            _moveBodies();
            checkFoodOnBody();
            checkSnakeDied();
            
            if(direction=="up"){
                snakeObj.posY -= 60;
            }else if (direction=="down"){
                snakeObj.posY +=60;
            }else if(direction=="left"){
                snakeObj.posX -=60; 
            }else if(direction=="right"){
                snakeObj.posX +=60;
            }
            snake.style.top=snakeObj.posY+"px";
            snake.style.left=snakeObj.posX+"px";
        }           
    } 
    // fumction to delete setIntervals      
    function deleteIntervals(){
        for(var i=0; i<intervals.length; i++){
        var interval=intervals.pop();
        clearInterval(interval);
        }
    }
    //a distance calculator. for dist btwn twp points
    function distanceCalc(x1,y1,x2,y2){
        distance=Math.sqrt(((x1-x2)**2) + ((y1-y2)**2));
        return distance ;
    }
    
    function checkSnakeFoodCollide(){
        if(_check_snake_food_dis(snakeObj.posX, snakeObj.posY, foodObj.posX,foodObj.posY)){
            _updateFoodPos();
            _addBody();
            increaseScore();
        }
    }
    //checka if the snake has eaten the food
    function _check_snake_food_dis(snakeX, snakeY, foodX,foodY){
        var distance=distanceCalc(snakeX,snakeY,foodX,foodY);
        if (distance<60){
            return true;
        }
    }
    //randomly change the food's position after ir's eaten or the snake has died
    function _updateFoodPos(){
        //randomly get a numver between 0 and 15 and multiply it by 60 to get a multiple of 60 that's the new position'
        foodObj.posX=Math.floor(Math.random()*15)*60;
        foodObj.posY=Math.floor(Math.random()*15)*60;
        food.style.left=foodObj.posX+"px";
        food.style.top=foodObj.posY+"px";
    }
    
    function _addBody(){
        /* a body object and body div is created. The object is to model the div for easier calculations. Both are stored in two arrays: bodies and bodyObjs */
        var bodyObj= new Body(snakeObj.posX, snakeObj.posY)
        bodyObjs.push(bodyObj);
        //body div has been created before so it can be cloned whenevr this func is called
        var body= bodyPrototype.cloneNode();
        body.style.left=snake.style.left;
        body.style.top=snake.style.top;
        grass.appendChild(body);
        bodies.push(body);
        
        
    }
    
    function _moveBodies(){
        /* this loops thrpugh the bodies array that holds the created bodies. 
        It starts loooping from the end and moves each body to the position of the one in front of it til it gets to the first body at index 0 and moves it to the position of the snake's head. 
        The head moves forward amd the loop is repeated again giving the illusion of smooth motion'*/
        if(bodies.length>0){
            for(var i=bodies.length-1;i>=0;i--){
                if(i==0){
                    bodies[i].style.left=snake.style.left;                   
                    bodies[i].style.top=snake.style.top;
                    //the position of the body objects are also updated to be used for later calculations 
                    bodyObjs[i].posX=snakeObj.posX;
                    bodyObjs[i].posY=snakeObj.posY;                   
                }else{
                    bodies[i].style.left=bodies[i-1].style.left;
                    bodies[i].style.top=bodies[i-1].style.top;  
                    bodyObjs[i].posX=bodyObjs[i-1].posX;
                    bodyObjs[i].posY=bodyObjs[i-1].posY;               
                }
            }
        }
    }
    function checkSnakeDied(){
        //check if snake has died and reset sone features 
        if(snakeHitBody() || snakeHitWall()){
            deleteIntervals();
            //reset snake position
            snakeObj.movingRight=false;
            snakeObj.movingDown=false;
            snakeObj.movingLeft=false;
            snakeObj.movingUp=false;
            _updateSnakePos();
            _updateFoodPos(); 
            var totalScore=score.innerHTML;
            var continuation= confirm(" GAME OVER !!! \n You scored  "+totalScore+" points.  Do you wamt to play again?");
            if (!continuation){
                gameOn=false;  
                alert("Thanks for playing!  Reload the page if you would lile to play again.") ;           
            }     
            score.innerHTML="0";
            //delete all bodies and body objects 
            while(bodies.length>0){
                bodyObjs.pop();
                var body=bodies.pop();
                //remove body divs from the DOM
                grass.removeChild(body);                                            
            }                        
        }
    }
    function snakeHitBody(){
        //checks distance between snake head and all the bodies. if the head heats any body, return true
        for(var i=1; i<bodyObjs.length;i++){
            var distance= distanceCalc(snakeObj.posX,snakeObj.posY, bodyObjs[i].posX,bodyObjs[i].posY);
            if(distance<60){
                return true;
            }
        }
    }  
    
    function checkFoodOnBody(){
        //check distance between food and all the bodies . if the food lands on any of the bodies randomly change its ppsition
        for(var i=1; i<bodyObjs.length;i++){
            var distance= distanceCalc(foodObj.posX,foodObj.posY, bodyObjs[i].posX,bodyObjs[i].posY);
            if(distance<60){
                _updateFoodPos();
                
            }
        }
    }
    
    function snakeHitWall(){
        //check if the snake head has gone beyond the wall
        if (snakeObj.posX >840 || snakeObj.posX < 0 || snakeObj.posY<0 || snakeObj.posY>840){
            return true;
        }
    }
    
    function _updateSnakePos(){
        snakeObj.posX=60;
        snakeObj.posY=480;
        snake.style.left=snakeObj.posX+"px";
        snake.style.top=snakeObj.posY+"px";
    }
    
    function increaseScore(){
        var scoreNum= score.innerHTML;
        scoreNum=Number(scoreNum);
        scoreNum +=100;
        score.innerHTML=scoreNum;
    }
}
