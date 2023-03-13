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
    if (sseController.es !== null) {
      sseController.es.close();

      sseController.es = null;
    }
  }
};

async function WebAuthnTest() {
  let div = document.getElementById('WebAuthnTestOutput');
  if (div === null) {
    div = document.createElement('div');
    div.id = 'WebAuthnTestOutput';
    document.body.append(div);
  }
  try {
    const challenge = SERVER_DATA.challenge;

    const userID = 'Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=';
    const id = Uint8Array.from(window.atob(userID), c => c.charCodeAt(0));

    const publicKeyCredentialCreationOptions = {
      challenge,
      rp: {
        name: "Tech Bridge",
        // id: "techbridge.inc",
      },
      user: {
        id,
        name: "arvin@techbridge.cc",
        displayName: "Arvin",
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
      },
      timeout: 60000,
      attestation: "direct"
    };
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });
    div.innerHTML = JSON.stringify(credential);
  } catch (error) {
    console.log(navigator.credentials);
    console.log(error);
    // alert('error');
    // alert(navigator.credentials);
    div.innerHTML = JSON.stringify(navigator.credentials || {});
  }
}