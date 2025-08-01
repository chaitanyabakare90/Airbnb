let btn = document.querySelector("button");

function changecolor() {
    let red = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let color = `rgb(${red},${green},${blue})`;
    return color;
}

btn.addEventListener("click",()=>{
    let h1 = document.querySelector("h1");
    let getcolor = changecolor();
    h1.innerText = getcolor;
    let div = document.querySelector("div");
    div.style.backgroundColor = getcolor;

})