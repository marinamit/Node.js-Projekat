const from = document.querySelector('#from');
const to = document.querySelector('#to');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');

document.querySelector('form').addEventListener('submit',async e=>{
    e.preventDefault();
    body = {
        from:from.value,
        to:to.value,
        subject:subject.value,
        message:message.value
    }

    try{
        const res = await fetch('/api/v1/sendmail',{
            method: 'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await res.json();
        console.log(data)
    }catch(err){
        console.error(err.message)
    }
})