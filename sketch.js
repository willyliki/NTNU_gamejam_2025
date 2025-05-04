let x = 0;
let y = 0;
let z = 0;
let j = 0;

let is_jumping = false;
let jump_velocity = 0;
let gravity = 1;
let groundY;
let wallXr;
let wallXl;

let cam;
let cam_choose = 0;

let enter = 0;

let click_right_sound;
let click_sound;
let level_end;
let die_sound;
let bgm;

let level1_img;
let level2_img;
let level3_img;
let level4_img;
let level5_img;
let level6_img;

let choose_xcoor = 1000;
let choose_ycoor = 1000;

let level1_xcoor = 6000;
let level1_ycoor = -6000;

let level2_xcoor = 6000;
let level2_ycoor = 1000;

let level3_xcoor = 6000;
let level3_ycoor = 8000;

let level4_xcoor = -7000;
let level4_ycoor = 1000;

let level5_xcoor = -7000;
let level5_ycoor = -5000;

let level6_xcoor = -7000;
let level6_ycoor = 8000;

let playerx = 0;
let playery = 0;
let playerz = 0;

let end_level1 = 0;
let end_level2 = 0;
let end_level3 = 0;
let end_level4 = 0;
let end_level5 = 0;
let end_level6 = 0;

let introState = 0;   // 0: fade in, 1: show title, 2: camera move, 3: done
let introAlpha = 255;
let introTimer = 0;
let titleFont;

function preload(){
  titleFont = loadFont('assets/Cubic_11_1.100_R.ttf');
}

function setup() {
  click_right_sound = loadSound('assets/click_right.wav');
  click_sound = loadSound('assets/click.wav');
  level_end = loadSound('assets/endlevel.wav');
  die_sound = loadSound('assets/die.wav');
  bgm = createAudio('assets/bgm.mp3');

  createCanvas(windowWidth, windowHeight, WEBGL);
  background(220);

  cam = createCamera();
  //cam.setPosition(0, 0, 1000);

  // level text
  level1_img = loadImage('assets/1.png');
  level2_img = loadImage('assets/2.png');
  level3_img = loadImage('assets/3.png');
  level4_img = loadImage('assets/4.png');
  level5_img = loadImage('assets/5.png');
  level6_img = loadImage('assets/6.png');
}

