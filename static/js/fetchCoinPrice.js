const coinPriceContainer = document.getElementById("coin-price-container");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  });
});

function fetchCoinsPrice() {
  coinPriceContainer.innerHTML = `
    <div class="coin-price-container">
      ...loading
    </div>
  `;

  // Promise.all([
  //   fetch("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD"),
  //   fetch("https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD"),
  //   fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"),
  // ]).then((responses) =>
  //   Promise.all(responses.map((response) => response.json())).then((data) => {
  //     console.log(data);
  //   })
  // );

  fetch("https://api.minerstat.com/v2/coins?list=BTC,LTC,ETH")
    .then((response) => response.json())
    .then((data) => {
      let content = "";

      data.forEach((coin) => {
        console.log(coin);
        const price = coin.price.toFixed(2);
        const formattedPrice = parseFloat(price).toLocaleString("de-DE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
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

      fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
        .then((response) => response.json())
        .then((data) => {
          const price = data.USD.toFixed(2);
          const formattedPrice = parseFloat(price).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          content += `
            <div class="coin-price-container">
                <div class="coin-price-coin">
                    <i class="fa-brands fa-ethereum"></i>
                </div>
                <div class="coin-price-name">Ethereum</div>
                <div class="coin-price-coin">ETH</div>
                <div class="coin-price-price">$${formattedPrice}</div>
            </div>
          `;

          coinPriceContainer.innerHTML = content;
        })
        .catch(() => {
          coinPriceContainer.classList.add("disable");
        });
    })
    .catch(() => {
      coinPriceContainer.classList.add("disable");
    });
}

fetchCoinsPrice();
