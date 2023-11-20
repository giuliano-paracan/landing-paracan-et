// const numbers = document.querySelectorAll(".latest-numbers-number");
const numbers = document.querySelectorAll(".our-numbers-numbers");
const navbar = document.querySelector("nav.navbar");

//No easing
function constant(duration, range, current) {
  return duration / range;
}

//Quadratic easing
function quadratic(duration, range, current) {
  return ((duration * 3) / Math.pow(range, 3)) * Math.pow(current, 2);
}

const easings = [constant, constant, quadratic, constant, constant];
const increments = [1, 0.5, 50, 1, 1];

function animateValue(element, start, duration, easing, incNumber = 1) {
  let end = parseInt(element.textContent, 10);
  let range = end - start;
  let current = start;
  let increment = end > start ? incNumber : -1;
  let obj = element;

  let step = function () {
    current += increment;
    obj.innerHTML = "+ " + current;

    if (current != end) {
      setTimeout(step, easing(duration, range, current));
    }
  };

  setTimeout(step, easing(duration, range, start));
}

// create an Intersection Observer instance
const observer = new IntersectionObserver(async (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // start the animation when the element is visible
      numbers.forEach((number, index) => {
        animateValue(number, 0, 1000, easings[index], increments[index]);
      });
      // stop observing the element after the animation is done
      observer.unobserve(entry.target);
    }
  });
});
