export const calculateFaceLocation = (data) => {
  //Input Image for FRWA
  const image = document.getElementById('inputImage');

  if (image) {
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);

    const boxArray = data.map((box) => {
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - box.right_col * width,
        bottomRow: height - box.bottom_row * height,
      };
    });
    //console.log(boxArray);

    return boxArray;
  }
};
