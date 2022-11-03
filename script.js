var start = function(){
    var canvas = document.getElementById("screen");
    var ctx = canvas.getContext("2d");

    var points = [[0,0,0],[0,1,0],[1,1,0],[1,0,0],[0,0,1],[0,1,1],[1,1,1],[1,0,1]];
    var edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

    var rotationXdeg = 30;
    var rotationYdeg = 30;
    var rotationZdeg = 30;
    
    function rotate(x,y,z,yaw,pitch,roll){
        var cos = Math.cos;
        var sin = Math.sin;
        var rx = x*cos(yaw)*cos(pitch) + y*(cos(yaw)*sin(pitch)*sin(roll)-sin(yaw)*cos(roll)) + z*(cos(yaw)*sin(pitch)*cos(roll)+sin(yaw)*sin(roll));
        var ry = x*sin(yaw)*cos(pitch) + y*(sin(yaw)*sin(pitch)*sin(roll)+cos(yaw)*cos(roll)) + z*(sin(yaw)*sin(pitch)*cos(roll)-cos(yaw)*sin(roll));
        var rz = x*-sin(pitch) + y*cos(pitch)*sin(roll) + z*cos(pitch)*cos(roll);

        return [rx,ry,rz];
    }
    function project3d(x,y,z, angleX,angleY,angleZ){

        x = x-0.5;
        y = y-0.5;
        z = z-0.5;

        var data = rotate(x,y,z,angleX,angleY,angleZ);
        x = data[0];
        y = data[1];
        z = data[2];

        var scale = 400;
        var fov = 30;
        var x2d = (x * fov) / ((z + fov)) * scale;
        var y2d = (y * fov) / ((z + fov)) * scale;
        return [x2d,y2d];
    }

    function draw(){
        var rotationXrad = rotationXdeg * (Math.PI/180);
        var rotationYrad = rotationYdeg * (Math.PI/180);
        var rotationZrad = rotationZdeg * (Math.PI/180);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(var i = 0; i < edges.length; i++){
            var p1 = points[edges[i][0]];
            var p2 = points[edges[i][1]];
            var p1p = project3d(p1[0],p1[1],p1[2],rotationXrad,rotationYrad,rotationZrad);
            var p2p = project3d(p2[0],p2[1],p2[2],rotationXrad,rotationYrad,rotationZrad);
            ctx.beginPath();
            ctx.moveTo(p1p[0]+500, p1p[1]+500);
            ctx.lineTo(p2p[0]+500, p2p[1]+500);
            ctx.stroke();
        }
    }
    
    setInterval(function(){
        rotationYdeg += 1;
        draw();
    }, 10);
    
}