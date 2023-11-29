document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from data.json
  fetch("/data.json")
    .then(response => response.json())
    .then(data => {
      // Update the HTML content for each section
      data.forEach((editionData, index) => {
        const sectionId = `section-${index + 1}`;
        const artistsId = `artists-${index + 1}`;
        const locationsId = `locations-${index + 1}`;
        const eventsId = `events-${index + 1}`;
        const arestsId = `arests-${index + 1}`;

        // Update edition name
        document.getElementById(sectionId).querySelector('h2').textContent = editionData.edition;

        // Update artists (if available)
        if (editionData.artists) {
          updateWithCountUp(artistsId, editionData.artists);
        }

        // Update locations (if available)
        if (editionData.locations) {
          updateWithCountUp(locationsId, editionData.locations);
        }

        // Update events (if available)
        if (editionData.events) {
          updateWithCountUp(eventsId, editionData.events);
        }

        if (editionData.arests) {
          updateWithCountUp(arestsId, editionData.arests);
        }
      });
    })
    .catch(error => console.error("Error fetching data:", error));
});

function updateWithCountUp(elementId, value) {
  const element = document.getElementById(elementId);
  const initialValue = 0;
  const duration = 2000; // milliseconds
  const frameDuration = 1000 / 60; // 60 frames per second
  const totalFrames = Math.ceil(duration / frameDuration);
  const increment = value / totalFrames;

  let currentFrame = 0;

  function animate() {
    currentFrame++;
    const currentValue = initialValue + increment * currentFrame;
    element.textContent = Math.round(currentValue);

    if (currentFrame < totalFrames) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
