/**
 * strings together all arguments that are not undefined and adds a period at the end.
 * @param  {string} args comma separated parameters to be strung together.
 * @return {string}      strings with spaces between parameters and undefined values left out.
 */
module.exports.concatMessage = (...args) => {
    let message = '';
    args.forEach((arg, i) => {
      if (arg) {
        message += arg + ' ';
        if (i === args.length - 1) {
          message = message.slice(0, message.length - 1) + '.';
        }
      }
    });
    return message;
}
