//fetch dog data from dog API
const dogUrl = ' http://localhost:3000/pups';
fetch(dogUrl)
.then(res => res.json())
.then(dogs => {
    console.log(dogs);
    dogs.forEach(dog => appendDogSpan(createSpan(dog)))
})

//Create span tag showing name of each dog
function createSpan(dog) {
    const dogSpan = document.createElement('span');
    dogSpan.innerHTML = dog.name;
    dogSpan.addEventListener('click', function (){addDogInfoToDiv(dog) })
    return dogSpan;
}
//<div id="dog-bar">

    //</div>
//Append span tag to dog bar
const dogBar = document.getElementById('dog-bar');
const appendDogSpan = (dogSpan)=>{
  dogBar.appendChild(dogSpan)
}

//Add image, name, and isGoodDog to dog-info div

function addDogInfoToDiv(dog) {
   const btnTxt = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
   const dogInfo = document.getElementById('dog-info');
   dogInfo.innerHTML =
   `
    <img src = ${dog.image} alt=${dog.image}>
    <h2>${dog.name}</h2>
    <button id='dog-button'>${btnTxt}</button>
   `
}
const dogBtn = document.getElementById('dog-button');
dogBtn.addEventListener('click', function(){
    changeIsDog(dog)
    if(dogBtn.innerText === 'Good Dog!'){
        dogBtn.innerText = 'Bad Dog!'
        console.log(dogBtn.innerText)
    }else {
        dogBtn.innerText = 'Good Dog!'
        console.log(dogBtn.innerText)
    }
  })

function changeIsDog(dog){
     if (dog.isGoodDog === true) {
        value = false
    } else {
        value = true
    }
    const configObj = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "id": dog.id,
            "name": dog.name,
            "isGoodDog": value,
            "image": dog.image
        })
    }
    fetch(`http://localhost:3000/pups/${dog.id}`, configObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
}