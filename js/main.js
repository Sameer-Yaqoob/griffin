let search = "atlanta";
const handleChange = (event) => {
  search = event.target.value;
};

function getScore(reviews, rating) {
  const score = (reviews * rating) / (reviews + 1);
  return Number.isInteger(score) ? score : score.toFixed(2);
}

const handleSubmit = () => {
  event.preventDefault();
  var element = document.getElementById("loader");
  element.classList.add("loader");
  const note = document.querySelector(".card");
  fetch(
    `https://yelpcorsproxy.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=parking&sort_by=rating&location=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500/",
        Authorization: `Bearer 2ruO8zn_9uX_CaO3v5jY3o-vDNC6C80O2XeslDah0lmg3CVim7aUbjT027-8eJI1J9fhB6he5jFR6dv-BrfQJGukIxftAEWgisY6GjtwbFO0PGz5OfS_v4LPl6OOYnYx`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      element.classList.remove("loader");
      document.querySelector(".card-wrapper").innerHTML = data.businesses
        .map(
          (item) =>
            `<div class="card-container">
            <a href=${item.url} target="_blank">
        <div class="card"
           style=" background:url(${item.image_url}) 100% bottom;">
           <div class="shine"></div>
           <div class="text-block">
              <h1>${item.location.address1}</h1>
            
              
              <div class="rating-stars">
                 <input type="radio" name="rating" class="rating-input" id="rs0" ${
                   Math.round(item.rating) >= 0 ? "checked" : ""
                 }>${
              Math.round(item.rating) >= 0 ? `<label for="rs0"></label>` : ""
            }
                 <input type="radio" name="rating" class="rating-input" id="rs1" ${
                   Math.round(item.rating) >= 1 ? "checked" : ""
                 }>${
              Math.round(item.rating) >= 1 ? `<label for="rs1"></label>` : ""
            }
                 <input type="radio" name="rating" class="rating-input" id="rs2" ${
                   Math.round(item.rating) >= 2 ? "checked" : ""
                 }>${
              Math.round(item.rating) >= 2 ? `<label for="rs2"></label>` : ""
            }
                 <input type="radio" name="rating" class="rating-input" id="rs3" ${
                   Math.round(item.rating) >= 3 ? "checked" : ""
                 }>${
              Math.round(item.rating) >= 3 ? `<label for="rs3"></label>` : ""
            }
                 <input type="radio" name="rating" class="rating-input" id="rs4" ${
                   Math.round(item.rating) >= 4 ? "checked" : ""
                 }>${
              Math.round(item.rating) >= 4 ? `<label for="rs4"></label>` : ""
            }
                 <input type="radio" name="rating" class="rating-input" id="rs5" ${
                   Math.round(item.rating) == 5 ? "checked" : ""
                 }>${
              Math.round(item.rating) == 5 ? `<label for="rs5"></label>` : ""
            }
                 <span class="rating-counter">${Math.round(
                   item.rating
                 )}/5</span>
              </div>
              <div>Total Review: ${item.review_count}</div>
              <div>Score: ${getScore(item.review_count, item.rating)}</div>
           </div>
        </div></a>
     </div><br />`
        )
        .join("");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
