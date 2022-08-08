import { DVD } from "./dvd.js";

const app = document.getElementById('app');
const ctx = app.getContext('2d');
app.width = window.innerWidth;
app.height = window.innerHeight;

const dvd = new DVD('./dvd.png', ctx);


function animate() {
	ctx.clearRect(0, 0, app.width, app.height);
	ctx.font = '20px Arial';
	ctx.fillText(`wall hits: ${dvd.wallCollisions}`, 10, 20);
	ctx.fillText(`corner hits: ${dvd.cornerCollisions}`, 10, 40);
	dvd.update();
	dvd.draw();
	requestAnimationFrame(animate);
}
animate();