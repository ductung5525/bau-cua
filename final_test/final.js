const object = {
  './img/bau.png': 'Bầu',
  './img/ca.png': 'Cá',
  './img/cua.png': 'Cua',
  './img/ga.png': 'Gà',
  './img/huou.png': 'Hươu',
  './img/tom.png': 'Tốm',
};

const images = Object.keys(object);

let isRun = false;

const cuocBtns = document.querySelectorAll('.animal > div');
let cuocResults = [];
let max = 0;

const imagesElement = document.querySelectorAll('#ketqua img');

document.getElementById('quay').addEventListener('click', () => {
  let count = 0;

  if (!isRun) {
      let currentIndex = 0;
      isRun = true;
      let id = setInterval(() => {
          const randomImage = images[Math.floor(Math.random() * images.length)];

          imagesElement[currentIndex].src = randomImage;
          count += 1;
          currentIndex += 1;

          if (currentIndex >= imagesElement.length) {
              currentIndex = 0;
          }
          if (count === 300) {
              clearInterval(id);
              isRun = false;

              const RESULTS = [];
              const scores = [];

              imagesElement.forEach(function (e) {
                  scores.push(object[e.getAttribute('src')]);
                  cuocResults.forEach((src) => {
                      if (src === e.getAttribute('src')) {
                          RESULTS.push(object[src]);
                      }
                  });
              });
              if (RESULTS.length > 0) {
                  console.log('Bạn đã đoán đúng: ' + RESULTS.join(', '));
              } else {
                  console.log('Bạn đã đoán sai: ' + scores.join(', '));
              }
          }
      }, 0.1);
  }
});

cuocBtns.forEach((element) => {
  element.onclick = function (e) {
      if (!isRun) {
          if (max < 3) {
              this.querySelector('.number').innerHTML = 1 + Number.parseInt(this.querySelector('.number').innerHTML);
              cuocResults.push(this.querySelector('img').getAttribute('src'));
              max += 1;
          }
      }
  };
});

document.getElementById('reset').onclick = function () {
  max = 0;
  cuocResults = [];
  cuocBtns.forEach((element) => {
      if (!isRun) {
          element.querySelector('.number').innerHTML = 0;
      }
  });
};
