function setup() {
    canvas = createCanvas(400, 400);
    canvas.position(520, 200);
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    


}


function draw() {
   image(video, 0, 0, 400, 400);
   status=true;
   
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected!";
            document.getElementById("number_of_objects"),innerHTML="The Number Of Objects Detected are"+objects.length;
            fill("red");
            strokeWeight(3);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);

        }
    }
}
function modelLoaded() {
    console.log("Model Loaded");

}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results)
        objects = results;
    }

}

var objects = [];

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects: ";
}