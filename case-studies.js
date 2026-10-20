// Accessible, keyboard-navigable tabs for each project case study.
document.querySelectorAll('[data-case-study]').forEach((root) => {
  const buttons = [...root.querySelectorAll('[role=tab]')];
  const panels = [...root.querySelectorAll('[role=tabpanel]')];

  function show(index, focus = false) {
    buttons.forEach((button, buttonIndex) => {
      const selected = index === buttonIndex;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel, panelIndex) => {
      const active = index === panelIndex;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });

    if (focus) buttons[index].focus();
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => show(index));

    button.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        next = (index + 1) % buttons.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        next = (index - 1 + buttons.length) % buttons.length;
      } else if (event.key === 'Home') {
        next = 0;
      } else if (event.key === 'End') {
        next = buttons.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      show(next, true);
    });
  });

  show(0);
});
