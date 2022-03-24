function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabsActive) {
    //tabs

    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide", "fade");
            item.classList.remove("show");
        });
        tabs.forEach(item => {
            item.classList.remove(tabsActive);
        });
    }

    function showTabsContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(tabsActive);
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
}
export default tabs;