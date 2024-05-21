document.addEventListener("DOMContentLoaded", function(){
    getMonsters(1)
    const monsterContainer = document.getElementById('monster-container')
    const createMonster = document.getElementById('create-monster')
    const back = document.getElementById('back')
    const forward = document.getElementById('forward')

    let page = 1
    back.addEventListener('click', ()=> {
        monsterContainer.innerHTML=''
        page -= 1; getMonsters(page)})
    forward.addEventListener('click', ()=> {
        monsterContainer.innerHTML=''
        page += 1; getMonsters(page)})

    function renderMonster(resp){
        
        let h2 = document.createElement('h2')
            h2.innerText= resp.name
            // monsterContainer.appendChild(h2)
        let h4 = document.createElement('h4')
            h4.innerText=`Age: ${resp.age}`
            // monsterContainer.appendChild(h4)
        let p = document.createElement('p')
            p.innerText = `Description: ${resp.description}`
            monsterContainer.append(h2, h4, p)
    }

    function getMonsters(page){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(res=>res.json())
        .then(response=>{
            response.map(element => {
                renderMonster(element)})})

        .catch(error=>console.log(error))}

        

})

const form = document.getElementById('form')
form.addEventListener('submit', getInput)

function getInput(e){
    e.preventDefault();
    let nameInput = e.target.name.value;
    let ageInput = e.target.age.value;
    let descriptionInput = e.target.description.value
    console.log(descriptionInput)
    let postBody= {name: nameInput, age: ageInput, description: descriptionInput}
    console.log(postBody)
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        body: JSON.stringify(
            postBody),
        headers:
            {"Content-Type": "application/json",
            "Accept": "application/json"}}
    
        )}