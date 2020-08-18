var spawnSync = require('child_process').spawnSync

var FAILURE = 'failure'
var SUCCESS = 'success'

var styles = {
  success: {open: '\u001b[32;1m', close: '\u001b[0m'},
  danger: {open: '\u001b[31;1m', close: '\u001b[0m'},
  info: {open: '\u001b[36;1m', close: '\u001b[0m'},
  subtitle: {open: '\u001b[2;1m', close: '\u001b[0m'},
}

function color(modifier, string) {
  return styles[modifier].open + string + styles[modifier].close
}

function run(title, subtitle, command, options) {
  options = options || {}

  console.log(color('info', '    ▶️  Starting: ' + title))
  console.log(color('subtitle', '          ' + subtitle))
  console.log(color('subtitle', '          Running the following command: ' + command))

  var result = spawnSync(command, {stdio: 'inherit', shell: true})

  if (result.status !== 0 && !options.ignoreFailure) {
    console.error(
      color(
        'danger',
        '    🚨  Failure: ' +
          title +
          '. Please review the messages above for information on how to troubleshoot and resolve this issue.',
      ),
    )
    process.exit(result.status)
    return FAILURE
  }

  console.log(color('success', '    ✅  Success: ' + title + '\n\n'))
  return SUCCESS
}

function main() {
  var result

  result = run(
    'Server dependency Installation',
    'Installing server dependencies.',
    'npm install',
  )
  if (result === FAILURE) return

  result = run(
    'Client dependency Installation',
    'Installing client dependencies.',
    'cd client && npm install',
  )
  if (result === FAILURE) return
}

main()