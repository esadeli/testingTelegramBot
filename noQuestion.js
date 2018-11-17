'use strict'

function noQuestion(input) {
    let regex1 = new RegExp('what','i')
    let regex2 = new RegExp('why','i')
    let regex3 = new RegExp('when','i')
    let regex4 = new RegExp('where','i')
    let regex5 = new RegExp('who','i')
    let regex6 = new RegExp('how','i')

    if(regex1.test(input)) {
        return true
    } else if (regex2.test(input)) {
        return true
    } else if (regex3.test(input)) {
        return true
    } else if (regex4.test(input)) {
        return true
    } else if (regex5.test(input)) {
        return true
    } else if (regex6.test(input)) {
        return true
    } else {
        return false
    } 
}

// console.log(noQuestion('who are you '))
// console.log(noQuestion('king'))

module.exports = noQuestion