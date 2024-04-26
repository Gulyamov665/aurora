
export function intersectionScrollSpyFunc(entries, navLinks, setActiveIndex) {
    entries.forEach((entry) => {
        console.log(entry, entry.target.id)
        if (entry.isIntersecting) {
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




