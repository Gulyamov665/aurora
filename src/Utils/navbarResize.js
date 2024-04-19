export function navbarResizeFunc(rootObserve) {
    rootObserve.forEach((entry) => {
        const navbar = document.querySelector('#nav')
        console.log(entry.isIntersecting)
        if (entry.isIntersecting) {
            navbar.classList.add('fullNavBar')
        } else {
            navbar.classList.remove('fullNavBar')
        }
    })
}