let discount_tabs = document.querySelectorAll('.option_nav');
let option_tabs = document.querySelectorAll('.option_tab');
discount_tabs.forEach((element, index) => {
    element.addEventListener('click', () => {
        let prev = document.querySelector('.active_nav');
        
        let prev_pos = Object.keys(option_tabs)[Object.values(discount_tabs).indexOf(prev)];// option_tabs.entries().indexOf(prev);
        prev.classList.remove('active_nav');
        element.classList.add('active_nav');
        option_tabs[prev_pos].style.display = 'none';
        option_tabs[index].style.display = 'inline-block';
    });
});

