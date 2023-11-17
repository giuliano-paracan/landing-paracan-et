const coinPriceContainer = document.getElementById("coin-price-container");

function fetchCoinsPrice() {
  fetch("https://api.minerstat.com/v2/coins?list=BTC,LTC")
    .then((response) => response.json())
    .then((data) => {
      let content = "";
      console.log(data)
      data.forEach((coin) => {
        console.log(coin)
        const price = coin.price.toFixed(2);
        content += `
                <div class="coin-price-container">
                    <div class="coin-price-coin">
                      <i class="fa-solid fa-${coin.name.toLowerCase()}-sign"></i>
                    </div>
                    <div class="coin-price-coin">${coin.coin}</div>
                    <div class="coin-price-name">${coin.name}</div>
                    <div class="coin-price-price">${price}</div>
                </div>
            `;
      });

      coinPriceContainer.innerHTML = content;
    })
    .catch((error) => {});
}

fetchCoinsPrice();
