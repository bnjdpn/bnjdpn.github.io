(function () {
  function address() {
    var local = ['c', 'o', 'n', 't', 'a', 'c', 't'].join('');
    var domain = ['bnj', 'dpn', '.', 'c', 'o', 'm'].join('');
    return local + String.fromCharCode(64) + domain;
  }
  document.querySelectorAll('[data-contact]').forEach(function (button) {
    button.addEventListener('click', function () {
      var link = document.createElement('a');
      link.href = 'mai' + 'lto:' + address();
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  });
}());
