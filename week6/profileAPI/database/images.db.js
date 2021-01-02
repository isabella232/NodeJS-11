/**
 * @image {id: number, path: string, userId: number}
 */
const images = [
    {id:1, path: "uploads/users/test@test.png", userId: 1},
]

const getImage  = (imageId) => {
    return images.find((image)=>image.userId === imageId);
}

module.exports={
    images,
    getImage
};