function draw() {
  // opening
  if (introState !== 3) {
    background(0);
  
    if (introState === 0) {
      introAlpha -= 2;
      if (introAlpha <= 0) {
        introAlpha = 0;
        introState = 1;
      }
    }
  
    if (introState === 1) {
      introTimer++;
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(80);
      textFont(titleFont || 'Arial');
      text("White Paper", 0, -50);
      textSize(40);
      text("Game Start", 0, 100);
      if (introTimer > 120) {
        introState = 2;
      }
    }
  
    if (introState === 2) {
      cam.setPosition(0, 0, lerp(1000, 0, introTimer / 120));
      cam.lookAt(0, 0, 0);
      introTimer++;
      if (introTimer >= 120) {
        introState = 3;  
      }
    }
  
    if (introAlpha > 0) {
      fill(0, introAlpha);
      rect(0, 0, width, height);
    }
  
    return; 
  }
  bgm.volume(0.5);
  bgm.loop();
  
  clear(220, 220, 220);
  strokeWeight(5);

  // draw level select room && each level room
  push();
  drawLevelRoom();
  pop();

  push();
  drawLevel1();
  //translate(-level1_xcoor, -level1_ycoor, 0);
  pop();

  push();
  drawLevel2();
  //translate(-level2_xcoor, -level2_ycoor, 0);
  pop();

  push();
  drawLevel3();
  //translate(-level3_xcoor, -level3_ycoor, 0);
  pop();

  push();
  drawLevel4();
  //translate(-level4_xcoor, -level4_ycoor, 0);
  pop();

  push();
  drawLevel5();
  //translate(-level5_xcoor, -level5_ycoor, 0);
  pop();

  push();
  drawLevel6();
  //translate(-level6_xcoor, -level6_ycoor, 0);
  pop();

  if (keyIsPressed === true) {
    if (keyCode === 87) { // w
      y -= 10;
    } else if (keyCode === 83) { // s
      y += 10;
    } else if (keyCode === 65) { // a
      //x -= 10;
    } else if (keyCode === 68) { // d
      //x += 10;
    } else if (keyCode === 90) { // z
			z += 10;
		} else if (keyCode === 88) { // x
			z -= 10;
		} else if (keyCode === 32) { // space
      /*
			if(!is_jumping){
        is_jumping = true;
        jump_velocity = -15;
      }
      */
		} else if (keyCode === 192) { // `
      cam_choose = -1;
    } else if (keyCode === 48) { // 0
      x = 0;
      y = 0;
      z = 0;
      cam_choose = 0;
    } else if (keyCode === 49) { // 1
      x = 0;
      y = 0;
      z = 0;
      cam_choose = 1;
    } else if (keyCode === 50) { // 2
      x = 0;
      y = 0;
      z = 0;
      cam_choose = 2;
    } else if (keyCode === 51) { // 3
      x = 0;
      y = 0;
      z = 0;
      cam_choose = 3;
    } else if (keyCode === 52) { // 4
      x = 0;
      y = 0;
      z = 0;
      cam_choose = 4;
    } else if (keyCode === 53) { // 5
      x = 0;
      y = 0;
      z = 0;
      cam_choose = 5;
    } else if (keyCode === 54) { // 6
      x = 0;
      y = 0;
      z = 0;
      cam_choose = 6;
    } else if (keyCode === 13) { // enter
      enter = 1;
    }
  }

  if (keyIsDown(65) === true) {
    x -= 10;
  }

  if (keyIsDown(68) === true) {
    x += 10;
  }

  if (keyIsDown(32) === true) {
    if(!is_jumping){
      is_jumping = true;
      jump_velocity = -20;
    }
  }

  /*
  // shake
  //translate(-700, 0, 0);
  x += random(-1, 1);
  y += random(-1, 1);
  */

  /*
  translate(choose_xcoor+100, choose_ycoor+100, 0);
	translate(0+x,0+y,0+z);
  drawCharacter();
  */ 

  //console.log(playerx, playery);
  //console.log(enter);
  //camera((choose_xcoor*2+windowWidth)/2+x, (choose_ycoor*2+windowHeight)/2+y, 1000+z, choose_xcoor+100+0+x, choose_ycoor+100+0+y, 0+z);

  // choose & change level
  chLevel();
}

function mouseClicked() {
  console.log(mouseX, mouseY);
  console.log(windowWidth, windowHeight);
  click_sound.play();
}

function drawLevelRoom(){
  // wall
  line(choose_xcoor, choose_ycoor, choose_xcoor+windowWidth, choose_ycoor);
  line(choose_xcoor, choose_ycoor, choose_xcoor, choose_ycoor+windowHeight);
  line(choose_xcoor, choose_ycoor+windowHeight, choose_xcoor+windowWidth, choose_ycoor+windowHeight);
  line(choose_xcoor+windowWidth, choose_ycoor, choose_xcoor+windowWidth, choose_ycoor+windowHeight);
  // button
  for(let j = 0; j < windowHeight; j += windowHeight/2){
    for(let i = 0; i < windowWidth; i += windowWidth/3){
      square(choose_xcoor+100+i, choose_ycoor+100+j, 250, 20);
      if(i == 0 && j == 0){
        image(level1_img, choose_xcoor+100+i, choose_ycoor+100+j, 250, 250);
      }
      else if(i == windowWidth/3 && j == 0){
        image(level2_img, choose_xcoor+100+i, choose_ycoor+100+j, 250, 250);
      }
      else if(i == (windowWidth/3)*2 && j == 0){
        image(level3_img, choose_xcoor+100+i, choose_ycoor+100+j, 250, 250);
      }
      else if(i == 0 && j == windowHeight/2){
        image(level4_img, choose_xcoor+100+i, choose_ycoor+100+j, 250, 250);
      }
      else if(i == windowWidth/3 && j == windowHeight/2){
        image(level5_img, choose_xcoor+100+i, choose_ycoor+100+j, 250, 250);
      }
      else if(i == (windowWidth/3)*2 && j == windowHeight/2){
        image(level6_img, choose_xcoor+100+i, choose_ycoor+100+j, 250, 250);
      }
    }
  }
}

