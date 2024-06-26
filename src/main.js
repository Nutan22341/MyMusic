const searchlogo = document.getElementById("enableSearchBox")
const searchBox = document.getElementById("search-area")

searchlogo.addEventListener("click",()=>{
    searchBox.style.display="flex";
})

const globalSearchBtn = document.getElementById("global-search-btn");
const searchQuery = document.getElementById("global-search");
globalSearchBtn.addEventListener("click",async ()=>{
    const inputQuery=searchQuery.value;
    searchQuery.value="";
    let response = await fetch(`https://saavn.dev/api/search?query=${inputQuery}`);
    let data = await response.json();
    if(!data.success){
        alert("Nothing to Show!!!");
    }
    else{
        const encodedMessage = encodeURIComponent(inputQuery);
        window.location.href = `/views/SearchResults.html?query=${encodedMessage}`;
    }
})