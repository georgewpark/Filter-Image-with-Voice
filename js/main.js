//DOM load event
window.addEventListener("DOMContentLoaded", () => {

    //Set speech recognition
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition(),
          heardOutput = document.querySelector('.heard-output'),
          filterImage = document.querySelector('.filter-image'),
          filtersList = document.querySelector('.filter-list'),
          filters = ['none', 'blur', 'brightness', 'contrast', 'grayscale', 'hue-rotate', 'invert', 'opacity', 'saturate', 'sepia'];

    let filterValue = '',
        filterListIndex = 0,
        prevFilterListIndex = 0;

    //Start speech recognition
    recognition.start();

    //Listen for when the user finishes talking
    recognition.addEventListener('result', e => {

        //Get transcript of user speech
        let transcript = e.results[0][0].transcript.toLowerCase().replace(/\s/g, '');

        //Correct filter spelling/grammar
        if (transcript === 'greyscale') {
            transcript = 'grayscale';
        } else if (transcript === 'huerotate') {
            transcript = "hue-rotate";
        }

        //Output transcript
        heardOutput.textContent = transcript;

        //Check if transcript is valid filter
        if (filters.includes(transcript)) {

            //Get filter value
            switch(transcript) {
                case 'blur':
                    filterValue = 'blur(5px)';
                    break;
                case 'brightness':
                    filterValue = 'brightness(1.5)';
                    break;
                case 'contrast':
                    filterValue = 'contrast(1.5)';
                    break;
                case 'grayscale':
                    filterValue = 'grayscale(1)';
                    break;
                case 'hue-rotate':
                    filterValue = 'hue-rotate(90deg)';
                    break;
                case 'invert':
                    filterValue = 'invert(1)';
                    break;
                case 'opacity':
                    filterValue = 'opacity(0.6)';
                    break;
                case 'saturate':
                    filterValue = 'saturate(3)';
                    break;
                case 'sepia':
                    filterValue = 'sepia(1)';
                    break;
                default:
                    filterValue = 'none';
                    break;
            }

            //Apply image filter
            filterImage.style.filter = filterValue;

            //Get filter list index
            filterListIndex = filters.indexOf(transcript);

            //Highlight current filter in list
            if(filterListIndex !== prevFilterListIndex) {

                filtersList.children[prevFilterListIndex].classList.remove('current');

                filtersList.children[filterListIndex].classList.add('current');

                prevFilterListIndex = filterListIndex;

            }
        }
    });

    //Restart speech recognition after user has finished talking
    recognition.addEventListener('end', recognition.start);

});
