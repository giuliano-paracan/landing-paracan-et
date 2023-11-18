const coinPriceContainer = document.getElementById("coin-price-container");

function fetchCoinsPrice() {
  coinPriceContainer.innerHTML = `
    <div class="coin-price-container">
      ...loading
    </div>
  `
  
  fetch("https://api.minerstat.com/v2/coins?list=BTC,LTC")
    .then((response) => response.json())
    .then((data) => {
      let content = "";

      data.forEach((coin) => {
        console.log(coin);
        const price = coin.price.toFixed(2);
        const formattedPrice = parseFloat(price).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        content += `
                <div class="coin-price-container">
                    <div class="coin-price-coin">
                      <i class="fa-solid fa-${coin.name.toLowerCase()}-sign"></i>
                    </div>
                    <div class="coin-price-name">${coin.name}</div>
                    <div class="coin-price-coin">${coin.coin}</div>
                    <div class="coin-price-price">$${formattedPrice}</div>
                </div>
            `;
      });

      coinPriceContainer.innerHTML = content;
    })
    .catch(() => {
      coinPriceContainer.classList.add("disable");
    });
}

fetchCoinsPrice();
