import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    const handleImageDragStart = (event) => {
      event.preventDefault();

      const fabricImage = new fabric.Image(imageRef.current, {
        left: event.clientX,
        top: event.clientY,
        originX: 'center',
        originY: 'center',
        hasControls: false
      });

      canvas.add(fabricImage);

      canvas.renderAll();

      fabricImage.isDragging = true;
      fabricImage.startX = event.clientX;
      fabricImage.startY = event.clientY;
    };

    const handleImageDrag = (event) => {
      const activeObject = canvas.getActiveObject();

      if (activeObject && activeObject.isDragging) {
        const dx = event.clientX - activeObject.startX;
        const dy = event.clientY - activeObject.startY;

        activeObject.set({
          left: activeObject.left + dx,
          top: activeObject.top + dy,
          startX: event.clientX,
          startY: event.clientY
        });

        canvas.renderAll();
      }
    };

    const handleImageDragEnd = () => {
      const activeObject = canvas.getActiveObject();

      if (activeObject) {
        activeObject.isDragging = false;
      }
    };

    if (canvasRef.current) {
      const imageElement = document.getElementById('dragImage');
      imageRef.current = imageElement;

      imageElement.addEventListener('mousedown', handleImageDragStart);
      document.addEventListener('mousemove', handleImageDrag);
      document.addEventListener('mouseup', handleImageDragEnd);
    }

    return () => {
      if (canvasRef.current) {
        const imageElement = document.getElementById('dragImage');
        imageElement.removeEventListener('mousedown', handleImageDragStart);
        document.removeEventListener('mousemove', handleImageDrag);
        document.removeEventListener('mouseup', handleImageDragEnd);
      }
    };
  }, []);

  return (
    <div>
      <img id="dragImage" src="path/to/your/image" alt="Draggable Image" />
      <canvas
        id="canvas"
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: '1px solid #000' }}
      />
    </div>
  );
};

export default CanvasComponent;
