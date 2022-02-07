
function votingUpdate(){
document.querySelectorAll('.bi-arrow-down-square').forEach((button) => {
    button.addEventListener('click', (e) => {
        const postId  = button.parentElement.getAttribute('id');
        const downPTag = document.getElementById(`downTag:${postId}`);
        const currentVotes = parseInt(downPTag.innerText);
        const value = button.getAttribute('value');
        if ( value === "no") {
            downPTag.innerText = currentVotes + 1;
       const data = 
        { 
            id: postId,
            inc: 1,
        };

        fetch("/downVote", {
            method: 'PUT',
            headers: {
                        'Content-Type': 'application/json',
                    },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
                console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });       
            button.setAttribute("value", "yes");    
        } else {
            downPTag.innerText = currentVotes - 1;
            console.log('yes');
            button.setAttribute("value", "no");
                 const data = 
        { 
            id: postId,
            inc: -1,

        };

        fetch("/downVote", {
            method: 'PUT',
            headers: {
                        'Content-Type': 'application/json',
                    },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
                console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });       
        }
 
    })
})

document.querySelectorAll('.bi-arrow-up-square').forEach((button) => {
    button.addEventListener('click', (e) => {
              const postId = button.parentElement.getAttribute('id');
							const upPTag = document.getElementById(`upTag:${postId}`);
							const currentVotes = parseInt(upPTag.innerText);
							const value = button.getAttribute('value');
							if (value === 'no') {
								upPTag.innerText = currentVotes + 1;
								const data = {
									id: postId,
									inc: 1,
								};

								fetch('/upVote', {
									method: 'PUT',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify(data),
								})
									.then((response) => response.json())
									.then((data) => {
										console.log('Success:', data);
									})
									.catch((error) => {
										console.error('Error:', error);
									});
								button.setAttribute('value', 'yes');
							} else {
								upPTag.innerText = currentVotes - 1;
								console.log('yes');
								button.setAttribute('value', 'no');
								const data = {
									id: postId,
									inc: -1,
								};

								fetch('/upVote', {
									method: 'PUT',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify(data),
								})
									.then((response) => response.json())
									.then((data) => {
										console.log('Success:', data);
									})
									.catch((error) => {
										console.error('Error:', error);
									});
							}
 
    })
})


}