function drawLevel1(){
  translate(level1_xcoor, level1_ycoor, 0);
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, 60, 0);
    box();
  }
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(-60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, -60, 0);
    box();
  }

  // 1
  push();
  translate(60*5, windowHeight-30, 0);
  box();
  pop();

  // 2
  push();
  translate(60*10, windowHeight-30, 0);
  push();
  for(let i = 0; i < 15; i++){
    translate(60, 0, 0);
    box();
  }
  pop();
  translate(60, -60, 0);
  push();
  for(let i = 0; i < 14; i++){
    translate(60, 0, 0);
    box();
  }
  pop();
  pop();
  push();
  translate(60*15, windowHeight-30-120, 0);
  push();
  for(let i = 0; i < 3; i++){
    translate(60, 0, 0);
    box();
  }
  pop();
  translate(0, -60, 0);
  for(let i = 0; i < 3; i++){
    translate(60, 0, 0);
    box();
  }
  pop();

  // 3
  push();
  translate(60*10+60*15+60*7, windowHeight-30, 0);
  push();
  for(let i = 0; i < 4; i++){
    translate(60, 0, 0);
    box();
  }
  pop();
  translate(60, -60, 0);
  push();
  for(let i = 0; i < 3; i++){
    translate(60, 0, 0);
    box();
  }
  pop();
  translate(60, -60, 0);
  push();
  for(let i = 0; i < 2; i++){
    translate(60, 0, 0);
    box();
  }
  pop();
  translate(60, -60, 0);
  push();
  translate(60, 0, 0);
  box();
  pop();
  pop();

  // 4
  push();
  translate(60*10+60*15+60*7+60*4, windowHeight-30-60*4, 0);
  translate(60, -60, 0);
  for(let i = 0; i < 4; i++){
    translate(60, 0, 0);
    box();
  }
  pop();

  // 5
  push();
  translate(60*10+60*15+60*7+60*4+60*4, windowHeight-30-60*4-60, 0);
  translate(180, -60, 0);
  for(let i = 0; i < 4; i++){
    translate(60, 0, 0);
    box();
  }
  pop();

  // 6
  push();
  translate(60*10+60*15+60*7+60*4+60*4+180+60*4, windowHeight-30-60*4-60, 0);
  translate(300, 60, 0);
  box();
  pop();

  // spikes
  push();
  translate(60*10+60*15+60*7+60*4, windowHeight, 0);
  translate(-30, 0, 0);
  for(let i = 0; i < 22; i++){
    translate(60, 0, 0);
    triangle(0, 0, 60, 0, 30, -60);
  }
  pop();

  // 8
  push();
  translate(60*10+60*15+60*7+60*4+60*22, windowHeight-30, 0);
  push();
  for(let i = 0; i < 3; i++){
    translate(60, 0, 0);
    box();
  }
  pop();
  translate(0, -60, 0);
  push();
  for(let i = 0; i < 2; i++){
    translate(60, 0, 0);
    box();
  }
  pop();
  translate(0, -60, 0);
  box();
  pop();

  // exit door
  push();
  translate(windowWidth*3-300, windowHeight-150, 0);
  fill(0, 0, 0, 255);
  square(0, 0, 150, 100, 100, 0, 0);
  pop();
}

function drawLevel2(){
  translate(level2_xcoor, level2_ycoor, 0);
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, 60, 0);
    box();
  }
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(-60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, -60, 0);
    box();
  }


}

