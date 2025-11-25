document.addEventListener('DOMContentLoaded', () => {
    const priceTriggers = document.querySelectorAll('.price-item-trigger');

    priceTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            priceTriggers.forEach((btn) => {
                if (btn !== trigger) {
                    btn.setAttribute('aria-expanded', 'false');
                    btn.nextElementSibling.hidden = true;
                }
            });

            trigger.setAttribute('aria-expanded', String(!isExpanded));
            trigger.nextElementSibling.hidden = isExpanded;
        });
    });
});

