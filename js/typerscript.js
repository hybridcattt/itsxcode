function startTyper(onTyperStart, onTyperEnd) {

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