function drawLevel3(){
  translate(level3_xcoor, level3_ycoor, 0);
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, 60, 0);
    box();
  }
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(-60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, -60, 0);
    box();
  }

  // spikes 1
  push();
  translate(60*5, windowHeight, 0);
  //translate(-30, 0, 0);
  for(let i = 0; i < 3; i++){
    translate(60, 0, 0);
    triangle(0, 0, 60, 0, 30, -60);
  }
  pop();

  // box 1
  push();
  translate(60*5+60*5, windowHeight-30, 0);
  box();
  pop();

  // box 2
  push();
  translate(60*5+60*9, windowHeight-120, 0);
  box();
  pop();

  // box 4
  push();
  translate(60*5+60*13, windowHeight - 240, 0);
  box();
  pop();

  // box 3
  push();
  translate(60*5+60*11, windowHeight-180, 0);
  box();
  pop();

  // spike 2
  push();
  translate(60*5+60*12, windowHeight, 0);
  translate(30, 0, 0);
  for(let i = 0; i < 4; i++){
    translate(60, 0, 0);
    triangle(0, 0, 60, 0, 30, -60);
  }
  pop();

  // box 5
  push();
  translate(60*5+60*17, windowHeight-240, 0);
  box();
  pop();

  // box 6
  push();
  translate(60*5+60*17+60*2, windowHeight-180, 0);
  for(let i = 0; i < 6; i++){
    translate(60, 0, 0);
    box();
  }
  pop();

  // spike 3
  push();
  translate(60*5+60*17+60*2, windowHeight-180, 0);
  translate(-30, -30, 0);
  for(let i = 0; i < 2; i++){
    translate(60, 0, 0);
    triangle(0, 0, 60, 0, 30, -60);
  }
  pop();

  // box 7
  push();
  translate(60*5+60*17+60*2+60*6+60*2, windowHeight-240, 0);
  for(let i = 0; i < 5; i++){
    translate(60, 0, 0);
    box();
  }
  translate(0, -60, 0);
  box();
  pop();

  // box 8
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5, windowHeight-240, 0);
  box();
  pop();

  // box 9
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2, windowHeight-300, 0);
  box();
  pop();

  // box 10
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2, windowHeight-360, 0);
  box();
  pop();

  // box 11
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2, windowHeight-360, 0);
  for(let i = 0; i < 5; i++){
    translate(60, 0, 0);
    box();
  }
  pop();

  // box 12
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2, windowHeight-360, 0);
  box();
  pop();

  // box 13
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2+60*2, windowHeight-420, 0);
  box();
  pop();

  // box 14
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2+60*2+60*2, windowHeight-300, 0);
  for(let i = 0; i < 3; i++){
    translate(60, 0, 0);
    box();
  }
  pop();

  // spike 4
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2+60*2+60*2+60*3, windowHeight, 0);
  for(let i = 0; i < 8; i++){
    translate(60, 0, 0);
    triangle(0, 0, 60, 0, 30, -60);
  }
  pop();
  
  // box 15
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2+60*2+60*2+60*3+60*3, windowHeight-300, 0);
  box();
  pop();

  // box 16
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2+60*2+60*2+60*3+60*3+60*3, windowHeight-180, 0);
  box();
  pop();

  // box 17
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2+60*2+60*2+60*3+60*3+60*2, windowHeight-300, 0);
  box();
  pop();

  // box 18
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2+60*2+60*2+60*3+60*3+60*2+60*3, windowHeight-300, 0);
  for(let i = 0; i < 3; i++){
    translate(60, 0, 0);
    box();
  }
  pop();

  // box 19
  push();
  translate(60*5+60*17+60*2+60*6+60*2+60*5+60*2+60*2+60*2+60*5+60*2+60*2+60*2+60*3+60*3+60*2+60*4+60*2, windowHeight-300, 0);
  for(let i = 0; i < 3; i++){
    translate(60, 0, 0);
    box();
  }
  pop();

  // exit door
  push();
  translate(windowWidth*3-180, windowHeight-480, 0);
  fill(0, 0, 0, 255);
  square(0, 0, 150, 100, 100, 0, 0);
  pop();

  // 麵線店
  push();
  translate(windowWidth*3-180, windowHeight-150, 0);
  fill(0, 0, 0, 255);
  square(0, 0, 150, 200);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  textFont(titleFont || 'Arial');
  text("麵線店", 90, -20);
  pop();
}

function drawLevel4(){
  translate(level4_xcoor, level4_ycoor, 0);
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, 60, 0);
    box();
  }
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(-60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, -60, 0);
    box();
  }
}

