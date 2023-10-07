
let imagebox = document.getElementById("imagebox");
let count = 1;



let next = document.getElementById("next");
let prev = document.getElementById("prev");
let current = document.getElementById("current");

next.addEventListener("click", () => {
    if (count === 100) {
        count = 100;
    }
    else {
        count++;
        imagebox.innerHTML = "";
        console.log("count is", count);
        fetchApi();
        current.textContent = `Current Page: ${count}`;
    }
})

prev.addEventListener("click", () => {
    if (count < 2) {
        count = 1;
    }
    else {
        count--;
        imagebox.innerHTML = "";
        console.log("count is", count);
        fetchApi();
        current.textContent = `Current Page: ${count}`;
    }
})


let arr = [];
let filterData;

async function fetchApi() {
    let api = `https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${count}`;
    const data = await fetch(api);
    let res = await data.json();
    arr = res?.results;
    console.log(arr);
    render(res);
}


fetchApi();

function render(res) {
    res?.results.forEach((value) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500/${value.backdrop_path}`;
        imagebox.innerHTML +=
            `<div class="image">
                <div><img src = "${imageUrl}" /></div>
                <h5>${value.original_title}</h5> 
                <div class="textContainer">
                    <div class="vote_count">
                        <div class = "vote">Votes : "${value.vote_count}"</div>
                        <i class="fa fa-heart-o" id="heart" onclick = "addToFavourate(${value.id})"></i>
                    </div>
                    <div >Rating : ${value.vote_average}</div>
                    <div >Release_Date : ${value.release_date}</div>
                </div>
                </div> 
            </div>`
    });
}




let favArr = [];

function addToFavourate(value) {
    filterData = arr.filter((val) => val.id === value);
    filterData.forEach((val) => {
        favArr = [...favArr, val];
    })
}



imagebox.addEventListener("click", (e) => {
    if (e.target.classList.contains('fa-heart-o')) {
        e.target.classList.remove('fa-heart-o');;
        e.target.classList.add('fa-solid');
        e.target.classList.add("fa-heart");
    }

    else {
        e.target.classList.remove('fa-solid');
        e.target.classList.remove("fa-heart");
        e.target.classList.add('fa-heart-o');;
    }
});



let sortByRating = document.getElementById("sortByRating");

sortByRating.addEventListener("click", async () => {
    imagebox.innerHTML = "";
    let api = `https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${count}`;
    let data = await fetch(api);
    let res = await data.json();

    res.results.sort((a, b) => {
        return a.vote_average - b.vote_average;
    })
    render(res);
});

let sortByDate = document.getElementById("sortByDate");

sortByDate.addEventListener("click", async () => {
    console.log("--click");
    imagebox.innerHTML = "";
    let api = `https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${count}`;
    let data = await fetch(api);
    let res = await data.json();

    res.results.sort((a, b) => {
        console.log(a.release_date);
        return new Date(a.release_date) - new Date(b.release_date);
    })

    render(res);
})


let favorite = document.getElementById("favorite");

favorite.addEventListener("click", (value) => {
    imagebox.innerHTML = "";

    favArr.forEach((value) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500/${value.backdrop_path}`;

        imagebox.innerHTML +=
            `<div class="image">
        <div><img src = "${imageUrl}" /></div>
        <h5>${value.original_title}</h5> 
        <div class="textContainer">
            <div class="vote_count">
                <div class = "vote">Votes : "${value.vote_count}"</div>
                <i class="fa fa-heart-o heart" id="heart" onclick = "addToFavourate(${value.id})"></i>
            </div>
            <div >Rating : ${value.vote_average}</div>
            <div >Date : ${value.vote_average}</div>

        </div>
        </div> 
    </div>`
    })
})



function allData(){
    let all = document.getElementById("all");
    all.addEventListener("click", () => {
        fetchApi();
    })
}


allData();





let search = document.getElementById("search");
let filterSearch;

search.addEventListener("click", async () => {
    let inputbox = document.getElementById("inputbox");
    console.log(arr);
    filterSearch = arr.filter((val) => val.original_title.toUpperCase().includes(inputbox.value.toUpperCase()));
    console.log("filterSearch", filterSearch);

    if(filterSearch.length===0){
        alert("No data found");
        return;
    }


    imagebox.innerHTML = "";

    filterSearch.forEach((value) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500/${value.backdrop_path}`;

        imagebox.innerHTML +=
            `<div class="image">
            <div><img src = "${imageUrl}" /></div>
            <h5>${value.original_title}</h5> 
            <div class="textContainer">
                <div class="vote_count">
                    <div class = "vote">Votes : "${value.vote_count}"</div>
                    <i class="fa fa-heart-o heart" id="heart" onclick = "addToFavourate(${value.id})"></i>
                </div>
                <div >Rating : ${value.vote_average}</div>
            </div>
            </div> 
        </div>`

    })
})







