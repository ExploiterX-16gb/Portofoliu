const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let width;
let height;

let columns;
let drops;

const fontSize = 15;

const characters = "01";


function resize() {

    width = canvas.width =
        window.innerWidth;

    height = canvas.height =
        window.innerHeight;

    columns =
        Math.floor(
            width / fontSize
        );

    drops =
        Array(columns).fill(1);
}


function drawMatrix() {

    /*
     * Creează urmele transparente
     * ale cifrelor.
     */

    ctx.fillStyle =
        "rgba(2,4,3,0.08)";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    ctx.font =
        fontSize +
        "px monospace";


    for (
        let i = 0;
        i < drops.length;
        i++
    ) {

        const character =
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];


        /*
         * Majoritatea cifrelor sunt
         * verzi, unele devin mai luminoase.
         */

        ctx.fillStyle =
            Math.random() > 0.96
                ? "#caffda"
                : "#20d967";


        const x =
            i * fontSize;

        const y =
            drops[i] * fontSize;


        ctx.fillText(
            character,
            x,
            y
        );


        /*
         * Când coloana ajunge jos,
         * o repornim.
         */

        if (
            y > height &&
            Math.random() > 0.975
        ) {

            drops[i] = 0;

        }


        drops[i]++;
    }

}


/*
 * Pornire.
 */

resize();

window.addEventListener(
    "resize",
    resize
);


/*
 * Aproximativ 30 FPS.
 */

setInterval(
    drawMatrix,
    33
);