function drawLevel5(){
  translate(level5_xcoor, level5_ycoor, 0);
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, 60, 0);
    box();
  }
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(-60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, -60, 0);
    box();
  }
}

function drawLevel6(){
  translate(level6_xcoor, level6_ycoor, 0);
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, 60, 0);
    box();
  }
  for(let i = 0; i < (windowWidth*3)/60; i++){
    translate(-60, 0, 0);
    box();
  }
  for(let i = 0; i < windowHeight/60; i++){
    translate(0, -60, 0);
    box();
  }
}

function drawCharacter(){
  square(12.5, -30, 30);
  square(0, 0, 55);
  line(0, 20, -20, 40);
  line(55, 20, 75, 40);
  line(12.5, 55, 12.5, 75);
  line(42.5, 55, 42.5, 75);
}

function chLevel(){
  if(cam_choose == 0){
    translate(choose_xcoor+100, choose_ycoor+100, 0);
	  translate(0+x,0+y,0+z);
    drawCharacter();
    if(enter){
      if (x < 100+250 && x > 100 && y < 100+250 && y > 100){
        //camera(0+x, 0+y, 1000+z, 0+x, 0+y, 0+z);
        x = 0;
        y = 0;
        z = 0;
        cam_choose = 1;
        click_right_sound.play();
      }
      else if(x < 100+(windowWidth/3)+250 && x > 100+(windowWidth/3) && y < 100+250 && y > 100){
        x = 0;
        y = 0;
        z = 0;
        cam_choose = 2;
        click_right_sound.play();
      }
      else if(x < 100+(windowWidth/3)*2+250 && x > 100+(windowWidth/3)*2 && y < 100+250 && y > 100){
        x = 0;
        y = 0;
        z = 0;
        cam_choose = 3;
        click_right_sound.play();
      }
      else if(x < 100+250 && x > 100 && y < 100+(windowHeight/2)+250 && y > 100+(windowHeight/2)){
        x = 0;
        y = 0;
        z = 0;
        cam_choose = 4;
        click_right_sound.play();
      }
      else if(x < 100+(windowWidth/3)+250 && y < 100+(windowHeight/2)+250 && y > 100+(windowHeight/2)){
        x = 0;
        y = 0;
        z = 0;
        cam_choose = 5;
        click_right_sound.play();
      }
      else if(x < 100+(windowWidth/3)*2+250 && y < 100+(windowHeight/2)+250 && y > 100+(windowHeight/2)){
        x = 0;
        y = 0;
        z = 0;
        cam_choose = 6;
        click_right_sound.play();
      }
    }
    else{
      cam.setPosition((choose_xcoor*2+windowWidth)/2, (choose_ycoor*2+windowHeight)/2, 1000+z);
      cam.lookAt((choose_xcoor*2+windowWidth)/2, (choose_ycoor*2+windowHeight)/2, 0+z);
      //camera((choose_xcoor*2+windowWidth)/2, (choose_ycoor*2+windowHeight)/2, 1000+z, (choose_xcoor*2+windowWidth)/2, (choose_ycoor*2+windowHeight)/2, 0+z);
    }
  }
  else if(cam_choose == 1){
    translate(level1_xcoor+100, level1_ycoor+windowHeight-75, 0);

    if(x < windowWidth*3-300+150 && x > windowWidth*3-300 && y < 75 && y > -75){
      if(enter){
        end_level1 = 1;
      }
    }

    // collision
    if(x >= windowWidth*3-200){
      x = windowWidth*3-200;
    }
    else if(x <= -70){
      x = -70;
    }
    else if(y >= 0){
      y = 0;
    }
    else if(x >= 60*10+60*15+60*7+60*4 && x <= 60*10+60*15+60*7+60*4+60*22 && y >= -105){ // spike
      x = 0;
      y = 0;
      z = 0;
      die_sound.play();
      cam_choose = 0;
    }
    else if(x >= 60*3 && x <= 60 * 4){
      groundY = -60;
    }
    else if(x >= 60*8 && x <= 60*9){
      groundY = -60;
    }
    else if(x >= 60*9 && x <= 60*10+60*13){
      if(x >= 60*9+60*4 && x <= 60*9+60*4+60*3){
        groundY = -240;
      }
      else{
        groundY = -120;
      }
    }
    else if(x >= 60*10+60*13+60*7 && x <= 60*10+60*13+60*8){
      groundY = -60;
    }
    else if(x >= 60*10+60*13+60*8 && x <= 60*10+60*13+60*9){
      groundY = -120;
    }
    else if(x >= 60*10+60*13+60*9 && x <= 60*10+60*13+60*10){
      groundY = -180;
    }
    else if(x >= 60*10+60*13+60*10 && x <= 60*10+60*13+60*11){
      groundY = -240;
    }
    else if(x >= 60*10+60*13+60*12 && x <= 60*10+60*13+60*16){
      groundY = -360;
    }
    else if(x >= 60*10+60*13+60*18 && x <= 60*10+60*13+60*22){
      groundY = -420;
    }
    else if(x >= 60*10+60*13+60*26 && x <= 60*10+60*13+60*27){
      groundY = -300;
    }
    else if(x >= 60*10+60*13+60*32 && x <= 60*10+60*13+60*33){
      groundY = -180;
    }
    else if(x >= 60*10+60*13+60*33 && x <= 60*10+60*13+60*35){
      groundY = -120;
    }
    else if(x >= 60*10+60*13+60*35 && x <= 60*10+60*13+60*36){
      groundY = -60;
    }
    else{
      groundY = 0;
    }

    if (is_jumping) {
      y += jump_velocity;
      jump_velocity += gravity;

      if (y >= groundY) {
        y = groundY;
        is_jumping = false;
        jump_velocity = 0;
      }
    }

    translate(0+x,0+y,0+z);
    drawCharacter();

    if(end_level1){
      x = 0;
      y = 0;
      z = 0;
      level_end.play();
      cam_choose = 0;
    }
    else{
      cam.setPosition((level1_xcoor*2+windowWidth)/2+x, (level1_ycoor*2+windowHeight)/2+y, 1000+z);
      cam.lookAt((level1_xcoor*2+windowWidth)/2+x, (level1_ycoor*2+windowHeight)/2+y, 0+z);
      //camera((level1_xcoor*2+windowWidth)/2, (level1_ycoor*2+windowHeight)/2, 1000+z, (level1_xcoor*2+windowWidth)/2, (level1_ycoor*2+windowHeight)/2, 0+z);
    }
  }
  else if(cam_choose == 2){
    translate(level2_xcoor+100, level2_ycoor+windowHeight-75, 0);

    groundY = level2_ycoor+windowHeight;
    // decide if it is jumping
    if (is_jumping) {
      y += jump_velocity;
      jump_velocity += gravity;

      if (y >= 0) {
        y = 0;
        is_jumping = false;
        jump_velocity = 0;
      }
    }

    translate(0+x,0+y,0+z);
    drawCharacter();
    if(end_level2){
      x = 0;
      y = 0;
      z = 0;
      level_end.play();
      cam_choose = 0;
    }
    else{
      cam.setPosition((level2_xcoor*2+windowWidth)/2+x, (level2_ycoor*2+windowHeight)/2+y, 1000+z);
      cam.lookAt((level2_xcoor*2+windowWidth)/2+x, (level2_ycoor*2+windowHeight)/2+y, 0+z);    
      //camera((level2_xcoor*2+windowWidth)/2, (level2_ycoor*2+windowHeight)/2, 1000+z, (level2_xcoor*2+windowWidth)/2, (level2_ycoor*2+windowHeight)/2, 0+z);
    }
  }
  else if(cam_choose == 3){
    translate(level3_xcoor+100, level3_ycoor+windowHeight-75, 0);

    // collision
    if(x >= windowWidth*3-200){
      x = windowWidth*3-200;
    }
    else if(x <= -70){
      x = -70;
    }
    else if(y >= 0){
      y = 0;
    }
    else if(x >= 60*5 && x <= 60*5+60*3 && y >= -105){ // spike
      x = 0;
      y = 0;
      z = 0;
      die_sound.play();
      cam_choose = 0;
    }
    else if(x >= 60*5+60*3 && x <= 60*5+60*3+60){
      groundY = -60;
    }
    else if(x >= 60*5+60*3+60*3 && x <= 60*5+60*3+60+60*4){
      groundY = -120;
    }
    else if(x >= 60*5+60*3+60*5 && x <= 60*5+60*3+60+60*6){
      groundY = -180;
    }
    else if(x >= 60*5+60*3+60*7 && x <= 60*5+60*3+60+60*8){
      groundY = -240;
    }
    else if(x >= 60*5+60*3+60*8 && x <= 60*5+60*3+60+60*1 && y >= -105){ // spike 2
      x = 0;
      y = 0;
      z = 0;
      die_sound.play();
      cam_choose = 0;
    }
    else if(x >= 60*5+60*3+60*11 && x <= 60*5+60*3+60+60*12){
      groundY = -240;
    }
    else if(x >= 60*5+60*3+60*14 && x <= 60*5+60*3+60+60*16 && y >= -200){ // spike 3
      x = 0;
      y = 0;
      z = 0;
      die_sound.play();
      cam_choose = 0;
    }
    else if(x >= 60*5+60*3+60*14 && x <= 60*5+60*3+60+60*20){
      groundY = -180;
    }
    else if(x >= 60*5+60*3+60*22 && x <= 60*5+60*3+60+60*26){
      groundY = -240;
    }
    else if(x >= 60*5+60*3+60*26 && x <= 60*5+60*3+60+60*27){
      groundY = -300;
    }
    else if(x >= 60*5+60*3+60*28 && x <= 60*5+60*3+60+60*29){
      groundY = -300;
    }
    else if(x >= 60*5+60*3+60*30 && x <= 60*5+60*3+60+60*31){
      groundY = -360;
    }
    else if(x >= 60*5+60*3+60*32 && x <= 60*5+60*3+60+60*37){
      groundY = -360;
    }
    else if(x >= 60*5+60*3+60*38 && x <= 60*5+60*3+60+60*39){
      groundY = -360;
    }
    else if(x >= 60*5+60*3+60*40 && x <= 60*5+60*3+60+60*41){
      groundY = -420;
    }
    else if(x >= 60*5+60*3+60*43 && x <= 60*5+60*3+60+60*46){
      groundY = -300;
    }
    else if(x >= 60*5+60*3+60*48 && x <= 60*5+60*3+60+60*49){
      groundY = -300;
    }
    else if(x >= 60*5+60*3+60*50 && x <= 60*5+60*3+60+60*51){
      groundY = -300;
    }
    else if(x >= 60*5+60*3+60*51 && x <= 60*5+60*3+60+60*52){
      groundY = -180;
    }
    else if(x >= 60*5+60*3+60*53 && x <= 60*5+60*3+60+60*59){
      groundY = -300;
    }
    else{
      groundY = 0;
    }

    // decide if it is jumping
    if (is_jumping) {
      y += jump_velocity;
      jump_velocity += gravity;

      if (y >= groundY) {
        y = groundY;
        is_jumping = false;
        jump_velocity = 0;
      }
    }

    translate(0+x,0+y,0+z);
    drawCharacter();

    if(x < windowWidth*3-300+150 && x > windowWidth*3-300 && y < -355 && y > -405){
      if(enter){
        end_level3 = 1;
      }
    }

    if(end_level3){
      x = 0;
      y = 0;
      z = 0;
      level_end.play();
      cam_choose = 0;
    }
    else{
      cam.setPosition((level3_xcoor*2+windowWidth)/2+x, (level3_ycoor*2+windowHeight)/2+y, 1000+z);
      cam.lookAt((level3_xcoor*2+windowWidth)/2+x, (level3_ycoor*2+windowHeight)/2+y, 0+z); 
      //camera((level3_xcoor*2+windowWidth)/2, (level3_ycoor*2+windowHeight)/2, 1000+z, (level3_xcoor*2+windowWidth)/2, (level3_ycoor*2+windowHeight)/2, 0+z);
    }  
  }
  else if(cam_choose == 4){
    translate(level4_xcoor+100, level4_ycoor+windowHeight-75, 0);

    groundY = level4_ycoor+windowHeight;
    // decide if it is jumping
    if (is_jumping) {
      y += jump_velocity;
      jump_velocity += gravity;

      if (y >= 0) {
        y = 0;
        is_jumping = false;
        jump_velocity = 0;
      }
    }

    translate(0+x,0+y,0+z);
    drawCharacter();
    if(end_level4){
      x = 0;
      y = 0;
      z = 0;
      level_end.play();
      cam_choose = 0;
    }
    else{
      cam.setPosition((level4_xcoor*2+windowWidth)/2+x, (level4_ycoor*2+windowHeight)/2+y, 1000+z);
      cam.lookAt((level4_xcoor*2+windowWidth)/2+x, (level4_ycoor*2+windowHeight)/2+y, 0+z); 
      //camera((level4_xcoor*2+windowWidth)/2, (level4_ycoor*2+windowHeight)/2, 1000+z, (level4_xcoor*2+windowWidth)/2, (level4_ycoor*2+windowHeight)/2, 0+z);
    }
  }
  else if(cam_choose == 5){
    translate(level5_xcoor+100, level5_ycoor+windowHeight-75, 0);

    groundY = level5_ycoor+windowHeight;
    // decide if it is jumping
    if (is_jumping) {
      y += jump_velocity;
      jump_velocity += gravity;

      if (y >= 0) {
        y = 0;
        is_jumping = false;
        jump_velocity = 0;
      }
    }

    translate(0+x,0+y,0+z);
    drawCharacter();
    if(end_level5){
      x = 0;
      y = 0;
      z = 0;
      level_end.play();
      cam_choose = 0;
    }
    else{
      cam.setPosition((level5_xcoor*2+windowWidth)/2+x, (level5_ycoor*2+windowHeight)/2+y, 1000+z);
      cam.lookAt((level5_xcoor*2+windowWidth)/2+x, (level5_ycoor*2+windowHeight)/2+y, 0+z); 
      //camera((level5_xcoor*2+windowWidth)/2, (level5_ycoor*2+windowHeight)/2, 1000+z, (level5_xcoor*2+windowWidth)/2, (level5_ycoor*2+windowHeight)/2, 0+z);
    }
  }
  else if(cam_choose == 6){
    translate(level6_xcoor+100, level6_ycoor+windowHeight-75, 0);

    groundY = level6_ycoor+windowHeight;
    // decide if it is jumping
    if (is_jumping) {
      y += jump_velocity;
      jump_velocity += gravity;

      if (y >= 0) {
        y = 0;
        is_jumping = false;
        jump_velocity = 0;
      }
    }

    translate(0+x,0+y,0+z);
    drawCharacter();
    if(end_level6){
      x = 0;
      y = 0;
      z = 0;
      level_end.play();
      cam_choose = 0;
    }
    else{
      cam.setPosition((level6_xcoor*2+windowWidth)/2+x, (level6_ycoor*2+windowHeight)/2+y, 1000+z);
      cam.lookAt((level6_xcoor*2+windowWidth)/2+x, (level6_ycoor*2+windowHeight)/2+y, 0+z); 
      //camera((level6_xcoor*2+windowWidth)/2, (level6_ycoor*2+windowHeight)/2, 1000+z, (level6_xcoor*2+windowWidth)/2, (level6_ycoor*2+windowHeight)/2, 0+z);
    }
  }
  /*
  else if(cam_choose == -1){
    if(mouseIsPressed){
      if(mouseX < 760 && mouseX > 680 && mouseY < 440 && mouseY > 360){
        //camera((8000+windowWidth)/2, (8000+windowHeight)/2, 1000+z, (8000+windowWidth)/2, (8000+windowHeight)/2, 0+z);
        cam_choose = 0;
        click_right_sound.play();
      }
    }
    else{
      cam.setPosition(0+x, 0+y, 1000+z);
      cam.lookAt(0+x, 0+y, 0+z);
      //camera(0+x, 0+y, 1000+z, 0+x, 0+y, 0+z);
    }
  }
  */
}

function keyReleased() {
  if (enter == 1) {
    enter = 0;
  }
  return false;
}