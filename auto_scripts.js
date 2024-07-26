document.addEventListener('DOMContentLoaded', () => {
  const autowritingElements = document.querySelectorAll('[data-autowriting="true"]');
  const autowritingOnloadElements = document.querySelectorAll('[data-begin="on-load"]');
  const autowritingScrollElements = document.querySelectorAll('[data-begin="scroll"]');
  const autowritingClickElements = document.querySelectorAll('[data-begin="click-touch"]');

  const SPEED = {
    'very-slow': 2000,
    'slow': 1000,
    'normal': 200,
    'fast': 75,
    'very-fast': 25,
    'custom': 831,
  };

  const randomBounds = (min, max) => min + Math.round(Math.random() * (max - min));

  const createAutowritingElements = (elements) => {
    elements.forEach(el => {
      const arrLetters = el.innerHTML.split('');
      el.innerHTML = '';

      const imgCursor = document.createElement('img');
      imgCursor.setAttribute('src', 'auto_cursor_text.png');
      imgCursor.style.height = `${parseInt(getComputedStyle(el).getPropertyValue('font-size')) * 1.2}px`;
      imgCursor.style.top = `${parseInt(getComputedStyle(el).getPropertyValue('font-size')) * 0.2}px`;
      el.append(imgCursor);

      const imgCursor2 = document.createElement('img');
      imgCursor2.setAttribute('src', 'auto_cursor_text.png');
      imgCursor2.style.height = `${parseInt(getComputedStyle(el).getPropertyValue('font-size')) * 1.2}px`;
      imgCursor2.style.top = `${parseInt(getComputedStyle(el).getPropertyValue('font-size')) * 0.2}px`;
      imgCursor2.classList.add('hidden-cursor');
      el.append(imgCursor2);

      arrLetters.forEach(letter => {
        const spanLetter = document.createElement('span');
        if (el.getAttribute('data-unwrite') !== 'true') {
          spanLetter.classList.add('hidden-letter');
        }
        spanLetter.appendChild(document.createTextNode(letter));
        el.append(spanLetter);
      });
    });
  };

  const toggleLetterDisplay = (el, i, interv) => {
    if (el.children[i].tagName !== 'IMG') {
      el.children[i].classList.toggle('hidden-letter');
    }

    const intervF = el.getAttribute('data-random') === 'true'
      ? interv + randomBounds(-0.25 * interv, 0.25 * interv)
      : interv;

    const [imgCursor, imgCursor2] = el.getElementsByTagName('img');
    el.insertBefore(imgCursor, el.children[i + 1]);
    el.insertBefore(imgCursor2, el.children[i + 1]);
    i += 1;

    if (i < el.children.length) {
      setTimeout(toggleLetterDisplay, intervF, el, i, interv);
    } else {
      toggleVisibleCursor(el);
      setTimeout(() => {
        const spanCont = document.createElement('span');
        spanCont.appendChild(document.createTextNode([...el.querySelectorAll('span')].map(s => s.innerHTML).join('')));
        el.innerHTML = '';
        el.append(spanCont, imgCursor, imgCursor2);
      }, SPEED['normal'] * 12, el);
    }
  };

  const toggleWordDisplay = (el) => {
    if (el.getAttribute('data-autowriting') === 'true') {
      const sp = SPEED[el.getAttribute('data-speed')] || SPEED['normal'];
      toggleLetterDisplay(el, 0, sp);
    }
  };

  const flashCursor = (el) => {
    const imgCursor = el.getElementsByTagName('img')[0];
    imgCursor.classList.toggle('hidden-letter');
    setTimeout(flashCursor, SPEED['normal'] * 2, el);
  };

  const toggleVisibleCursor = (el) => {
    const [imgCursor, imgCursor2] = el.getElementsByTagName('img');
    imgCursor2.classList.toggle('hidden-cursor');
    imgCursor.classList.toggle('hidden-cursor');
  };

  const autowriting = (el) => {
    if (el.getAttribute('written') !== 'true') {
      el.setAttribute('written', 'true');
      const delay = el.getAttribute('data-delay') || 0;
      setTimeout(() => {
        toggleVisibleCursor(el);
        toggleWordDisplay(el);
      }, SPEED['normal'] * 4 * delay, el);
    }
  };

  createAutowritingElements(autowritingElements);
  autowritingElements.forEach(flashCursor);
  autowritingOnloadElements.forEach(autowriting);
  autowritingClickElements.forEach(el => el.addEventListener('click', () => autowriting(el)));
  autowritingScrollElements.forEach(el => {
    const y = el.getBoundingClientRect().y;
    if (y >= 0 && y < (window.innerHeight - el.offsetHeight)) {
      autowriting(el);
    }
  });

  window.addEventListener('scroll', () => {
    autowritingScrollElements.forEach(el => {
      const y = el.getBoundingClientRect().y;
      if (y >= 0 && y < (window.innerHeight - el.offsetHeight)) {
        autowriting(el);
      }
    });
  });
});
