$(document).ready(function () {

    $('#keyboard-upper-container').hide();
    
    $(document).keydown(function (e) {
        if (e.keyCode == 16) {
            $('#keyboard-lower-container').hide();
            $('#keyboard-upper-container').show();
        }
    })
    
    $(document).keyup(function (e) {
        if (e.keyCode == 16) {
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
        }
    })
    
    
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let currentSentence = -1;
    let letterIndex = 0;
    
    
    $(document).keypress(function(e) {
        const keyVal = '#' + String(e.keyCode);
        
        $(keyVal).css('background-color', 'yellow');
        
        $(this).keyup(function() {
            $(keyVal).css('background-color', '');
        })
        
        
        nextLetter();
    })
    
    nextSentence();
    
    function letters() {
        return sentences[currentSentence].split('');
    }

    

    
    function nextSentence() {
        currentSentence++;
        $('#sentence').text('');
        $.each(letters(), function(index, value) {
            $('#sentence').append(`<span id='letter${index}'>${value}</span>`)
        })
        $('#letter0').css('background-color', 'yellow');
        letterIndex = 0;
    }
    
    
    function nextLetter() {
        $(`#letter${letterIndex}`).css('background-color', 'yellow');
        $(`#letter${letterIndex - 1}`).css('background-color', '');
        console.log(letters()[letterIndex]);
        letterIndex++;
    }
    
    
    $('#button').click(function() {
        nextSentence();
    })
    
    $('#letterButton').click(function() {
        nextLetter();
    })
})