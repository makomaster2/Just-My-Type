let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate', undefined]
let sentenceIndex = 3
let letterIndex = 0
let correct = 0
let incorrect = 0

let sSDate = 1;
let start;
let stop;

let yesBtn = '<button id="reset" onClick="window.location.reload();">Yes</button>'
let noBtn = '<button id="noReset">No</button>'

$('#keyboard-upper-container').hide()
$('#target-letter').append(`<span id="targetSpan"></span>`)

nextSentence();

// Keyboard Switch Handlers
$(document).keydown(function (e) {
    if (e.keyCode == 16) {
        $('#keyboard-lower-container').hide()
        $('#keyboard-upper-container').show()
    }
})

$(document).keyup(function (e) {
    if (e.keyCode == 16) {
        $('#keyboard-upper-container').hide()
        $('#keyboard-lower-container').show()
    }
})

// Driving Force Handler
$(document).keypress(driver)
function driver(e) {
    let keyId = '#' + String(e.keyCode)

    $(keyId).css('background-color', 'yellow')

    $(this).keyup(function () {
        $(keyId).css('background-color', '')
    })

    if (sSDate == 1) {
        startTime();
    }

    if (sentenceIndex <= 4) {
        letterCheck(e)
        nextLetter()
    }
}

function letters() {
    return sentences[sentenceIndex].split('')
}

function nextSentence() {
    $('.glyphicon').remove()
    $('#sentence').text('')
    $('#targetSpan').empty()
    sentenceIndex++
    if (sentenceIndex <= 4) {
        $.each(letters(), function (index, value) {
            $('#sentence').append(`<span id='letter${index}'>${value}</span>`)
        })
        $('#letter0').css('background-color', 'yellow')
        letterIndex = 0
        $('#targetSpan').append(letters()[letterIndex])
    } else {
        endGame()
    }
}

function letterCheck(e) {
    if (e.key == letters()[letterIndex]) {
        $('#feedback').append('<span id="glyph" class="glyphicon glyphicon-ok"></span>')
        correct++
    } else {
        $('#feedback').append('<span id="glyph" class="glyphicon glyphicon-remove"></span>')
        incorrect++
    }
}

function nextLetter() {
    if (letterIndex < sentences[sentenceIndex].length - 1) {
        $(`#letter${letterIndex}`).next().css('background-color', 'yellow')
        $('#targetSpan').empty()
        $('#targetSpan').append(letters()[letterIndex + 1])
        letterIndex++
        $(`#letter${letterIndex - 1}`).css('background-color', '')
    } else {
        nextSentence()
    }
}

function startTime() {
    if (sSDate == 1) {
        sSDate = 0;
        start = new Date();
        console.log('started')
        console.log(start)
    }
}

function stopTime() {
    if (sSDate == 0) {
        sSDate = -1;
        stop = new Date();
        console.log('stopped')
        console.log(stop)
    }
}

function endGame() {
    if (sSDate == 0) {
        stopTime()
        console.log(((stop - start) / 1000) / 60)
    }
    let finalTime = ((stop - start) / 1000) / 60
    let grossWPM = (240 / 5) / finalTime
    let netWPM = grossWPM - (incorrect / finalTime)
    $('#feedback').css('margin', '30px')
    $('#feedback').append(`<h1 id='results'>RESULTS</h1>`)
    $('#feedback').append(`<p class='pt-3'><b>Gross WPM: </b>${Math.round(grossWPM)}</p>`)
    $('#feedback').append(`<p><b>Net WPM: </b>${Math.round(netWPM)}</p>`)

    setTimeout(function() {
        $('<p id="buttonMsg">Want to try again?</p>').appendTo('#feedback').css('font-weight', 'bold')
        $(yesBtn).appendTo('#feedback').css({
            'width': '100px',
            'margin': '3px'
        })
        $(noBtn).appendTo('#feedback').css({
            'width': '100px',
            'margin': '3px'
        });
        
        $('#noReset').on('click', function () {
            $('#reset').remove()
            $('#noReset').remove()
            $('#buttonMsg').remove()
        })
    }, 2500)

    $(document).off('keypress')
}
