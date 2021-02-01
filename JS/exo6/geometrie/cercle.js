class Cercle {
    constructor(canvas, totalTime) {
        this.canvas = canvas;
        this.canvas2dContext = this.canvas.getContext("2d");
        this.x = 100;
        this.y = 100;
        this.totalTime = totalTime;
        this.play = false;

        this.draw = function (time) {

            this.canvas2dContext.beginPath();
            this.canvas2dContext.arc(this.x, this.y, 90, 0, 2*Math.PI, false);
            this.canvas2dContext.strokeStyle = "black";
            this.canvas2dContext.lineWidth = 9;
            this.canvas2dContext.stroke();
            this.canvas2dContext.beginPath();
            this.canvas2dContext.arc(this.x, this.y, 90, - Math.PI/2 + time * 2 * Math.PI / this.totalTime, 2*Math.PI, false);
            this.canvas2dContext.strokeStyle = "white";
            this.canvas2dContext.lineWidth = 5;
            this.canvas2dContext.stroke();
            this.canvas2dContext.beginPath();
            this.canvas2dContext.arc(this.x, this.y, 90, -Math.PI/2, - Math.PI/2 + time * 2 * Math.PI / this.totalTime, false);
            this.canvas2dContext.strokeStyle = 'blue';
            this.canvas2dContext.lineWidth = 5;
            this.canvas2dContext.stroke();
            this.canvas2dContext.fillStyle = "white";
            this.canvas2dContext.fillRect(70, 70, 80, 80);
            this.canvas2dContext.fillStyle = "black";
            console.log(this.play);
            if(this.play){
                this.canvas2dContext.fillRect(70,70, 20, 60);
                this.canvas2dContext.fillRect(110, 70, 20, 60);
            } else {
                this.canvas2dContext.beginPath();
                this.canvas2dContext.moveTo(80,70);
                this.canvas2dContext.lineTo(80,130);
                this.canvas2dContext.lineTo(135,100);
                this.canvas2dContext.closePath();
                this.canvas2dContext.fill();
            }
        };
    }
}
