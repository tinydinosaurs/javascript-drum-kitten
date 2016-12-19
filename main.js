console.log('goodbye blue monday'); // test to make sure js is hooked up correctly.

function playKitty(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) {
    return; // if the key doesn't have an associated data-key, do nothing
  }
  audio.currentTime = 0; // rewind to beginning of audio (https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime)
  audio.play();
  key.classList.add('playing'); // same as key.addClass() in jQuery
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

/* we could add a timeout to our playKitty function,
but if someone changed the transform property in the css,
we'd have to make sure to change it in the javascript,
which would be a pain. Instead, we'll write a function
that listens for a the end of a transition, and  removes
the playing class at that point. */
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

/* adding event listener on target, in this case 'window'.
 It takes two arguments: type of event and the listener,
 which in this case is the function defined above. */
window.addEventListener('keydown', playKitty);
