const productContainers = [...document.querySelectorAll('.block-container')];
const nxtBtn = [...document.querySelectorAll('.next-button')];
const preBtn = [...document.querySelectorAll('.prev-button')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})
