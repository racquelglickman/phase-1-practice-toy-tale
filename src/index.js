let addToy = false;

let toyCollection = document.querySelector('#toy-collection');

let createToyForm = document.querySelector('.add-toy-form');


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
    .then((response) => response.json())
    .then((data) => {
    
      renderToyCards(data);

    });

});

function renderToyCards(toys) {
  
  toys.forEach((toy) => {
    
    console.log(toy);

    let likes = toy.likes;

    let div = document.createElement('div'); // each div is a card for a toy
    div.className = 'toy-collection';
    toyCollection.append(div);

    let h2 = document.createElement('h2');
    h2.textContent = toy.name;

    let img = document.createElement('img');
    img.src = toy.image;
    img.className = 'toy-avatar'

    let likeCount = document.createElement('p');
    likeCount.textContent = `${likes} Likes`;

    let button = document.createElement('button');
    button.textContent = 'Like ❤️';
    button.className = 'like-btn';
    button.id = toy.id;

    button.addEventListener('click', () => {
      console.log('before', likes);
      likes++;
      console.log('after', likes);
      likeCount.textContent = `${likes} Likes`;

      //fetch request
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "Application/json",
          },
          body: JSON.stringify(
            { likes }
          ),
        });

    });

    div.append(h2, img, likeCount, button);
  })
};

// need event listener for new toy submit button
// post new toys using renderToyCard?
// add element to DOM

createToyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('button clicked');
  console.log(e);

  newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0,
  };

  postNewToy(newToy);

})

function postNewToy(toy) {
  fetch('http://localhost:3000/toys', {
        method: "POST", 
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(toy),
    })
    .then((res) => res.json())
    .then((data) => {
        renderToyCards([data]);
    });
};

function patchToy(toy) {
  console.log(likeCount.textContent);
  console.log('third')
  console.log('before', toy.likes);
  toy.likes = toy.likes + 1;
  console.log('after', toy.likes);
  // likeCount.textContent = `${toy.likes} Likes`;

  // fetch('http://localhost:3000/toys', {
  //       method: "PATCH", 
  //       headers: {
  //           "content-type": "application/json",
  //           Accept: "application/json",
  //       },
  //       body: JSON.stringify(toy),
  //   })
  //   .then((res) => res.json())
  //   .then((data) => {
  //       renderToyCards([data]);
  //   });
}