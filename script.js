

    // Hover effect on the image
    function toggleDayNight() {
      const outerContainer = document.querySelector('.outer-container');
      outerContainer.classList.toggle('light');
    }

    document.querySelector('.hoverable-image').addEventListener('mouseover', function() {
      this.classList.add('hovering');
    });

    document.querySelector('.hoverable-image').addEventListener('mouseout', function() {
      this.classList.remove('hovering');
    });