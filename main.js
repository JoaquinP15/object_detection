Status = "" ;

objects = [];

object_detection = "";

function preload(){
    
}

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600,400);
    video.hide();

    object_detection = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status : object detecting";
}

function modelLoaded(){
    console.log("Model Has Been Loaded");
    Status = true; 
}

function gotResult(error,results){
    if(error){
    console.log(error);
    }
    console.log(results);

    objects = results;
}

function draw(){
    image(video,0,0,600,400);

    if(Status != ""){

        r = random(255);
        g = random(255);
        b = random(255);
    
        object_detection.detect(video,gotResult);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects : " + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}