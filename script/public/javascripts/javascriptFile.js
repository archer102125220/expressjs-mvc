console.log('from javascriptFile.js');
console.log('<%= title %>');

const sseController = {
  es: null,
  init() {
    if (sseController.es !== null) {
      sseController.es.close();
    }
    if (document.getElementById('sseOutput')) {
      document.body.removeChild(document.getElementById('sseOutput'));
    }
    const div = document.createElement('div');
    div.id = 'sseOutput';
    document.body.append(div);
    sseController.es = new EventSource('/sse');
    sseController.es.addEventListener('message', function (e) {
      var str = '';
      str += '<li>[' + new Date() + ']: ';
      str += e.data + '</li>\n';
      div.innerHTML += str;
    }, false);
  },
  close() {
    sseController.es.close();

    sseController.es = null;
  }
};