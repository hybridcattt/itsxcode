function startTyper(onTyperStart, onTyperEnd) {
  const params = getParams();
  let correctTerm = ""
  let wrongTerms = []
  if (params != null) {
    correctTerm = params.correct;
    wrongTerms = params.wrong;
  }
  else {
    correctTerm = "Xcode";
    wrongTerms = ["x-code", "xCode", "XCode"];
  }
  startCustomTyper(correctTerm, wrongTerms, onTyperStart, onTyperEnd);
}

function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const correct = urlParams.get("c");
  const wrong = urlParams.get("w");
  if (typeof correct === 'string' && typeof wrong === 'string' && correct.length > 0) {
    return { correct: correct, wrong: wrong.split(",") };
  }
  else {
    return null;
  }
}

function startCustomTyper(correct, wrongArray, onTyperStart, onTyperEnd) {
  var strings = wrongArray.filter(function (str) {
    return str.length > 0;
  });
  strings.push(correct);

  var commands = [];

  strings.forEach(function(value, index, array) {
    if (index == 0) {
      return;
    }

    let back = 'all';
    let text = value;
    let customTypeSpeed = null;
    let quickBackspace = false;

    let previousValue = array[index - 1];
    let cmnLenght = commonLength(value, previousValue);
    if (cmnLenght == value.length) {
      return; // nothing to type
    }

    if (cmnLenght != 0) {
      if (cmnLenght == previousValue.length) {
        back = null; // nothing to erase
      }
      else {
        back = -cmnLenght;
      }
      text = value.substring(cmnLenght);
    }

    if (index == (array.length - 1)) {
      customTypeSpeed = { min: 150, max: 200 };
    }
    if (index == 1) {
      quickBackspace = true;
    }

    let command = {
      back: back,
      text: text,
      customTypeSpeed: customTypeSpeed,
      quickBackspace: quickBackspace
    };
    commands.push(command);
  });

  console.log(commands);

  const element = document.querySelector('.xcode');
  const t = typer(element, { min: 70, max: 110 });

  onTyperStart();

  t.line('');
  t.pause(500);
  t.continue(strings[0]);

  commands.forEach(function(command, index, a) {
    t.pause(500);

    if (command.back != null) {
      let backSpeed = command.quickBackspace ? 50 : 80;
      t.back(command.back, backSpeed);
      t.pause(250);
    }

    if (command.customTypeSpeed != null) {
      t.continue(command.text, command.customTypeSpeed);
    }
    else {
      t.continue(command.text);
    }
  });

  t.cursor('false');
  t.pause(200);
  t.run(function() { onTyperEnd() });
  t.end();
}

function startTyperXcode(onTyperStart, onTyperEnd) {

  const element = document.querySelector('.xcode');

  onTyperStart()

  typer(element, { min: 80, max: 120 })
  .line('')
  .pause(500)

  .continue('xCode')
  .pause(500)
  .back(-1, 80)
  .pause(250)

  .continue('-code')
  .pause(500)
  .back('all', 50)
  .pause(500)

  .continue('X')
  .pause(120)
  .continue('Code', 70)
  .pause(500)
  .back(-1, 50)
  .pause(100)

  .continue('code', {min: 150, max: 200})
  .pause(300)

  .cursor('false')
  .pause(200)
  .run(function() { onTyperEnd() })
  .end()
}

function commonLength(str1, str2) {
  let i = 0;
  while(i < str1.length && i < str2.length && str1.charAt(i) === str2.charAt(i)) {
    i++;
  }
  return i;
}
