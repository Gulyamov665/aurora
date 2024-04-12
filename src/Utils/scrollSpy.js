

function intersectionScrollSpyFunc(entries, navLinks, setActiveIndex) {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= .2) {
            navLinks.current.forEach((link) => link.classList.remove('active'))
            let activeId = Number(entry.target.id)
            const activeLink = navLinks.current[activeId]
            setActiveIndex(activeId)
            if (activeLink) {
                activeLink.classList.toggle('active')
            }
        }
    })
}

export default intersectionScrollSpyFunc