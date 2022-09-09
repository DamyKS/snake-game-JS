# snake-game-JS

This is a 2D snake game I built using JavaScript.  It's very similar to the Snake Mania Game I built before using Python's Pygame module.  
The key idea i used was using `setInterval(function, duration, **kwags)`.  The setInterval method acts like a while loop.
Once the window loads and the game starts,  event handlers are set on each button.  When a button is clicked it triggers the handle which calls a function that creates a setInterval method and passes it the direction the snake needs to go to as an argument.  
The setInterval now calls on a function repeatedly and that function calls on other helper functions that are responsible  for  updating  the ppsition of the snake and  food,  checking for collisions  and also checking for changes in the state of the game.
If another button is clicked,  the previous setInterbal methods are cleared and a new one is created and so on.  

![demo_pic1](demo_1.jpg)    
