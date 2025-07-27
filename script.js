
document.addEventListener('DOMContentLoaded', () => {

    const url = 'http://localhost:3000'
    const sendbtn = document.getElementById('sendBtn')
    sendbtn.addEventListener('click', async () => {
        const prompt = document.getElementById('prompt').value
        localStorage.setItem('prompt', JSON.stringify(prompt))
        document.getElementById('prompt').style.fontSize = '20px'
        document.getElementById('prompt').value = `🔄 Feature extractor running...\n\n⏳ Cost estimation queued.\n\n⏳ Deadline planning queued.`
        document.getElementById('btn-grp').style.display = 'none'
        const res = await fetch(`${url}/features_extractor`, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({input: prompt})
        })
        if (res.ok) {
            const features = await res.json()
            localStorage.setItem('response', JSON.stringify(features))
        }
        document.getElementById('prompt').style.fontSize = '20px'
        document.getElementById('prompt').value = `✅ Feature extraction complete.\n\n🔄 Cost estimation running...\n\n⏳ Deadline planning queued.`
        document.getElementById('btn-grp').style.display = 'none'
        const cost = await fetch(`${url}/cost_estimator`, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({array: JSON.parse(localStorage.getItem('response'))})
        })
              if (cost.ok) {
                  const money = await cost.json()
                  localStorage.setItem('cost', JSON.stringify(money))
                }
        document.getElementById('prompt').style.fontSize = '20px'
         document.getElementById('prompt').value = `✅ Feature extraction complete.\n\n✅ Cost estimation complete.\n\n🔄 Deadline planning running...`
        document.getElementById('btn-grp').style.display = 'none'
                const deadline = await fetch(`${url}/deadline_analyzer`, {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({array: JSON.parse(localStorage.getItem('response'))})
        })
        if (deadline.ok) {
            const deadlines = await deadline.json()
            localStorage.setItem('deadline', JSON.stringify(deadlines))
         document.getElementById('prompt').value = `✅ Feature extraction complete.\n\n✅ Cost estimation complete.\n\n✅ Deadline planning complete`

            window.location.replace('response.html')
        }
    })
})


