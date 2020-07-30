// API key = 0e71d62f902d0672e2e776ad73b77478

function ajax(endpoint,returnFunction){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", endpoint);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(this.readyState == this.DONE){
			if(xhr.status == 200){
				returnFunction(xhr.responseText);
			}
			else{
				alert("AJAX error");
			}
		}
	}
}

document.querySelector("#search-form").onsubmit = function(event) {
event.preventDefault();

	let input = document.querySelector("#search-id").value.trim();
	let endpoint = "https://api.themoviedb.org/3/search/movie?api_key=0e71d62f902d0672e2e776ad73b77478&language=en-US&query=" + input + "&page=1&include_adult=false";
		ajax(endpoint, display_results);
}

function display_results(result_object){
	result_object = JSON.parse(result_object);
	let search_results = document.querySelector(".movie-row");

	while(search_results.hasChildNodes()){
		search_results.removeChild(search_results.lastChild);
	}

	let curr_results = result_object.results.length;
	let total_results = result_object.total_results;

	document.querySelector("#num-current").innerHTML = curr_results;
	document.querySelector("#num-total").innerHTML = total_results;

	for(let i = 0; i < curr_results; i++){
		let curr = result_object.results[i];
		
		//Title
		let title = document.createElement("div");
		title.innerHTML = curr.title;
		title.classList.add("title");
		
		//Date
		let date = document.createElement("div");
		date.classList.add("date")
		date.innerHTML = curr.release_date;

		//Overlay
		let overlay = document.createElement("div");
		overlay.classList.add("overlay");
		let rating = document.createElement("h5");
		rating.innerHTML = "Rating: " + curr.vote_average;
		let vote = document.createElement("h5");
		vote.innerHTML = "Votes: " + curr.vote_count;
		let summary = document.createElement("p");
		let temp = curr.overview;
		if(temp.length > 200){
			summary.innerHTML = temp.substr(0,200) + "...";
		}
		else{
			summary.innerHTML = temp;
		}

		overlay.append(rating);
		overlay.append(vote);
		overlay.append(summary);

		//Movie Poster
		//Under the overlay on the website
		//The overlay div is a child of this div
		let poster = document.createElement("div");
		poster.classList.add("image-wrap");
		let poster_img = document.createElement("img");
		poster_img.classList.add("poster");
		if (curr.poster_path == null) {
			poster_img.src = "noposter.jpg";
		}
		else{
			poster_img.src = "https://image.tmdb.org/t/p/original" + curr.poster_path;
		}
		poster_img.alt = curr.original_title;
		poster.appendChild(poster_img);
		poster.appendChild(overlay);

		let movie = document.createElement("div");
		movie.classList.add("col-6");
		movie.classList.add("col-md-4");
		movie.classList.add("col-lg-3");
		movie.appendChild(poster);
		movie.appendChild(title);
		movie.appendChild(date);

		search_results.appendChild(movie);
	}
}

document.querySelector("body").onload = function(event){
    let endpoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=0e71d62f902d0672e2e776ad73b77478&language=en-US&page=1";
    ajax(endpoint, display_results);
}