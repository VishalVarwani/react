// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the image and canvas elements
    const image = document.getElementById('dragImage');
    const canvas = new fabric.Canvas('canvas');
  
    // Event listener for initializing drag on the image
    image.addEventListener('mousedown', function (event) {
      // Prevent default browser behavior (e.g., image dragging)
      event.preventDefault();
  
      // Create a Fabric.js image object from the DOM image
      const fabricImage = new fabric.Image(image, {
        left: event.clientX,
        top: event.clientY,
        originX: 'center',
        originY: 'center',
        hasControls: false
      });
  
      // Add the image to the canvas
      canvas.add(fabricImage);
  
      // Update the canvas
      canvas.renderAll();
  
      // Set the flag to indicate dragging has started
      fabricImage.isDragging = true;
  
      // Store the initial position of the image
      fabricImage.startX = event.clientX;
      fabricImage.startY = event.clientY;
    });
  
    // Event listener for dragging the image
    document.addEventListener('mousemove', function (event) {
      // Find the currently dragged image
      const activeObject = canvas.getActiveObject();
  
      if (activeObject && activeObject.isDragging) {
        // Calculate the distance moved by the image
        const dx = event.clientX - activeObject.startX;
        const dy = event.clientY - activeObject.startY;
  
        // Update the position of the image
        activeObject.set({
          left: activeObject.left + dx,
          top: activeObject.top + dy,
          startX: event.clientX,
          startY: event.clientY
        });
  
        // Render the canvas to reflect the changes
        canvas.renderAll();
      }
    });
  
    // Event listener for ending the dragging
    document.addEventListener('mouseup', function () {
      // Find the currently dragged image
      const activeObject = canvas.getActiveObject();
  
      if (activeObject) {
        // Set the flag to indicate dragging has ended
        activeObject.isDragging = false;
      }
    });
  });
  