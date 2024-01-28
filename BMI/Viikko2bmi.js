"use strict";

let lowBmi = `Jos painoindeksi on alle 18,5, se merkitsee liiallista laihuutta.
Sen syynä voi olla jokin pitkällinen sairaus tai laihuushäiriö eli anoreksia. 
Jos varsinaista sairautta ei ole, mutta painoindeksi on laskenut alle 18,5:n, pitää hakeutua lääkäriin. 
Jos paino muutamassa kuukaudessa on laskenut yli 20:n tasolta reilusti, on varminta mennä lääkäriin jo painoindeksin lähestyessä 19:ää.`;

let normalBmi = `Normaaliksi on valittu se painoindeksin alue, 
jossa ihmisen terveys on parhaimmillaan. 
Normaali painoindeksin alue on välillä 18,5–25. 
Jos painoindeksi on pienempi kuin 18,5 tai suurempi kuin 25, sairauksien vaara suurenee. 
Painoindeksiä voidaan käyttää 18 vuoden iästä lähtien.`;

let highBmi = `Kun painoindeksi ylittää 25, ollaan liikapainon puolella. 
Liikakilojen määrä voi vaihdella erittäin paljon, muutamasta kilosta moniin kymmeniin kiloihin.
Siksi on hyödyllistä täsmentää, kuinka suuresta ylipainosta on kyse.`;


document.addEventListener('keydown', function(e) {
    // console.log(e)
    console.log(e.key);
});


const nappula = document.querySelector('.calculate');
nappula.addEventListener('click', function (evt){
    console.log('Nappulaa klikattiin');
    console.log(evt);


    const weight = parseInt(document.getElementById('weight').value);
    console.log(weight)
    const height = Number(document.getElementById('height').value);
    console.log(height)

    let yht = weight + height;
    console.log(yht);

    if (!weight || !height) {
        analysis.textContent = 'Arvoja puuttuu, syötä puuttuvat arvot';
    } else {
        bmilaskuri(weight, height);
    }
});

function resettiFunktio() {
    const chartElements = document.querySelectorAll('.bmi0-19, .bmi19-25, .bmi25-30');
    for (const element of chartElements) {
        element.classList.remove('lowBmi', 'normalBmi', 'highBmi');
    }
}

function bmilaskuri(weight, height) {
    resettiFunktio();
    console.log('Lasketaan BMI')
    let bmi = (weight / ((height * height) / 10000)).toFixed(1);
    console.log(bmi);
    document.querySelector('.bmi-score').textContent = bmi;

    if(bmi < 19) {
        console.log('Alipaino')
        document.querySelector('.analysis').textContent = lowBmi;
        // document.querySelector('.bmi0-19').style.color = 'red';
        document.querySelector('.bmi0-19').classList.add('lowBmi');


    } else if (bmi > 25) {
        console.log('Ylipaino')
        document.querySelector('.analysis').textContent = highBmi;
        // document.querySelector('.bmi25-30').style.color = 'red';
        document.querySelector('.bmi25-30').classList.add('highBmi');

    } else {
        console.log('Normaalipaino')
        document.querySelector('.analysis').textContent = normalBmi;
        // document.querySelector('.bmi19-25').style.color = 'green';
        document.querySelector('.bmi19-25').classList.add('normalBmi');
    }
};


