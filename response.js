document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000'
    const prompt = JSON.parse(localStorage.getItem('prompt')) 
     document.getElementById('user-prompt').value = prompt
    const response = JSON.parse(localStorage.getItem('response'))
    showFeatures(response)
    const get_features = document.getElementById('get-features')
    get_features.addEventListener('click', () => {
        showFeatures(response)
    })
    
    const get_tasks = document.getElementById('get-tasks')
    const tasks = JSON.parse(localStorage.getItem('tasks'))
     get_tasks.addEventListener('click', async () => {
       
            showLoader()
            const res = await fetch(`${url}/task_decomposer`, {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({features: response})
            })
            if (res.ok) {
                const tasksfromAPI = await res.json()
                
                const parsedFeatures = JSON.parse(tasksfromAPI.features);
              
                localStorage.setItem('tasks', JSON.stringify(parsedFeatures))
            showtasks(parsedFeatures)
    
            }
        
    })
})

 function showLoader() {
   
    const parentlistContainer = document.getElementById('list')
    const unorderedParentList = document.createElement('ul')
    parentlistContainer.innerHTML = ''
    
        const parentitems =  document.createElement('li')
        parentitems.style.listStyle = 'none'
        const parentitem  = document.createElement('div')
        parentitem.innerHTML = `<input id="list-item-input" type="text"  style="display: ${'none'};">
        <span>
        🔄 Please wait. Task decomposer is in progress...
        </span>`
        


        parentitems.append(parentitem)
             

        unorderedParentList.append(parentitems)
    
    parentlistContainer.append(unorderedParentList)

}

function showFeatures(array) {
   
    const parentlistContainer = document.getElementById('list')
    const unorderedParentList = document.createElement('ul')
    parentlistContainer.innerHTML = ''
      for (let index = 0; index < array.length; index++) {
        const parentitems =  document.createElement('li')
        const parentitem  = document.createElement('div')
        parentitem.innerHTML = `<input id="list-item-input" type="text" value=${array[index]} style="display: ${'none'};">
        <span>
        ${array[index]}
        </span>`
        const dateAndCost = document.createElement('div')
        dateAndCost.classList.add('dateandmoney')
        const cost = JSON.parse(localStorage.getItem('cost'))
        const deadline = JSON.parse(localStorage.getItem('deadline'))

    
        dateAndCost.innerHTML = `
        <div class="date">
             <i class="fa-solid fa-calendar"></i>
            <span>
            ${deadline[index]}
            </span>
        </div>
        <div class="cost">
         
             <i class="fa-solid fa-money-bill"></i>
            <span>
                $${cost[index]} per hour
            </span>
        </div>`

        parentitems.append(parentitem)
             

        unorderedParentList.append(parentitems)
        unorderedParentList.append(dateAndCost)
    } 
    parentlistContainer.append(unorderedParentList)

}

function showtasks(array) {
    const response = JSON.parse(localStorage.getItem('response'))

    const parentlistContainer = document.getElementById('list')
    const unorderedParentList = document.createElement('ul')
    parentlistContainer.innerHTML = ''
      for (let index = 0; index < array.length; index++) {
        const parentitems =  document.createElement('li')
        const parentitem  = document.createElement('div')
        parentitem.innerHTML = `<input id="list-item-input" type="text" value=${response[index]} style="display: ${'none'};">
        <span>
        ${response[index]}
        </span>`
        const dateAndCost = document.createElement('div')
        dateAndCost.classList.add('dateandmoney')
        const cost = JSON.parse(localStorage.getItem('cost'))
        const deadline = JSON.parse(localStorage.getItem('deadline'))
         dateAndCost.innerHTML = `
        <div class="date">
             <i class="fa-solid fa-calendar"></i>
            <span>
            ${deadline[index]}
            </span>
        </div>
        <div class="cost">
         
             <i class="fa-solid fa-money-bill"></i>
            <span>
                $${cost[index]} per hour
            </span>
        </div>`
        parentitems.append(parentitem)
        

                for (let innerIndex = 0; innerIndex < array[index].length; innerIndex++) {
                           const unorderedChildList = document.createElement('ul')  
                            const childitems =  document.createElement('li')
                            const childitem  = document.createElement('div')
                            childitem.innerHTML = `<input id="list-item-input" type="text" value=${array[index][innerIndex]} style="display: ${'none'};">
                        <span>
                            ${array[index][innerIndex]}
                        </span>`
                         childitems.append(childitem)
                         unorderedChildList.append(childitems)   
                         parentitems.append(unorderedChildList)
                }

        unorderedParentList.append(parentitems)
        unorderedParentList.append(dateAndCost)
    } 
    parentlistContainer.append(unorderedParentList)

}


   