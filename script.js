const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuButton.focus();
    }
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const savingsSlider = document.querySelector('[data-savings-slider]');

if (savingsSlider) {
  const savingsValue = document.querySelector('[data-savings-value]');
  const daysOutput = document.querySelector('[data-days-output]');
  const journeyPeriod = document.querySelector('[data-journey-period]');
  const journeyMessage = document.querySelector('[data-journey-message]');
  const savingsDial = document.querySelector('[data-savings-dial]');
  const annualExample = 200;
  const daysInYear = 365;

  const updateSavingsJourney = () => {
    const days = Number(savingsSlider.value);
    const progress = (days / daysInYear) * 100;
    const amount = Math.round((annualExample * days) / daysInYear);
    const months = Math.max(1, Math.round(days / 30.42));

    savingsValue.textContent = `$${amount}`;
    daysOutput.textContent = days === daysInYear ? '365 days' : `${days} days`;
    savingsSlider.style.setProperty('--slider-progress', `${progress}%`);
    savingsDial.style.setProperty('--journey-progress', `${progress}%`);

    if (days < 31) {
      journeyPeriod.textContent = `During the first ${days === 1 ? 'day' : `${days} days`}`;
      journeyMessage.textContent = 'A small start can become a lasting water-saving habit.';
    } else if (days < daysInYear) {
      journeyPeriod.textContent = `After about ${months} ${months === 1 ? 'month' : 'months'}`;
      journeyMessage.textContent = 'Repeated everyday savings have more time to add up.';
    } else {
      journeyPeriod.textContent = 'By the end of one year';
      journeyMessage.textContent = 'Everyday water savings can become meaningful household savings.';
    }
  };

  savingsSlider.addEventListener('input', updateSavingsJourney);
  updateSavingsJourney();
}
