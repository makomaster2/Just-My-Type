$(document).ready(function () {

    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate']
    let sentenceIndex = -1
    let letterIndex = 0
    let correct = 0
    let incorrect = 0

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
    $(document).keypress(function (e) {
        let keyId = '#' + String(e.keyCode)

        $(keyId).css('background-color', 'yellow')

        $(this).keyup(function () {
            $(keyId).css('background-color', '')
        })

        letterCheck(e)

        nextLetter()

    })


    function letters() {
        return sentences[sentenceIndex].split('')
    }

    function nextSentence() {
        $('.glyphicon').remove()
        $('#sentence').text('')
        $('#targetSpan').empty()
        sentenceIndex++
        $.each(letters(), function (index, value) {
            $('#sentence').append(`<span id='letter${index}'>${value}</span>`)
        })
        $('#letter0').css('background-color', 'yellow')
        letterIndex = 0
        $('#targetSpan').append(letters()[letterIndex])
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

    let d = new Date();

    // console.log(sentences.join('').length)
    // console.log(d.getTime())

})