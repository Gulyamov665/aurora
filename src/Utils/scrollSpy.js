

export function intersectionScrollSpyFunc(entries, navLinks, setActiveIndex) {
    entries.forEach((entry) => {
        if (window.innerHeight >= entry.intersectionRect.top / 2 && entry.isIntersecting) {

            navLinks.current.forEach((link) => link.classList.remove('active'))
            let activeId = Number(entry.target.id)
            const activeLink = navLinks.current[activeId]
            setActiveIndex(activeId)
            if (activeLink) {
                activeLink.classList.add('active')
            } else {
                activeLink.classList.remove('active')
            }
        }
    })
}

