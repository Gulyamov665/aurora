
export function intersectionScrollSpyFunc(entries, navLinks, setActiveIndex) {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.boundingClientRect.height == 373.21875 && entry.intersectionRatio >= .9) {
            navLinks.current.forEach((link) => link.classList.remove('active'))
            let activeId = Number(entry.target.id)
            const activeLink = navLinks.current[activeId]
            setActiveIndex(activeId)
            if (activeLink) {
                activeLink.classList.add('active')
            }
        }
        else if (entry.isIntersecting && entry.intersectionRatio >= .2) {
            navLinks.current.forEach((link) => link.classList.remove('active'))
            let activeId = Number(entry.target.id)
            const activeLink = navLinks.current[activeId]
            setActiveIndex(activeId)
            if (activeLink) {
                activeLink.classList.add('active')
            }
        }
    })
}



